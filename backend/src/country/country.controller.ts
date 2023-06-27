import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('all')
  async getAllCountries() {
    return await this.countryService.getAllCountries();
  }
  @Get('id/:name')
  async getCountryId(name: string) {
    return await this.countryService.getCountryId(name);
  }
}
