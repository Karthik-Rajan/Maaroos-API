import { response } from "../utils/helper";

export const handler = async (event: any, context: any) => {
    console.log(event)
    console.log(event.body)
    return response(200, {});
};
