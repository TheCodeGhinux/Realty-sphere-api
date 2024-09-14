// import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AbstractBaseEntity } from '@entities/base.entity';

import { UserProfile } from './user-profile.entity';
import { Property } from '@property/entities/property.entity';
import { Agent } from '@agent/entities/agent.entity';
import { Booking } from '@bookings/entities/booking.entity';
import { Transaction } from '@transactions/entities/transaction.entity';
import { Review } from '@reviews/entities/review.entity';

export enum UserType {
  SUPER_ADMIN = 'super-admin',
  ADMIN = 'admin',
  USER = 'vendor',
}

@Entity({ name: 'users' })
export class User extends AbstractBaseEntity {
  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  is_active: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column({ default: UserType.USER })
  role: string;

  @Column({ default: 'active', nullable: true })
  status: string;

  @OneToOne(() => UserProfile, profile => profile.user)
  @JoinColumn()
  profile: UserProfile;

  @OneToMany(() => Property, property => property.owner)
  properties: Property[];

  @OneToOne(() => Agent, agent => agent.user)
  agent: Agent;

  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[];

  @OneToMany(() => Transaction, transaction => transaction.buyer)
  transactionsAsBuyer: Transaction[];

  @OneToMany(() => Transaction, transaction => transaction.seller)
  transactionsAsSeller: Transaction[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  // hashPassword: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
