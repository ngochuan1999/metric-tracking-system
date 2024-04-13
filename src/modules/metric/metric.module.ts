import { Module } from '@nestjs/common';
import { MetricService } from './services/metric.service';
import { MetricController } from './controllers/metric.controller';

@Module({
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricModule {}
