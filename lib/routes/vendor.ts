import { aws_apigateway as apigw } from "aws-cdk-lib";

const vendorRoot = (api: apigw.RestApi) => api.root.addResource("vendor");

const vendorList_R = (resource: apigw.Resource, integration: any) => {
  resource.addResource("list")
    .addMethod(
      "POST",
      new apigw.LambdaIntegration(integration)
    );
};

const vendorDetail_R = (resource: apigw.Resource, integration: any) => {
  resource.addResource("{vId}")
    .addMethod(
      "GET",
      new apigw.LambdaIntegration(integration)
    );
}

const vendorReview_R = (
  resource: apigw.Resource,
  integration: any,
) => {
  resource
    .addMethod("GET", new apigw.LambdaIntegration(integration));
}

export {
  vendorRoot,
  vendorList_R,
  vendorDetail_R,
  vendorReview_R
}
