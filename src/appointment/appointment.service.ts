import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { FAILURE_RESPONSE } from 'src/utils/response';
import { ROLE } from 'src/user/user.types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly userService: UserService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const patient = await this.userService.findOne(
        createAppointmentDto.patient,
      );
      const doctor = await this.userService.findOne(
        createAppointmentDto.doctor,
      );
      if (
        !patient ||
        !doctor ||
        !patient.roles.includes(ROLE.PATIENT) ||
        !doctor.roles.includes(ROLE.DOCTOR)
      ) {
        throw new NotFoundException(FAILURE_RESPONSE.DOES_NOT_EXIST);
      }
      const appointment = await this.appointmentRepository.create(
        createAppointmentDto,
      );
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async findOne(appointmentId: string) {
    try {
      const appointment = await this.appointmentRepository.get(appointmentId);
      if (!appointment)
        throw new NotFoundException(FAILURE_RESPONSE.DOES_NOT_EXIST);
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async update(
    appointmentId: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    try {
      const patient = await this.userService.findOne(
        updateAppointmentDto.patient,
      );
      const doctor = await this.userService.findOne(
        updateAppointmentDto.doctor,
      );
      if (
        !patient ||
        !doctor ||
        !patient.roles.includes(ROLE.PATIENT) ||
        !doctor.roles.includes(ROLE.DOCTOR)
      ) {
        throw new NotFoundException(FAILURE_RESPONSE.DOES_NOT_EXIST);
      }
      const updateResult = await this.appointmentRepository.update(
        appointmentId,
        updateAppointmentDto,
      );
      return updateResult;
    } catch (error) {
      throw error;
    }
  }

  async remove(appointmentId: string) {
    try {
      const deleteResult = await this.appointmentRepository.delete(
        appointmentId,
      );
      return deleteResult;
    } catch (error) {
      throw error;
    }
  }
}
