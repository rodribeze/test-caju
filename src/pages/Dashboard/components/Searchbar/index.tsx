import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "@/components/Buttons";
import { IconButton } from "@/components/Buttons/IconButton";
import TextField from "@/components/TextField";
import routes from "@/router/routes";
import * as S from "./styles";
import { validateCpf } from "@/utils/validateCpf";

type SearchBarProps = {
  onSearch: (cpf: string) => void;
};

export const SearchBar = (props: SearchBarProps) => {
  const history = useHistory();
  let debounce: NodeJS.Timeout;

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      props.onSearch &&
        props.onSearch(
          validateCpf(e.target.value)
            ? e.target.value.replace(/[^0-9]/, "")
            : ""
        );
    }, 500);
  };

  return (
    <S.Container>
      <TextField placeholder="Digite um CPF válido" onChange={handleSearch} />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
