import {
  Stack,
  App,
  RemovalPolicy,
  aws_s3 as s3,
  aws_s3_deployment as s3Deploy,
  aws_certificatemanager as acm,
  aws_cloudfront as cloudfront
} from 'aws-cdk-lib';
import CustomProps from "../utils/CustomProps";

export class WebAppStack extends Stack {
  constructor(scope: App, id: string, props?: CustomProps) {
    super(scope, id, props);

    // S3
    const bucket = new s3.Bucket(this, `web.${process.env.DOMAIN_NAME}`, {
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({ blockPublicAcls: false, blockPublicPolicy: false }),
      bucketName: `sample.${process.env.DOMAIN_NAME}`,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    new s3.Bucket(this, `maaroos-assets-sample`, {
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({ blockPublicAcls: false, blockPublicPolicy: false }),
      bucketName: `maaroos-assets-sample`,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [
        {
          allowedHeaders: [
            "*"
          ],
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.POST,
            s3.HttpMethods.PUT,
            s3.HttpMethods.DELETE,
          ],
          allowedOrigins: [
            "*"
          ],
          exposedHeaders: []
        }
      ]
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
    // const cf = new cloudfront.CloudFrontWebDistribution(
    //   this,
    //   "MaaroosWebDist",
    //   {
    //     aliasConfiguration: { acmCertRef: process.env.ACM_WEB_CERTIFICATE_ARN!, names: [`web.${process.env.DOMAIN_NAME}`] },
    //     viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.ALLOW_ALL,
    //     originConfigs: [
    //       {
    //         s3OriginSource: {
    //           s3BucketSource: bucket,
    //         },
    //         behaviors: [
    //           {
    //             isDefaultBehavior: true,
    //           },
    //           {
    //             pathPattern: '*',
    //             viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
    //           },
    //         ],
    //       },
    //     ],
    //     errorConfigurations: [
    //       {
    //         errorCode: 404,
    //         responseCode: 200,
    //         responsePagePath: "/index.html",
    //       },
    //       {
    //         errorCode: 403,
    //         responseCode: 200,
    //         responsePagePath: "/index.html",
    //       },
    //       {
    //         errorCode: 400,
    //         responseCode: 200,
    //         responsePagePath: "/index.html",
    //       },
    //     ],
    //   }
    // );

    // new cdk.CfnOutput(this, "webCFDomain", {
    //   value: cf.distributionDomainName,
    //   exportName: "webCFDomain",
    // });
    // new cdk.CfnOutput(this, "webCFDistId", {
    //   value: cf.distributionId,
    //   exportName: "webCFDistId",
    // });

  }
}
