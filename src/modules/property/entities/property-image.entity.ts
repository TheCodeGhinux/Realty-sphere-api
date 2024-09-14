import { AbstractBaseEntity } from '@/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Property } from './property.entity';

@Entity('property_images')
export class PropertyImage extends AbstractBaseEntity {
  @Column({ type: 'uuid' })
  propertyId: string;

  @Column({})
  imageUrl: string;

  @ManyToOne(() => Property, property => property.images)
  property: Property;
}
