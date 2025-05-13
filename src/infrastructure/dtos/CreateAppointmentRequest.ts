import { APIGatewayProxyEvent } from "aws-lambda";
import { CreateAppointmentDTO } from "../../domain/dtos/CreateAppointmentDTO";

export class CreateAppointmentRequest implements CreateAppointmentDTO {
  constructor(
    public readonly insuredId: string,
    public readonly scheduleId: number,
    public readonly countryISO: "PE" | "CL"
  ) {}

  static fromEvent(event: APIGatewayProxyEvent): CreateAppointmentRequest {
    const body =
      typeof event.body === "string"
        ? JSON.parse(event.body)
        : event.body || {};

    if (!body.insuredId || !body.scheduleId || !body.countryISO) {
      throw new Error(
        "Missing required fields: insuredId, scheduleId, countryISO"
      );
    }

    if (!["PE", "CL"].includes(body.countryISO)) {
      throw new Error("Invalid countryISO. Must be 'PE' or 'CL'");

      return new CreateAppointmentRequest(
        body.insuredId.toString(),
        Number(body.scheduleId),
        body.countryISO
      );
    }
  }
}
