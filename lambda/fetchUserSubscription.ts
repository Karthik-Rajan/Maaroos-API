import { FoodSubscription, Op } from "../models";
import { response } from "../utils/helper";

export const handler = async (event: any, context: any) => {
  console.log(event);
  const { sub } = event?.requestContext?.authorizer?.claims;
  let { vId }: any = event.pathParameters;
  let body: any = event.body;
  let { types, from, to } = JSON.parse(body);

  let subscriptionList: any = {};

  let where: any = {
    user_uuid: sub,
    vendor_id: vId,
  };

  if (types) {
    let typeFilter = {
      [Op.in]: types,
    };
    where = { ...where, types: { ...typeFilter } };
  }

  if (from) {
    where = {
      ...where,
      date: {
        [Op.and]: {
          [Op.gte]: from,
        },
      },
    };
  }

  if (to) {
    where = {
      ...where,
      date: {
        [Op.and]: {
          [Op.lte]: to,
        },
      },
    };
  }

  console.log(where);

  subscriptionList = await FoodSubscription.findAll({
    // attributes: ["id", "date", "types", "user_uuid", "vendor_id"],
    where,
  });

  return response(200, subscriptionList);
};
