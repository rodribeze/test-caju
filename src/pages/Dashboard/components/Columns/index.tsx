import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import {
  Registration,
  RegistrationStatus,
} from "@/clients/registrations/IRegistrationsClient";

const allColumns = [
  { status: RegistrationStatus.Review, title: "Pronto para revisar" },
  { status: RegistrationStatus.Approved, title: "Aprovado" },
  { status: RegistrationStatus.Reproved, title: "Reprovado" },
];

type Props = {
  registrations?: Registration[];
  onClickAction?: (
    action: Registration["status"] | "TRASH",
    registration: Registration
  ) => void;
};

const Columns = (props: Props) => {
  return (
    <S.Container>
      {allColumns.map((column) => {
        return (
          <S.Column status={column.status} key={column.title} data-testid={`column-registrations-${column.status}`}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.ColumnContent>
                {props?.registrations
                  ?.filter(
                    (registration) => registration.status === column.status
                  )
                  ?.map((registration) => {
                    return (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                        onClickAction={(status) =>
                          props.onClickAction &&
                          props.onClickAction(status, registration)
                        }
                      />
                    );
                  })}
              </S.ColumnContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Columns;
