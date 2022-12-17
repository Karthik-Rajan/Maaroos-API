import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { User } from "../models";
import { response } from "../utils/helper";

export const handler = async (event: APIGatewayProxyEventV2, context: any) => {
  // let { userSub }: any = event.pathParameters;

  console.log(event);

  let userSub = "";

  let user: any = {};

  if (userSub) {
    user = await User.findOne({
      where: {
        uuid: userSub,
      },
    });
  }

  return response(200, user);
};
