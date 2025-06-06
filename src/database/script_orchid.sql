CREATE DATABASE orchid;
USE orchid;

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
  telefone VARCHAR(15) NOT NULL,
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
  qtd_orquideas INT,
  fk_especie INT NOT NULL,
  CONSTRAINT fk_estufa_especie FOREIGN KEY (fk_especie) REFERENCES especie_orquidea(id),
    fk_empresa INT NOT NULL,
  CONSTRAINT fk_estufa_empresa FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

-- Tabela Sensor
CREATE TABLE sensor (
  id INT PRIMARY KEY AUTO_INCREMENT,
  status_sensor VARCHAR(12) NOT NULL,
  fk_estufa INT NOT NULL,
  CONSTRAINT fk_sensor_estufa FOREIGN KEY (fk_estufa) REFERENCES estufa(id)
);

-- Tabela Registro de Luminosidade
CREATE TABLE registro_luminosidade (
  id INT PRIMARY KEY AUTO_INCREMENT,
  intensidade_luz DECIMAL(10,2) NOT NULL,
  horario_registro DATETIME NOT NULL DEFAULT current_timestamp(),
  fk_sensor INT NOT NULL,
  CONSTRAINT fk_registro_sensor FOREIGN KEY (fk_sensor) REFERENCES sensor(id)
);

insert into empresa(nome,cnpj,email,senha,chave_ativacao,telefone)
 values('Empresa 1','123456789098765432','empresa@gmail.com','Empresa12@','funciona','123456789098765');
insert into especie_orquidea(nome_especie,faixa_min_lux,faixa_max_lux) values('Cattleya',2000,4000);
insert into estufa(nome_estufa,fk_especie,fk_empresa) values('Estufa 1',1,1);
insert into sensor(status_sensor,fk_estufa) values('Ativo',1);
insert into registro_luminosidade(intensidade_luz,horario_registro,fk_sensor) values(3000,DEFAULT,1);

SELECT * FROM empresa;
SELECT * FROM especie_orquidea;
SELECT * FROM estufa;
SELECT * FROM sensor;
SELECT * FROM registro_luminosidade;

-- filtro
SELECT 
es.nome_estufa as "Nome da estufa",
eo.nome_especie  as "Nome da especie",
eo.faixa_min_lux  as "luminosidade minima",
eo.faixa_max_lux  as "luminosidade maxima"
FROM estufa as es
JOIN especie_orquidea as eo
ON eo.id = es.fk_especie
WHERE es.fk_empresa = 1; 