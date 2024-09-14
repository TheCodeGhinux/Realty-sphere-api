import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Agent } from './agent.entity';
import { Property } from '@property/entities/property.entity';

@Entity('agent_properties')
export class AgentProperty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  agentId: string;

  @Column({ type: 'uuid' })
  propertyId: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'text', nullable: true })
  note: string;

  @ManyToOne(() => Agent, agent => agent.agentProperties)
  agent: Agent;

  @ManyToOne(() => Property, property => property.agentProperties)
  property: Property;
}
