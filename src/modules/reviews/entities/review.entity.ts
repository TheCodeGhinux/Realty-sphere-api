import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { AbstractBaseEntity } from '@/entities/base.entity';
import { Property } from '@property/entities/property.entity';
import { User } from '@user/entities/user.entity';

@Entity('reviews')
export class Review extends AbstractBaseEntity {
  @Column({ type: 'uuid' })
  propertyId: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => Property, property => property.reviews)
  property: Property;

  @ManyToOne(() => User, user => user.reviews)
  user: User;
}
