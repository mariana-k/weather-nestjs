import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column({
    type: 'enum',
    enum: ['hourly', 'daily'],
  })
  frequency: 'hourly' | 'daily';

  @Column({ default: false })
  confirmed: boolean;

  @Column({ nullable: true })
  confirmationToken: string;

  @Column({ nullable: true })
  unsubscribeToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 