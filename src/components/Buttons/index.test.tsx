import Button from ".";
import { describe, expect, it } from 'vitest'
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("Should show button", () => {
    render(<Button>Ativar</Button>);
    expect(screen.getByRole("button", { name: /ativar/i }));
  });
});
