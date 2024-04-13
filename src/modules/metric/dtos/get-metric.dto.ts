import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Pagination } from 'src/common/dtos/pagination.dto';
import { MetricType, MetricUnit } from '../enums/metric.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetMetricDto extends Pagination {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    default: 'c3780a34-c8fe-4487-b157-f83e45b89ba7',
  })
  userId: string;

  @IsNotEmpty()
  @IsEnum(MetricType)
  @ApiProperty({
    required: true,
    type: MetricType,
    enum: Object.values(MetricType),
  })
  type: MetricType;

  @IsOptional()
  @IsEnum(MetricUnit)
  @ApiProperty({
    required: false,
    type: MetricUnit,
    enum: Object.values(MetricUnit),
  })
  targetUnit?: MetricUnit;
}

export class GetChartDto extends GetMetricDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    required: true,
    type: String,
    default: '2024-04-13T07:29:28.878Z',
  })
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    required: true,
    type: String,
    default: '2024-04-13T07:29:28.878Z',
  })
  endDate: string;
}
