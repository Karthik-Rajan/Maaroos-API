import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import CustomeProps from "../utils/CustomProps";

export class DbStack extends cdk.Stack {
  public dbConnectionLambda: lambda.Function;

  constructor(scope: cdk.App, id: string, props?: CustomeProps) {
    super(scope, id, props);
  }
}
