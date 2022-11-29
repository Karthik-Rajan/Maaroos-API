import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { Op, Vendor, sequelize } from "../models";
import { response } from "../utils/helper";

export const handler = async (event: APIGatewayProxyEventV2, context: any) => {
  let body: any = event.body;
  let { rating_avg, distance, is_veg, lat, lng, limit } = JSON.parse(body);

  limit = limit ? limit : 10;

  let haversine = "";

  const where: any = {
    status: "ACTIVE",
  };

  if (rating_avg > 0) {
    where.rating_avg = {
      [Op.gte]: rating_avg,
    };
  }

  if (lat && lng && distance > 0) {
    haversine = `(
      6371 * acos(
        cos(radians(${lat}))
          * cos(radians(lat))
          * cos(radians(lng) - radians(${lng}))
          + sin(radians(${lat})) * sin(radians(lat))
      )
  )`;
  }

  if (is_veg && is_veg == "YES") {
    where.is_veg = "YES";
  }

  const vendors = await Vendor.findAll({
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
      [sequelize.literal(haversine), "distance"],
    ],

    where,
    order: sequelize.col("distance"),
    having: sequelize.literal(`distance <= ${distance}`),
    limit,
  })
    .then((records) => {
      return records;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return response(200, vendors);
};
