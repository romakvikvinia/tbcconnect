import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'A unique username',
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  username: string;

  @ApiProperty({
    description: 'Provide a strong password  ex. Lasha###9',
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'Please provide a strong password',
  //   })
  password: string;
}
