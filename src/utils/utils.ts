import { Operation } from '../types';

export const parseStringToJson = (request: string) => {
  const requestData = JSON.parse(request, (key, value) => {
    if (key === 'data' && value) {
      return JSON.parse(value);
    }
    return value;
  });

  console.log('received (<-):', requestData);

  return requestData;
};

export const parseJsonToString = <T>(type: Operation, data: T): string => {
  const result = {
    type,
    data: JSON.stringify(data),
    id: 0,
  };

  console.log('shipped (->):', result);

  return JSON.stringify(result);
};
