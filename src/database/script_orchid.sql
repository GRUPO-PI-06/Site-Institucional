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
insert into estufa(nome_estufa,qtd_orquideas,fk_especie,fk_empresa) values('Estufa 1',100,1,1);
insert into sensor(status_sensor,fk_estufa) values('Ativo',1);
insert into registro_luminosidade(intensidade_luz,horario_registro,fk_sensor) values(3000,DEFAULT,1);
insert into registro_luminosidade(intensidade_luz,horario_registro,fk_sensor) values(1000,DEFAULT,1);
insert into registro_luminosidade(intensidade_luz,horario_registro,fk_sensor) values(2200,DEFAULT,1);
insert into registro_luminosidade(intensidade_luz,horario_registro,fk_sensor) values(4540,DEFAULT,1);
insert into registro_luminosidade(intensidade_luz,horario_registro,fk_sensor) values(2354,DEFAULT,1);
insert into registro_luminosidade(intensidade_luz,horario_registro,fk_sensor) values(1534,DEFAULT,1);
insert into registro_luminosidade(intensidade_luz,horario_registro,fk_sensor) values(1235,DEFAULT,1);
insert into registro_luminosidade(intensidade_luz,horario_registro,fk_sensor) values(1235,DEFAULT,1);
insert into registro_luminosidade(intensidade_luz,horario_registro,fk_sensor) values(3222,'2025-06-04 20:17:25',1);
insert into registro_luminosidade(intensidade_luz,horario_registro,fk_sensor) values(1000,'2025-06-04 20:17:25',1);

SELECT * FROM empresa;
SELECT * FROM especie_orquidea;
SELECT * FROM estufa;
SELECT * FROM sensor;
SELECT * FROM registro_luminosidade;

-- FILTRO PARA ENTENDER SE A ESTUFA ESTA DENTRO DO PADRAO DE LUMINOSIDADE
SELECT 
es.nome_estufa as "Nome da estufa",
eo.nome_especie  as "Nome da especie",
eo.faixa_min_lux  as "luminosidade minima",
eo.faixa_max_lux  as "luminosidade maxima"
FROM estufa as es
JOIN especie_orquidea as eo
ON eo.id = es.fk_especie
WHERE es.fk_empresa = 1; 

-- KPI QUE CONTEM A MEDIA DE LUMINOSIDADE DA ESTUFA DE DETERMINADA EMPRESA
SELECT 
 ROUND(AVG(re.intensidade_luz),2)
 FROM estufa as es
 JOIN sensor as se
 ON es.id = se.fk_estufa 
 JOIN registro_luminosidade as re
 ON se.id = re.fk_sensor
 WHERE es.fk_empresa = 1;

 -- KPI LUMINOSIDADE ATUAL (MAIS RECENTE)
 SELECT re.intensidade_luz as "Ultimo registro" -- (MAIS RECENTE)
 FROM registro_luminosidade as re
 ORDER BY re.horario_registro; 

-- KPI pro geral(somar) as especifico(estufa)
 SELECT SUM(qtd_orquideas) FROM estufa where fk_empresa = 1; -- TUDO PERTENCE A UMA EMPRESA SÓ
 SELECT qtd_orquideas FROM estufa where fk_empresa = 1; -- TUDO PERTENCE A UMA EMPRESA SÓ

-- KPI PRA numero de vezes em q a estufa saiu do recomendado
SELECT
  day(rl.horario_registro) AS dia, -- PEGAMO O DIA 
  e.nome_estufa,
  COUNT(*) AS numero_de_desvios
FROM registro_luminosidade rl
JOIN sensor s ON rl.fk_sensor = s.id
JOIN estufa e ON s.fk_estufa = e.id
JOIN especie_orquidea eo ON e.fk_especie = eo.id
WHERE rl.intensidade_luz < eo.faixa_min_lux OR rl.intensidade_luz > eo.faixa_max_lux
GROUP BY dia, e.nome_estufa;

-- GRAFICO PIZZA // Total de orquideas por especie das estufas da empresa
SELECT eo.nome_especie,SUM(es.qtd_orquideas)
FROM estufa as es
JOIN especie_orquidea as eo 
ON eo.id = es.fk_especie
WHERE es.fk_empresa = 1
GROUP BY eo.nome_especie;

-- GRAFICO DE MEDIA POR SEMANA
SELECT
     DATE(horario_registro) as data_registro,
    AVG(intensidade_luz) as media_lux
    FROM registro_luminosidade
    GROUP BY DATE(horario_registro)
    LIMIT 7;