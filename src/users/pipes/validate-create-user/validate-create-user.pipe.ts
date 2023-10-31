import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateUserpipe');
    console.log(value);
    console.log(metadata);

    const parseAgeToInt = parseInt(value.age.toString());
    if (isNaN(parseAgeToInt)) {
      console.log(`${parseAgeToInt} is not a number`);
      throw new HttpException(
        'Invalid Data Type For Property Age. Expected a number',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      console.log(`${parseAgeToInt} is a number`);
      return { ...value, age: parseAgeToInt };
    }
  }
}
