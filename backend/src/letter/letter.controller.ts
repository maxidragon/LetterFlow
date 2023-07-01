import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LetterService } from './letter.service';
import { JwtAuthDto } from '../auth/dto/jwt-auth.dto';
import { SendLetterDto } from './dto/sendLetter.dto';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}
  @Get('deliveryTime/:toUser')
  async getDeliveryTime(
    @GetUser() user: JwtAuthDto,
    @Param('toUser') toUser: string,
  ) {
    return this.letterService.getUserDeliveryTime(user.userId, +toUser);
  }
  @Post('send')
  async sendLetter(@Body() dto: SendLetterDto, @GetUser() user: JwtAuthDto) {
    return this.letterService.sendLetter(dto, user.userId);
  }
  @Get('my')
  async getMyConversations(@GetUser() user: JwtAuthDto) {
    return this.letterService.getMyConversations(user.userId);
  }
  @Get('all/:toId')
  async getAllLetters(
    @Param('toId') toId: number,
    @GetUser() user: JwtAuthDto,
  ) {
    return this.letterService.getAllLetters(user.userId, toId);
  }
  @Get('one/:letterId')
  async getOneLetter(
    @Param('letterId') letterId: number,
    @GetUser() user: JwtAuthDto,
  ) {
    return this.letterService.getLetterById(user.userId, letterId);
  }
}
