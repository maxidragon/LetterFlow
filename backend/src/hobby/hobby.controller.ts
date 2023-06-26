import { Controller, Get, UseGuards } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('hobby')
export class HobbyController {
    constructor(private readonly hobbyService: HobbyService) {}

    @Get('all')
    async getAllHobbies() {
        return await this.hobbyService.getAllHobbies();
    }
}
