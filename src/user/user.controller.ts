import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserResponse } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './decorators/user.decorator';
import { UserGuard } from './user.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    return await this.userService.createUser(createUserDto);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUserDto: LoginUserDto): Promise<IUserResponse> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.generateUserResponse(user);
  }

  @Put('user')
  @UseGuards(UserGuard)
  async updateUser(@User('id') userId : number, @Body('user') updateUserDto: UpdateUserDto) :  Promise<IUserResponse>{
    const user = await this.userService.updateUser(userId, updateUserDto);
    return this.userService.generateUserResponse(user);
  }

  @Get('user')
  @UseGuards(UserGuard)
  async getCurrentUser(@User() user) : Promise<IUserResponse>{
    return this.userService.generateUserResponse(user);
  }
}
