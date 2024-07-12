import { Document } from 'mongoose';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  status: boolean;
  createdAt: Date;
}

export class LoginUserDTO {
  @ApiProperty({
    example: 'admin@gmail.com',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456789',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'The min length of password is 8 characters' })
  @MaxLength(30, { message: 'The max length of password is 30 characters' })
  password: string;
}

export class RegisterUserDTO {
  @ApiProperty({
    example: 'admin123456',
    required: true,
  })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(8, { message: 'The min length of username is 8 characters' })
  @MaxLength(15, { message: 'The max length of username is 15 characters' })
  username: string;

  @ApiProperty({
    example: '123456789',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'The min length of password is 8 characters' })
  @MaxLength(30, { message: 'The max length of password is 30 characters' })
  password: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;
}

export class UserIDDTO {
  @ApiProperty({
    example: '6690ddb69350359e504b915f',
    required: true,
  })
  @IsNotEmpty({ message: 'userID is required' })
  @Length(24, 24, { message: 'The length of userID is 24 characters' })
  userID: string;
}

export class UpdateUserDTO {
  @ApiProperty({
    example: 'admin123456',
    required: false,
  })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(8, { message: 'The min length of username is 8 characters' })
  @MaxLength(15, { message: 'The max length of username is 15 characters' })
  username: string;

  @ApiProperty({
    example: '123456789',
    required: false,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'The min length of password is 8 characters' })
  @MaxLength(30, { message: 'The max length of password is 30 characters' })
  password: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    required: false,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsNotEmpty({ message: 'Status is required' })
  @IsBoolean()
  status: boolean;
}
