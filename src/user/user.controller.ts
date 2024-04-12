import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseHandler } from 'src/utils/response-handler';
import { SUCCESS_RESPONSE } from 'src/utils/response';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseHandler: ResponseHandler,
  ) {}

  @Post('/')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(createUserDto);
      return this.responseHandler.success(
        result,
        SUCCESS_RESPONSE.CREATED_SUCCESSFULLY,
      );
    } catch (error) {
      return this.responseHandler.error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.userService.findOne(id);
      return this.responseHandler.success(result, SUCCESS_RESPONSE.SUCCESS);
    } catch (error) {
      return this.responseHandler.error(error);
    }
  }

  @Get(':doctorId/slots/:date')
  async getDoctorSlots(
    @Param('doctorId') doctorId: string,
    @Param('date') date: string,
  ) {
    try {
      const result = await this.userService.getDoctorSlots(doctorId, date);
      return this.responseHandler.success(result, SUCCESS_RESPONSE.SUCCESS);
    } catch (error) {
      return this.responseHandler.error(error);
    }
  }

  @Get('availibility/:doctorId')
  async getDoctorAvailibility(@Param('doctorId') doctorId: string) {
    try {
      const result = await this.userService.getDoctorAvailibility(doctorId);
      return this.responseHandler.success(result, SUCCESS_RESPONSE.SUCCESS);
    } catch (error) {
      return this.responseHandler.error(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userService.update(id, updateUserDto);
      return this.responseHandler.success(
        result,
        SUCCESS_RESPONSE.UPDATED_SUCCESSFULLY,
      );
    } catch (error) {
      return this.responseHandler.error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.userService.remove(id);
      return this.responseHandler.success(
        result,
        SUCCESS_RESPONSE.DELETED_SUCCESSFULLY,
      );
    } catch (error) {
      return this.responseHandler.error(error);
    }
  }
}
