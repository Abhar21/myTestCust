const fs = require('fs');
const p = '/Users/bhargav/Desktop/Vendor repo/Customer Landing page/src/pages/Home.tsx';
let content = fs.readFileSync(p, 'utf8');

// 1. Remove bottom button
content = content.replace(/<button style=\{\{ marginTop: '32px'[^>]+>\s*Show all 112 reviews\s*<\/button>/g, '');

// 2. Rename top button
content = content.replace(
  /<button style=\{\{ padding: '10px 18px'[^>]+>\s*Show all 112 reviews\s*<\/button>/g,
  `<button style={{ padding: '10px 18px', backgroundColor: '#ffffff', border: '1px solid #222222', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#222222', cursor: 'pointer', transition: 'background-color 0.2s', outline: 'none' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>Show all</button>`
);

// 3. Reduce 4.9 font size
content = content.replace(
  /<span style=\{\{ fontSize: '40px', fontWeight: '800'/g,
  `<span style={{ fontSize: '36px', fontWeight: '800'`
);

// 4. Update divider
content = content.replace(
  /<div className="detail-left-divider" style=\{\{ margin: '48px 0', height: '1px', backgroundColor: '#e2e8f0' \}\}><\/div>/g,
  `<div style={{ width: '100%', height: '1px', backgroundColor: '#e2e8f0', marginTop: '48px', marginBottom: '48px' }}></div>`
);

fs.writeFileSync(p, content);
console.log("Updated Home.tsx second pass");
