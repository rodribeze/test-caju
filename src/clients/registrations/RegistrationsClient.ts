import { Client } from "@/clients/Client";
import { GetRegistrationResponse, GetRegistrationsParams, IRegistrationsClient, Registration, UpdateRegistrationResponse } from "./IRegistrationsClient";

export const RegistrationsClient: IRegistrationsClient = class RegistrationClient extends Client {
    static async getRegistrations(params: GetRegistrationsParams) {
        return this.get<GetRegistrationResponse['data']>('registrations',{
            queryParams: params
        });
    }

    static async updateRegistration(register: Registration) {
        return this.put<UpdateRegistrationResponse['data']>(`registrations/${register.id}`, {
            payload: register
        });
    }

    static async removeRegistration(register_id: string) {
        return this.delete<void>(`registrations/${register_id}`);
    }
}