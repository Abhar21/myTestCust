const fs = require('fs');
const p = '/Users/bhargav/Desktop/Vendor repo/Customer Landing page/src/pages/Home.tsx';
let content = fs.readFileSync(p, 'utf8');

// Replace card widths
content = content.replace(/minWidth: '340px', maxWidth: '340px'/g, "minWidth: '280px', maxWidth: '280px'");

// Replace bottom button (removing it)
const bottomBtnRegex = /<button style=\{\{ marginTop: '32px'[^>]+>\s*Show all 112 reviews\s*<\/button>/g;
content = content.replace(bottomBtnRegex, '');

// Replace header block with new layout
const headerRegex = /<div style=\{\{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' \}\}>[\s\S]*?<h2[^>]*>4\.9 · 112 reviews<\/h2>\s*<\/div>/g;

const newHeader = `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#222222" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        <span style={{ fontSize: '40px', fontWeight: '800', color: '#222222', lineHeight: '1', letterSpacing: '-1px' }}>4.9</span>
                      </div>
                      <div style={{ fontSize: '15px', color: '#717171', fontWeight: '500', marginTop: '8px' }}>112 reviews</div>
                    </div>
                    <button style={{ padding: '10px 18px', backgroundColor: '#ffffff', border: '1px solid #222222', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#222222', cursor: 'pointer', transition: 'background-color 0.2s', outline: 'none' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>
                      Show all 112 reviews
                    </button>
                  </div>`;

content = content.replace(headerRegex, newHeader);

fs.writeFileSync(p, content);
console.log("Updated Home.tsx");
