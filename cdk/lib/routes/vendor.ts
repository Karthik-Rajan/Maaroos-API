import { Integration } from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";
import { rootApi } from "../integrations/base";

const vendor_R = (self: cdk.Stack, vendorIntegrations: any) => {
  let api = rootApi(self);
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
