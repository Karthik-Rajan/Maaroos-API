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

export const restParams: any = {
  proxy: false,
  deploy: true,
  deployOptions: {
    stageName: "prod",
  },
  //set up CORS
  defaultCorsPreflightOptions: {
    allowHeaders: [
      "Content-Type",
      "X-Amz-Date",
      "Authorization",
      "X-Api-Key",
      "X-Amz-Security-Token",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    allowCredentials: true,
    allowOrigins: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://maaroos-world-web.s3-website.ap-south-1.amazonaws.com",
      "http://web.maaroos.com",
      "https://web.maaroos.com",
    ],
  },
};

export const lambdaProps: any = (lambda: any, role: any) => {
  return {
    runtime: lambda.Runtime.NODEJS_14_X,
    code: lambda.Code.fromAsset("lambda/build"),
    role,
  };
};
