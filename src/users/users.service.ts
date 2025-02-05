import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { createSendToken } from '../util/jwt-token';
import { AuthRequest } from 'src/guards/auth.guard';
import { UpdatePasswordDto } from './dto/updates-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signup(data: User) {
    try {
      const user = await this.userModel.create(data);
      return createSendToken(user);
    } catch (error) {
      console.log('err', error);
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        err: error.message,
        message: 'something went wrong',
      };
    }
  }

  /* 
    @desc Update user password
    @route /api/v1/user/updatemypassword
    @access private
**/
  async updatePassword(body: UpdatePasswordDto, req: AuthRequest) {
    // 1) Get user from collection
    const user = await this.userModel
      .findById(req.user?.id)
      .select('+password');

    if (!user) {
      throw new BadRequestException('User not found.'); // Handle the case where the user is not found
    }

    // 2) Check if provided current password is correct
    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      !(await (user as any).correctPassword(
        body.currentPassword,
        user.password,
      ))
    ) {
      throw new BadRequestException('Your current password is wrong.');
    }

    // 3) If so, update password
    user.password = body.newPassword;
    user.passwordConfirm = body?.newPasswordConfirm;
    await user.save();

    // 4) Log user in, send JWT
    return createSendToken(user);
  }
}
