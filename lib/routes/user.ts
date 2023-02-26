import * as apigw from "@aws-cdk/aws-apigateway";

const userProfile_R = (
  api: apigw.RestApi,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  let userResource = api.root.addResource("me");
  userResource.addMethod("GET", new apigw.LambdaIntegration(integration), {
    authorizer: auth,
    authorizationType: apigw.AuthorizationType.COGNITO,
  });
};

const userFoodSubscription_R = (
  api: apigw.RestApi,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {

  const userSubscriptionRoot = api.root
    .addResource("{vId}")
    .addResource("subscription");

  userSubscriptionRoot.addMethod("POST", new apigw.LambdaIntegration(integration), {
    authorizer: auth,
    authorizationType: apigw.AuthorizationType.COGNITO,
  });
  return userSubscriptionRoot;
};

const userAddSchedule_R = (
  root: apigw.Resource,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  root
    .addResource("add")
    .addMethod("POST", new apigw.LambdaIntegration(integration), {
      authorizer: auth,
      authorizationType: apigw.AuthorizationType.COGNITO,
    });
};

export { userProfile_R, userFoodSubscription_R, userAddSchedule_R };
