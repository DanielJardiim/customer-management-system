import { FastifyReply, FastifyRequest } from 'fastify';
import { GetByFilterCustomerUseCase } from '../usecases/getByFilter.customer.usecase';
import { handleError } from '../errors/customer.error';

export class GetByFilterCustomerController {
  constructor(
    private readonly getByFilterCustomerUseCase: GetByFilterCustomerUseCase
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const {
        filterKey,
        filterValue,
      }: { filterKey: string; filterValue: any } = request.query as {
        filterKey: string;
        filterValue: any;
      };

      if (!filterKey || !filterValue) {
        return reply
          .code(400)
          .send('Bad Request: Filter key and value are required.');
      }

      const customers = await this.getByFilterCustomerUseCase.execute({
        filterKey,
        filterValue,
      });

      reply.code(200).send(customers);
    } catch (error) {
      handleError(error, reply);
    }
  }
}
