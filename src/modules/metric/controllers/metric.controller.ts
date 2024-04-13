import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MetricService } from '../services/metric.service';
import { CreateMetricDto } from '../dtos/create-metric.dto';
import { GetChartDto, GetMetricDto } from '../dtos/get-metric.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('metric')
@ApiTags('Metrics')
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Post()
  create(@Body() createMetricDto: CreateMetricDto) {
    return this.metricService.create(createMetricDto);
  }

  @Get()
  getMetricsByType(@Query() getMetricDto: GetMetricDto) {
    return this.metricService.getMetricsByType(getMetricDto);
  }

  @Get('chart')
  getChart(@Query() getChartDto: GetChartDto) {
    return this.metricService.getChart(getChartDto);
  }
}
