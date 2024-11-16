import * as S from "./styles";

type DialogConfirmationProps = {
  show: boolean;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DialogConfirmation = ({
  show,
  description,
  onCancel,
  onConfirm
}: DialogConfirmationProps) => {
  return (
    <S.Backdrop show={show} delay={500}>
      <S.Container>
        <S.Header>Attention</S.Header>
        <S.Body>{description}</S.Body>
        <S.Actions>
          <S.ButtonCancel onClick={onCancel}>Cancelar</S.ButtonCancel>
          <S.ButtonConfirm onClick={onConfirm}>Confirmar</S.ButtonConfirm>
        </S.Actions>
      </S.Container>
    </S.Backdrop>
  );
};
