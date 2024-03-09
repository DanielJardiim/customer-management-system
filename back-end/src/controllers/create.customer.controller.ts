import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCustomerUseCase } from '../usecases/create.customer.usecase';
import { ICustomerProps } from '../interfaces/customer.entity.interface';
import { handleError } from '../errors/customer.error';

export class CreateCustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { name, email, phonenumber, coordinates }: ICustomerProps =
        request.body as ICustomerProps;

      const customer = await this.createCustomerUseCase.execute({
        name,
        email,
        phonenumber,
        coordinates,
      });

      reply.code(201).send(customer);
    } catch (error) {
      handleError(error, reply);
    }
  }
}
