import { Registration } from "@/clients/registrations/IRegistrationsClient";
import { RegistrationsClient } from "@/clients/registrations/RegistrationsClient";
import { useCallback, useState } from "react";

type Actions =
  | "fetchRegistration"
  | "updateRegistrationStatus"
  | "removeRegistration";

type Loaders = Record<Actions, boolean>;
type Errors = Record<Actions, boolean>;

const initialActions: Record<Actions, boolean> = {
  fetchRegistration: false,
  updateRegistrationStatus: false,
  removeRegistration: false,
};

export const useRegistrations = () => {
  const [registrations, setRegistration] = useState<Registration[]>([]);
  const [cpf, setCpf] = useState("");
  const [showConfirmAction, setShowConfirmAction] = useState<{
    registration: Registration;
    action: Registration["status"] | "TRASH";
  } | null>(null);

  const [loaders, setLoaders] = useState<Loaders>(initialActions);
  const [errors, setErrors] = useState<Loaders>(initialActions);

  const fetchRegistrations = useCallback(async () => {
    try {
      setErrors((current) => ({
        ...current,
        fetchRegistration: false,
      }));
      setLoaders((current) => ({
        ...current,
        fetchRegistration: true,
      }));

      const { data, statusCode, message } =
        await RegistrationsClient.getRegistrations({
          cpf: cpf,
        });

      if (statusCode !== 200) throw new Error(message ?? "error");

      setRegistration(data ?? []);
    } catch (e) {
      setErrors((current) => ({
        ...current,
        fetchRegistration: true,
      }));
      console.error(e);
      alert("Unable to fetch registrations");
    } finally {
      setLoaders((current) => ({
        ...current,
        fetchRegistration: false,
      }));
    }
  }, [setErrors, setLoaders]);

  const updateRegistrationStatus = async (
    register: Registration,
    status: Registration["status"]
  ) => {
    try {
      setErrors((current) => ({
        ...current,
        updateRegistrationStatus: false,
      }));
      setLoaders((current) => ({
        ...current,
        updateRegistrationStatus: true,
      }));

      const { statusCode, message } =
        await RegistrationsClient.updateRegistration({
          ...register,
          status,
        });

      if (statusCode !== 200) throw new Error(message ?? "error");

      fetchRegistrations();
    } catch (e) {
      setErrors((current) => ({
        ...current,
        updateRegistrationStatus: true,
      }));
      console.error(e);
      alert("Unable to update registration");
    } finally {
      setLoaders((current) => ({
        ...current,
        updateRegistrationStatus: false,
      }));
    }
  };

  const deleteRegistration = async (register: Registration) => {
    try {
      setErrors((current) => ({
        ...current,
        removeRegistration: false,
      }));
      setLoaders((current) => ({
        ...current,
        removeRegistration: true,
      }));

      const { statusCode, message } =
        await RegistrationsClient.removeRegistration(register.id);

      if (statusCode !== 200) throw new Error(message ?? "error");

      fetchRegistrations();
    } catch (e) {
      setErrors((current) => ({
        ...current,
        updateRegistrationStatus: true,
      }));

      console.error(e);
      alert("Unable to delete registration");
    } finally {
      setLoaders((current) => ({
        ...current,
        removeRegistration: true,
      }));
    }
  };

  const handleActions = (
    status: Registration["status"] | "TRASH",
    registration: Registration
  ) => {
    if (status === "TRASH") deleteRegistration(registration);
    else updateRegistrationStatus(registration, status);
  };

  return {
    registrations,
    fetchRegistrations,
    updateRegistrationStatus,
    deleteRegistration,
    cpf,
    setCpf,
    loaders,
    errors,
    showConfirmAction,
    setShowConfirmAction,
    handleActions,
  };
};
