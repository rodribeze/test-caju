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
    <S.Backdrop data-testid="dialog-confirm" show={show ? 'true' : undefined} delay={500}>
      <S.Container>
        <S.Header>Attention</S.Header>
        <S.Body>{description}</S.Body>
        <S.Actions>
          <S.ButtonCancel data-testid="btn-dialog-cancel" onClick={onCancel}>Cancelar</S.ButtonCancel>
          <S.ButtonConfirm data-testid="btn-dialog-confirm" onClick={onConfirm}>Confirmar</S.ButtonConfirm>
        </S.Actions>
      </S.Container>
    </S.Backdrop>
  );
};
