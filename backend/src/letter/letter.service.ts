import { HttpException, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import axios, { AxiosResponse } from 'axios';
import { SendLetterDto } from './dto/sendLetter.dto';

@Injectable()
export class LetterService {
  constructor(private readonly prisma: DbService) {}
  async getMyConversations(userId: number) {
    return this.prisma.letter.findMany({
      select: {
        id: true,
        sendAt: true,
        from: {
          select: {
            id: true,
            username: true,
          },
        },
        to: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      where: {
        OR: [{ fromId: userId }, { toId: userId }],
      },
      orderBy: {
        sendAt: 'desc',
      },
      distinct: ['fromId', 'toId'],
    });
  }

  async getAllLetters(fromId: number, toId: number) {
    const letters = await this.prisma.letter.findMany({
      where: {
        OR: [
          { fromId: fromId, toId: toId },
          { fromId: toId, toId: fromId },
        ],
      },
      select: {
        id: true,
        content: true,
        sendAt: true,
        deliveredAt: true,
        from: {
          select: {
            id: true,
            username: true,
          },
        },
        to: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        sendAt: 'desc',
      },
    });
    letters.forEach((letter) => {
      if (letter.deliveredAt > new Date() && letter.to.id === fromId) {
        delete letter.content;
      }
    });
    return letters;
  }
  async getLetterById(userId: number, letterId: number) {
    const letter = await this.prisma.letter.findUnique({
      where: { id: letterId },
      select: {
        id: true,
        content: true,
        sendAt: true,
        deliveredAt: true,
        from: {
          select: {
            id: true,
            username: true,
          },
        },
        to: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    if (letter.from.id !== userId && letter.to.id !== userId) {
      throw new HttpException('Forbidden', 403);
    }
    if (letter.deliveredAt > new Date() && letter.to.id === userId) {
      delete letter.content;
    }
    return letter;
  }

  async sendLetter(dto: SendLetterDto, fromId: number) {
    const fromUser = await this.prisma.user.findUnique({
      where: { id: fromId },
      select: { country: true, lat: true, lon: true },
    });
    const toUser = await this.prisma.user.findUnique({
      where: { id: dto.receiverId },
      select: { country: true, lat: true, lon: true },
    });

    const sendDate = new Date();
    const deliveryTime = await this.getDeliveryTime(
      fromUser.country.name,
      toUser.country.name,
      +fromUser.lat,
      +fromUser.lon,
      +toUser.lat,
      +toUser.lon,
    );
    const deliveryDate = new Date().setHours(
      sendDate.getHours() + deliveryTime.timeInHours,
    );
    console.log(deliveryDate);
    await this.prisma.letter.create({
      data: {
        content: dto.content,
        fromId: fromId,
        toId: dto.receiverId,
        deliveredAt: new Date(deliveryDate),
      },
    });
    return { ok: true, status: 201 };
  }
  async getDeliveryTime(fromCountry: string, toCountry: string, lat1?: number, lon1?: number, lat2?: number, lon2?: number) {
    let distance = 0;
    if (lat1 && lat2 && lon1 && lon2) {
      distance = this.distance(lat1, lon1, lat2, lon2);
    } else {
      const fromCoordinates: AxiosResponse = await axios.get(
        `https://restcountries.com/v3.1/name/${fromCountry}`,
      );
      const toCoordinates: AxiosResponse = await axios.get(
        `https://restcountries.com/v3.1/name/${toCountry}`,
      );
      distance = this.distance(
        fromCoordinates.data[0].capitalInfo.latlng[0],
        fromCoordinates.data[0].capitalInfo.latlng[1],
        toCoordinates.data[0].capitalInfo.latlng[0],
        toCoordinates.data[0].capitalInfo.latlng[1],
      );
    }
    let timeInHours = Math.round(distance / 300);
    if (distance === 0) {
      timeInHours = 2;
    }
    return {
      distanceInKilometers: Math.round(distance),
      timeInHours: timeInHours,
    };
  }
  distance(lat1, lon1, lat2, lon2): number {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    }
  }
}
