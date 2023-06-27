import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LanguageService } from './language.service';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('language')
export class LanguageController {
    constructor(private readonly languageService: LanguageService) {}

    @Get('all')
    async getAllLanguages() {
        return await this.languageService.getAllLanguages();
    }
    @Get('my')
    async getMyLanguages(@GetUser() user: JwtAuthDto) {
        return await this.languageService.getMyLanguages(user.userId);
    }
}
