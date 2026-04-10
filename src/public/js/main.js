// main.js — scripts globais do frontend
console.log('MeuProjeto carregado ✅');

const cpfInput = document.querySelector('#num-cpf');
const form = document.querySelector('form');

async function checkCPF(cpf) {
  if (!cpf) return null;
  try {
    const response = await fetch(`/api/cpf/${encodeURIComponent(cpf)}`);
    const data = await response.json();
    return data.valid;
  } catch (err) {
    return null;
  }
}

function updateCPFStatus(isValid) {
  const existing = document.querySelector('.cpf-status');
  if (!cpfInput) return;

  if (existing) existing.remove();
  if (isValid === null) return;

  const status = document.createElement('p');
  status.className = `cpf-status ${isValid ? 'valid' : 'invalid'}`;
  status.textContent = `CPF ${isValid ? 'válido' : 'inválido'}`;
  cpfInput.closest('.form-group').appendChild(status);
}

if (cpfInput) {
  cpfInput.addEventListener('blur', async () => {
    const isValid = await checkCPF(cpfInput.value);
    updateCPFStatus(isValid);
  });
}

if (form) {
  form.addEventListener('submit', async (event) => {
    if (!cpfInput) return;
    const isValid = await checkCPF(cpfInput.value);
    if (isValid === false) {
      event.preventDefault();
      updateCPFStatus(false);
      alert('CPF inválido. Corrija antes de enviar.');
    }
  });
}
