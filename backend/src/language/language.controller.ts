import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LanguageService } from './language.service';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';
import { LanguageDto } from './dto/language.dto';

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
    return await this.languageService.getUserLanguages(user.userId);
  }
  @Get('user/:userId')
  async getUserLanguages(@Param('userId') userId: number) {
    return await this.languageService.getUserLanguages(userId);
  }
  @Post('add')
  async addLanguage(@GetUser() user: JwtAuthDto, @Body() body: LanguageDto) {
    return await this.languageService.addLanguage(
      user.userId,
      body.languageId,
      body.level,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:languageId')
  async deleteLanguage(
    @GetUser() user: JwtAuthDto,
    @Param('languageId') languageId: number,
  ) {
    return await this.languageService.deleteLanguage(user.userId, languageId);
  }
  @Put('update')
  async updateLanguage(@GetUser() user: JwtAuthDto, @Body() body: LanguageDto) {
    return await this.languageService.updateLanguage(
      user.userId,
      body.languageId,
      body.level,
    );
  }
}
