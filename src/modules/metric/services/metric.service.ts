import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMetricDto } from '../dtos/create-metric.dto';
import { MetricErrorMessage } from '../enums/error.enum';
import { MetricRepository } from '../repositories/metric.repository';
import { GetChartDto, GetMetricDto } from '../dtos/get-metric.dto';
import { CommonErrorResponse, CommonSuccessResponse } from 'src/common/utils';
import { MetricHelper } from '../helpers/metric.helper';

@Injectable()
export class MetricService {
  constructor(
    private metricRepository: MetricRepository,
    private metricHelper: MetricHelper,
  ) {}
  async create(createMetricDto: CreateMetricDto) {
    try {
      const { unit } = createMetricDto;
      const metricType = await this.metricHelper.getMetricTypeByUnit(unit);
      if (!metricType) {
        CommonErrorResponse(MetricErrorMessage.UNIT_INVALID);
      }

      const metricCreated = {
        ...createMetricDto,
        type: metricType,
        date: new Date(createMetricDto.date),
      };

      const metric = await this.metricRepository.create(metricCreated);
      return CommonSuccessResponse<typeof metric>(metric, HttpStatus.CREATED);
    } catch (error) {
      CommonErrorResponse(error);
    }
  }

  async getMetricsByType(getMetricDto: GetMetricDto) {
    try {
      await this.metricHelper.validateTargetUnit(
        getMetricDto.type,
        getMetricDto.targetUnit,
      );
      const metrics =
        await this.metricRepository.findMetricByType(getMetricDto);
      return CommonSuccessResponse<typeof metrics>(metrics);
    } catch (error) {
      CommonErrorResponse(error);
    }
  }

  async getChart(getChartDto: GetChartDto) {
    try {
      await this.metricHelper.validateTargetUnit(
        getChartDto.type,
        getChartDto.targetUnit,
      );
      const chart = await this.metricRepository.groupMetricByDate(getChartDto);
      return CommonSuccessResponse<typeof chart>(chart);
    } catch (error) {
      CommonErrorResponse(error);
    }
  }
}
