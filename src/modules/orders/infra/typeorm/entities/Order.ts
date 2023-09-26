import { Customer } from '@modules/customers/typeorm/entities/Customer';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderProduct } from './OrderProduct';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrderProduct, (order_product) => order_product.order, {
    cascade: true,
  })
  order_products: OrderProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
