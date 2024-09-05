CREATE DATABASE mindcare;
USE mindcare;

-- Tabela de Usuários
CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Registro de Humor
CREATE TABLE registros_humor (
    registro_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    data TIMESTAMP,
    emocao VARCHAR(50),
    nivel_estresse INT,
    metricas_adicionais JSON,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

-- Tabela de Diário de Pensamentos
CREATE TABLE diario_pensamentos (
    entrada_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    data TIMESTAMP,
    categoria VARCHAR(50),
    conteudo TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

-- Tabela de Notificações de Lembretes
CREATE TABLE lembretes (
    lembrete_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tipo VARCHAR(50),
    frequencia VARCHAR(50),
    horario TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

-- Tabela de Ferramentas de Autoavaliação
CREATE TABLE autoavaliacoes (
    avaliacao_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    data TIMESTAMP,
    tipo_avaliacao VARCHAR(50),
    pontuacao INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

-- Tabela de Relatórios e Gráficos
CREATE TABLE relatorios (
    relatorio_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    data TIMESTAMP,
    tipo_relatorio VARCHAR(50),
    dados JSON,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

-- Tabela de Recursos Educacionais
CREATE TABLE recursos_educacionais (
    recurso_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    conteudo TEXT
);

-- Tabela de Exercícios de Relaxamento
CREATE TABLE exercicios_relaxamento (
    exercicio_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    conteudo TEXT
);

-- Tabela de Comunicação com Profissionais de Saúde
CREATE TABLE comunicacoes_saude (
    comunicacao_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    profissional_id INT,
    mensagem TEXT,
    horario TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

-- Tabela de Configurações de Privacidade
CREATE TABLE configuracoes_privacidade (
    configuracao_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    configuracoes JSON,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);


