import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { AVAILABILITY, ROLE } from './user.types';

@ValidatorConstraint({ name: 'roleFields', async: false })
export class RoleFieldsValidator implements ValidatorConstraintInterface {
  validate(roles: string[], args: ValidationArguments) {
    const { object } = args;

    const isDoctor = roles.includes(ROLE.DOCTOR);

    if (isDoctor) {
      const { department, availability } = object as {
        department: string;
        availability: any;
      };

      if (!department) {
        return false;
      }

      if (!availability || !this.isValidAvailability(availability)) {
        return false;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Please provide correct department and availibility.';
  }

  private isValidAvailability(availability: AVAILABILITY[]): boolean {
    if (!Array.isArray(availability)) {
      return false;
    }

    for (const item of availability) {
      if (
        typeof item !== 'object' ||
        !('date' in item) ||
        typeof item.date !== 'string' ||
        !('start' in item) ||
        typeof item.start !== 'string' ||
        !('end' in item) ||
        typeof item.end !== 'string'
      ) {
        return false;
      }
    }
    return true;
  }
}
