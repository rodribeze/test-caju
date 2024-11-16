
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";

const allColumns = [
  { status: 'REVIEW', title: "Pronto para revisar" },
  { status: 'APPROVED', title: "Aprovado" },
  { status: 'REPROVED', title: "Reprovado" },
];

type Props = {
  registrations?: any[];
};
const Columns = (props: Props) => {
  return (
    <S.Container>
      {allColumns.map((colum) => {
        return (
          <S.Column status={colum.status} key={colum.title}>
            <>
              <S.TitleColumn status={colum.status}>
                {colum.title}
              </S.TitleColumn>
              <S.ColumnContent>
                {props?.registrations?.map((registration) => {
                  return (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
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
