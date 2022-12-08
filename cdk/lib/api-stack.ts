import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as iam from "@aws-cdk/aws-iam";
import CustomProps from "../utils/CustomProps";
import { restParams, lambdaProps } from "../utils/helper";

export class ApiStack extends cdk.Stack {
  public fetchPartnerLambda: lambda.Function;
  public fetchPartnerDetailLambda: lambda.Function;

  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    //Lambda
    const fetchPartnerRole = new iam.Role(this, "fetchPartners", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    fetchPartnerRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AWSLambdaExecute")
    );

    // Fetch Vendor API
    this.fetchPartnerLambda = new lambda.Function(this, "fetchPartner", {
      ...lambdaProps(lambda, fetchPartnerRole),
      // entry: path.join(__dirname, `../lambda/build/fetchpartner.js`),
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
        ...lambdaProps(lambda, fetchPartnerRole),
        // entry: path.join(__dirname, `../lambda/build/fetchPartnerDetail.js`),
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
