import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "@/components/Buttons";
import { IconButton } from "@/components/Buttons/IconButton";
import TextField from "@/components/TextField";
import routes from "@/router/routes";
import * as S from "./styles";
import { validateCpf } from "@/utils/validateCpf";
import InputMask from "react-input-mask";

type SearchBarProps = {
  onSearch: (cpf: string) => void;
  onRefresh: () => void;
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
            ? e.target.value.replace(/[^0-9]/gi, "")
            : ""
        );
    }, 500);
  };

  return (
    <S.Container>
      <InputMask mask="999.999.999-99" onChange={handleSearch}>
        {(inputProps) => (
          <TextField {...inputProps} placeholder="Digite um CPF válido" />
        )}
      </InputMask>
      <S.Actions>
        <IconButton onClick={props.onRefresh} aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
