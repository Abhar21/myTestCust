const fs = require('fs');
const p = '/Users/bhargav/Desktop/Vendor repo/Customer Landing page/src/pages/Home.tsx';
let content = fs.readFileSync(p, 'utf8');

const regex = /<span className="card-dot">·<\/span>\s*<span className="card-rating-inline"[\s\S]*?Verified<\/span>\s*<\/span>/g;
const matches = content.match(regex);
console.log(`Found ${matches ? matches.length : 0} matches for dot + Verified`);

content = content.replace(regex, '');

// There is one occurrence on line 3188: <h2>Verified caters in Hyderabad</h2>
// We should probably NOT touch that since it's a section header.
// What about line 1744? <span>Verified</span> inside selectedVendorDetail view?
const detailRegex = /<span className="card-dot">·<\/span>\s*<span className="card-rating-inline"[\s\S]*?<span>Verified<\/span>\s*<\/span>/g;
const detailMatches = content.match(detailRegex);
console.log(`Found ${detailMatches ? detailMatches.length : 0} matches for detail Verified`);
content = content.replace(detailRegex, '');

fs.writeFileSync(p, content);
