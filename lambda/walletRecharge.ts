import fetch from "node-fetch";
import { Review, User } from "../models";
import { response } from "../utils/helper";
import WalletRecharge from "../models/WalletRecharge";

export const handler = async (event: any) => {
    let body: any = event.body;
    const { sub } = event?.requestContext?.authorizer?.claims;
    let { customer_email, customer_mobile, amount, medium_payment_id, mode, medium } = JSON.parse(body);

    const user = await User.findOne({
        where: {
            uuid: sub
        }
    });

    console.log({
        customer_uuid: sub,
        customer_email,
        customer_mobile,
        amount,
        medium_payment_id,
        mode,
        medium
    });

    if (mode === 'CREDIT' && amount) {
        await user?.increment('wallet_balance', { by: parseFloat(amount) }).then(() => {

        })
        await WalletRecharge.create({
            customer_uuid: sub,
            customer_email,
            customer_mobile,
            amount,
            medium_payment_id,
            mode,
            medium,
            status: 'INITIATED'
        }).then((res) => console.log(res))
    }

    return response(200, {});
}