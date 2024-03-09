import { ICustomerProps } from '../interfaces/customer.entity.interface';
import { IUseCase } from '../interfaces/customer.usecase.interface';
import { PostgresqlCustomerRepository } from '../repositories/postgresql.customer.repository';

export class CreateCustomerUseCase
  implements IUseCase<ICustomerProps, ICustomerProps>
{
  constructor(
    private readonly customerRepository: PostgresqlCustomerRepository
  ) {}

  async execute({
    name,
    email,
    phonenumber,
    coordinates,
  }: ICustomerProps): Promise<ICustomerProps> {
    return await this.customerRepository.create({
      name,
      email,
      phonenumber,
      coordinates,
    });
  }
}
