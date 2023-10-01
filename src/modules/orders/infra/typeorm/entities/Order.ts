import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IOrder } from '@modules/orders/domain/interfaces/IOrder';
import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { OrderProduct } from './OrderProduct';

@Entity('order')
export class Order implements IOrder {
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
