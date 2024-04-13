import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { MetricUnit } from '../enums/metric.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMetricDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    default: 'c3780a34-c8fe-4487-b157-f83e45b89ba7',
  })
  userId: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    required: true,
    type: String,
    default: '2024-04-13T07:29:28.878Z',
  })
  date: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    default: 10,
  })
  value: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(MetricUnit)
  @ApiProperty({
    required: true,
    type: MetricUnit,
    enum: Object.values(MetricUnit),
  })
  unit: MetricUnit;
}
