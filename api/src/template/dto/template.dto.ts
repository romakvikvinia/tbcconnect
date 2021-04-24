import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

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
