import { ResponseError } from 'umi-request';

export const errorHandler = (error: ResponseError) => {
  const { response } = error;
  const responseOrganization = {
    response
  };
  return responseOrganization;
};
