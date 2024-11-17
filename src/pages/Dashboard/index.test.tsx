import DashboardPage from ".";

import { render, screen, within } from "@testing-library/react";
import { RegistrationsClient } from "@/clients/registrations/RegistrationsClient";
import { registrationsMock } from "@/mocks/registrationsMock";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { delay } from "@/utils/delay";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: vi.fn(),
  }),
}));

const mockUpdateStatus = vi.fn();
const mockRemoveRegistration = vi.fn();

describe("Dashboard", () => {
  beforeEach(() => {
    RegistrationsClient.getRegistrations = vi.fn().mockImplementation(() => ({
      data: registrationsMock,
      statusCode: 200,
    }));
    RegistrationsClient.updateRegistration =
      mockUpdateStatus.mockImplementation(() => ({
        data: undefined,
        statusCode: 200,
      }));
    RegistrationsClient.removeRegistration =
      mockRemoveRegistration.mockImplementation(() => ({
        data: undefined,
        statusCode: 200,
      }));
  });

  it("Should render", async () => {
    render(<DashboardPage />);
    await delay();

    expect(screen.getAllByTestId("column-registrations-APPROVED")).toHaveLength(
      1
    );
    expect(screen.getAllByTestId("column-registrations-REPROVED")).toHaveLength(
      1
    );
    expect(screen.getAllByTestId("column-registrations-REVIEW")).toHaveLength(
      1
    );
  });

  it("Should approve registration", async () => {
    render(<DashboardPage />);
    await delay();

    await userEvent.click(screen.getAllByTestId("action-approve")[0]);
    await delay(1000);

    const dialog = within(screen.getAllByTestId("dialog-confirm")[0]);

    await userEvent.click(dialog.getByTestId("btn-dialog-confirm"));
    expect(mockUpdateStatus).toBeCalled();
  });

  it("Should reprove registration", async () => {
    render(<DashboardPage />);
    await delay();

    await userEvent.click(screen.getAllByTestId("action-reprove")[0]);
    await delay(1000);

    const dialog = within(screen.getAllByTestId("dialog-confirm")[0]);

    await userEvent.click(dialog.getByTestId("btn-dialog-confirm"));
    expect(mockUpdateStatus).toBeCalled();
  });

  it("Should review registration", async () => {
    render(<DashboardPage />);
    await delay();

    await userEvent.click(screen.getAllByTestId("action-review")[0]);
    await delay(1000);

    const dialog = within(screen.getAllByTestId("dialog-confirm")[0]);

    await userEvent.click(dialog.getByTestId("btn-dialog-confirm"));
    expect(mockUpdateStatus).toBeCalled();
  });

  it("Should remove registration", async () => {
    render(<DashboardPage />);
    await delay();

    await userEvent.click(screen.getAllByTestId("action-trash")[0]);

    const dialog = within(screen.getAllByTestId("dialog-confirm")[0]);

    await userEvent.click(dialog.getByTestId("btn-dialog-confirm"));
    expect(mockUpdateStatus).toBeCalled();
  });
});
