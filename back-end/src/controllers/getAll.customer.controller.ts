import { FastifyReply, FastifyRequest } from 'fastify';
import { GetAllCustomerUseCase } from '../usecases/getAll.customer.usecase';
import { handleError } from '../errors/customer.error';

export class GetAllCustomerController {
  constructor(private readonly getAllCustomerUseCase: GetAllCustomerUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const customers = await this.getAllCustomerUseCase.execute();

      reply.code(200).send(customers);
    } catch (error) {
      handleError(error, reply);
    }
  }
}
