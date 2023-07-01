import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UpdateSettingsDto } from './dto/updateSettings.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DbService) {}

  async getUserProfile(userId: number, requesterId: number) {
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
            code: true,
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
    const star = await this.prisma.starredUser.findFirst({
      where: {
        userId: userId,
        starredById: requesterId,
      },
    });

    languages.forEach((language: any) => {
      language.name = language.Language.name;
      delete language.Language;
    });
    const hobbies = hobbiesObjects.map((hobby: any) => hobby.Hobby.name);
    const profile: any = userInfo;
    profile.starred = !!star;
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
        appearInSearch: true,
        email: true,
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
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          username: dto.username,
          email: dto.email,
          description: dto.description,
          birthDate: dto.birthDate,
          appearInSearch: dto.appearInSearch,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
    return { msg: 'Settings updated successfully' };
  }
  async searchUsers(
    userId: number,
    username?: string,
    languages?: number[],
    countryIds?: number[],
    hobbies?: number[],
    gender?: string[],
  ) {
    const where = {};

    if (username) {
      where['username'] = {
        contains: username,
      };
    }

    if (languages && languages.length > 0) {
      where['UserLanguage'] = {
        some: {
          Language: {
            id: {
              in: languages,
            },
          },
        },
      };
    }

    if (countryIds && countryIds.length > 0) {
      where['country'] = {
        id: {
          in: countryIds,
        },
      };
    }

    if (hobbies && hobbies.length > 0) {
      where['UserHobby'] = {
        some: {
          Hobby: {
            id: {
              in: hobbies,
            },
          },
        },
      };
    }
    where['id'] = {
      not: userId,
    };
    if (!username) {
      where['appearInSearch'] = true;
    }

    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        gender: true,
        country: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });
  }
  async starUser(userId: number, starredById: number) {
    try {
      await this.prisma.starredUser.create({
        data: {
          starredById: starredById,
          userId: userId,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
    return { msg: 'User starred successfully' };
  }
  async unstarUser(userId: number, starredById: number) {
    try {
      await this.prisma.starredUser.deleteMany({
        where: {
          userId: userId,
          starredById: starredById,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
    return { msg: 'User unstarred successfully' };
  }
  async getMyStarredUsers(userId: number) {
    return await this.prisma.starredUser.findMany({
      where: {
        starredById: userId,
      },
      select: {
        User: {
          select: {
            id: true,
            username: true,
            country: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });
  }
}
