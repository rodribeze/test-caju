import Columns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useRegistrations } from "@/hooks/useRegistrations";
import { useEffect } from "react";

const DashboardPage = () => {

  const { fetchRegistrations, cpf, registrations, setCpf } = useRegistrations();

  useEffect(() => {
    fetchRegistrations();
  }, [cpf])

  return (
    <S.Container>
      <SearchBar onSearch={(cpf) => setCpf(cpf)} />
      <Columns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
