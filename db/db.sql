DROP TABLE IF EXISTS customers cascade;

DROP TABLE IF EXISTS tempHum;

CREATE TABLE tempHum (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time DATETIME,
  temperature INT,
  humidity INT
);