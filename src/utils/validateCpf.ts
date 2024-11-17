export const validateCpf = (cpf: string) => {
  let cpfRaw = cpf;

  if (cpfRaw.length !== 11) return false;

  cpfRaw = cpfRaw.replace(/[^0-9]/gi, "")

  // checking first digit xxx.xxx.xxx.(X)x
  const aFirstCheck = [10, 9, 8, 7, 6, 5, 4, 3, 2];

  let firstDigitChecking =
    (aFirstCheck.reduce((a, b, index) => a + Number(cpfRaw[index]) * b, 0) *
      10) %
    11;

  if ([11, 10].includes(firstDigitChecking)) firstDigitChecking = 0;

  if(firstDigitChecking !== Number(cpfRaw[9])) return false;

  // checking second digit xxx.xxx.xxx.x(X)
  const aSecondCheck = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

  let secondDigitChecking =
    (aSecondCheck.reduce((a, b, index) => a + Number(cpfRaw[index]) * b, 0) *
      10) %
    11;

  if ([11, 10].includes(secondDigitChecking)) secondDigitChecking = 0;
  if(secondDigitChecking !== Number(cpfRaw[10])) return false;

  return true;
};
