LOAD DATA LOCAL INFILE '/Users/gabeyamartino/desktop/repos/trilobyte-io/exampleData/tempHumidity.csv'
INTO TABLE tempHum
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, time, temperature, humidity);