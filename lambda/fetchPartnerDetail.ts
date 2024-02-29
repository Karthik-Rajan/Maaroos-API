import { APIGatewayProxyEventV2 } from "aws-lambda";
import { Vendor, Review, User } from "../models";
import { response } from "../utils/helper";
import { Sequelize } from "sequelize";

export const handler = async (event: any, context: any) => {
  let { vId }: any = event.pathParameters;
  let { userId }: any = event.queryStringParameters;
  const sub = event?.requestContext?.authorizer?.claims.sub;
  let isExist = 0;
  await Review.findOne({
    where: {
      vendor_id: vId,
      user_uuid: sub ? sub : ''
    }
  }).then((res) => {
    if (res) isExist = 1
  });

  const vendorDetail = await Vendor.findOne({
    attributes: [
      "id",
      "name",
      "postcode",
      "email",
      "mobile",
      "tags",
      "address",
      "rating_avg",
      "rating_count",
      "is_veg",
      "is_promoted",
      "logo_url",
      [Sequelize.literal(isExist.toString()), "userReview"],
    ],
    where: { id: vId },
  })
    .then((records) => {
      return records;
    })
    .catch((err) => {
      console.log('error', err);
      return [];
    });

  return response(200, vendorDetail);
};
