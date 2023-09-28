import { OrderProduct } from '@modules/orders/infra/typeorm/entities/OrderProduct';
import { IProduct } from '@modules/products/domain/IProduct';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @OneToMany(() => OrderProduct, (order_product) => order_product.product)
  order_products: OrderProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
