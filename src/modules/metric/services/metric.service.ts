import { Injectable } from '@nestjs/common';
import { CreateMetricDto } from '../dtos/create-metric.dto';
import { UpdateMetricDto } from '../dtos/update-metric.dto';

@Injectable()
export class MetricService {
  create(createMetricDto: CreateMetricDto) {
    return 'This action adds a new metric';
  }

  findAll() {
    return `This action returns all metric`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metric`;
  }

  update(id: number, updateMetricDto: UpdateMetricDto) {
    return `This action updates a #${id} metric`;
  }

  remove(id: number) {
    return `This action removes a #${id} metric`;
  }
}