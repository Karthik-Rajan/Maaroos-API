import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as iam from "@aws-cdk/aws-iam";
import CustomProps from "../utils/CustomProps";
import * as path from "path";

export class ApiStack extends cdk.Stack {
  public fetchPartnerLambda: lambda.Function;
  public fetchPartnerDetailLambda: lambda.Function;

  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    const restParams: any = {
      proxy: false,
      deploy: true,
      deployOptions: {
        stageName: "development",
      },
      //set up CORS
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
          "X-Amz-Security-Token",
          "Origin",
          "X-Requested-With",
          "Accept",
          "x-client-key",
          "x-client-token",
          "x-client-secret",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://localhost:3002",
        ],
      },
    };

    //Lambda
    const fetchPartnerRole = new iam.Role(this, "fetchPartners", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    const lambdaProps: any = {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda/build"),
      role: fetchPartnerRole,
    };

    fetchPartnerRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AWSLambdaExecute")
    );

    // Fetch Vendor API
    this.fetchPartnerLambda = new lambda.Function(this, "fetchPartner", {
      ...lambdaProps,
      handler: "fetchpartner.handler",
    });

    const fetchPartnerApi = new apigw.LambdaRestApi(this, "fetch", {
      description: "fetch-vendors",
      handler: this.fetchPartnerLambda,
      ...restParams,
    });

    // Fetch Vendor Detail
    this.fetchPartnerDetailLambda = new lambda.Function(
      this,
      "fetchPartnerDetail",
      {
        ...lambdaProps,
        handler: "fetchPartnerDetail.handler",
      }
    );

    const fetchPartnerDetailApi = new apigw.LambdaIntegration(
      this.fetchPartnerDetailLambda
    );

    // POST /vendor/list
    let vendorResource = fetchPartnerApi.root.addResource("vendor");
    let vendorListResource = vendorResource.addResource("list");
    vendorListResource.addMethod("POST");

    // GET /vendor/{vId}
    let vendorDetailResource = vendorResource.addResource("{vId}", {
      defaultIntegration: fetchPartnerDetailApi,
    });
    vendorDetailResource.addMethod("GET");
  }
}
