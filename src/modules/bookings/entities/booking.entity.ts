import { Agent } from '@agent/entities/agent.entity';
import { Property } from '@property/entities/property.entity';
import { User } from '@user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  propertyId: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid', nullable: true })
  agentId: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({})
  status: string;

  @ManyToOne(() => Property, property => property.bookings)
  property: Property;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @ManyToOne(() => Agent, agent => agent.bookings, { nullable: true })
  agent: Agent;
}
