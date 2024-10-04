## Sumário

- [Sobre o projeto](#Sobre-o-projeto)
- [Tecnologias utilizadas](#Tecnologias-utilizadas)
- [Backlog do produto](#Backlog-do-produto)
- [Relatório de entregas](#Relatório-de-entregas)
- [Protótipo navegável](#Protótipo-navegável)
- [Modelo de Dados](#Modelo-de-Dados)
- [Como executar o projeto](#Como-executar-o-projeto)

## Sobre o projeto

O projeto MindCare é uma aplicação voltada para o bem-estar mental dos usuários, oferecendo funcionalidades como registro de humor, diário de pensamentos, notificações de lembretes, ferramentas de autoavaliação, relatórios e gráficos, recursos educacionais, exercícios de relaxamento, comunicação com profissionais de saúde e configurações de privacidade.

## Tecnologias utilizadas

Aqui estão as seguintes tecnologias que utilizamos:
- React Native para desenvolvimento do front-end
- Firebase para backend
- MySQL para banco de dados
- Figma para prototipação
- GitHub para controle de versão

## Backlog do Produto

| ID  | Sprint | Categoria | Tarefa |
|:---:|:------:|:---------:|:------:|
| 01  | Kick-off      | FrontEnd  | Criação do mockup do projeto no Figma |    
| 02  | Kick-off      | FrontEnd  | Conversão do mockup em protótipo navegável | 
| 03  | 1      | BackEnd   | Desenvolvimento da API para registro de humor | 
| 04  | 1      | BackEnd   | Desenvolvimento da API para diário de pensamentos | 
| 05  | 1      | FrontEnd  | Implementação da interface de registro de humor | 
| 06  | 1      | FrontEnd  | Implementação da interface do diário de pensamentos | 
| 07  | 2      | BackEnd   | Desenvolvimento da API para exercícios de relaxamento |
| 08  | 2      | BackEnd   | Desenvolvimento da API para recursos educacionais | 
| 09  | 2      | FrontEnd  | Implementação da interface de exercícios de relaxamento | 
| 10  | 2      | FrontEnd  | Implementação da interface de recursos educacionais |  
| 11  | 3      | BackEnd   | Desenvolvimento da API para autoavaliação | 
| 12  | 3      | BackEnd   | Desenvolvimento da API para relatórios e gráficos | 
| 13  | 3      | FrontEnd  | Implementação da interface de autoavaliação |
| 14  | 3      | FrontEnd  | Implementação da interface de relatórios e gráficos |
| 15  | 4      | BackEnd   | Desenvolvimento da API para comunicação com profissionais de saúde | 
| 16  | 4      | BackEnd   | Desenvolvimento da API para configurações de perfil | 
| 17  | 4      | BackEnd   | Desenvolvimento da API para notificações | 
| 18  | 4      | FrontEnd  | Implementação da interface de comunicação com profissionais de saúde | 
| 19  | 4      | FrontEnd  | Implementação da interface de configurações de perfil |
| 20  | 4      | FrontEnd  | Implementação da interface de notificações |  

## Relatório de entregas

| Sprint | Período | Status | Relatório |
|:-----:|:----------:|:---------:|:---------:|
| 1 | 02/09/2024 - 09/09/2024 | Concluído | [Ver relatório](#Kick-off)|
| 2 | 09/09/2024 - 29/09/2024 | Concluído | [Ver relatório](https://github.com/Katianefatec/MindCare/tree/sprint-1)|
| 3 | 04/10/2024 - 25/10/2024 | Planejado | [Ver relatório](#Sprint-2)| 
| 4 | 26/10/2024 - 15/11/2024 | Planejado | [Ver relatório](#Sprint-3)|
| 5 | 15/11/2024 - 06/12/2024 | Planejado | [Ver relatório](#Sprint-4)|

## Protótipo navegável

[![Protótipo MindCare](doc/assets/prototipo.jpg)](https://www.figma.com/proto/gaXVVA2U5GE9fN5eV7eZlH/MindCare?node-id=202-4&node-type=FRAME&t=VeZMjJBzqGrUvI4Y-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=223%3A58)

## Modelo de Dados

<img src="/doc/assets/modeloLogico.jpg" alt="Modelo Lógico do Banco de Dados">

## Como executar o projeto

Para executar o projeto usando Expo, siga os passos abaixo:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/Katianefatec/MindCare.git
   cd MindCare

2. **Instale as dependências**:

   ```bash
   npm install

3.  **Execute o projeto**:

   ```bash
   npx expo start  
