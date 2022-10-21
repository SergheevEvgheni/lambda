import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from "axios";
import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {  
  console.log(event);

  const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${event.body.name}`)
  
  return formatJSONResponse({
    message: response.data.drinks?.map(({ strDrink: name, strInstructions: instruction }) => ({name, instruction})) || "Sosi"
  });
};

export const main = middyfy(hello);
