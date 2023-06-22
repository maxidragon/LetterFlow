import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { JwtAuthDto } from '../auth/dto/jwt-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateSettingsDto } from './dto/updateSettings.dto';

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
}
