import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { User } from "../models";
import { response } from "../utils/helper";

export const handler = async (event: APIGatewayProxyEventV2, context: any) => {
  let userSub = event.pathParameters;

  let user = null;

  if (userSub) {
    user = await User.findOne({
      where: {
        uuid: userSub,
      },
    });
  }

  response(200, user);
};
