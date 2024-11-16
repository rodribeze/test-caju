import Columns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useRegistrations } from "@/hooks/useRegistrations";
import { useEffect, useMemo } from "react";
import { CajuLoading } from "@/components/CajuLoading";
import { DialogConfirmation } from "@/components/DialogConfirmation";
import { RegistrationStatus } from "@/clients/registrations/IRegistrationsClient";

const DashboardPage = () => {
  const {
    fetchRegistrations,
    cpf,
    registrations,
    setCpf,
    setShowConfirmAction,
    showConfirmAction,
    handleActions,
    loaders,
  } = useRegistrations();

  useEffect(() => {
    fetchRegistrations();
  }, [cpf]);

  const loading = useMemo(() => {
    return (
      loaders.fetchRegistration ||
      loaders.removeRegistration ||
      loaders.updateRegistrationStatus
    );
  }, [loaders]);

  const labelActions = {
    [RegistrationStatus.Approved]: 'approve',
    [RegistrationStatus.Reproved]: 'approve',
    [RegistrationStatus.Review]: 'review',
    ['TRASH']: 'remove',
  }

  return (
    <>
      <CajuLoading show={loading} />
      <S.Container>
        <SearchBar
          onSearch={(cpf) => setCpf(cpf)}
          onRefresh={fetchRegistrations}
        />
        <Columns
          registrations={registrations}
          onClickAction={(action, registration) =>
            setShowConfirmAction({
              action,
              registration,
            })
          }
        />
        <DialogConfirmation
          onConfirm={() => {
            setShowConfirmAction(null);
            showConfirmAction &&
              handleActions(
                showConfirmAction.action,
                showConfirmAction.registration
              );
          }}
          onCancel={() => setShowConfirmAction(null)}
          show={!!showConfirmAction}
          description={`Do you would like confirm to ${showConfirmAction && labelActions[showConfirmAction.action]} this registration?`}
        />
      </S.Container>
    </>
  );
};
export default DashboardPage;
