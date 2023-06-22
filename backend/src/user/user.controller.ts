import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

//Guards
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile/:userId')
  async getUserProfile(@Param('userId') userId: number) {
    return this.userService.getUserProfile(userId);
  }
}
