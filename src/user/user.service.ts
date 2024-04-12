import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { FAILURE_RESPONSE } from 'src/utils/response';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(createUserDto);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(userId: string) {
    try {
      const user = await this.userRepository.get(userId);
      if (!user) throw new NotFoundException(FAILURE_RESPONSE.DOES_NOT_EXIST);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getDoctorSlots(doctorId: string, date: string) {
    try {
      const user = await this.userRepository.getDoctorSlots(doctorId, date);
      if (!user) throw new NotFoundException(FAILURE_RESPONSE.DOES_NOT_EXIST);
      return user.availability.filter((slot) => slot.date === date);
    } catch (error) {
      throw error;
    }
  }

  async getDoctorAvailibility(doctorId: string) {
    try {
      const user = await this.userRepository.getDoctorAvailibility(doctorId);
      if (!user) throw new NotFoundException(FAILURE_RESPONSE.DOES_NOT_EXIST);

      const bookedSlots = new Set<string>();

      user.appointmentsAsDoctor.forEach((appointment) => {
        const key = `${appointment.preferredSlot.date}-${appointment.preferredSlot.start}-${appointment.preferredSlot.end}`;
        bookedSlots.add(key);
      });

      const availableSlots = user.availability.filter((slot) => {
        const key = `${slot.date}-${slot.start}-${slot.end}`;
        return !bookedSlots.has(key);
      });

      return availableSlots;
    } catch (error) {
      throw error;
    }
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    try {
      const updateResult = await this.userRepository.update(
        userId,
        updateUserDto,
      );
      return updateResult;
    } catch (error) {
      throw error;
    }
  }

  async remove(userId: string) {
    try {
      const deleteResult = await this.userRepository.delete(userId);
      return deleteResult;
    } catch (error) {
      throw error;
    }
  }
}
