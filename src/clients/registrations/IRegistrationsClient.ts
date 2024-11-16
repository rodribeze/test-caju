import { ClientResponse } from "@/clients/Client";

export const RegistrationStatus = {
  Approved: 'APPROVED',
  Review: 'REVIEW',
  Reproved: 'REPROVED',
}  as const

export type Registration = {
    id: string;
    email: string;
    employeeName: string;
    status: typeof RegistrationStatus[keyof typeof RegistrationStatus];
    cpf: string;
    admissionDate: string;
}

export type GetRegistrationsParams = {
  cpf?: string;
}

export type GetRegistrationResponse = ClientResponse<Registration[]>;
export type UpdateRegistrationResponse = ClientResponse<Registration[]>;
export type RemoveRegistrationResponse = ClientResponse<void>;

export interface IRegistrationsClient {
  getRegistrations(params: GetRegistrationsParams): Promise<GetRegistrationResponse>;
  updateRegistration(register: Registration): Promise<UpdateRegistrationResponse>
  removeRegistration(register_id: string): Promise<RemoveRegistrationResponse>
}