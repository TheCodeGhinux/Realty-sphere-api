import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@user/entities/user.entity';
import { AbstractBaseEntity } from '@/entities/base.entity';
import { AgentProperty } from './agent-property.entity';
import { Transaction } from '@transactions/entities/transaction.entity';
import { Booking } from '@bookings/entities/booking.entity';

@Entity('agents')
export class Agent extends AbstractBaseEntity {
  @Column({ type: 'uuid', unique: true })
  userId: string;

  @Column({})
  licenseNumber: string;

  @Column({ nullable: true })
  agency: string;

  @Column({})
  agentType: string;

  @OneToOne(() => User, user => user.agent)
  user: User;

  @OneToMany(() => AgentProperty, agentProperty => agentProperty.agent)
  agentProperties: AgentProperty[];

  @OneToMany(() => Transaction, transaction => transaction.agent)
  transactions: Transaction[];

  @OneToMany(() => Booking, booking => booking.agent)
  bookings: Booking[];
}
