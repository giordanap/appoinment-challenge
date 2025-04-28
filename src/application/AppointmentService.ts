import { Appointment } from "../domain/models/Appointment";
import { AppointmentRepo } from "../domain/ports/AppointmentRepo";

export class AppointmentService {
  constructor(private repo: AppointmentRepo) {}

  async create(
    payload: Omit<Appointment, "status" | "createdAt">
  ): Promise<Appointment> {
    if (!/^\d{5}$/.test(payload.insuredId)) {
      throw new Error("insuredId inválido");
    }
    if (!["PE", "CL"].includes(payload.countryISO)) {
      throw new Error("countryISO debe ser PE o CL");
    }
    const appointment: Appointment = {
      ...payload,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    await this.repo.save(appointment);
    return appointment;
  }

  async list(insuredId: string): Promise<Appointment[]> {
    return this.repo.findByInsuredId(insuredId);
  }
}
