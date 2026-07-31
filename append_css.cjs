const fs = require('fs');
const appCssPath = '/Users/bhargav/Desktop/Vendor repo/Customer Landing page/src/App.css';

const desktopTabsCss = `

/* Desktop specific overrides for Image 1 services design */
@media (min-width: 769px) {
  .center-tabs {
    gap: 12px;
  }

  .tab-item {
    flex-direction: row !important;
    padding: 10px 24px !important;
    border: 1px solid #e2e8f0;
    border-radius: 30px;
    gap: 10px !important;
    color: #4b5563 !important; /* Slightly faded text for inactive */
    justify-content: center;
  }

  .tab-item:hover {
    border-color: #222222;
    color: #222222 !important;
  }

  .tab-item.active {
    border: 1px solid #222222;
    color: #222222 !important;
  }

  .tab-item.active::after {
    display: none !important;
  }

  .tab-badge {
    left: auto !important;
    right: 10px !important;
    top: -8px !important;
    transform: none !important;
  }
}
`;

fs.appendFileSync(appCssPath, desktopTabsCss);
console.log("Appended desktop tabs CSS");
