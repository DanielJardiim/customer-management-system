import { FastifyReply } from 'fastify';

export const handleError = (error: any, reply: FastifyReply): void => {
  console.error('Error executing query:', error);
  reply.code(500).send('Internal Server Error');
};
