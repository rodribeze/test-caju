import Columns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useRegistrations } from "@/hooks/useRegistrations";
import { useEffect } from "react";
import { Registration } from "@/clients/registrations/IRegistrationsClient";

const DashboardPage = () => {

  const { fetchRegistrations, cpf, registrations, setCpf, updateRegistrationStatus, deleteRegistration } = useRegistrations();

  useEffect(() => {
    fetchRegistrations();
  }, [cpf])

  const handleActions = (status: Registration['status'] | 'TRASH', registration: Registration) => {
    if(status === 'TRASH') deleteRegistration(registration);
    else updateRegistrationStatus(registration, status)
  }

  return (
    <S.Container>
      <SearchBar onSearch={(cpf) => setCpf(cpf)} />
      <Columns registrations={registrations} onClickAction={handleActions} />
    </S.Container>
  );
};
export default DashboardPage;
