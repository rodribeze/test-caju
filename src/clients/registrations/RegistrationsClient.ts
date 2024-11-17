import { Client } from "@/clients/Client";
import { CreateRegistrationResponse, GetRegistrationResponse, GetRegistrationsParams, IRegistrationsClient, Registration, UpdateRegistrationResponse } from "./IRegistrationsClient";

export const RegistrationsClient: IRegistrationsClient = class RegistrationClient extends Client {
    static async getRegistrations(params: GetRegistrationsParams) {
        return this.get<GetRegistrationResponse['data']>('registrations',{
            queryParams: params
        });
    }

    static async updateRegistration(registration: Registration) {
        return this.put<UpdateRegistrationResponse['data']>(`registrations/${registration.id}`, {
            payload: registration
        });
    }

    static async removeRegistration(register_id: string) {
        return this.delete<void>(`registrations/${register_id}`);
    }

    static async createRegistration(registration: Omit<Registration, 'id'>) {
        return this.post<CreateRegistrationResponse['data']>(`registrations`, {
            payload: registration
        });
    }
}