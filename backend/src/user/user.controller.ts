import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { JwtAuthDto } from '../auth/dto/jwt-auth.dto';
import { UpdateSettingsDto } from './dto/updateSettings.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile/:userId')
  async getUserProfile(@Param('userId') userId: number) {
    return this.userService.getUserProfile(userId);
  }
  @Get('settings/')
  async getSettings(@GetUser() user: JwtAuthDto) {
    return this.userService.getSettings(user.userId);
  }
  @Post('settings/')
  async updateSettings(
    @GetUser() user: JwtAuthDto,
    @Body() dto: UpdateSettingsDto,
  ) {
    return this.userService.updateSettings(dto, user.userId);
  }

  @Get('search/')
  async searchUsers(
    @Query('username') username?: string,
    @Query('languages') languages?: number[],
    @Query('countryIds') countryIds?: number[],
    @Query('hobbies') hobbies?: number[],
    @Query('gender') gender?: string[],
  ) {
    if (countryIds) {
      if (Array.isArray(countryIds)) {
        countryIds = countryIds.map((id) => parseInt(id.toString()));
      } else {
        countryIds = [parseInt(countryIds)];
      }
    }
    if (hobbies) {
      if (Array.isArray(hobbies)) {
        hobbies = hobbies.map((id) => parseInt(id.toString()));
      } else {
        hobbies = [parseInt(hobbies)];
      }
    }
    if (languages) {
      if (Array.isArray(languages)) {
        languages = languages.map((id) => parseInt(id.toString()));
      } else {
        languages = [parseInt(languages)];
      }
    }
    return this.userService.searchUsers(
      username,
      languages,
      countryIds,
      hobbies,
      gender,
    );
  }
}
