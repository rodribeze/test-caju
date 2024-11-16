import { Registration } from "@/clients/registrations/IRegistrationsClient";
import { RegistrationsClient } from "@/clients/registrations/RegistrationsClient";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";

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
  const { showMessage } = useToast();

  const [loaders, setLoaders] = useState<Loaders>(initialActions);
  const [errors, setErrors] = useState<Errors>(initialActions);

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
      showMessage("Unable to fetch registrations", "error");
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

      showMessage('Update registration successfully')
      fetchRegistrations();
    } catch (e) {
      setErrors((current) => ({
        ...current,
        updateRegistrationStatus: true,
      }));
      console.error(e);
      showMessage("Unable to update registration", "error");
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

      showMessage('Delete registration successfully')
      fetchRegistrations();
    } catch (e) {
      setErrors((current) => ({
        ...current,
        updateRegistrationStatus: true,
      }));

      console.error(e);
      showMessage("Unable to delete registration", "error");
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
