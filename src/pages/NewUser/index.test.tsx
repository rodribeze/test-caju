import NewUser from ".";

import { render, screen } from "@testing-library/react";
import { RegistrationsClient } from "@/clients/registrations/RegistrationsClient";
import { vi, describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: vi.fn(),
  }),
}));

const createRegistrationMock = vi.fn();

describe("Dashboard", () => {
  beforeEach(() => {
    RegistrationsClient.createRegistration = createRegistrationMock.mockReset().mockImplementation(() => ({
      statusCode: 201,
    }));

  });

  it("Should create registration", async () => {

    render(<NewUser />);

    await userEvent.type(screen.getByTestId("employeeName"), 'Rodrigo Bezerra Rodrigues')
    await userEvent.type(screen.getByTestId("email"), 'rbr.brasil@live.com')
    await userEvent.type(screen.getByTestId("cpf"), '04024627007')
    await userEvent.type(screen.getByTestId("admissionDate"), '1990-12-23')

    await userEvent.click(screen.getByTestId("btn-create"))

    expect(createRegistrationMock).toBeCalled();
  });

  it("Should don't create registration", async () => {
    render(<NewUser />);

    await userEvent.type(screen.getByTestId("employeeName"), 'Rodrigo Bezerra Rodrigues')
    await userEvent.type(screen.getByTestId("email"), 'rbr.brasil@live.com')
    await userEvent.type(screen.getByTestId("cpf"), '1234567')
    await userEvent.type(screen.getByTestId("admissionDate"), '1990-12-23')

    await userEvent.click(screen.getByTestId("btn-create"))

    expect(createRegistrationMock).not.toBeCalled();
  });

});
