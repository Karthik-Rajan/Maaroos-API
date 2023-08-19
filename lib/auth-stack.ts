import * as cdk from "@aws-cdk/core";
import CustomProps from "../utils/CustomProps";
import {
  postSignUpConfirmation,
  createAuthChallenge,
  defineAuthChallenge,
  verifyAuthChallenge,
} from "./integrations/auth";
import * as cognito from "@aws-cdk/aws-cognito";
import { lambdaRole } from "./integrations/base";

export class AuthStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    /** Roles */
    let role = lambdaRole(this);

    /** Lambdas */
    let postConfirmAuth = postSignUpConfirmation(this, role);

    let createAuth = createAuthChallenge(this, role);

    let defineAuth = defineAuthChallenge(this, role);

    let verifyAuth = verifyAuthChallenge(this, role);

    const userPool = new cognito.UserPool(this, "maaroos-user", {
      selfSignUpEnabled: true,
      signInAliases: { phone: true, username: true },
      signInCaseSensitive: false,
      autoVerify: {
        phone: true,
      },
      standardAttributes: {
        phoneNumber: {
          required: true,
        },
      },
      userVerification: {
        smsMessage: `[Maaroos] Your verification code is {####}. This OTP will be valid upto next 24 hours.`,
      },
      lambdaTriggers: {
        createAuthChallenge: createAuth,
        defineAuthChallenge: defineAuth,
        postConfirmation: postConfirmAuth,
        verifyAuthChallengeResponse: verifyAuth,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: false,
        requireSymbols: true,
      },
    });

    const poolClient = userPool.addClient("web");

    new cdk.CfnOutput(this, "userPoolArn", {
      value: userPool.userPoolArn,
      exportName: "userPool",
    });

    new cdk.CfnOutput(this, "userPoolId", {
      value:     userPool.userPoolId,
      exportName: "userPoolId",
    });

    new cdk.CfnOutput(this, "userPoolWebClientId", {
      value: poolClient.userPoolClientId,
      exportName: "userPoolWebClientId",
    });

  }
}
