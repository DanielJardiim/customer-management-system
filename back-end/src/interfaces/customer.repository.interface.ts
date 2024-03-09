import { ICustomerProps } from './customer.entity.interface';

export interface ICustomerRepository {
  create(customer: ICustomerProps): Promise<ICustomerProps>;
  getAll(): Promise<ICustomerProps[]>;
  getByFilter(filterkey: string, filtervalue: any): Promise<ICustomerProps[]>;
  delete(id: number): Promise<void>;
}
