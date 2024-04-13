import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Metric>;

@Schema({
  timestamps: true,
  collection: 'metrics',
})
export class Metric {
  @Prop()
  userId: string;

  @Prop()
  type: string;

  @Prop()
  value: number;

  @Prop()
  unit: string;

  @Prop()
  date: Date;
}

export const MetricSchema = SchemaFactory.createForClass(Metric);
