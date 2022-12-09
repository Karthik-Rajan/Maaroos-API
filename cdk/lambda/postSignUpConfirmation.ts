import { User } from "../models";

export const handler = async (event: any, context: any) => {
  let { phone_number_verified, phone_number, sub } =
    event.request?.userAttributes;

  if (phone_number_verified == "true") {
    let user = await User.create({
      mobile: phone_number,
      status: "ACTIVE",
      uuid: sub,
    });
  }

  context.done(null, event);
};
