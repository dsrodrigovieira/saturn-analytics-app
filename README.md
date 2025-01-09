# Saturn Analytics

Saturn Analytics é uma aplicação web desenvolvida para apresentar um painel de indicadores assistenciais, com o objetivo de auxiliar a gestão da saúde hospitalar. A aplicação consome dados de uma API e transforma essas informações em KPIs interativos para facilitar a tomada de decisão.

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: API que fornece dados para a aplicação (não inclusa neste repositório)
- **Hospedagem**: [Vercel](https://vercel.com/)

## Funcionalidades

- Visualização de indicadores assistenciais.
- Interface intuitiva para fácil navegação e compreensão dos indicadores.

## Deploy

A aplicação está hospedada no Vercel e pode ser acessada [aqui](https://saturn-analytics.vercel.app).

## Estrutura do Projeto

```plaintext
/
├── index.html          # Página inicial da aplicação
├── home.html           # Página principal da aplicação
├── assets/             
│   ├── css/
|   │   ├── index.css   # Estilos da página inicial
|   │   ├── home.css    # Estilos da página principal
│   ├── js/
|   |   ├── app.js      # Lógica principal da aplicação
|   |   ├── index.js    # Lógica da página inicial
|   |   ├── home.js     # Lógica da página principal
|   |   ├── data.js     # Dados adicionais da aplicação
├── LICENSE             # Tipo de licença
└── README.md           # Documentação do projeto
```

## Objetivo

A aplicação tem como foco facilitar a coleta, o cálculo e o envio de dados para a API que apresenta indicadores em um painel de controle. Esses indicadores visam melhorar a tomada de decisão e a gestão hospitalar, promovendo eficiência e qualidade nos serviços de saúde. Os indicadores se baseiam nos 14 KPIs propostos pela ANS através do [**Programa de Monitoramento da Qualidade dos Prestadores de Serviços Diagnósticos na Saúde Suplementar – PM-QUALISS**](https://www.gov.br/ans/pt-br/assuntos/prestadores/qualiss-programa-de-qualificacao-dos-prestadores-de-servicos-de-saude-1), que incentiva a melhoria da qualidade dos serviços prestados pelos hospitais brasileiros.

## Instalação e Uso

### Pré-requisitos

Para rodar a aplicação localmente, você precisará de um navegador web atualizado.

### Passos para Rodar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/dsrodrigovieira/saturn-analytics-app.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd saturn-analytics-app
   ```

3. Abra o arquivo `index.html` em seu navegador.

### Contribuição
Contribuições são bem-vindas! Se você deseja melhorar o projeto ou reportar problemas, sinta-se à vontade para abrir uma issue ou enviar um pull request.

### Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

### Contato
Para dúvidas ou sugestões, entre em contato com:
- **Rodrigo Vieira**
    - Email: dsrodrigovieira@gmail.com
    - LinkedIn: [dsrodrigovieira](https://linkedin.com/in/dsrodrigovieira)
