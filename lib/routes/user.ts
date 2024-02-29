import * as apigw from "@aws-cdk/aws-apigateway";


export const userRoot = (api: apigw.RestApi) => {
  return api.root.addResource("me");
}

export const walletRoot = (api: apigw.Resource) => {
  return api.addResource('wallet');
}

export const vendorDetailRoot = (api: apigw.RestApi) => {
  return api.root
    .addResource("{vId}");
}

export const vendorSubscriptionRoot = (resource: apigw.Resource) => {
  return resource.addResource("subscription");
}

export const vendorReviewRoot = (resource: apigw.Resource) => {
  return resource.addResource("review");
}

export const userProfile_R = (
  resource: apigw.Resource,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  return resource.addMethod("GET", new apigw.LambdaIntegration(integration), {
    authorizer: auth,
    authorizationType: apigw.AuthorizationType.COGNITO,
  });
};

export const userProfileUpdate_R = (
  resource: apigw.Resource,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  return resource.addMethod("PUT", new apigw.LambdaIntegration(integration), {
    authorizer: auth,
    authorizationType: apigw.AuthorizationType.COGNITO,
  });
};

export const rz_CreateOrder_R = (
  resource: apigw.Resource,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  return resource.addMethod("POST", new apigw.LambdaIntegration(integration), {
    authorizer: auth,
    authorizationType: apigw.AuthorizationType.COGNITO,
  });
};

export const walletRecharge_R = (
  resource: apigw.Resource,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  return resource.addResource('recharge')
    .addMethod("POST", new apigw.LambdaIntegration(integration), {
      authorizer: auth,
      authorizationType: apigw.AuthorizationType.COGNITO,
    });
};

export const walletStatement_R = (
  resource: apigw.Resource,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  return resource.addResource('statements')
    .addMethod("GET", new apigw.LambdaIntegration(integration), {
      authorizer: auth,
      authorizationType: apigw.AuthorizationType.COGNITO,
    });
}

export const paymentCallback_R = (api: apigw.RestApi, integration: any) => {
  api.root.addResource("payment")
    .addResource("callback")
    .addMethod(
      "POST",
      new apigw.LambdaIntegration(integration)
    );
};

export const userFoodSubscription_R = (
  resource: apigw.Resource,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  return resource.addMethod("POST", new apigw.LambdaIntegration(integration), {
    authorizer: auth,
    authorizationType: apigw.AuthorizationType.COGNITO,
  });
};

export const userAddSchedule_R = (
  resource: apigw.Resource,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  resource
    .addResource("add")
    .addMethod("POST", new apigw.LambdaIntegration(integration), {
      authorizer: auth,
      authorizationType: apigw.AuthorizationType.COGNITO,
    });
};

export const userAddReview_R = (
  resource: apigw.Resource,
  integration: any,
  auth: apigw.CognitoUserPoolsAuthorizer
) => {
  resource
    .addResource("add")
    .addMethod("POST", new apigw.LambdaIntegration(integration), {
      authorizer: auth,
      authorizationType: apigw.AuthorizationType.COGNITO,
    });
}
