import { ICustomerProps } from '../interfaces/customer.entity.interface';
import { IUseCase } from '../interfaces/customer.usecase.interface';
import { PostgresqlCustomerRepository } from '../repositories/postgresql.customer.repository';

export class GetAllCustomerUseCase implements IUseCase<null, ICustomerProps[]> {
  constructor(
    private readonly customerRepository: PostgresqlCustomerRepository
  ) {}

  async execute(): Promise<ICustomerProps[]> {
    return await this.customerRepository.getAll();
  }
}
