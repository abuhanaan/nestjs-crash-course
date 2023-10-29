import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  //   Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  //   getUsers(@Query('sortBy') sortBy: string) {
  getUsers() {
    return this.usersService.fetchUsers();
  }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'ade',
        email: 'ade@email.com',
        posts: [
          {
            id: 1,
            title: 'Post 1',
            message: 'Message 1 test',
          },
          {
            id: 2,
            title: 'Post 2',
            message: 'Message 2 test',
          },
        ],
      },
    ];
  }

  @Post('posts')
  createPost(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    return response.status(201).send('Created');
  }

  //  Leveraging on DTO to type-annotate request body
  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return this.usersService.createUser(userData);
    // return {};
  }

  // Working with url parameter
  //   @Get(':id/:postId')
  //   getUserById(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Param('postId') postId: string,
  //   ) {
  //     console.log({ id, postId });
  //     return { id, postId };
  //   }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.fetchUserById(id);
    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    return user;
  }
}
