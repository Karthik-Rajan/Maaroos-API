import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import CustomProps from "../utils/CustomProps";
import * as acm from '@aws-cdk/aws-certificatemanager';

export class WebAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    // S3
    const bucket = new s3.Bucket(this, `web.${process.env.DOMAIN_NAME}`, {
      publicReadAccess: true,
      blockPublicAccess : new s3.BlockPublicAccess({blockPublicAcls : false, blockPublicPolicy : false}),
      bucketName: `web.${process.env.DOMAIN_NAME}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    // Deployment
    const src = new s3Deploy.BucketDeployment(this, "Maaroos-Web-Deploy", {
      sources: [s3Deploy.Source.asset("../web/build")],
      destinationBucket: bucket,
    });

    // Certificate 
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      `web-maaroos-cert`,
      process.env.ACM_WEB_CERTIFICATE_ARN!
    );

    // Cloudfront
    const cf = new cloudfront.CloudFrontWebDistribution(
      this,
      "MaaroosWebDist",
      {
        aliasConfiguration : { acmCertRef : process.env.ACM_WEB_CERTIFICATE_ARN!, names: [ `web.${process.env.DOMAIN_NAME}` ]},
        viewerProtocolPolicy : cloudfront.ViewerProtocolPolicy.ALLOW_ALL,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
              },
              {
                pathPattern : '*',
                viewerProtocolPolicy : cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
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
          {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: "/index.html",
          },
          {
            errorCode: 400,
            responseCode: 200,
            responsePagePath: "/index.html",
          },
        ],
      }
    );

    new cdk.CfnOutput(this, "webCFDomain", {
      value: cf.distributionDomainName,
      exportName: "webCFDomain",
    });
    new cdk.CfnOutput(this, "webCFDistId", {
      value: cf.distributionId,
      exportName: "webCFDistId",
    });
    
  }
}
