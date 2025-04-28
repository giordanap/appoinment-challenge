import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { EventPublisher } from "../../domain/ports/EventPublisher";

export class SNSEventPublisher implements EventPublisher {
  constructor(
    private readonly snsClient: SNSClient,
    private readonly topicArn: string
  ) {}

  async publish(message: any, countryISO: string): Promise<void> {
    const params = {
      TopicArn: this.topicArn,
      Message: JSON.stringify(message),
      MessageAttributes: {
        countryISO: {
          DataType: "String",
          StringValue: countryISO,
        },
      },
    };

    await this.snsClient.send(new PublishCommand(params));
  }
}
