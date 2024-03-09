import { ICustomerProps } from '../interfaces/customer.entity.interface';
import { IUseCase } from '../interfaces/customer.usecase.interface';
import { PostgresqlCustomerRepository } from '../repositories/postgresql.customer.repository';

export class CalculateOptimalRouteCustomerUseCase
  implements IUseCase<null, ICustomerProps[]>
{
  constructor(
    private readonly customerRepository: PostgresqlCustomerRepository
  ) {}

  async execute(): Promise<ICustomerProps[]> {
    const customers = await this.fetchCustomerFromDatabase();
    const visitOrder = this.calculateOptimalRoute(customers);
    return visitOrder;
  }

  private async fetchCustomerFromDatabase(): Promise<ICustomerProps[]> {
    return await this.customerRepository.getAll();
  }

  private calculateOptimalRoute(customers: ICustomerProps[]): ICustomerProps[] {
    const dist = (
      p1: { x: number; y: number },
      p2: { x: number; y: number }
    ): number => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

    const numberOfCustomers = customers.length;
    const visited = Array(numberOfCustomers).fill(false);
    const visitOrder: ICustomerProps[] = [];

    let current = 0;
    visited[current] = true;

    for (let i = 0; i < numberOfCustomers - 1; i++) {
      let next = null;
      let shortestDistance = Number.MAX_VALUE;

      for (let j = 0; j < numberOfCustomers; j++) {
        if (!visited[j] && j !== current) {
          const distance = dist(
            customers[current].coordinates,
            customers[j].coordinates
          );
          if (distance < shortestDistance) {
            shortestDistance = distance;
            next = j;
          }
        }
      }

      if (next !== null) {
        visitOrder.push(customers[next]);
        visited[next] = true;
        current = next;
      }
    }

    visitOrder.push(customers[0]);

    return visitOrder;
  }
}
