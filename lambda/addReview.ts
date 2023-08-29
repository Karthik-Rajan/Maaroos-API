import { FoodSubscription, Op } from "../models";
import Review from "../models/Review";
import { response } from "../utils/helper";

export const handler = async (event: any, context: any) => {
    const { sub } = event?.requestContext?.authorizer?.claims;
    let { vId }: any = event.pathParameters;
    let body: any = event.body;
    let { rating, comment } = JSON.parse(body);
    await Review.findOrCreate(
        {
            where: {
                user_uuid: sub,
                vendor_id: vId,
                rating,
                comment,
                status: "ACTIVE"
            }
        }
    );

    return response(200, {});
};
