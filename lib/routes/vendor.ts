import * as apigw from "@aws-cdk/aws-apigateway";

const vendor_R = (api: apigw.RestApi, vendorIntegrations: any) => {
  const vendorResource = api.root.addResource("vendor");
  const vendorListResource = vendorResource.addResource("list");
  vendorListResource.addMethod(
    "POST",
    new apigw.LambdaIntegration(vendorIntegrations.list)
  );

  let vendorDetailResource = vendorResource.addResource("{vId}");
  vendorDetailResource.addMethod(
    "GET",
    new apigw.LambdaIntegration(vendorIntegrations.detail)
  );
};

export default vendor_R;
