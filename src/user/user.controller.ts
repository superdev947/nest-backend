import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserDTO, User, UserIDDTO } from './user.interface';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res): Promise<User[]> {
    try {
      const users = await this.userService.findAll();
      return res.json({
        message: 'Users obtained successfully',
        users,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userID')
  @ApiParam({
    name: 'userID',
    required: true,
    description: 'ID of the user to retrieve',
  })
  async findById(@Res() res, @Param('') params: UserIDDTO): Promise<User> {
    const user = await this.userService.findUserById(params.userID);
    return res.json({
      message: 'User obtained successfully ',
      user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userID')
  @ApiParam({
    name: 'userID',
    required: true,
    description: 'ID of the user to retrieve',
  })
  @ApiBody({
    type: UpdateUserDTO,
    description: 'Json structure for user object',
  })
  async update(
    @Res() res,
    @Param('') params: UserIDDTO,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    try {
      const user = await this.userService.updateUser(
        params.userID,
        updateUserDTO,
      );
      return res.json({
        message: 'User update successfully',
        user,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userID')
  @ApiParam({
    name: 'userID',
    required: true,
    description: 'ID of the user to retrieve',
  })
  async delete(@Res() res, @Param('') params: UserIDDTO): Promise<User> {
    try {
      const user = await this.userService.deleteUser(params.userID);
      return res.json({
        message: 'User removed successfully',
        user,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
