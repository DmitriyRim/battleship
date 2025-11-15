export const parseStringToJson = (request: string) => {
  const data = JSON.parse(request);
  return {...data, data: JSON.parse(data.data)};
};
