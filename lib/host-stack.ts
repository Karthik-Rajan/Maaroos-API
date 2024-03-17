import { Stack, App, Fn, aws_route53 as route53, aws_route53_targets as targets, aws_s3 as s3, aws_cloudfront as cloudfront } from "aws-cdk-lib";
import CustomProps from "../utils/CustomProps";

export class HostStack extends Stack {
  constructor(scope: App, id: string, props?: CustomProps) {
    super(scope, id, props);

    // Zone
    const zone = new route53.HostedZone(this, `maaroosdotcom`, { zoneName: `${process.env.DOMAIN_NAME}` });

    // WEB
    // const webBucketArn = Fn.importValue("webBucketArn");
    const webCFDomain = Fn.importValue("webCFDomain");
    const webCFDistId = Fn.importValue("webCFDistId");
    // const webBucket = s3.Bucket.fromBucketArn(this, `web-maaroos-bucket`, webBucketArn);

    const targetCf = cloudfront.Distribution.fromDistributionAttributes(this, `web-cf-dist`, { domainName: webCFDomain, distributionId: webCFDistId })
    const targetWeb = new targets.CloudFrontTarget(targetCf);

    new route53.ARecord(this, `web@${process.env.DOMAIN_NAME}`, {
      target: route53.RecordTarget.fromAlias(targetWeb),
      zone,
      recordName: `web.${process.env.DOMAIN_NAME}`,
    });

    // API
    const restApiName = Fn.importValue("restApiName");
    const restApiZoneId = Fn.importValue("restApiZoneId");

    const apigw = new targets.ApiGatewayv2DomainProperties(restApiName, restApiZoneId)

    new route53.ARecord(this, `api@${process.env.DOMAIN_NAME}`, {
      target: route53.RecordTarget.fromAlias(apigw),
      zone,
      recordName: `api.${process.env.DOMAIN_NAME}`,
    });
  }
}