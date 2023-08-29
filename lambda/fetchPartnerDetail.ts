import { APIGatewayProxyEventV2 } from "aws-lambda";
import { Vendor, Review, User } from "../models";
import { response } from "../utils/helper";

export const handler = async (event: any, context: any) => {
  let { vId }: any = event.pathParameters;
  const sub = event?.requestContext?.authorizer?.claims.sub;
  let reviewWhere, userwhere = {};
  if (sub) {
    reviewWhere = {
      user_uuid: sub,
    }
    userwhere = {
      uuid: sub
    }
  }

  const vendorDetail = await Vendor.findOne({
    attributes: [
      "id",
      "name",
      "postcode",
      "address",
      "rating_avg",
      "rating_count",
      "is_veg",
      "is_promoted",
      "logo_url",
    ],
    where: { id: vId },
    include: [
      {
        model: Review,
        attributes: [
          "id",
          "comment",
          "user_uuid",
          "vendor_id",
          "rating",
          "created_at",
        ],
        where: reviewWhere,
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
            where: userwhere
          },
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

  return response(200, vendorDetail);
};
