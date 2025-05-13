import { Appointment } from "../../domain/models/Appointment";
import { RDSClient } from "../../infrastructure/rds/RDSClient";

export class AppointmentProcessor {
  constructor(private readonly rdsClient: RDSClient) {}

  async process(appointment: Appointment): Promise<void> {
    let conn;
    try {
      conn = await this.rdsClient.connect();
      await conn.execute(
        `INSERT INTO appointments (
           insured_id,
           schedule_id,
           country_iso,
           status,
           created_at
         ) VALUES (?, ?, ?, ?, ?)`,
        [
          appointment.insuredId,
          appointment.scheduleId,
          appointment.countryISO,
          appointment.status,
          appointment.createdAt,
        ]
      );
    } catch (err) {
      console.error("Error al escribir en RDS:", err);
      // Si deseas que falle la Lambda, lanza; si no, comenta la línea siguiente:
      // throw err;
    } finally {
      await this.rdsClient.disconnect();
    }
  }
}
