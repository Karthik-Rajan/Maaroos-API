import * as apigw from "@aws-cdk/aws-apigateway";

const userProfile_R = (
  api: apigw.RestApi,
  userIntegrations: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  let userResource = api.root.addResource("me");
  // let userApiResource = userResource.addResource("{userSub}", {
  //   defaultIntegration: userIntegrations.userSub,
  // });
  userResource.addMethod("GET", userIntegrations.userSub, {
    authorizer: auth,
    authorizationType: apigw.AuthorizationType.COGNITO,
  });
};

export default userProfile_R;
