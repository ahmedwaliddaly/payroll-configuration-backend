import { IsString, IsNotEmpty } from 'class-validator';

export class ApproveConfigDto {
  @IsString()
  @IsNotEmpty()
  approvedBy: string;
}

export class RejectConfigDto {
  @IsString()
  @IsNotEmpty()
  rejectedBy: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}

// FILE 4: Placeholder - Waiting for content
