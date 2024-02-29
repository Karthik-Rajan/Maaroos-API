import { FoodSubscription, Op } from "../models";
import { response } from "../utils/helper";
import moment = require('moment');

export const handler = async (event: any, context: any) => {
  const { sub } = event?.requestContext?.authorizer?.claims;
  let { vId }: any = event.pathParameters;
  let body: any = event.body;
  let { types, from, to } = JSON.parse(body);

  let subscriptionList: any = {};

  let from_date, to_date = {};

  let where: any = {
    user_uuid: sub,
  };

  if (vId && vId != 'all') {
    where = { ...where, vendor_id: vId }
  }

  if (types.length) {
    let typeFilter = {
      [Op.in]: types,
    };
    where = { ...where, type: { ...typeFilter } };
  }

  if (from && to) {
    from_date = {
      [Op.and]: {
        [Op.gte]: from,
      },
    }
    to_date = {
      [Op.and]: {
        [Op.lte]: to,
      },
    }
  }

  if (from_date && to_date) {
    where = {
      ...where,
      from_date,
      to_date
    }
  }

  let events: { [key: string]: any[] } = {};

  await FoodSubscription.findAll({
    where,
  })
    .then((subscriptionList) => {
      if (subscriptionList) {
        subscriptionList.forEach((element: any) => {
          if (!(element.identifier in events)) {
            events[element.identifier] = [];
          }
          const time = element.type === 'BF' ? '09:00:00' : (element.type === 'LN' ? '12:00:00' : '20:00:00')
          const endTime = element.type === 'BF' ? '09:30:00' : (element.type === 'LN' ? '12:30:00' : '20:30:00')
          events[element.identifier].push({
            title: element.type,
            start: moment(element.from_date).format('YYYY-MM-DD ' + time),
            end: moment(element.to_date).format('YYYY-MM-DD ' + endTime),
            allDay: false
          })
        });
      }
    })
  return await response(200, events);
};
