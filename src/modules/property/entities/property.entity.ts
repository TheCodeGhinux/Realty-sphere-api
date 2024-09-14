import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbstractBaseEntity } from '@/entities/base.entity';
import { User } from '@user/entities/user.entity';
import { AgentProperty } from '@agent/entities/agent-property.entity';
import { PropertyImage } from './property-image.entity';
import { PropertyFeature } from './property-feature.entity';
import { Booking } from '@bookings/entities/booking.entity';
import { Transaction } from '@transactions/entities/transaction.entity';
import { Review } from '@reviews/entities/review.entity';

export enum PropertyStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  PENDING = 'pending',
}

export enum ListingType {
  RENT = 'rent',
  SALE = 'sale',
}

export enum PropertyType {
  HOUSE = 'house',
  APARTMENT = 'apartment',
  COMMERCIAL = 'commercial',
}

@Entity('properties')
export class Property extends AbstractBaseEntity {
  @Column({})
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: string;

  @Column({})
  address: string;

  @Column({})
  city: string;

  @Column({})
  state: string;

  @Column({})
  country: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ type: 'enum', enum: PropertyType })
  propertyType: PropertyType;

  @Column()
  size: string;

  @Column({ nullable: true })
  bedrooms: number;

  @Column({ nullable: true })
  bathrooms: number;

  @Column({ type: 'enum', enum: PropertyStatus, default: PropertyStatus.AVAILABLE })
  status: PropertyStatus;

  @Column({ type: 'enum', enum: ListingType })
  listingType: ListingType;

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
