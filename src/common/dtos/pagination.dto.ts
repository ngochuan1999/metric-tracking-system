import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class Pagination {
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    default: '10',
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit: number = 10;

  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    default: '1',
  })
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page: number = 1;
}
