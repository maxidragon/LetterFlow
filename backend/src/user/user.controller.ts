import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { JwtAuthDto } from '../auth/dto/jwt-auth.dto';
import { AuthGuard } from '@nestjs/passport';

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
}
