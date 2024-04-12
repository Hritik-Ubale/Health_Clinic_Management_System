import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ResponseHandler } from 'src/utils/response-handler';
import { SUCCESS_RESPONSE } from 'src/utils/response';

@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly responseHandler: ResponseHandler,
  ) {}

  @Post('/')
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    try {
      const result = await this.appointmentService.create(createAppointmentDto);
      return this.responseHandler.success(
        result,
        SUCCESS_RESPONSE.CREATED_SUCCESSFULLY,
      );
    } catch (error) {
      return this.responseHandler.error(error);
    }
  }

  @Get('/cancel/:id')
  async cancelAppointment(@Param('id') id: string) {
    try {
      const result = await this.appointmentService.remove(id);
      return this.responseHandler.success(result, SUCCESS_RESPONSE.SUCCESS);
    } catch (error) {
      return this.responseHandler.error(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    try {
      const result = await this.appointmentService.update(
        id,
        updateAppointmentDto,
      );
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
      const result = await this.appointmentService.remove(id);
      return this.responseHandler.success(
        result,
        SUCCESS_RESPONSE.DELETED_SUCCESSFULLY,
      );
    } catch (error) {
      return this.responseHandler.error(error);
    }
  }
}
