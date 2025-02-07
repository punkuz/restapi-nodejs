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
import { LoginDto } from './dto/login.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/role.enum';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('users')
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

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get('test')
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  testroute() {
    return 'you reached here';
  }
}
