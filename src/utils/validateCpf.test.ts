import { describe, expect, it } from "vitest";
import { validateCpf } from "./validateCpf";

describe("Validate CPF", () => {
  it("Should check valid cpf", () => {
    expect(validateCpf('56642105087')).toBe(true);
    expect(validateCpf('78502270001')).toBe(true);
  });
  it("Should check invalid cpf", () => {
    expect(validateCpf('56642105068')).toBe(false);
    expect(validateCpf('12345454555')).toBe(false);
    expect(validateCpf('00000000000')).toBe(false);
    expect(validateCpf('11111111111')).toBe(false);
    expect(validateCpf('22222222222')).toBe(false);
    expect(validateCpf('33333333333')).toBe(false);
    expect(validateCpf('99999999999')).toBe(false);
  });
});
