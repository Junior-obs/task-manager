import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

type Constructable = new (...args: unknown[]) => unknown;

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype as Constructable, value);
    const errors = await validate(object as object);

    if (errors.length > 0) {
      const messages = errors.map((err) =>
        Object.values(err.constraints || {}).join(', '),
      );
      throw new BadRequestException({
        statusCode: 400,
        message: 'Erreur de validation',
        errors: messages,
      });
    }

    return object;
  }

  private toValidate(metatype: Constructable): boolean {
    const types: Constructable[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
