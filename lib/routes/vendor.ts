import { RestApi } from "@aws-cdk/aws-apigateway";

const vendor_R = (api: RestApi, vendorIntegrations: any) => {
  let vendorResource = api.root.addResource("vendor");
  let vendorListResource = vendorResource.addResource("list", {
    defaultIntegration: vendorIntegrations.list,
  });
  vendorListResource.addMethod("POST");

  let vendorDetailResource = vendorResource.addResource("{vId}", {
    defaultIntegration: vendorIntegrations.vId,
  });
  vendorDetailResource.addMethod("GET");
};

export default vendor_R;
