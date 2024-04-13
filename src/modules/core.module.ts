import { Module } from '@nestjs/common';
import { MetricModule } from './metric/metric.module';

@Module({
  controllers: [],
  providers: [],
  imports: [MetricModule],
})
export class CoreModule {}
