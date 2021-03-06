import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Put, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../../models/user/user.model';
import { UserDTO } from './dto/User.dto';
import { UsersService } from './users.service';

@ApiTags()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  findOneById(@Param() params): Promise<User> {
    return this.userService.findOneById(params.id);
  }

  @Put('update/:id')
  @ApiParam({ name: 'id' })
  update(@Param() params, @Body() updateUserDto: UserDTO): Promise<User> {
    return this.userService.update(params.id, updateUserDto);
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id' })
  destroy(@Param() params): Promise<User> {
    return this.userService.destroy(params.id);
  }
}