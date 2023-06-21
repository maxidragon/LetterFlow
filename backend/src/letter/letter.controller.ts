import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LetterService } from './letter.service';
import { JwtAuthDto } from '../auth/dto/jwt-auth.dto';
import { SendLetterDto } from './dto/sendLetter.dto';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}
  @Get('deliveryTime/:fromCountry/:toCountry')
  async getDeliveryTime(
    @Param('fromCountry') fromCountry: string,
    @Param('toCountry') toCountry: string,
  ) {
    return this.letterService.getDeliveryTime(fromCountry, toCountry);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('send')
  async sendLetter(@Body() dto: SendLetterDto, @GetUser() user: JwtAuthDto) {
    return this.letterService.sendLetter(dto, user.userId);
  }
}
