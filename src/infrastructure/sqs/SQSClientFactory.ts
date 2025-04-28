import { SQSClient } from "@aws-sdk/client-sqs";

export class SQSClientFactory {
  static createForCountry(countryISO: string): SQSClient {
    const region = countryISO === "PE" ? "us-east-1" : "sa-east-1";
    return new SQSClient({ region });
  }

  static getQueueUrl(countryISO: string): string {
    return countryISO === "PE"
      ? process.env.SQS_PE_URL!
      : process.env.SQS_CL_URL!;
  }
}
