const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000; // Para usar a porta que o Vercel fornece

// Middleware para parsear o corpo das requisições como URL encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Lista de empresas cadastradas
let empresas = [];

// Rota para exibir o formulário de cadastro
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html'); // Força a renderização do HTML
  res.send(`
    <h1>Cadastro de Empresas</h1>
    <form action="/cadastro" method="POST">
      <label for="cnpj">CNPJ:</label><br>
      <input type="text" id="cnpj" name="cnpj"><br>
      <label for="razao_social">Razão Social:</label><br>
      <input type="text" id="razao_social" name="razao_social"><br>
      <label for="nome">Nome:</label><br>
      <input type="text" id="nome" name="nome"><br>
      <label for="endereco">Endereço:</label><br>
      <input type="text" id="endereco" name="endereco"><br>
      <label for="cidade">Cidade:</label><br>
      <input type="text" id="cidade" name="cidade"><br>
      <label for="uf">UF:</label><br>
      <input type="text" id="uf" name="uf"><br>
      <label for="cep">CEP:</label><br>
      <input type="text" id="cep" name="cep"><br>
      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email"><br>
      <label for="telefone">Telefone:</label><br>
      <input type="text" id="telefone" name="telefone"><br>
      <button type="submit">Cadastrar</button>
    </form>
    <h2>Empresas Cadastradas</h2>
    <ul>
      ${empresas.map(empresa => `<li>${empresa.razao_social} (${empresa.cnpj})</li>`).join('')}
    </ul>
  `);
});

// Rota para processar o cadastro
app.post('/cadastro', (req, res) => {
  const { cnpj, razao_social, nome, endereco, cidade, uf, cep, email, telefone } = req.body;

  // Validação dos campos
  if (!cnpj || !razao_social || !nome || !endereco || !cidade || !uf || !cep || !email || !telefone) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(`
      <h1>Cadastro de Empresas</h1>
      <p style="color: red;">Todos os campos são obrigatórios!</p>
      <form action="/cadastro" method="POST">
        <label for="cnpj">CNPJ:</label><br>
        <input type="text" id="cnpj" name="cnpj" value="${cnpj || ''}"><br>
        <label for="razao_social">Razão Social:</label><br>
        <input type="text" id="razao_social" name="razao_social" value="${razao_social || ''}"><br>
        <label for="nome">Nome:</label><br>
        <input type="text" id="nome" name="nome" value="${nome || ''}"><br>
        <label for="endereco">Endereço:</label><br>
        <input type="text" id="endereco" name="endereco" value="${endereco || ''}"><br>
        <label for="cidade">Cidade:</label><br>
        <input type="text" id="cidade" name="cidade" value="${cidade || ''}"><br>
        <label for="uf">UF:</label><br>
        <input type="text" id="uf" name="uf" value="${uf || ''}"><br>
        <label for="cep">CEP:</label><br>
        <input type="text" id="cep" name="cep" value="${cep || ''}"><br>
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" value="${email || ''}"><br>
        <label for="telefone">Telefone:</label><br>
        <input type="text" id="telefone" name="telefone" value="${telefone || ''}"><br>
        <button type="submit">Cadastrar</button>
      </form>
      <h2>Empresas Cadastradas</h2>
      <ul>
        ${empresas.map(empresa => `<li>${empresa.razao_social} (${empresa.cnpj})</li>`).join('')}
      </ul>
    `);
  }

  // Adiciona a empresa à lista
  empresas.push({ cnpj, razao_social, nome, endereco, cidade, uf, cep, email, telefone });

  // Redireciona para a página de cadastro com as empresas cadastradas
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
