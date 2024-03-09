import { ICustomerProps } from '../interfaces/customer.entity.interface';
import { IUseCase } from '../interfaces/customer.usecase.interface';
import { PostgresqlCustomerRepository } from '../repositories/postgresql.customer.repository';

export class GetByFilterCustomerUseCase
  implements
    IUseCase<{ filterKey: string; filterValue: any }, ICustomerProps[]>
{
  constructor(
    private readonly customerRepository: PostgresqlCustomerRepository
  ) {}

  async execute({
    filterKey,
    filterValue,
  }: {
    filterKey: string;
    filterValue: any;
  }): Promise<ICustomerProps[]> {
    return await this.customerRepository.getByFilter(filterKey, filterValue);
  }
}
