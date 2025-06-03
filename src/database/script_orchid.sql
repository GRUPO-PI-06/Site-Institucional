CREATE DATABASE orchid;
USE orchid;

select chave_ativacao from empresa;

-- Tabela Endereco
CREATE TABLE endereco (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cep CHAR(9) NOT NULL,
  logradouro VARCHAR(80),
  bairro VARCHAR(80),
  cidade VARCHAR(80),
  uf CHAR(2),
  numero VARCHAR(10) NOT NULL,
  complemento VARCHAR(100)
);

-- Tabela Empresa
CREATE TABLE empresa (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(80) NOT NULL,
  cnpj CHAR(18) NOT NULL UNIQUE,
  email VARCHAR(70) NOT NULL UNIQUE,
  senha CHAR(60) NOT NULL,
  chave_ativacao CHAR(8) NOT NULL UNIQUE,
  telefone VARCHAR(15) NOT NULL UNIQUE,
  fk_endereco INT,
  CONSTRAINT fk_empresa_endereco FOREIGN KEY (fk_endereco) REFERENCES endereco(id)
);

-- Tabela Funcionario
CREATE TABLE funcionario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(80) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  senha CHAR(60) NOT NULL,
  telefone VARCHAR(20),
  fk_empresa INT NOT NULL,
  CONSTRAINT fk_funcionario_empresa FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

-- Tabela Especie de Orquidea
CREATE TABLE especie_orquidea (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome_especie VARCHAR(50) NOT NULL,
  faixa_min_lux DECIMAL(10,2) NOT NULL,
  faixa_max_lux DECIMAL(10,2) NOT NULL
);

-- Tabela Estufa (antiga orquidario)
CREATE TABLE estufa (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome_estufa VARCHAR(100) NOT NULL,
  fk_especie INT NOT NULL,
  CONSTRAINT fk_estufa_especie FOREIGN KEY (fk_especie) REFERENCES especie_orquidea(id)
);

-- Tabela Sensor
CREATE TABLE sensor (
  id INT PRIMARY KEY AUTO_INCREMENT,
  status_sensor VARCHAR(12) NOT NULL,
  localizacao VARCHAR(100),
  fk_estufa INT NOT NULL,
  CONSTRAINT fk_sensor_estufa FOREIGN KEY (fk_estufa) REFERENCES estufa(id)
);

-- Tabela Registro de Luminosidade
CREATE TABLE registro_luminosidade (
  id INT PRIMARY KEY AUTO_INCREMENT,
  intensidade_luz DECIMAL(10,2) NOT NULL,
  horario_registro DATETIME NOT NULL,
  fk_sensor INT NOT NULL,
  CONSTRAINT fk_registro_sensor FOREIGN KEY (fk_sensor) REFERENCES sensor(id)
);

use orchid;
select * from empresa;
select id,chave_ativacao from empresa;
select * from funcionario;

SELECT f.nome from funcionario as f 
JOIN empresa as e ON e.id = f.fk_empresa 
WHERE  e.chave_ativacao = 'okzwwjcx' AND f.email = 'eae@eae.com' AND f.senha = 'dsada@12A'

