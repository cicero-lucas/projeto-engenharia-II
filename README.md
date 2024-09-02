[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[JavaScript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[Docker]:https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[NodeJS]:https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Express.js]:https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[React]:https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[MongoDB]:https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white


<h1 align="center">TecBlog.click </h1>



<p> 📌tecBlog é uma plataforma de blog focada em tecnologia, desenvolvida com Node.js, React, e MongoDB. Permite aos usuários criar e gerenciar postagens de forma intuitiva, incluindo a capacidade de adicionar links em seus textos. </p>
<hr>



![CSS3]
![javaScript]
![Docker]
![NodeJS]
![Express.js]
![React]
![MongoDB]

<p align="center">
 <a href="#about">Sobre</a> • • 
  <a href="#fucionalidade">Funcionalidade</a> • • 
 <a href="#inicio">Começando</a> • • 
 <a href="#usar">Como Usar</a> • • 
 <a href="#dificudade"> Dificuldades Conhecidas </a> > • • 
 <a href="#colabor"> Colaboradores </a> 
</p>

<h2 id="about">📝Sobre</h2>
tecBlog é uma plataforma de blog focada em tecnologia, desenvolvida com Node.js, React, e MongoDB. Permite aos usuários criar e gerenciar postagens de forma intuitiva, incluindo a capacidade de adicionar links em seus textos.
<ul>
<li>Crie uma lista personalizada de posts: Adicione posts do seu interesse e mantenha um registro das suas leituras.</li>
<li> Visualize detalhes dos posts: Obtenha informações detalhadas sobre cada posts, como título, autores, descrição e imagem da capa. </li>
<li>Gerencie seus favoritos: Marque posts como favoritos e remova-os conforme necessário. </li>
</ul>
<p>

### Principais Características

- **Criação de Postagens**: Permite aos usuários criar postagens sobre qualquer tema de tecnologia, adicionando texto rico e links relevantes.
- **Edição e Exclusão de Postagens**: Usuários podem editar e excluir suas postagens a qualquer momento.
- **Visualização de Postagens**: Possibilidade de visualizar postagens detalhadamente, com suporte para links embutidos e formatação de texto.
- **Favoritar Postagens**: Usuários podem marcar postagens como favoritas para fácil acesso posterior.
- **Comentários**: Habilita os usuários a comentarem em postagens, promovendo discussões e interação.
- **Gerenciamento de Favoritos**: Fácil gerenciamento de postagens favoritas, incluindo a possibilidade de adicionar ou remover postagens dos favoritos.

## 🚀 Funcionalidades <a name="funcionalidades"></a>

1. **Favoritar Postagens**: 
   - Adicione postagens aos favoritos para fácil acesso.
   - Visualize uma lista personalizada das postagens marcadas como favoritas.
   - Remova postagens dos favoritos quando desejar.

2. **Criar Postagens**: 
   - Interface simples para criar novas postagens com campos para título, conteúdo e links.
   - Permite a formatação básica do texto para melhorar a legibilidade.

3. **Editar e Deletar Postagens**: 
   - Editar postagens existentes para atualizar ou corrigir informações.
   - Remover postagens que não são mais relevantes ou desejadas.

4. **Visualizar Postagens**: 
   - Acesso a detalhes completos das postagens, incluindo título, autor, data de publicação, e conteúdo.
   - Suporte para links clicáveis embutidos no conteúdo da postagem.

5. **Comentar em Postagens**: 
   - Adicionar comentários a postagens para iniciar discussões ou fornecer feedback.
   - Moderação básica para gerenciar comentários inapropriados.

## 📦 Começando <a name="comecando"></a>

### Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [MongoDB](https://www.mongodb.com/) (para banco de dados)
- [Docker](https://www.docker.com/) (opcional, para executar o ambiente de desenvolvimento com contêineres)

### Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/cicero-lucas/projeto-engenharia-II.git
   cd nome pasta
   ```

2. **Instale as dependências do servidor e do cliente**:

   ```bash
   # Instala dependências do servidor
   cd backend
   npm install

   # Instala dependências do cliente
   cd ./frontend/app
   npm install
   ```

3. **Configuração do Banco de Dados**:

   Certifique-se de que o MongoDB esteja rodando em sua máquina. Configure a string de conexão no arquivo de configuração.

4. **Executar o projeto**:

   ```bash


   # No diretório do cliente
   npm run dev
   ```

5. **Usando Docker (opcional)**:

   ```bash
   docker-compose up --build
   ```

   Isso criará e iniciará os contêineres para o servidor e o cliente.

## 📖 Como Usar <a name="como-usar"></a>

1. **Acessar o Blog**: Abra seu navegador e navegue para `http://localhost:3000` para acessar a interface do cliente React.
2. **Criar uma Conta**: Cadastre-se ou faça login para começar a usar o blog.
3. **Postar Conteúdo**: Use o botão "Nova Postagem" para criar uma nova postagem. Preencha o título, conteúdo e adicione quaisquer links relevantes.
4. **Editar ou Deletar Postagens**: Vá para suas postagens e use as opções de editar ou deletar conforme necessário.
5. **Favoritar e Comentar**: Marque postagens como favoritas para fácil acesso, ou comente em postagens para interagir com outros usuários.

## ⚠️ Dificuldades Conhecidas <a name="dificuldades-conhecidas"></a>

- **Sincronização de Favoritos**: Às vezes, pode haver um pequeno atraso ao adicionar ou remover postagens dos favoritos devido a problemas de sincronia com o backend.
- **Validação de Formulários**: A validação de entrada do usuário nos formulários pode ser melhorada para uma experiência de usuário mais robusta.
- **Escalabilidade**: O aplicativo está configurado para um ambiente de desenvolvimento e pode precisar de ajustes adicionais para produção, especialmente no que diz respeito à escalabilidade e desempenho.

## 🤝 Colaboradores <a name="colaboradores"></a>

- **Cicero Lucas** - Desenvolvedor e Gerente
- **Bruno Sampaio** - Analista
- **Rose** - Arquiteta
- **Junio** - Desenvolvedor
- **wesly** - Desenvolvedor
- **Testadores** - Bruno e Rose

