import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthDto } from './dto/jwt-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { sha512 } from 'js-sha512';
import { MailerService } from '@nestjs-modules/mailer';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DbService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async isTaken(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email } });
    return !!user;
  }

  async signup(dto: RegisterDto): Promise<object> {
    if (await this.isTaken(dto.email)) {
      throw new ForbiddenException('Credentials taken!');
    }
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: sha512(dto.password),
        username: dto.username,
        lat: dto.lat,
        lon: dto.lon,
        countryId: dto.countryId,
        gender: dto.gender,
      },
    });
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        tempId: sha512(user.id.toString()),
      },
    });
    this.verifyCountry(user.id, dto.ip);
    return { msg: 'Successfully registered a new account!' };
  }

  async login(dto: LoginDto): Promise<[string, string, object]> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: dto.email },
    });

    if (sha512(dto.password) === user.password) {
      return this.generateAuthCookie({ userId: user.id });
    }
    throw new ForbiddenException('Wrong credentials!');
  }

  async generateAuthJwt(payload: JwtAuthDto): Promise<string> {
    console.log('payload: ', payload);
    return this.jwtService.sign(payload);
  }

  async generateAuthCookie(
    payload: JwtAuthDto,
  ): Promise<[string, string, object]> {
    const jwt = await this.generateAuthJwt(payload as JwtAuthDto);
    return ['jwt', jwt, { secure: false, sameSite: 'None' }];
  }

  async getUserPublicInfo(email: string): Promise<object | null> {
    const { prisma } = this;
    return prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
      },
    });
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (sha512(oldPassword) !== user.password) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: sha512(newPassword),
      },
    });
    return 'Password changed';
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const emailHTML = `
      <html lang="en">
        <body>
          <h1>Reset your password</h1>
          <p>Click <a href="http://localhost:3000/#/auth/password/reset/${user.tempId}">here</a> to reset your password.</p>
        </body>
      </html>
    `;
    await this.mailerService.sendMail({
      to: email,
      from: process.env.MAIL_FROM,
      subject: 'Reset your password',
      html: emailHTML,
    });
  }

  async resetPassword(tempId: string, newPassword: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          tempId: tempId,
        },
      });
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: sha512(newPassword),
        },
      });
      return 'Password changed';
    } catch (err) {
      console.error(err);
      return 'Error';
    }
  }
  async verifyCountry(userId: number, ip: string) {
    const ipInfo = await axios.get(`http://ip-api.com/json/${ip}`);
    const userInfo = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        country: {
          select: {
            id: true,
          },
        },
      },
    });
    const correctCountry = await this.prisma.country.findFirst({
      where: {
        name: {
          contains: ipInfo.data.country,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (correctCountry) {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          countryId: correctCountry.id,
          lat: ipInfo.data.lat.toString(),
          lon: ipInfo.data.lon.toString(),
          countryChangedAt: new Date(),
        },
      });
      return {
        msg: `Country verified succesfully, your current country is ${correctCountry.name}`,
      };
    } else {
      await this.prisma.country.create({
        data: {
          name: ipInfo.data.country,
          code: ipInfo.data.countryCode,
        },
      });
      const newCountry = await this.prisma.country.findFirst({
        where: {
          name: {
            contains: ipInfo.data.country,
          },
        },
        select: {
          id: true,
          name: true,
        },
      });
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          countryId: newCountry.id,
          lat: ipInfo.data.lat.toString(),
          lon: ipInfo.data.lon.toString(),
          countryChangedAt: new Date(),
        },
      });
      return {
        msg: `Country verified succesfully, your current country is ${newCountry.name}`,
      };
    }
  }
}
