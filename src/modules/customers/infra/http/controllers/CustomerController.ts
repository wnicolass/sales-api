import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListCustomerService } from '../../../services/ListCustomerService';
import { ShowCustomerService } from '../../../services/ShowCustomerService';
import { CreateCustomerService } from '../../../services/CreateCustomerService';
import { UpdateCustomerService } from '../../../services/UpdateCustomerService';
import { DeleteCustomerService } from '../../../services/DeleteCustomerService';

export class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, limit } = request.query;
    const listCustomers = container.resolve(ListCustomerService);
    const customers = await listCustomers.execute({
      page: page ? +page : 1,
      limit: limit ? +limit : 15,
    });

    return response.status(200).json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { customerId } = request.params;
    const showCustomer = container.resolve(ShowCustomerService);
    const customer = await showCustomer.execute({ customerId });

    return response.status(200).json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { username, email } = request.body;
    const createCustomer = container.resolve(CreateCustomerService);
    const newCustomer = await createCustomer.execute({ username, email });

    return response.status(201).json(newCustomer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { username, email } = request.body;
    const { customerId } = request.params;
    const updateCustomer = container.resolve(UpdateCustomerService);
    const customer = await updateCustomer.execute({
      customerId,
      username,
      email,
    });

    return response.status(200).json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { customerId } = request.params;
    const deleteCustomer = container.resolve(DeleteCustomerService);
    await deleteCustomer.execute({ customerId });

    return response.status(200).json([]);
  }
}
