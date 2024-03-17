import { Stack, aws_apigateway as apigw, aws_iam as iam, aws_certificatemanager as acm } from "aws-cdk-lib";
import { restParams } from "../../utils/helper";

export const lambdaRole = (self: Stack) =>
  new iam.Role(self, "lambdaRole", {
    assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
  }).addManagedPolicy(
    iam.ManagedPolicy.fromAwsManagedPolicyName("AWSLambdaExecute")
  );

export const rootApi = (self: Stack) => {
  const certificate = acm.Certificate.fromCertificateArn(
    self,
    `maaroos-cert`,
    process.env.ACM_API_CERTIFICATE_ARN!
  );
  const api = new apigw.RestApi(self, "v1", {
    restApiName: "Maaroos Version 1",
    description: "Maaroos API Version 1",
    domainName: {
      domainName: `api.${process.env.DOMAIN_NAME}`,
      certificate,
      endpointType: apigw.EndpointType.EDGE
    },
    ...restParams,
  });

  return api;
}
