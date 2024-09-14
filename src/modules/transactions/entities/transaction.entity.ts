import { Agent } from '@agent/entities/agent.entity';
import { Property } from '@property/entities/property.entity';
import { User } from '@user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  propertyId: string;

  @Column({ type: 'uuid' })
  buyerId: string;

  @Column({ type: 'uuid' })
  sellerId: string;

  @Column({ type: 'uuid', nullable: true })
  agentId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  transactionDate: Date;

  @Column({ type: 'numeric' })
  amount: number;

  @Column({})
  paymentMethod: string;

  @Column({})
  status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Property, property => property.transactions)
  property: Property;

  @ManyToOne(() => User, user => user.transactionsAsBuyer)
  buyer: User;

  @ManyToOne(() => User, user => user.transactionsAsSeller)
  seller: User;

  @ManyToOne(() => Agent, agent => agent.transactions, { nullable: true })
  agent: Agent;
}
