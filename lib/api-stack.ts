import * as cdk from "@aws-cdk/core";
import CustomProps from "../utils/CustomProps";
import {
  fetchPartnerLambda,
  fetchPartnerDetailLambda,
} from "./integrations/vendor";
import {
  fetchUserLambda,
  fetchUserSubscriptionLambda,
} from "./integrations/user";
import { lambdaRole, rootApi } from "./integrations/base";
import vendor_R from "./routes/vendor";
import { userProfile_R, userFoodSubscription_R } from "./routes/user";
import * as Cognito from "@aws-cdk/aws-cognito";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    const userPoolArn = cdk.Fn.importValue("userPool");

    /** Roles */
    let role = lambdaRole(this);

    /** API Integrations */
    let fetchPartner_I = fetchPartnerLambda(this, role);

    let fetchPartnerDetail_I = fetchPartnerDetailLambda(this, role);

    let fetchUser_I = fetchUserLambda(this, role);

    let fetchUserFoodSubscription_I = fetchUserSubscriptionLambda(this, role);

    /** User Auth Pool */
    const userPool = Cognito.UserPool.fromUserPoolArn(
      this,
      "UserPool",
      userPoolArn.toString()
    );

    /** Routes */
    const api = rootApi(this);

    const zone = route53.HostedZone.fromLookup(this, "maaroos.com", {
      domainName: "maaroos.com",
    });

    const apigw = new targets.ApiGateway(<any>api);

    new route53.ARecord(this, `api.maaroos.com`, {
      target: route53.RecordTarget.fromAlias(<any>apigw),
      zone: zone,
      recordName: `api.maaroos.com`,
    });

    //Vendor
    let vendorIntegrations = {
      list: fetchPartner_I,
      detail: fetchPartnerDetail_I,
    };
    vendor_R(api, vendorIntegrations);

    const auth = new apigateway.CognitoUserPoolsAuthorizer(this, "userAuth", {
      cognitoUserPools: [userPool],
    });

    //User
    userProfile_R(api, fetchUser_I, auth);

    userFoodSubscription_R(api, fetchUserFoodSubscription_I, auth);
  }
}
