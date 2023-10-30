import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';

@Catch()
export class AuthFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    host
      .switchToHttp()
      .getResponse()
      .redirect('http://localhost:8000/auth/registration');
  }
}
