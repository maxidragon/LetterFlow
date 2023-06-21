import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import axios, { AxiosResponse } from 'axios';
import { SendLetterDto } from './dto/sendLetter.dto';

@Injectable()
export class LetterService {
  constructor(private readonly prisma: DbService) {}
  async sendLetter(dto: SendLetterDto, fromId: number) {
    const fromUser = await this.prisma.user.findUnique({
      where: { id: fromId },
      select: { country: true },
    });
    const toUser = await this.prisma.user.findUnique({
      where: { id: dto.receiverId },
      select: { country: true },
    });

    const sendDate = new Date();
    const deliveryTime = await this.getDeliveryTime(
      fromUser.country.name,
      toUser.country.name,
    );
    const deliveryDate = new Date().setHours(
      sendDate.getHours() + deliveryTime.timeInHours,
    );
    console.log(deliveryDate);
    const letter = await this.prisma.letter.create({
      data: {
        content: dto.content,
        fromId: fromId,
        toId: dto.receiverId,
        deliveredAt: new Date(deliveryDate),
      },
    });
    return letter;
  }
  async getDeliveryTime(fromCountry: string, toCountry: string) {
    const fromCoordinates: AxiosResponse = await axios.get(
      `https://restcountries.com/v3.1/name/${fromCountry}`,
    );
    const toCoordinates: AxiosResponse = await axios.get(
      `https://restcountries.com/v3.1/name/${toCountry}`,
    );
    const distance = this.distance(
      fromCoordinates.data[0].capitalInfo.latlng[0],
      fromCoordinates.data[0].capitalInfo.latlng[1],
      toCoordinates.data[0].capitalInfo.latlng[0],
      toCoordinates.data[0].capitalInfo.latlng[1],
    );
    const timeInHours = Math.round(distance / 300);
    return {
      from: fromCoordinates.data[0].name.common,
      to: toCoordinates.data[0].name.common,
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
