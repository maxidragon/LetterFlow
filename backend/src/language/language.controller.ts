import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LanguageService } from './language.service';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';
import { AddLanguageDto } from './dto/addLanguage.dto';

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
  @Post('add')
  async addLanguage(@GetUser() user: JwtAuthDto, @Body() body: AddLanguageDto) {
    return await this.languageService.addLanguage(
      user.userId,
      body.languageId,
      body.level,
    );
  }
}
