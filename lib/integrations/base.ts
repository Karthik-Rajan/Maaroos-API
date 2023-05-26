import * as cdk from "@aws-cdk/core";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as iam from "@aws-cdk/aws-iam";
import { restParams } from "../../utils/helper";

export const lambdaRole = (self: cdk.Stack) =>
  new iam.Role(self, "lambdaRole", {
    assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
  }).addManagedPolicy(
    iam.ManagedPolicy.fromAwsManagedPolicyName("AWSLambdaExecute")
  );

export const rootApi = (self: cdk.Stack) => {
  const certificate = acm.Certificate.fromCertificateArn(
    self,
    `maaroos-cert`,
    `arn:aws:acm:us-east-1:623186676670:certificate/d3625363-e528-4ae1-addb-ea5dc7b64a19`
  );
  const api = new apigw.RestApi(self, "v1", {
    restApiName: "Maaroos Version 1",
    description: "Maaroos API Version 1",
    domainName: {
      domainName: `${process.env.DOMAIN_NAME}`,
      certificate,
      endpointType: apigw.EndpointType.EDGE
    },
    ...restParams,
  });

  return api;
}
