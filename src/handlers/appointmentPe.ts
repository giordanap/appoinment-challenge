import { Appointment } from "../domain/models/Appointment";
import { AppointmentProcessor } from "../application/processors/AppointmentProcessor";
import { RDSClient } from "../infrastructure/rds/RDSClient";
import { SQSEvent } from "aws-lambda";

export const handler = async (event: SQSEvent) => {
  const rdsClient = new RDSClient(
    process.env.RDS_HOST!,
    process.env.RDS_USER!,
    process.env.RDS_PASSWORD!,
    process.env.RDS_DATABASE!
  );
  const processor = new AppointmentProcessor(rdsClient);

  for (const record of event.Records) {
    const appointment: Appointment = JSON.parse(record.body);
    await processor.process(appointment);
    console.log(`PE: cita ${appointment.scheduleId} procesada.`);
  }
};
