import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { AbstractBaseEntity } from '@/entities/base.entity';

@Entity('user_profiles')
export class UserProfile extends AbstractBaseEntity {
  @Column({ type: 'uuid', unique: true })
  userId: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @OneToOne(() => User, user => user.profile)
  user: User;
}
