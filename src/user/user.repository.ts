import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userDetails: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.userRepository.save(userDetails);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async get(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getDoctorSlots(doctorId: string, date: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: doctorId },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getDoctorAvailibility(doctorId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: doctorId },
        relations: ['appointmentsAsDoctor'],
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, userDetails: UpdateUserDto): Promise<UpdateResult> {
    try {
      const updateResult = await this.userRepository.update(
        { id },
        { ...userDetails },
      );
      return updateResult;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const deleteResult = await this.userRepository.softDelete({ id });
      return deleteResult;
    } catch (error) {
      throw error;
    }
  }
}
