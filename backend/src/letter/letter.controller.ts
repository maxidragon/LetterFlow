import { Controller, Get, Param } from '@nestjs/common';
import { LetterService } from './letter.service';

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
}
