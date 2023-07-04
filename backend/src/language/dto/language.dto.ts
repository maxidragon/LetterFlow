import { IsEnum, IsInt } from 'class-validator';

enum Level {
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  FLUENT = 'FLUENT',
  NATIVE = 'NATIVE',
}

export class LanguageDto {
  @IsEnum(Level)
  level: Level;
  @IsInt()
  languageId: number;
}
