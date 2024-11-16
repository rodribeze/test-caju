import { Registration } from "@/clients/registrations/IRegistrationsClient";
import { RegistrationsClient } from "@/clients/registrations/RegistrationsClient";
import { useState } from "react";

export const useRegistrations = () => {

  const [registrations, setRegistration] = useState<Registration[]>([]);
  const [cpf, setCpf] = useState('');

  const fetchRegistrations = async () => {
    try {
      const { data, statusCode, message } =
        await RegistrationsClient.getRegistrations({
            cpf: cpf
        });

      if (statusCode !== 200) throw new Error(message ?? "error");

      setRegistration(data ?? []);
    } catch (e) {
      console.error(e);
      alert("Unable to fetch registrations");
    }
  };

  const updateRegistrationStatus = async (register: Registration, status: Registration['status']) => {
    try {
      const { statusCode, message } =
        await RegistrationsClient.updateRegistration({
          ...register,
          status
        });

      if (statusCode !== 200) throw new Error(message ?? "error");

      fetchRegistrations();
    } catch (e) {
      console.error(e);
      alert("Unable to update registration");
    }
  }

  const deleteRegistration = async (register: Registration) => {
    try {
      const { statusCode, message } =
        await RegistrationsClient.removeRegistration(register.id);

      if (statusCode !== 200) throw new Error(message ?? "error");

      fetchRegistrations();
    } catch (e) {
      console.error(e);
      alert("Unable to delete registration");
    }
  }

  return {
    registrations,
    fetchRegistrations,
    updateRegistrationStatus,
    deleteRegistration,
    cpf,
    setCpf
  };
};