#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import * as dotenv from "dotenv";
import { WebAppStack } from "../lib/web-app-stack";
import { ApiStack } from "../lib/api-stack";
import { AuthStack } from "../lib/auth-stack";
import { HostStack } from "../lib/host-stack";
// import { DbStack } from "../lib/db-stack";
dotenv.config()
const app = new cdk.App();

let authStack = new AuthStack(app, "auth", {});

let webStack = new WebAppStack(app, "web", {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
  },
});

let apiStack = new ApiStack(app, "api", {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
  },
});

let hostStack = new HostStack(app, "host", {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
  },
});

// let DBStack = new DbStack(app, "db");
