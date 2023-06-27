import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class LanguageService {
  constructor(private readonly prisma: DbService) {}

  async getAllLanguages() {
    return await this.prisma.language.findMany();
  }
  async getMyLanguages(userId: number) {
    return await this.prisma.userLanguage.findMany({
      where: {
        userId: userId,
      },
      select: {
        level: true,
        Language: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
