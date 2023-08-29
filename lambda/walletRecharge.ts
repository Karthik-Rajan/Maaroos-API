import fetch from "node-fetch";
import { Review, User } from "../models";
import { response } from "../utils/helper";
import WalletRecharge from "../models/WalletRecharge";

export const handler = async (event: any) => {
    let body: any = event.body;
    let { customer_id, customer_email, customer_mobile, amount, medium_payment_id, mode, medium } = JSON.parse(body);

    WalletRecharge.create({
        customer_id,
        customer_email,
        customer_mobile,
        amount,
        medium_payment_id,
        mode,
        medium
    });

    return response(200, {});
}