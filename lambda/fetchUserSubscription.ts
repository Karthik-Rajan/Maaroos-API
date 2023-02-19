import { FoodSubscription, Op } from "../models";
import { response } from "../utils/helper";
import moment from 'moment';

export const handler = async (event: any, context: any) => {
  const { sub } = event?.requestContext?.authorizer?.claims;
  let { vId }: any = event.pathParameters;
  let body: any = event.body;
  let { types, from, to } = JSON.parse(body);

  let subscriptionList: any = {};

  let date = {};

  let where: any = {
    user_uuid: sub,
    vendor_id: vId,
  };

  if (types.length) {
    let typeFilter = {
      [Op.in]: types,
    };
    where = { ...where, types: { ...typeFilter } };
  }

  if (from && to) {
    date = {
      [Op.and]: {
        [Op.gte]: from,
        [Op.lte]: to,
      },
    }
  }

  if (date) {
    where = {
      ...where,
      date
    }
  }

  subscriptionList = await FoodSubscription.findAll({
    // attributes: ["id", "date", "types", "user_uuid", "vendor_id"],
    where,
  });

  const events: any = [];

  if (subscriptionList) {
    subscriptionList.forEach((element: any) => {
      const time = element.types === 'BF' ? '09:00:00' : (element.types === 'LN' ? '12:00:00' : '20:00:00')
      events.push({
        id: element.id,
        title: element.types,
        date: moment(element.date).format('YYYY-MM-DD ' + time),
        /*end: moment(element.date).add(60, 'minutes').format('YYYY-MM-DD HH:mm:ss'),*/
      });
    });
  }

  return response(200, events);
};
