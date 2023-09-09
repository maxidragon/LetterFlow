import { HttpException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class LanguageService {
  constructor(private readonly prisma: DbService) {}

  async getAllLanguages() {
    return await this.prisma.language.findMany();
  }
  async getUserLanguages(userId: number) {
    const languages = await this.prisma.userLanguage.findMany({
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
    return languages.map((language) => {
      return {
        id: language.Language.id,
        name: language.Language.name,
        level: language.level,
      };
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
  async deleteLanguage(userId: number, languageId: number) {
    return await this.prisma.userLanguage.deleteMany({
      where: {
        userId: userId,
        languageId: languageId,
      },
    });
  }
  async updateLanguage(
    userId: number,
    languageId: number,
    level: 'BASIC' | 'INTERMEDIATE' | 'FLUENT' | 'NATIVE',
  ) {
    return await this.prisma.userLanguage.updateMany({
      where: {
        userId: userId,
        languageId: languageId,
      },
      data: {
        level: level,
      },
    });
  }
}
