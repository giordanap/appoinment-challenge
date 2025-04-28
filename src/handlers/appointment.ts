import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import jsonParser from "@middy/http-json-body-parser";
import { AppointmentService } from "../application/AppointmentService";
import { DynamoAppointmentRepo } from "../infrastructure/dynamo/DynamoAppointmentRepo";

const service = new AppointmentService(new DynamoAppointmentRepo());

export const createAppointment = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const payload = event.body as any;

    const result = await service.create({
      insuredId: payload.insuredId,
      scheduleId: payload.scheduleId,
      countryISO: payload.countryISO,
    });

    return { statusCode: 201, body: JSON.stringify(result) };
  }
).use(jsonParser());

export const listAppointments = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const insuredId = event.pathParameters?.insuredId!;
    const items = await service.list(insuredId);

    return { statusCode: 200, body: JSON.stringify(items) };
  }
);
