import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('sortBy') sortBy: string) {
    console.log(sortBy);
    return [{ username: 'ade', email: 'ade@email.com' }];
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
    return {};
  }

  // Working with url parameter
  @Get(':id/:postId')
  getUserById(
    @Param('id', ParseIntPipe) id: number,
    @Param('postId') postId: string,
  ) {
    console.log({ id, postId });
    return { id, postId };
  }
}
