import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@ValidatorConstraint({ name: 'differentIds', async: false })
export class DifferentIdsValidator implements ValidatorConstraintInterface {
  validate(dto: any, args: ValidationArguments) {
    const { patient, doctor } = args.object as CreateAppointmentDto;

    if (patient === doctor) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Patient ID and Doctor ID must be different.';
  }
}
