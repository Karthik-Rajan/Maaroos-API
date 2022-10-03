import * as cdk from '@aws-cdk/core'

interface CustomProps extends cdk.StackProps { 
    stage?: string,
    lambda?: any
}

export default CustomProps;