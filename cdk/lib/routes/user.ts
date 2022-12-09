import * as cdk from "@aws-cdk/core";
import { Integration } from "@aws-cdk/aws-apigateway";
import { rootApi } from "../integrations/base";

const userProfile_R = (self: cdk.Stack, userIntegrations: any) => {
  let api = rootApi(self);
  let userResource = api.root.addResource("user");
  let userApiResource = userResource.addResource("{userSub}", {
    defaultIntegration: userIntegrations.userSub,
  });
  userApiResource.addMethod("GET");
};

export default userProfile_R;
