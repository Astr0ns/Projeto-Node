const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const bcrypt = require('bcryptjs');

const API_URL = process.env.SHEETS_API_URL;

// Normaliza o objeto para garantir que 'id' sempre existe (planilha pode ter 'ID' maiúsculo)
function normalize(user) {
  if (!user) return null;
  return { ...user, id: user.id ?? user.ID };
}

const User = {
  async findAll() {
    const res = await fetch(`${API_URL}?action=findAll`);
    const data = await res.json();
    return Array.isArray(data) ? data.map(normalize) : [];
  },

  async findById(id) {
    const res = await fetch(`${API_URL}?action=findById&id=${id}`);
    return normalize(await res.json());
  },

  async findByEmail(email) {
    const res = await fetch(`${API_URL}?action=findByEmail&email=${encodeURIComponent(email)}`);
    return normalize(await res.json());
  },

  async create({ name, email, password }) {
    const hash = await bcrypt.hash(password, 10);
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'create', name, email, password: hash }),
    });
    const data = await res.json();
    return data.id;
  },

  async update(id, { name, email }) {
    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'update', id, name, email }),
    });
  },

  async delete(id) {
    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'delete', id }),
    });
  },

  async checkPassword(plainText, hash) {
    return bcrypt.compare(plainText, hash);
  },
};

module.exports = User;
