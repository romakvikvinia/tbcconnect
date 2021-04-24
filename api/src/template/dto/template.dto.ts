import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString, Length } from 'class-validator';

export class TemplateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 191)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 191)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 191)
  body: string;
}

export class TemplateFilterDto {
  @ApiPropertyOptional()
  @IsEmpty()
  search: string;
  @ApiPropertyOptional()
  skip: number;
  @ApiPropertyOptional()
  take: number;
}