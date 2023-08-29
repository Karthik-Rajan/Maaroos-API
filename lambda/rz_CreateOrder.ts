import fetch from "node-fetch";
import { Review, User } from "../models";
import { response } from "../utils/helper";

export const handler = async (event: any) => {
    let body: any = event.body;
    let { amount } = JSON.parse(body);
    let order = {};
    let receiptId = 'MA_' + (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2).toString()
    await fetch("https://api.razorpay.com/v1/orders", {
        method: 'POST',
        body: JSON.stringify({ amount, currency: "INR", receipt: receiptId }),
        headers: {
            'Authorization': 'Basic ' + new Buffer('rzp_test_JLOs2SaWEERrUz' + ":" + '4z8H9aF4GTFnUgQvsXuViifK').toString('base64'),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
        .then((res: any) => res.json())
        .then((res: any) => {
            order = res;
        });
    return response(200, order);
}