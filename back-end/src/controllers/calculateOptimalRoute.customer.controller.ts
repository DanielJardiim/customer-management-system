import { FastifyReply, FastifyRequest } from 'fastify';
import { CalculateOptimalRouteCustomerUseCase } from '../usecases/calculateOptimalRoute.customer.usecase';
import { handleError } from '../errors/customer.error';

export class CalculateOptimalRouteCustomerController {
  constructor(
    private readonly calculateOptimalRouteCustomerUseCase: CalculateOptimalRouteCustomerUseCase
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const optimalRoute =
        await this.calculateOptimalRouteCustomerUseCase.execute();

      reply.code(200).send(optimalRoute);
    } catch (error) {
      handleError(error, reply);
    }
  }
}
