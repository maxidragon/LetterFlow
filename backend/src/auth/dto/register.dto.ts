import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER',
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsOptional()
  @IsDate()
  birthday: Date;
  @IsEnum(Gender)
  gender: Gender;
  @IsInt()
  countryId: number;
  @IsString()
  lat: string;
  @IsString()
  lon: string;
  @IsString()
  ip: string;
}
