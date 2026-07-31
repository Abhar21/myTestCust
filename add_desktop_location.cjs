const fs = require('fs');

// 1. Update Home.tsx
const homePath = '/Users/bhargav/Desktop/Vendor repo/Customer Landing page/src/pages/Home.tsx';
let homeContent = fs.readFileSync(homePath, 'utf8');

homeContent = homeContent.replace(
  /className="mobile-location-badge"/g,
  'className="mobile-location-badge desktop-location-badge"'
);

fs.writeFileSync(homePath, homeContent);

// 2. Update App.css
const appCssPath = '/Users/bhargav/Desktop/Vendor repo/Customer Landing page/src/App.css';
let appCssContent = fs.readFileSync(appCssPath, 'utf8');

const desktopBadgeCss = `
/* Desktop Location Badge (matches responsive but for desktop) */
@media (min-width: 769px) {
  .desktop-location-badge {
    display: flex !important;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 20px;
    margin: 0 auto 16px auto;
    cursor: pointer;
    color: #222222;
    transition: background-color 0.2s;
    width: fit-content;
  }
  .desktop-location-badge:hover {
    background-color: #f7f7f7;
  }
  .desktop-location-badge .badge-name {
    font-size: 14px;
    font-weight: 700;
  }
  .desktop-location-badge .badge-full {
    font-size: 14px;
    color: #717171;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
  }
  .desktop-location-badge .badge-chevron {
    color: #717171;
  }
}
`;

appCssContent = appCssContent.replace(
  /\/\* Center Tabs \*\//g,
  desktopBadgeCss + '\n/* Center Tabs */'
);

fs.writeFileSync(appCssPath, appCssContent);
console.log("Updated Home.tsx and App.css for desktop location badge");
