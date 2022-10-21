import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {  
  console.log(event);
  
  return formatJSONResponse({
    message: `Hello ${event.body.name},`
  });
};

export const main = middyfy(hello);
