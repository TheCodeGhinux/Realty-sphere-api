import { string } from 'joi';
import { User } from '@user/entities/user.entity';
import { UserProfile } from '../../entities/user-profile.entity';
import { Agent } from '@agent/entities/agent.entity';

export const mockUser: User = {
  id: 'user1',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  password: 'hashedpassword',
  phone: '1234567890',
  is_active: true,
  status: 'active',
  created_at: new Date(),
  updated_at: new Date(),
  role: '',
  profile: new UserProfile(),
  properties: [],
  agent: new Agent(),
  bookings: [],
  transactionsAsBuyer: [],
  transactionsAsSeller: [],
  reviews: [],
  hashPassword: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};
