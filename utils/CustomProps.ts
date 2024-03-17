import * as cdk from "aws-cdk-lib";
interface CustomProps extends cdk.StackProps {
  stage?: string;
  lambda?: any;
  userPoolArn?: any;
}

export default CustomProps;
