import { response } from "../utils/helper";
import WalletRecharge from "../models/WalletRecharge";

export const handler = async (event: any, context: any) => {
    const { sub } = event?.requestContext?.authorizer?.claims;

    const recharges = await WalletRecharge.findAll({
        where: {
            customer_uuid: sub,
        },
        order: [["id", "DESC"]],
        limit: 20
    })
        .then((records) => {
            return records;
        })
        .catch((err) => {
            console.log('error', err);
            return [];
        });

    return response(200, recharges);
};
