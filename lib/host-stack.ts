import * as cdk from "@aws-cdk/core";
import CustomProps from "../utils/CustomProps";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

export class HostStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    // Zone
    const zone = new route53.HostedZone(this, `maaroosdotcom`, { zoneName: `${process.env.DOMAIN_NAME}` });

    // WEB
    // const webBucketArn = cdk.Fn.importValue("webBucketArn");
    const webCFDomain = cdk.Fn.importValue("webCFDomain");
    const webCFDistId = cdk.Fn.importValue("webCFDistId");
    // const webBucket = s3.Bucket.fromBucketArn(this, `web-maaroos-bucket`, webBucketArn);
    const targetCf = cloudfront.Distribution.fromDistributionAttributes(this, `web-cf-dist`, { domainName : webCFDomain , distributionId : webCFDistId})
    const targetWeb = new targets.CloudFrontTarget(targetCf);

    new route53.ARecord(this, `web@${process.env.DOMAIN_NAME}`, {
      target: route53.RecordTarget.fromAlias(targetWeb),
      zone,
      recordName: `web.${process.env.DOMAIN_NAME}`,
    });

    // API
   const restApiName = cdk.Fn.importValue("restApiName");
   const restApiZoneId = cdk.Fn.importValue("restApiZoneId");

    const apigw = new targets.ApiGatewayv2DomainProperties(restApiName, restApiZoneId)

    new route53.ARecord(this, `api@${process.env.DOMAIN_NAME}`, {
      target: route53.RecordTarget.fromAlias(apigw),
      zone,
      recordName: `api.${process.env.DOMAIN_NAME}`,
    });
  }
}