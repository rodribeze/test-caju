import { useToast } from "@/hooks/useToast";
import * as S from "./styles";

export const Toast = () => {
  const { message, hideMessage } = useToast();

  return (
    <S.Toast show={message ? "true" : undefined} type={message?.type}>
      {message?.message}
      <S.Close onClick={hideMessage}>X</S.Close>
    </S.Toast>
  );
};
