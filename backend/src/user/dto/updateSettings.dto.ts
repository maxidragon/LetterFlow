import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

enum ShowBirthDate {
  AGE = 'AGE',
  DATE = 'DATE',
  NONE = 'NONE',
}

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

  @IsEnum(ShowBirthDate)
  showBirthDate: ShowBirthDate;
}
