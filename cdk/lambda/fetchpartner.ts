import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  console.log("event 👉", event);

  let userLat = event.pathParameters?.lat;
  let userLng = event.pathParameters?.lng;
  let tableName = process.env.TABLE_NAME;
  let results;

  const dbClient: DynamoDBClient = new DynamoDBClient({ region: "ap-south-1" });
  let params: GetItemCommandInput;

  // return {
  //   body: "{}",
  //   statusCode: 200,
  // };

  params = {
    TableName: tableName,
    Key: marshall(
      {
        lat: userLat,
        lng: userLng,
      },
      {
        removeUndefinedValues: true,
      }
    ),
  };

  const run = (async function (params) {
    try {
      const resp = await dbClient.send(new GetItemCommand(params));
      results = unmarshall(resp.Item || {});
    } catch (err) {
      results = err;
    }
  })(params);

  return {
    body: JSON.stringify(results),
    statusCode: 200,
  };
}
