import TextField from "@/components/TextField";
import * as S from "./styles";
import Button from "@/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "@/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "@/router/routes";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, userSchema } from "./schema";
import ReactInputMask from "react-input-mask";
import { useRegistrations } from "@/hooks/useRegistrations";
import { CajuLoading } from "@/components/CajuLoading";

const NewUserPage = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const { createRegistration, loaders } = useRegistrations();

  const { handleSubmit, control } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
  });

  return (
    <>
      <S.Container>
        <S.Card>
          <form onSubmit={handleSubmit((data) => createRegistration(data))}>
            <IconButton onClick={() => goToHome()} aria-label="back">
              <HiOutlineArrowLeft size={24} />
            </IconButton>
            <Controller
              name="employeeName"
              control={control}
              render={({ field, formState: { errors } }) => (
                <TextField
                  {...field}
                  placeholder="Name"
                  label="Name"
                  error={String(errors?.employeeName?.message ?? "")}
                  data-testid="employeeName"
                />
              )}
            ></Controller>
            <Controller
              name="email"
              control={control}
              render={({ field, formState: { errors } }) => (
                <TextField
                  {...field}
                  placeholder="Email"
                  label="Email"
                  type="email"
                  error={String(errors?.email?.message ?? "")}
                  data-testid="email"
                />
              )}
            ></Controller>
            <Controller
              name="cpf"
              control={control}
              render={({ field, formState: { errors } }) => (
                <ReactInputMask
                  mask="999.999.999-99"
                  onChange={(e) =>
                    field.onChange({
                      target: {
                        value: String(e.target.value).replace(/[^0-9]/gi, ""),
                      },
                    })
                  }
                  data-testid="cpf"
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      placeholder="CPF"
                      error={String(errors?.cpf?.message ?? "")}
                      label="CPF"
                    />
                  )}
                </ReactInputMask>
              )}
            />
            <Controller
              name="admissionDate"
              control={control}
              render={({ field, formState: { errors } }) => (
                <TextField
                  {...field}
                  label="Data de admissão"
                  type="date"
                  data-testid="admissionDate"
                  error={String(errors?.admissionDate?.message ?? "")}
                />
              )}
            ></Controller>

            <Button data-testid="btn-create" type="submit">Cadastrar</Button>
          </form>
        </S.Card>
      </S.Container>
      <CajuLoading show={loaders.createRegistration} />
    </>
  );
};

export default NewUserPage;
