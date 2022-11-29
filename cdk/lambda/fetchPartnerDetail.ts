import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { Op, Vendor, Review, sequelize, User } from "../models";
import { response } from "../utils/helper";

export const handler = async (event: APIGatewayProxyEventV2, context: any) => {
  let { vId }: any = event.pathParameters;

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
          "message",
          "user_id",
          "vendor_id",
          "rating",
          "created_at",
        ],
        include: [
          {
            model: User,
            attributes: [
              "id",
              "first_name",
              "second_name",
              "profile_img",
              "created_at",
            ],
          },
        ],
      },
    ],
  })
    .then((records) => {
      return records;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return response(200, vendorDetail);
};
