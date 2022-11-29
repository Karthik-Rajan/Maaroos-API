export const response = (code: number, result: any) => {
  return {
    statusCode: code,
    body: JSON.stringify(result ? result : {}),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
};
