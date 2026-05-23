import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Request,
  UseGuards,
  Query,
  Body,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findUserWithWishes(+id);
  }

  @Get()
  findMany(@Query() query: any) {
    return this.usersService.findMany(query);
  }

  @Get('search')
  search(@Query('query') query: string) {
    if (!query) return [];
    return this.usersService.searchByQuery(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (+id !== req.user.id) {
      throw new ForbiddenException('Нельзя редактировать чужой профиль');
    }
    return this.usersService.updateOne({ id: +id }, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    if (+id !== req.user.id) {
      throw new ForbiddenException('Нельзя удалить чужой профиль');
    }
    return this.usersService.removeOne({ id: +id });
  }
}
