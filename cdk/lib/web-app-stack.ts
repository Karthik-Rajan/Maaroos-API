import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import CustomProps from "../utils/CustomProps";

export class WebAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    // S3
    const bucket = new s3.Bucket(this, "web.maaroos.com", {
      publicReadAccess: true,
      bucketName: "web.maaroos.com",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    // Deployment
    const src = new s3Deploy.BucketDeployment(this, "Maaroos-Web-Deploy", {
      sources: [s3Deploy.Source.asset("../build")],
      destinationBucket: bucket,
    });

    // Cloudfront
    /*const cf = new cloudfront.CloudFrontWebDistribution(
      this,
      "MaaroosWebDist",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
          },
        ],
        errorConfigurations: [
          {
            errorCode: 404,
            responseCode: 200,
            responsePagePath: "/index.html",
          },
        ],
      }
    );*/
  }
}
