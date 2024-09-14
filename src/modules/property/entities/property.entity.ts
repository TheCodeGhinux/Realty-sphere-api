import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbstractBaseEntity } from '@/entities/base.entity';
import { User } from '@user/entities/user.entity';
import { AgentProperty } from '@agent/entities/agent-property.entity';
import { PropertyImage } from './property-image.entity';
import { PropertyFeature } from './property-feature.entity';
import { Booking } from '@bookings/entities/booking.entity';
import { Transaction } from '@transactions/entities/transaction.entity';
import { Review } from '@reviews/entities/review.entity';

@Entity('properties')
export class Property extends AbstractBaseEntity {
  @Column({ type: 'uuid' })
  ownerId: string;

  @Column({})
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({})
  address: string;

  @Column({})
  city: string;

  @Column({})
  state: string;

  @Column({})
  zipCode: string;

  @Column({})
  propertyType: string;

  @Column({ type: 'numeric' })
  size: number;

  @Column({ type: 'int', nullable: true })
  bedrooms: number;

  @Column({ type: 'int', nullable: true })
  bathrooms: number;

  @Column({})
  status: string;

  @Column({})
  listingType: string;

  @ManyToOne(() => User, user => user.properties)
  owner: User;

  @OneToMany(() => PropertyImage, image => image.property)
  images: PropertyImage[];

  @OneToMany(() => PropertyFeature, feature => feature.property)
  features: PropertyFeature[];

  @OneToMany(() => Booking, booking => booking.property)
  bookings: Booking[];

  @OneToMany(() => Transaction, transaction => transaction.property)
  transactions: Transaction[];

  @OneToMany(() => Review, (review: Review) => review.property)
  reviews: Review[];

  @OneToMany(() => AgentProperty, agentProperty => agentProperty.property)
  agentProperties: AgentProperty[];
}
