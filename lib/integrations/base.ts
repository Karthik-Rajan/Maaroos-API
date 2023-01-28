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

export const rootApi = (self: cdk.Stack) =>
  new apigw.RestApi(self, "v1", {
    restApiName: "Maaroos Version 1",
    description: "Maaroos API Version 1",
    domainName: {
      domainName: `api.maaroos.com`,
      certificate: acm.Certificate.fromCertificateArn(
        self,
        `maaroos-cert`,
        `arn:aws:acm:ap-south-1:623186676670:certificate/378993c8-1623-41b2-a966-7a9c529657cd`
      ),
    },
    ...restParams,
  });
