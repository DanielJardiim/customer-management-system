import {
  IDeleteCustomerRequest,
  IUseCase,
} from '../interfaces/customer.usecase.interface';
import { PostgresqlCustomerRepository } from '../repositories/postgresql.customer.repository';

export class DeleteCustomerUseCase
  implements IUseCase<IDeleteCustomerRequest, string>
{
  constructor(
    private readonly customerRepository: PostgresqlCustomerRepository
  ) {}

  async execute({ id }: IDeleteCustomerRequest): Promise<string> {
    const customerExists = await this.customerRepository.getByFilter('id', id);

    if (customerExists.length === 0) {
      throw new Error('Customer not found.');
    }

    await this.customerRepository.delete(id);
    return 'Customer deleted successfully.';
  }
}
