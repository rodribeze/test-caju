export const validateCpf = (cpf: string) => {
  const cpfRaw = cpf.replace(/[^0-9]/gi, "");

  if (cpfRaw.length !== 11) return false;
  if(cpfRaw === '00000000000') return false;
  if(cpfRaw === '11111111111') return false;
  if(cpfRaw === '22222222222') return false;
  if(cpfRaw === '33333333333') return false;
  if(cpfRaw === '44444444444') return false;
  if(cpfRaw === '55555555555') return false;
  if(cpfRaw === '66666666666') return false;
  if(cpfRaw === '77777777777') return false;
  if(cpfRaw === '88888888888') return false;
  if(cpfRaw === '99999999999') return false;

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
