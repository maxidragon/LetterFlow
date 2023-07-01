import { IsBoolean, IsDate, IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateSettingsDto {
  @IsString()
  @Length(10, 255)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  birthDate: Date;

  @IsOptional()
  @IsBoolean()
  appearInSearch: boolean;
}
