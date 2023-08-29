import { Review, User } from "../models";
import { response } from "../utils/helper";

export const handler = async (event: any, context: any) => {
    let { vId }: any = event.pathParameters;

    const reviews = await Review.findAll({
        where: { vendor_id: vId },
        include: [
            {
                model: User,
                attributes: [
                    "uuid",
                    "first_name",
                    "second_name",
                    "profile_img",
                    "created_at",
                ],
            },
        ],
    })
        .then((records) => {
            return records;
        })
        .catch((err) => {
            console.log('error', err);
            return [];
        });

    return response(200, reviews);
};
