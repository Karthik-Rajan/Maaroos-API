import { User } from "../models";
import { response } from "../utils/helper";

export const handler = async (event: any, context: any) => {
  const { sub } = event?.requestContext?.authorizer?.claims;
  let { firstName, lastName, emailId } = JSON.parse(event.body);
  let user: any = {};

  user = await User.update({ first_name : firstName, second_name : lastName, email : emailId }, { where : {
    uuid : sub
  }});

  return response(200, user);
};