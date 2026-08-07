import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { homeListings, bestRatingListings, checkoutListings } from './Home';

const PartnerDetails: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const vendorName = searchParams.get('vendor') || 'Figma Caters';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find the vendor listing details if available
  const allListings = [...homeListings, ...bestRatingListings, ...checkoutListings];
  const vendor = allListings.find(item => item.title.toLowerCase() === vendorName.toLowerCase()) ||
    allListings.find(item => item.title.toLowerCase().includes(vendorName.toLowerCase())) ||
    allListings[0];

  const displayTitle = vendor ? (vendor.title.includes('Hyderabad') ? vendor.title : `${vendor.title} Hyderabad`) : 'Figma Caters Hyderabad';
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
