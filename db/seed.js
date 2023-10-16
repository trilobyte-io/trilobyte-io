import pool from "./connect.js";

// Your array of data objects
const data = [
    {id: 1, time: '2023-09-19T14:40:57.000Z', temperature: '26.44998932', humidity: '60.07156372', lux: '20.81809235'},
    {id: 2, time: '2023-09-19T14:42:16.000Z', temperature: '26.42328644', humidity: '59.95712280', lux: '21.40137482'},
    {id: 3, time: '2023-09-19T14:43:08.000Z', temperature: '26.40726471', humidity: '59.99717712', lux: '18.67841339'},
    {id: 4, time: '2023-09-19T14:48:08.000Z', temperature: '22.24956512', humidity: '58.95765686', lux: '57.38797379'},
    {id: 5, time: '2023-09-19T14:53:08.000Z', temperature: '22.62340546', humidity: '58.01159668', lux: '2518.11792000'},
    {id: 6, time: '2023-09-19T14:57:12.000Z', temperature: '59.25375366', humidity: '57.67780304', lux: '2520.19848600'},
    {id: 7, time: '2023-09-19T14:57:16.000Z', temperature: '55.07736206', humidity: '55.55107880', lux: '2521.39233400'},
    {id: 8, time: '2023-09-19T14:57:19.000Z', temperature: '55.04531860', humidity: '56.30640030', lux: '2521.62011700'},
    {id: 9, time: '2023-09-19T14:57:22.000Z', temperature: '55.02929688', humidity: '56.67452240', lux: '2521.68701200'},
    {id: 10, time: '2023-09-19T14:57:25.000Z', temperature: '55.01327515', humidity: '56.81567383', lux: '2522.84765600'},
    {id: 11, time: '2023-09-19T14:57:29.000Z', temperature: '54.98924255', humidity: '56.94918823', lux: '2522.29760700'},
    {id: 12, time: '2023-09-19T14:57:32.000Z', temperature: '54.99458313', humidity: '57.01785278', lux: '2522.00903300'},
    {id: 13, time: '2023-09-19T14:57:35.000Z', temperature: '54.99725342', humidity: '57.02357483', lux: '2521.62011700'},
    {id: 14, time: '2023-09-19T14:57:38.000Z', temperature: '54.98390198', humidity: '57.03692627', lux: '2523.42480500'},
    {id: 15, time: '2023-09-19T14:57:42.000Z', temperature: '55.00526428', humidity: '57.05027771', lux: '2521.58691400'},
    {id: 16, time: '2023-09-19T14:57:45.000Z', temperature: '55.01594543', humidity: '57.05218506', lux: '2521.07031300'},
    {id: 17, time: '2023-09-19T14:57:48.000Z', temperature: '55.00793457', humidity: '57.01213074', lux: '2522.10327100'},
    {id: 18, time: '2023-09-19T14:57:51.000Z', temperature: '54.99992371', humidity: '57.00068665', lux: '2518.39404300'},
    {id: 19, time: '2023-09-19T14:57:55.000Z', temperature: '54.99191284', humidity: '56.99114990', lux: '2520.39282200'},
    {id: 20, time: '2023-09-19T14:57:58.000Z', temperature: '55.00526428', humidity: '56.98161316', lux: '2520.48706100'},
    {id: 21, time: '2023-09-19T14:58:01.000Z', temperature: '55.02929688', humidity: '56.99496460', lux: '2521.06445300'},
    {id: 22, time: '2023-09-19T14:58:04.000Z', temperature: '55.02395630', humidity: '56.99496460', lux: '2520.42041000'},
    {id: 23, time: '2023-09-19T14:58:08.000Z', temperature: '55.02395630', humidity: '56.99496460', lux: '2520.45385700'},
    {id: 24, time: '2023-09-19T14:58:11.000Z', temperature: '55.03463745', humidity: '57.01022339', lux: '2519.64868200'},
    {id: 25, time: '2023-09-19T14:58:14.000Z', temperature: '55.02662659', humidity: '56.97589111', lux: '2519.68188500'}
];


data.forEach((item) => {
  pool.execute(
    'INSERT INTO tempHum (id, time, temperature, humidity, lux) VALUES (?, ?, ?, ?, ?)',
    [item.id, item.time, item.temperature, item.humidity, item.lux],
    (error, results) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log(`Inserted ID ${results.insertId}`);
      }
    }
  );
});

// Close the pool when done (optional)
pool.end((poolError) => {
  if (poolError) {
    console.error(poolError.message);
  } else {
    console.log('Connection pool closed.');
  }
});

