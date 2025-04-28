import { Appointment } from "../../domain/models/Appointment";
import { AppointmentRepo } from "../../domain/ports/AppointmentRepo";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export class DynamoAppointmentRepo implements AppointmentRepo {
  private table = process.env.TABLE_NAME!;

  async save(app: Appointment): Promise<void> {
    await docClient.send(
      new PutCommand({
        TableName: this.table,
        Item: app,
      })
    );
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    const res = await docClient.send(
      new QueryCommand({
        TableName: this.table,
        KeyConditionExpression: "insuredId = :id",
        ExpressionAttributeValues: { ":id": insuredId },
      })
    );
    return res.Items as Appointment[];
  }
}
