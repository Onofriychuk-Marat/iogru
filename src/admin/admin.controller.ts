import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthAdminGuard } from 'src/admin/quards/admin.quard';
import { RegistrationUserDto } from 'src/user/dto/registration.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { IAdminResponse } from './interfaces/admin.interface';
import { IAuthAdmin } from './interfaces/auth-admin.interface';

@Controller('/admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Post('/login')
  login(@Body() loginDto: LoginAdminDto): IAuthAdmin {
    return this.service.login(loginDto);
  }

  @Post('/users')
  @UseGuards(AuthAdminGuard)
  addUser(
    @Body() newUser: RegistrationUserDto,
  ): Promise<IAdminResponse<IUser>> {
    return this.service.addUser(newUser);
  }

  @Get('/users')
  @UseGuards(AuthAdminGuard)
  showUsers(): Promise<IAdminResponse<IUser[]>> {
    return this.service.getUsers();
  }

  @Get('/users/:id')
  @UseGuards(AuthAdminGuard)
  showUser(@Param('id') id: string): Promise<IAdminResponse<IUser>> {
    return this.service.showUser(id);
  }

  @Patch('/users/:id')
  @UseGuards(AuthAdminGuard)
  changeUser(
    @Param('id') id: string,
    @Body() newDataUser: UserDto,
  ): Promise<IAdminResponse<IUser>> {
    return this.service.changeUser(id, newDataUser);
  }

  @Delete('/users/:id')
  @UseGuards(AuthAdminGuard)
  deleteUser(@Param('id') id: string): Promise<IAdminResponse<IUser>> {
    return this.service.deleteUser(id);
  }
}
