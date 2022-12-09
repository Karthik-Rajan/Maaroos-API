import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import CustomProps from "../utils/CustomProps";
import { fetchPartnerApi, fetchPartnerDetailApi } from "./integrations/vendor";
import { postSignUpConfirmation } from "./integrations/auth";
import { fetchUserApi } from "./integrations/user";
import { lambdaRole } from "./integrations/base";
import vendor_R from "./routes/vendor";
import userProfile_R from "./routes/user";
import { Integration, LambdaIntegration } from "@aws-cdk/aws-apigateway";

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    /** Roles */
    let role = lambdaRole(this);

    /** Lambdas */
    postSignUpConfirmation(this, role);

    /** API Integrations */
    let fetchPartner_I = fetchPartnerApi(this, role);

    let fetchPartnerDetail_I = fetchPartnerDetailApi(this, role);

    let fetchUser_I = fetchUserApi(this, role);

    /** Routes */
    let vendorIntegrations = {
      list: fetchPartner_I,
      vId: fetchPartnerDetail_I,
    };
    //Vendor
    vendor_R(this, vendorIntegrations);

    //User
    let userIntegrations = {
      userSub: fetchUser_I,
    };
    userProfile_R(this, userIntegrations);
  }
}
