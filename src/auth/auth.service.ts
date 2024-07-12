import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/user.schema';
import { RegisterUserDTO } from 'src/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerUserDTO: RegisterUserDTO): Promise<User> {
    const { username, password, email } = registerUserDTO;

    const salt = await bcrypt.genSalt();

    const userExist = await this.userService.findOne(username);

    if (userExist) {
      throw new ConflictException('Username already exist');
    }

    const user = new this.userModel(registerUserDTO);

    user.username = username;
    user.email = email;
    user.password = await this.hashPassword(password, salt);

    return await user.save();
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password.toString(), salt);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const passwordValid = await bcrypt.compare(pass.toString(), user.password);

    if (!passwordValid || !user) {
      return null;
    } else if (!user.status) {
      throw new ConflictException('User Blocked');
    } else {
      return user.toJSON();
    }
  }

  async login(user: UserSchema) {
    const payload = {
      sub: user._id,
      username: user.username,
    };

    return this.jwtService.sign(payload);
  }
}
