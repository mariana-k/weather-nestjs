const fs = require('fs');
const path = require('path');

// Read the index.html file
const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Replace environment variables
content = content.replace(
  'process.env.API_URL',
  `'${process.env.API_URL || 'http://localhost:3000'}'`
);

// Write the modified file
fs.writeFileSync(indexPath, content); 