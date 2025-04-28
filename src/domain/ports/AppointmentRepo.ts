import { Appointment } from "../models/Appointment";

export interface AppointmentRepo {
  save(appointment: Appointment): Promise<void>;
  findByInsuredId(insuredId: string): Promise<Appointment[]>;
}
