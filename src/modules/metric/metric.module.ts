import { Module } from '@nestjs/common';
import { MetricService } from './services/metric.service';
import { MetricController } from './controllers/metric.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Metric, MetricSchema } from './entities/metric.entity';
import { MetricRepository } from './repositories/metric.repository';
import { MetricHelper } from './helpers/metric.helper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Metric.name, schema: MetricSchema }]),
  ],
  controllers: [MetricController],
  providers: [MetricService, MetricRepository, MetricHelper],
})
export class MetricModule {}
