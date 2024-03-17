import { Stack, App, aws_rds as rds, aws_lambda as lambda, aws_ec2 as ec2 } from "aws-cdk-lib"
import CustomeProps from "../utils/CustomProps";

export class DbStack extends Stack {
  public dbConnectionLambda: lambda.Function;

  constructor(scope: App, id: string, props?: CustomeProps) {
    super(scope, id, props);

    // const vpc = new ec2.Vpc(this, "maaroos-db-vpc", {
    //   cidr: "172.31.0.0/16",
    // });

    // const securityGroups = new ec2.SecurityGroup(this, "maaroos-db-sg", {
    //   vpc: vpc,
    // });

    // 👇 create RDS instance
    // const dbInstance = new rds.DatabaseInstance(this, "maaroos-db", {
    //   vpc,
    //   engine: rds.DatabaseInstanceEngine.mysql({
    //     version: rds.MysqlEngineVersion.VER_8_0,
    //   }),
    //   storageType: rds.StorageType.GP2,
    //   credentials: rds.Credentials.fromUsername("admin", {
    //     password: SecretValue.unsafePlainText("630561Svg"),
    //   }),
    //   instanceType: ec2.InstanceType.of(
    //     //Free Tire
    //     ec2.InstanceClass.T3,
    //     ec2.InstanceSize.MICRO
    //   ),
    //   securityGroups: [],
    //   multiAz: false,
    //   allocatedStorage: 20,
    //   allowMajorVersionUpgrade: false,
    //   autoMinorVersionUpgrade: true,
    //   backupRetention: Duration.days(0),
    //   deleteAutomatedBackups: true,
    //   removalPolicy: RemovalPolicy.DESTROY,
    //   deletionProtection: false,
    //   databaseName: "maaroos",
    //   publiclyAccessible: true,
    // });

    // dbInstance.connections.allowFrom(ec2Instance, ec2.Port.tcp(5432));

    // new CfnOutput(this, "dbEndpoint", {
    //   value: dbInstance.instanceEndpoint.hostname,
    // });
  }
}
