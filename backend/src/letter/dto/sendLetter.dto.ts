import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SendLetterDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  receiverId: number;
}
