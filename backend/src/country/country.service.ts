import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CountryService {
  constructor(private readonly prisma: DbService) {}
  async getAllCountries() {
    return await this.prisma.country.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
  async getCountryId(searchName: string) {
    return await this.prisma.country.findFirst({
      //case insensitive search
      where: {
        name: {
          contains: searchName,
        },
      },
      select: {
        id: true,
      },
    });
  }
}
