const fs = require('fs');
const p = '/Users/bhargav/Desktop/Vendor repo/Customer Landing page/src/pages/Home.tsx';
let content = fs.readFileSync(p, 'utf8');

const matches = content.match(/<span className="card-dot">·<\/span>\s*<span className="card-rating-inline"[\s\S]*?Verified<\/span>\s*<\/span>/g);
console.log(`Found ${matches ? matches.length : 0} matches`);

content = content.replace(/<span className="card-dot">·<\/span>\s*<span className="card-rating-inline"[\s\S]*?Verified<\/span>\s*<\/span>/g, '');
fs.writeFileSync(p, content);
