import moment = require("moment");
import { FoodSubscription, Op } from "../models";
import { response } from "../utils/helper";

export const handler = async (event: any, context: any) => {
    const { sub } = event?.requestContext?.authorizer?.claims;
    let { vId }: any = event.pathParameters;
    let body: any = event.body;
    let { foodTypes, fromDate, toDate } = JSON.parse(body);

    if (fromDate && toDate && foodTypes) {
        let identifier = moment().toDate().getTime().toString()
        let schedules: any = [];
        foodTypes.forEach((type: string) => {
            schedules.push({
                identifier,
                user_uuid: sub,
                vendor_id: vId,
                from_date: fromDate,
                to_date: toDate,
                type
            });
        })
        await FoodSubscription.bulkCreate(schedules, {
            ignoreDuplicates: true,
        });
    }
    else {
        return response(400, { message: `Request is not formed well` });
    }

    return response(200, {});
};
