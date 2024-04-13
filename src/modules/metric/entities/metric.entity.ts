import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MetricDocument = HydratedDocument<Metric>;

@Schema({
  timestamps: true,
  collection: 'metrics',
})
export class Metric {
  @Prop({ index: true })
  userId: string;

  @Prop({ index: true })
  type: string;

  @Prop()
  value: number;

  @Prop()
  unit: string;

  @Prop()
  date: Date;
}

export const MetricSchema = SchemaFactory.createForClass(Metric);
