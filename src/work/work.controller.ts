import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { AuthUserGuard } from 'src/user/guards/auth.quard';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserDocument } from 'src/user/user.schema';
import { WorkDto } from './dto/work.dto';
import { WorkService } from './work.service';

@Controller('/profile')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post('/work')
  @UseGuards(AuthUserGuard)
  create(@User() user: UserDocument, @Body() work: WorkDto): Promise<IUser> {
    return this.workService.create(user, work);
  }

  @Get('/work')
  @UseGuards(AuthUserGuard)
  show(@User() user: UserDocument) {
    return this.workService.show(user);
  }

  @Delete('/work')
  @UseGuards(AuthUserGuard)
  drop(@User() user: UserDocument): Promise<IUser> {
    return this.workService.drop(user);
  }

  @Patch('/work')
  @UseGuards(AuthUserGuard)
  edit(@User() user: UserDocument, @Body() work: WorkDto): Promise<IUser> {
    return this.workService.edit(user, work);
  }
}
