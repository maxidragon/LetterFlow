import { HttpException, Injectable } from '@nestjs/common';
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
  async addLanguage(
    userId: number,
    languageId: number,
    level: 'BASIC' | 'INTERMEDIATE' | 'FLUENT' | 'NATIVE',
  ) {
    if (
      await this.prisma.userLanguage.findFirst({
        where: {
          userId: userId,
          languageId: languageId,
        },
      })
    ) {
      throw new HttpException('Language already added', 409);
    }
    return await this.prisma.userLanguage.create({
      data: {
        level: level,
        userId: userId,
        languageId: languageId,
      },
    });
  }
}
