import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import Vendor from "../models/Vendor";

export const handler = async (event: APIGatewayProxyEventV2, context: any) => {
  let records: any = [];
  const vendors = await Vendor.findAll()
    .then((records) => {
      return records;
    })
    .catch((err) => {
      return [];
    });

  return {
    statusCode: 200,
    body: JSON.stringify(vendors),
  };
};
