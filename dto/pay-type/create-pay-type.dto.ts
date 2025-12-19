import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PayType } from '../../enums/payroll-configuration-enums';

export class CreatePayTypeDto {
  @IsEnum(PayType)
  type: PayType;

  @Type(() => Number)
  @IsNumber()
  @Min(6000)
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;
}

// FILE 5: Placeholder - Waiting for content
