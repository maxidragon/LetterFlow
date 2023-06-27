import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class HobbyService {
    constructor(private readonly prisma: DbService) { }
    async getAllHobbies() {
        return await this.prisma.hobby.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }
    async getMyHobbies(userId: number) {
        return await this.prisma.userHobby.findMany({
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
    }
    async addHobby(userId: number, hobbyId: number) {
        return await this.prisma.userHobby.create({
            data: {
                userId: userId,
                hobbyId: hobbyId,
            },
        });
    }
    async removeHobby(userId: number, hobbyId: number) {
        return await this.prisma.userHobby.deleteMany({
            where: {
                userId: userId,
                hobbyId: hobbyId,
            },
        });
    }
}
