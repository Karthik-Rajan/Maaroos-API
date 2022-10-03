import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as iam from "@aws-cdk/aws-iam";
import CustomProps from "../utils/CustomProps";

export class ApiStack extends cdk.Stack {
  public fetchPartnerLambda: lambda.Function;

  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    //Lambda
    const fetchPartnerRole = new iam.Role(this, "fetchPartners", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    // fetchPartnerRole.addManagedPolicy(
    //   iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess')
    // );

    // defines an AWS Lambda resource
    this.fetchPartnerLambda = new lambda.Function(this, "fetchPartner", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda/build"),
      handler: "fetchpartner.handler",
      role: fetchPartnerRole,
      environment: {
        STAGE: props?.stage || "prod",
        TABLE_NAME: "vendors",
      },
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    const fetchPartnerApi = new apigw.LambdaRestApi(this, "fetch", {
      description: "fetch-vendors",
      handler: this.fetchPartnerLambda,
      proxy: false,
      //set up CORS
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
          "X-Amz-Security-Token",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://localhost:3002",
        ],
      },
    });

    let fetchPartnerResource = fetchPartnerApi.root.addResource("list");
    fetchPartnerResource.addMethod("GET");
    fetchPartnerResource.addMethod("POST");
  }
}
