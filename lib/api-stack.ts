import {
  Stack,
  App,
  Fn,
  CfnOutput,
  aws_cognito as Cognito,
  aws_apigateway as apigateway,
} from 'aws-cdk-lib';
import CustomProps from "../utils/CustomProps";
import {
  fetchPartnerLambda,
  fetchPartnerDetailLambda,
} from "./integrations/vendor";
import {
  addScheduleLambda,
  fetchUserLambda,
  fetchUserSubscriptionLambda,
  updateUserLambda,
  addReviewLambda,
  fetchReviewLambda,
  rz_createOrderLambda,
  walletRechargeLambda,
  walletStatementLambda,
  paymentCallbackLambda
} from "./integrations/user";
import { lambdaRole, rootApi } from "./integrations/base";
import { vendorDetail_R, vendorList_R, vendorReview_R, vendorRoot } from "./routes/vendor";
import { userProfile_R, userFoodSubscription_R, userAddSchedule_R, userProfileUpdate_R, vendorSubscriptionRoot, vendorDetailRoot, userRoot, userAddReview_R, vendorReviewRoot, rz_CreateOrder_R, walletRoot, walletRecharge_R, walletStatement_R, paymentCallback_R } from "./routes/user";

export class ApiStack extends Stack {
  constructor(scope: App, id: string, props?: CustomProps) {
    super(scope, id, props);

    const userPoolArn = Fn.importValue("userPool");
    /** Roles */
    let role = lambdaRole(this);

    /** API Integrations */
    let fetchPartner_I = fetchPartnerLambda(this, role);
    let fetchPartnerDetail_I = fetchPartnerDetailLambda(this, role);

    let fetchUser_I = fetchUserLambda(this, role);
    let updateUser_I = updateUserLambda(this, role);
    let rz_CreateOrder_I = rz_createOrderLambda(this, role)
    let walletRecharge_I = walletRechargeLambda(this, role)
    let walletStatement_I = walletStatementLambda(this, role)
    let paymentCallback_I = paymentCallbackLambda(this, role)

    let fetchUserFoodSubscription_I = fetchUserSubscriptionLambda(this, role);

    let addSchedule_I = addScheduleLambda(this, role);
    let addReview_I = addReviewLambda(this, role);
    let fetchReview_I = fetchReviewLambda(this, role);

    /** User Auth Pool */
    const userPool = Cognito.UserPool.fromUserPoolArn(
      this,
      "UserPool",
      userPoolArn.toString()
    );
    const auth = new apigateway.CognitoUserPoolsAuthorizer(this, "userAuth", {
      cognitoUserPools: [userPool],
    });

    /** Routes */
    const api = rootApi(this);

    // Root APIs
    const user_API = userRoot(api);
    const wallet_API = walletRoot(user_API);
    const vendorRoot_API = vendorRoot(api);
    const vendorDetail_API = vendorDetailRoot(api);
    const vendorSubscription_API = vendorSubscriptionRoot(vendorDetail_API);
    const vendorReview_API = vendorReviewRoot(vendorDetail_API);

    //Vendor
    vendorList_R(vendorRoot_API, fetchPartner_I);
    vendorDetail_R(vendorRoot_API, fetchPartnerDetail_I);
    vendorReview_R(vendorReview_API, fetchReview_I);

    //User
    userProfile_R(user_API, fetchUser_I, auth);
    userProfileUpdate_R(user_API, updateUser_I, auth);
    rz_CreateOrder_R(wallet_API, rz_CreateOrder_I, auth);
    walletRecharge_R(wallet_API, walletRecharge_I, auth)
    walletStatement_R(wallet_API, walletStatement_I, auth)
    paymentCallback_R(api, paymentCallback_I)

    //User + Vendor
    userFoodSubscription_R(vendorSubscription_API, fetchUserFoodSubscription_I, auth);
    userAddSchedule_R(vendorSubscription_API, addSchedule_I, auth);
    userAddReview_R(vendorReview_API, addReview_I, auth);

    new CfnOutput(this, "restApiName", {
      value: api.domainName?.domainNameAliasDomainName!,
      exportName: "restApiName",
    });
    new CfnOutput(this, "restApiZoneId", {
      value: api.domainName?.domainNameAliasHostedZoneId!,
      exportName: "restApiZoneId",
    });
  }
}
