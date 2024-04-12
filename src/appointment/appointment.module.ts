import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment.repository';
import { ResponseHandler } from 'src/utils/response-handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity]),UserModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository, ResponseHandler,UserService],
})
export class AppointmentModule {}
