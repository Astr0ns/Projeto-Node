const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const CPF_API_URL = process.env.CPF_API_URL || null;

const cleanCPF = (cpf) => String(cpf || '').replace(/\D/g, '');

const isRepeatedDigits = (cpf) => /^([0-9])\1+$/.test(cpf);

const calculateVerifierDigit = (cpf, factor) => {
  let total = 0;
  for (let i = 0; i < factor - 1; i += 1) {
    total += Number(cpf[i]) * (factor - i);
  }
  const remainder = total % 11;
  return remainder < 2 ? 0 : 11 - remainder;
};

const validateCPF = async (cpf) => {
  const cleaned = cleanCPF(cpf);
  if (cleaned.length !== 11 || isRepeatedDigits(cleaned)) {
    return { valid: false, cleaned, cpf };
  }

  if (CPF_API_URL) {
    try {
      const response = await fetch(CPF_API_URL.replace('{cpf}', cleaned));
      if (response.ok) {
        const data = await response.json();
        const valid = data && typeof data.valid === 'boolean' ? data.valid : true;
        return { valid, cleaned, cpf, api: true, data };
      }
    } catch (err) {
      // Silently fall back to local validation if API não estiver disponível.
    }
  }

  const firstDigit = calculateVerifierDigit(cleaned, 10);
  const secondDigit = calculateVerifierDigit(cleaned, 11);
  const valid = firstDigit === Number(cleaned[9]) && secondDigit === Number(cleaned[10]);
  return { valid, cleaned, cpf };
};

module.exports = {
  cleanCPF,
  validateCPF,
};
