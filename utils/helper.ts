import * as path from "path";
import { Md5 } from "ts-md5";

export const response = (code: number, result: any, hash: object = {}) => {
  let headers = {};

  if (hash) {
    headers = { ETag: Md5.hashStr(JSON.stringify(hash)) };
  }

  return {
    statusCode: code,
    body: JSON.stringify(result ? result : {}),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Cache-Control": `max-age=31536000, no-cache`,
      Vary: "ETag, Content-Encoding",
      ...headers,
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
      "http://web.maaroos.com",
      "https://web.maaroos.com",
      "https://d3bqu2570uacxq.cloudfront.net",
      "http://web.maaroos.com.s3.ap-south-1.amazonaws.com"
    ],
  },
};

export const lambdaFuncProps: any = (lambda: any, role: any) => {
  return {
    runtime: lambda.Runtime.NODEJS_14_X,
    code: lambda.Code.fromAsset("lambda/build"),
    role,
  };
};

export const lambdaProps: any = (fileName: string, role: any) => {
  return {
    entry: path.join(__dirname + "/../lambda/", fileName),
    role,
  };
};