/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'node:crypto';
import { ICustomer } from '@modules/customers/domain/interfaces/ICustomer';
import { IPagination } from '@shared/interfaces/IPagination';
import { ICreateCustomer } from '@modules/customers/domain/interfaces/ICreateCustomer';
import { IPaginationParams } from '@shared/interfaces/IPaginationParams';
import { ICustomerRepository } from '@modules/customers/domain/interfaces/ICustomerRepository';

export class FakeCustomerRepository implements ICustomerRepository {
  private customers: ICustomer[] = [];

  public async create({
    username,
    email,
  }: ICreateCustomer): Promise<ICustomer> {
    return new Promise((res) => {
      const customer = {
        customer_id: randomUUID(),
        username,
        email,
        created_at: new Date(),
        updated_at: new Date(),
      };

      this.customers.push(customer);

      return res(customer);
    });
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    return new Promise((res) => {
      const customerIndex = this.customers.findIndex(
        (dbCustomer) => dbCustomer.customer_id === customer.customer_id,
      );
      this.customers[customerIndex] = customer;
      return res(customer);
    });
  }

  public async findAll({
    page,
    skip,
    take,
  }: IPaginationParams): Promise<IPagination<ICustomer>> {
    return {
      current_page: page,
      total: this.customers.length,
      per_page: take,
      data: this.customers,
    };
  }

  public async findByUsername(
    username: string,
  ): Promise<ICustomer | undefined> {
    return new Promise((res) =>
      res(this.customers.find((customer) => customer.username === username)),
    );
  }

  public async findById(customerId: string): Promise<ICustomer | undefined> {
    return new Promise((res) =>
      res(
        this.customers.find((customer) => customer.customer_id === customerId),
      ),
    );
  }

  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    return new Promise((res) =>
      res(this.customers.find((customer) => customer.email === email)),
    );
  }

  public async remove(customer: ICustomer): Promise<void> {
    return new Promise((res) => {
      const customerIndex = this.customers.findIndex(
        (c) => c.customer_id === customer.customer_id,
      );
      this.customers.splice(customerIndex, 1);
      res();
    });
  }
}
