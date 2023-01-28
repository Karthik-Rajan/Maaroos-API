#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { WebAppStack } from "../lib/web-app-stack";
import { ApiStack } from "../lib/api-stack";
import { AuthStack } from "../lib/auth-stack";
import { DbStack } from "../lib/db-stack";

const app = new cdk.App();

let authStack = new AuthStack(app, "auth", {});

let WebStack = new WebAppStack(app, "web", {});

let APIStack = new ApiStack(app, "api", {
  env: {
    region: `ap-south-1`,
    account: `623186676670`,
  },
});

// let DBStack = new DbStack(app, "db");
