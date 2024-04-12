import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { AVAILABILITY, ROLE } from '../user.types';
import { AppointmentEntity } from 'src/appointment/entities/appointment.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column('simple-array')
  roles: ROLE[];

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  department: string;

  @Column({ length: 10, unique : true })
  phoneNumber: string;

  @Column({ nullable: true, type: 'jsonb' })
  availability: AVAILABILITY[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient)
  appointmentsAsPatient: AppointmentEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.doctor)
  appointmentsAsDoctor: AppointmentEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
