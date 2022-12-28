import * as apigw from "@aws-cdk/aws-apigateway";

const userProfile_R = (
  api: apigw.RestApi,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  let userResource = api.root.addResource("me");
  // let userApiResource = userResource.addResource("{userSub}", {
  //   defaultIntegration: userintegration.userSub,
  // });
  userResource.addMethod("GET", integration, {
    authorizer: auth,
    authorizationType: apigw.AuthorizationType.COGNITO,
  });
};

const userFoodSubscription_R = (
  api: apigw.RestApi,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  api.root
    .addResource("{vId}")
    .addResource("subscription")
    .addMethod("POST", integration, {
      authorizer: auth,
      authorizationType: apigw.AuthorizationType.COGNITO,
    });
};

export { userProfile_R, userFoodSubscription_R };
