import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from './decorators/user.decorator';
import { LoginDto } from './dto/login.dto';
import { RegistrationUserDto } from './dto/registration.dto';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';
import { AuthUserGuard } from './guards/auth.quard';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';
import { IAuth } from '../interfaces/auth.interface';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/login')
  login(@Body() dto: LoginDto): Promise<IAuth> {
    return this.service.login(dto);
  }

  @Post('/registration')
  registration(@Body() dto: RegistrationUserDto): Promise<IAuth> {
    return this.service.registration(dto);
  }

  @Get('/profile')
  @UseGuards(AuthUserGuard)
  show(@User() user: UserDocument): Promise<IUser> {
    return this.service.show(user);
  }

  @Patch('/profile')
  @UseGuards(AuthUserGuard)
  edit(@User() user: UserDocument, @Body() newDataUser: UserDto) {
    return this.service.edit(user, newDataUser);
  }

  @Post('/go-to-bar-with-colleagues')
  @UseGuards(AuthUserGuard)
  goToBarWithColleagues(@User() user: UserDocument): Promise<IUser> {
    return this.service.goToBarWithColleagues(user);
  }
}
