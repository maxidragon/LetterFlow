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
}
