import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UpdateSettingsDto } from './dto/updateSettings.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DbService) {}

  async getUserProfile(userId: number) {
    const userInfo = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        description: true,
        birthDate: true,
        country: {
          select: {
            name: true,
          },
        },
        gender: true,
        replyTime: true,
      },
    });
    const sendLetters = await this.prisma.letter.count({
      where: {
        fromId: userId,
      },
    });
    const receivedLetters = await this.prisma.letter.count({
      where: {
        toId: userId,
      },
    });
    const hobbiesObjects = await this.prisma.userHobby.findMany({
      where: {
        userId: userId,
      },
      select: {
        Hobby: {
          select: {
            name: true,
          },
        },
      },
    });
    const languages = await this.prisma.userLanguage.findMany({
      where: {
        userId: userId,
      },
      select: {
        Language: {
          select: {
            name: true,
          },
        },
        level: true,
      },
    });
    languages.forEach((language: any) => {
      language.name = language.Language.name;
      delete language.Language;
    });
    const hobbies = hobbiesObjects.map((hobby: any) => hobby.Hobby.name);
    const profile: any = userInfo;
    profile.sendLetters = sendLetters;
    profile.receivedLetters = receivedLetters;
    profile.hobbies = hobbies;
    profile.languages = languages;
    return profile;
  }

  async getSettings(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        description: true,
        birthDate: true,
        country: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  async updateSettings(dto: UpdateSettingsDto, userId: number) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: dto.username,
        email: dto.email,
        description: dto.description,
        birthDate: dto.birthDate,
      },
    });
  }
}
