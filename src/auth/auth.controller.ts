import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO, RegisterUserDTO } from 'src/user/user.interface';
import { User } from 'src/user/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
  })
  @ApiResponse({ status: 400, description: 'Incorrect username or password' })
  @ApiBody({
    type: LoginUserDTO,
    description: 'Json structure for user object',
  })
  async login(@Res() res, @Body() loginUserDTO: LoginUserDTO) {
    const user = await this.authService.validateUser(
      loginUserDTO.email,
      loginUserDTO.password,
    );
    if (!user) {
      return res.status(400).json({
        message: 'Incorrect username or password',
      });
    }
    const token = await this.authService.login(user);
    return res.status(200).json({
      message: 'User logged in successfully',
      user,
      acces_token: token,
    });
  }

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'User created successfully',
  })
  @ApiResponse({ status: 409, description: 'Username already exist' })
  @ApiBody({
    type: RegisterUserDTO,
    description: 'Json structure for user object',
  })
  async register(
    @Res() res,
    @Body() registerUserDTO: RegisterUserDTO,
  ): Promise<User> {
    const user = await this.authService.registerUser(registerUserDTO);
    return res.status(200).json({
      message: 'User created successfully',
      user,
    });
  }
}
