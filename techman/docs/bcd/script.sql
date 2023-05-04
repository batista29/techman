LOAD DATA INFILE 'C:/Users/SUPORTE/Desktop/techman/techman/docs/csv/perfis.csv'
INTO TABLE perfil
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/Users/SUPORTE/Desktop/techman/techman/docs/csv/usuarios.csv'
INTO TABLE Usuario
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/Users/SUPORTE/Desktop/techman/techman/docs/csv/equipamentos.csv'
INTO TABLE Equipamentos
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/Users/SUPORTE/Desktop/techman/techman/docs/csv/comentarios.csv'
INTO TABLE Comentarios
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;