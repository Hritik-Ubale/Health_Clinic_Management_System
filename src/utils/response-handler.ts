import { Injectable } from '@nestjs/common';
import { SUCCESS_RESPONSE } from './response';

@Injectable()
export class ResponseHandler {
  success(data: any, message?: string, statusCode: number = 200) {
    return {
      message: message || SUCCESS_RESPONSE.SUCCESS,
      data,
      statusCode,
    };
  }

  error(error: any, message?: string, statusCode: number = 500) {
    return {
      error,
      message: message || 'Internal Server Error',
      statusCode,
    };
  }
}
