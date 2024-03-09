import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteCustomerUseCase } from '../usecases/delete.customer.usecase';
import { handleError } from '../errors/customer.error';
import { IDeleteCustomerRequest } from '../interfaces/customer.usecase.interface';

export class DeleteCustomerController {
  constructor(private readonly deleteCustomerUseCase: DeleteCustomerUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id }: IDeleteCustomerRequest =
        request.query as IDeleteCustomerRequest;

      const result = await this.deleteCustomerUseCase.execute({ id });

      reply.code(200).send(result);
    } catch (error) {
      handleError(error, reply);
    }
  }
}
