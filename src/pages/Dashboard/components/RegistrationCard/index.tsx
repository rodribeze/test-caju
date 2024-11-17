import { ButtonSmall } from "@/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Registration } from "@/clients/registrations/IRegistrationsClient";

type Props = {
  data: Registration;
  onClickAction?: (action: Registration["status"] | "TRASH") => void;
};

const RegistrationCard = (props: Props) => {
  return (
    <S.Card data-testid="registration-card">
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {(props.data.status === "APPROVED" ||
          props.data.status === "REPROVED") && (
          <ButtonSmall
            onClick={() => props.onClickAction && props.onClickAction("REVIEW")}
            bgcolor="#ff8858"
            data-testid="action-review"
          >
            Revisar novamente
          </ButtonSmall>
        )}
        {props.data.status === "REVIEW" && (
          <>
            <ButtonSmall
              onClick={() =>
                props.onClickAction && props.onClickAction("APPROVED")
              }
              bgcolor="rgb(155, 229, 155)"
              data-testid="action-approve"
            >
              Aprovar
            </ButtonSmall>

            <ButtonSmall
              onClick={() =>
                props.onClickAction && props.onClickAction("REPROVED")
              }
              bgcolor="rgb(255, 145, 154)"
              data-testid="action-reprove"
            >
              Reprovar
            </ButtonSmall>
          </>
        )}

        <HiOutlineTrash
          data-testid="action-trash"
          onClick={() => props.onClickAction && props.onClickAction("TRASH")}
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
