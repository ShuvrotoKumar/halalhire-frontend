import http from 'http';
import fs from 'fs';

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('page.html', data);
    console.log("Saved page.html");
  });
}).on("error", (err) => console.log("Error: " + err.message));
