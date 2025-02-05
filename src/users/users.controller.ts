import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';
import { UpdatePasswordDto } from './dto/updates-password.dto';
import { AuthGuard, AuthRequest } from 'src/guards/auth.guard';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  signup(@Body() user: User) {
    return this.userService.signup(user);
  }

  @Patch('updatePassword')
  @UseGuards(AuthGuard)
  updatedPassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Request() req: AuthRequest,
  ) {
    return this.userService.updatePassword(updatePasswordDto, req);
  }
}
