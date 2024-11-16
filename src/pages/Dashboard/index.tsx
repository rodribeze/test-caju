import Columns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useRegistrations } from "@/hooks/useRegistrations";
import { useEffect, useMemo } from "react";
import { Registration } from "@/clients/registrations/IRegistrationsClient";
import { CajuLoading } from "@/components/CajuLoading";

const DashboardPage = () => {
  const {
    fetchRegistrations,
    cpf,
    registrations,
    setCpf,
    updateRegistrationStatus,
    deleteRegistration,
    loaders,
  } = useRegistrations();

  useEffect(() => {
    fetchRegistrations();
  }, [cpf]);

  const handleActions = (
    status: Registration["status"] | "TRASH",
    registration: Registration
  ) => {
    if (status === "TRASH") deleteRegistration(registration);
    else updateRegistrationStatus(registration, status);
  };

  const loading = useMemo(() => {
    return loaders.fetchRegistration ||
    loaders.removeRegistration ||
    loaders.updateRegistrationStatus
  }, [loaders])

  return (
    <>
      <CajuLoading show={loading} />
      <S.Container>
        <SearchBar onSearch={(cpf) => setCpf(cpf)} />
        <Columns registrations={registrations} onClickAction={handleActions} />
      </S.Container>
    </>
  );
};
export default DashboardPage;
