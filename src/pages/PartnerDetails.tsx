import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { homeListings, bestRatingListings, checkoutListings } from './Home';

const PartnerDetails: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const vendorName = searchParams.get('vendor') || 'Anapurna Caterings';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find the vendor listing details if available
  const allListings = [...homeListings, ...bestRatingListings, ...checkoutListings];
  const vendor = allListings.find(item => item.title.toLowerCase() === vendorName.toLowerCase()) ||
    allListings.find(item => item.title.toLowerCase().includes(vendorName.toLowerCase())) ||
    allListings[0];

  const displayTitle = vendor ? (vendor.title.includes('Hyderabad') ? vendor.title : `${vendor.title} Hyderabad`) : 'Anapurna Caterings Hyderabad';
  const displayRating = vendor ? vendor.rating : '4.1';

  // Helper to generate dynamic looking details
  const legalName = displayTitle.toUpperCase() + ' PRIVATE LIMITED';

  // Format string for GST: e.g. 36 + characters from title + 3AB
  const cleanTitle = displayTitle.replace(/[^a-zA-Z]/g, '').toUpperCase();
  const rawGst = `36${(cleanTitle + 'XXXXXXXXXXXX').substring(0, 10)}1Z1`;
  const gstNum = rawGst.substring(0, 2) + 'x'.repeat(rawGst.length - 4) + rawGst.substring(rawGst.length - 2);
  const fssaiNo = '12345678909876';

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div style={{
      background: '#ffffffff',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#222222',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        position: 'sticky',
        top: 0,
        background: '#ffffff',
        zIndex: 10,
        boxShadow: '0 1px 3px rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid #ffffffff'
      }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '750', color: '#222222' }}>myPartner details</h2>
        <button onClick={handleClose} style={{
          background: 'none',
          border: 'none',
          padding: '8px',
          marginRight: '-8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#222222'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>

        {/* Card 1: Vendor Profile Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '750', color: '#222222', lineHeight: '1.2' }}>
                {displayTitle}
              </h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#717171', lineHeight: '1.4' }}>
                Ishta meals and Restaurant, Gachibowli, Hyderabad
              </p>

              {/* Rating badge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#00ad2f',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '13px',
                  gap: '4px'
                }}>
                  <span>★</span>
                  <span>{displayRating}</span>
                </div>
                <span style={{ fontSize: '11px', color: '#717171', fontWeight: '500', marginLeft: '2px' }}>from 1k+</span>
              </div>

              {/* Verified badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12.42 2 12.83 2.12 13.18 2.34L14.73 3.32C15.08 3.54 15.49 3.66 15.91 3.66L17.75 3.66C18.85 3.66 19.75 4.56 19.75 5.66L19.75 7.5C19.75 7.92 19.87 8.33 20.09 8.68L21.07 10.23C21.6 11.08 21.6 12.16 21.07 13.01L20.09 14.56C19.87 14.91 19.75 15.32 19.75 15.74L19.75 17.58C19.75 18.68 18.85 19.58 17.75 19.58L15.91 19.58C15.49 19.58 15.08 19.7 14.73 19.92L13.18 20.9C12.46 21.36 11.54 21.36 10.82 20.9L9.27 19.92C8.92 19.7 8.51 19.58 8.09 19.58L6.25 19.58C5.15 19.58 4.25 18.68 4.25 17.58L4.25 15.74C4.25 15.32 4.13 14.91 3.91 14.56L2.93 13.01C2.4 12.16 2.4 11.08 2.93 10.23L3.91 8.68C4.13 8.33 4.25 7.92 4.25 7.5L4.25 5.66C4.25 4.56 5.15 3.66 6.25 3.66L8.09 3.66C8.51 3.66 8.92 3.54 9.27 3.32L10.82 2.34C11.17 2.12 11.58 2 12 2Z" fill="#3b82f6" />
                  <path d="M10.75 15.25C10.55 15.25 10.36 15.17 10.22 15.03L7.72 12.53C7.43 12.24 7.43 11.76 7.72 11.47C8.01 11.18 8.49 11.18 8.78 11.47L10.75 13.44L15.22 8.97C15.51 8.68 15.99 8.68 16.28 8.97C16.57 9.26 16.57 9.74 16.28 10.03L11.28 15.03C11.14 15.17 10.95 15.25 10.75 15.25Z" fill="white" />
                </svg>
                <span style={{ color: '#3b82f6', fontWeight: '500', fontSize: '13px' }}>Verified</span>
              </div>
            </div>
          </div>


        </div>

        {/* Card 2: Legal Details Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#717171', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Legal Name</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#484848' }}>{legalName}</div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px dashed #e2e8f0', margin: 0 }} />

          <div>
            <div style={{ fontSize: '10px', color: '#717171', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>GST Number</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#484848' }}>{gstNum}</div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px dashed #e2e8f0', margin: 0 }} />

          <div>
            <div style={{ fontSize: '10px', color: '#717171', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>FSSAI Lic No</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#484848' }}>{fssaiNo}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PartnerDetails;
