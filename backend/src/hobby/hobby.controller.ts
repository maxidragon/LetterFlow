import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('hobby')
export class HobbyController {
    constructor(private readonly hobbyService: HobbyService) {}

    @Get('all')
    async getAllHobbies() {
        return await this.hobbyService.getAllHobbies();
    }
    @Get('my')
    async getMyHobbies(@GetUser() user: JwtAuthDto) {
        return await this.hobbyService.getMyHobbies(user.userId);
    }
    @Get('add/:id')
    async addHobby(@GetUser() user: JwtAuthDto, @Param('id') id: number) {
        return await this.hobbyService.addHobby(user.userId, id);
    }
    @Delete('remove/:id')
    async removeHobby(@GetUser() user: JwtAuthDto, @Param('id') id: number) {
        return await this.hobbyService.removeHobby(user.userId, id);
    }
}
