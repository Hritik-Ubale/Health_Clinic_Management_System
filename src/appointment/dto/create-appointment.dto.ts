import { IsNotEmpty, IsUUID, Validate } from 'class-validator';
import { AVAILABILITY } from 'src/user/user.types';
import { DifferentIdsValidator } from '../appointment.validation';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsUUID()
  @Validate(DifferentIdsValidator)
  patient: string;

  @IsNotEmpty()
  @IsUUID()
  doctor: string;

  @IsNotEmpty()
  preferredSlot: AVAILABILITY;
}