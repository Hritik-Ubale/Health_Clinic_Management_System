import { IsDateString, IsEmail, IsNotEmpty, IsOptional, Validate } from "class-validator";
import { AVAILABILITY, ROLE } from "../user.types";
import { RoleFieldsValidator } from "../user.validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Validate(RoleFieldsValidator)
    roles: ROLE[];

    @IsNotEmpty()
    @IsDateString()
    dateOfBirth: Date;

    @IsOptional()
    department?: string;

    @IsNotEmpty()
    phoneNumber: string;
    
    @IsOptional()
    availability?: AVAILABILITY[];
}
