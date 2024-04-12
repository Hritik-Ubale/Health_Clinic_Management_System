import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async create(appointmentDetails: CreateAppointmentDto): Promise<AppointmentEntity> {
    try {
      const appointment = this.appointmentRepository.save(appointmentDetails);
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async get(id: string): Promise<AppointmentEntity> {
    try {
      const appointment = await this.appointmentRepository.findOne({ where: { id } });
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<AppointmentEntity[]> {
    try {
      const appointments = await this.appointmentRepository.find();
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, appointmentDetails: UpdateAppointmentDto): Promise<UpdateResult> {
    try {
      const updateResult = await this.appointmentRepository.update(
        { id },
        { ...appointmentDetails },
      );
      return updateResult;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const deleteResult = await this.appointmentRepository.softDelete({ id });
      return deleteResult;
    } catch (error) {
      throw error;
    }
  }
}
