import { InjectModel } from '@nestjs/mongoose';
import { Metric, MetricDocument } from '../entities/metric.entity';
import { Model } from 'mongoose';
import { PipelineStage } from 'mongoose';
import { MetricHelper } from 'src/modules/metric/helpers/metric.helper';
import { GetChartDto, GetMetricDto } from '../dtos/get-metric.dto';
import { getEndDate, getStartDate } from 'src/common/utils/date';

export class MetricRepository {
  constructor(
    @InjectModel(Metric.name)
    private readonly metricModel: Model<MetricDocument>,
    private metricHelper: MetricHelper,
  ) {}

  async create(metric: Metric): Promise<Metric> {
    const createdMetric = new this.metricModel(metric);
    return createdMetric.save();
  }

  async findMetricByType(data: GetMetricDto) {
    const { page, limit, type, userId, targetUnit } = data;
    const skip = (page - 1) * limit;
    const totalCount = await this.metricModel.countDocuments({ type, userId });
    const pipeLine: PipelineStage[] = [
      {
        $match: { type, userId },
      },
      targetUnit
        ? this.metricHelper.addConvertMetricCondition(targetUnit)
        : undefined,
      {
        $project: {
          _id: 1,
          date: 1,
          value: targetUnit ? '$convertedValue' : '$value',
          unit: targetUnit ? targetUnit : '$unit',
          userId: '$userId',
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ].filter(Boolean);
    const metrics = await this.metricModel.aggregate(pipeLine);
    return { totalCount: totalCount, metrics: metrics };
  }

  async groupMetricByDate(data: GetChartDto) {
    const { userId, type, targetUnit, startDate, endDate } = data;
    const newStartDate = getStartDate(startDate);
    const newEndDate = getEndDate(endDate);

    const pipeLine: PipelineStage[] = [
      {
        $match: {
          userId,
          type,
          date: {
            $gte: newStartDate,
            $lte: newEndDate,
          },
        },
      },
      {
        $sort: { date: -1 as 1 | -1 },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          latestMetric: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$latestMetric' },
      },
      targetUnit
        ? this.metricHelper.addConvertMetricCondition(targetUnit)
        : undefined,
      {
        $project: {
          _id: 1,
          date: 1,
          type: 1,
          value: targetUnit ? '$convertedValue' : '$value',
          unit: targetUnit ? targetUnit : '$unit',
          userId: 1,
        },
      },
    ].filter(Boolean);

    return this.metricModel.aggregate(pipeLine);
  }
}
