// script.js - versão final simplificada, segura para demonstração
// Substitui onclick inline, inclui validações, mensagens e armazenamento local (localStorage)

/* Elementos principais */
const loginForm = document.getElementById('loginForm');
const cadastroForm = document.getElementById('cadastroForm');
const formDados = document.getElementById('formDados');
const resumo = document.getElementById('resumo');

const loginUsuario = document.getElementById('loginUsuario');
const loginSenha = document.getElementById('loginSenha');

const usuarioInput = document.getElementById('usuario');
const senhaInput = document.getElementById('senha');

const nomeInput = document.getElementById('nome');
const enderecoInput = document.getElementById('endereco');
const numeroInput = document.getElementById('numero');
const cepInput = document.getElementById('cep');
const emailInput = document.getElementById('email');
const cargoSelect = document.getElementById('cargo');

const btnEntrar = document.getElementById('btnEntrar');
const btnCadastrar = document.getElementById('btnCadastrar');
const btnSalvarDados = document.getElementById('btnSalvarDados');
const linkCadastro = document.getElementById('linkCadastro');
const linkVoltarLogin = document.getElementById('linkVoltarLogin');

const msgLogin = document.getElementById('msgLogin');
const msgCadastro = document.getElementById('msgCadastro');
const msgDados = document.getElementById('msgDados');

/* Helpers de UI */
const show = el => el && el.classList.remove('hidden');
const hide = el => el && el.classList.add('hidden');
const clearFields = inputs => inputs.forEach(i => i && (i.value = ''));

const setMsg = (el, text, isError = true) => {
  if (!el) return;
  el.textContent = text || '';
  el.style.color = isError ? '#b33' : '#0a7a2a';
};

/* Inicia eventos depois do DOM carregar */
document.addEventListener('DOMContentLoaded', () => {
  if (btnEntrar) btnEntrar.addEventListener('click', login);
  if (btnCadastrar) btnCadastrar.addEventListener('click', cadastrar);
  if (btnSalvarDados) btnSalvarDados.addEventListener('click', salvarDados);
  if (linkCadastro) linkCadastro.addEventListener('click', e => { e.preventDefault(); showCadastro(); });
  if (linkVoltarLogin) linkVoltarLogin.addEventListener('click', e => { e.preventDefault(); voltarLogin(); });

  // Exibição inicial
  show(loginForm);
  hide(cadastroForm);
  hide(formDados);
  hide(resumo);

  // Carrega dados já salvos (se houver) e mostra mensagem amigável
  const saved = JSON.parse(localStorage.getItem('dadosPessoais') || 'null');
  if (saved) {
    setMsg(msgLogin, 'Dados anteriores encontrados no dispositivo (apenas para demonstração). Faça login para editar.', false);
  }
});

/* Validações simples */
function isEmailValid(mail) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail || '');
}

/* Cadastro */
function cadastrar(e) {
  e && e.preventDefault();
  setMsg(msgCadastro, '');
  const usuario = (usuarioInput.value || '').trim();
  const senha = (senhaInput.value || '').trim();
  if (!usuario || !senha) {
    return setMsg(msgCadastro, 'Preencha usuário e senha.');
  }
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.usuario === usuario)) {
    return setMsg(msgCadastro, 'Usuário já existe. Escolha outro nome.');
  }
  users.push({ usuario, senha });
  localStorage.setItem('users', JSON.stringify(users));
  setMsg(msgCadastro, 'Cadastro realizado com sucesso. Faça login.', false);
  clearFields([usuarioInput, senhaInput]);
  setTimeout(() => { voltarLogin(); setMsg(msgCadastro, ''); }, 900);
}

/* Login */
function login(e) {
  e && e.preventDefault();
  setMsg(msgLogin, '');
  const user = (loginUsuario.value || '').trim();
  const pass = (loginSenha.value || '').trim();
  if (!user || !pass) return setMsg(msgLogin, 'Preencha usuário e senha.');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const match = users.find(u => u.usuario === user && u.senha === pass);
  if (match) {
    setMsg(msgLogin, '');
    clearFields([loginSenha]); // não mostrar senha
    hide(loginForm);
    show(formDados);
    // Preencher formulário de dados se já houver dados salvos
    const dados = JSON.parse(localStorage.getItem('dadosPessoais') || 'null');
    if (dados) {
      nomeInput.value = dados.nome || '';
      enderecoInput.value = dados.endereco || '';
      numeroInput.value = dados.numero || '';
      cepInput.value = dados.cep || '';
      emailInput.value = dados.email || '';
      cargoSelect.value = dados.cargo || '';
      setMsg(msgDados, 'Dados carregados do dispositivo. Edite e clique em Salvar.', false);
    }
  } else {
    setMsg(msgLogin, 'Usuário ou senha inválidos. Se não tem conta, clique em Criar conta.');
  }
}

/* Salvar dados pessoais */
function salvarDados(e) {
  e && e.preventDefault();
  setMsg(msgDados, '');
  const nome = (nomeInput.value || '').trim();
  const endereco = (enderecoInput.value || '').trim();
  const numero = (numeroInput.value || '').trim();
  const cep = (cepInput.value || '').trim();
  const email = (emailInput.value || '').trim();
  const cargo = (cargoSelect.value || '').trim();

  if (!nome || !endereco || !numero || !cep || !email || !cargo) {
    return setMsg(msgDados, 'Preencha todos os campos.');
  }
  if (!isEmailValid(email)) return setMsg(msgDados, 'E-mail inválido.');

  const dados = { nome, endereco, numero, cep, email, cargo, data: new Date().toISOString() };
  localStorage.setItem('dadosPessoais', JSON.stringify(dados));
  setMsg(msgDados, 'Dados salvos com sucesso.', false);

  // Exibir resumo limpo
  resumo.innerHTML = `
    <h3>Resumo</h3>
    <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
    <p><strong>Endereço:</strong> ${escapeHtml(endereco)}, ${escapeHtml(numero)}</p>
    <p><strong>CEP:</strong> ${escapeHtml(cep)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Cargo:</strong> ${escapeHtml(cargo)}</p>
    <p class="small">Dados salvos localmente no navegador (apenas demonstração).</p>
  `;
  hide(formDados);
  show(resumo);
}

/* Navegação */
function showCadastro() {
  hide(loginForm);
  show(cadastroForm);
  setMsg(msgLogin, '');
  setMsg(msgCadastro, '');
}
function voltarLogin() {
  hide(cadastroForm);
  hide(formDados);
  hide(resumo);
  show(loginForm);
  setMsg(msgDados, '');
  setMsg(msgCadastro, '');
}

/* Segurança mínima para exibir texto */
function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
