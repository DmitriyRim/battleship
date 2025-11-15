import { Operation } from '../types';

export const parseStringToJson = (request: string) => {
  const requestData = JSON.parse(request);
  const result = { ...requestData, data: JSON.parse(requestData.data) };

  console.log('received (<-):', result);

  return result;
};

export const parseJsonToString = <T>(type: Operation, data: T): string => {
  const result = {
    type,
    data,
    id: 0,
  };

  console.log('shipped (->):', result);

  return JSON.stringify(result);
};
