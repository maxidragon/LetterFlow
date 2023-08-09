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
        showBirthDate: true,
        country: {
          select: {
            name: true,
            code: true,
          },
        },
        gender: true,
        replyTime: true,
        timezone: true,
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
            id: true,
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
            id: true,
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
    if (!userInfo.showBirthDate) {
      delete userInfo.birthDate;
    }
    languages.forEach((language: any) => {
      language.name = language.Language.name;
      language.id = language.Language.id;
      delete language.Language;
    });
    const hobbies = hobbiesObjects.map((hobby: any) => hobby.Hobby);
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
        showBirthDate: true,
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
          showBirthDate: dto.showBirthDate,
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
    onlyWithDescription?: boolean,
    gender?: string[],
    skip?: number,
    take?: number,
  ) {
    if (!skip) {
      skip = 0;
    }
    if (!take) {
      take = 10;
    }
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
    if (gender && gender.length > 0) {
      where['gender'] = {
        in: gender,
      };
    }
    where['id'] = {
      not: userId,
    };
    if (!username) {
      where['appearInSearch'] = true;
    }
    if (onlyWithDescription) {
      where['description'] = {
        not: null,
      };
    }
    const users = await this.prisma.user.findMany({
      skip: skip,
      take: take,
      where,
      orderBy: {
        username: 'asc',
      },
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
    const allUsersCount = await this.prisma.user.count({
      where,
    });
    return {
      users,
      count: allUsersCount,
    };
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
    const users = await this.prisma.starredUser.findMany({
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
    return users.map((user) => user.User);
  }
}
