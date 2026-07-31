import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  
  const [showProfilePage, setShowProfilePage] = useState(true);
  const [showProfileOTPPage, setShowProfileOTPPage] = useState(false);
  const [editingProfileField, setEditingProfileField] = useState<'name' | 'mobile' | 'email' | null>(null);
  
  const [profileName, setProfileName] = useState('Bhargav A');
  const [profileMobile, setProfileMobile] = useState('9876543210');
  const [profileEmail, setProfileEmail] = useState('bhargav@example.com');
  const [origProfileMobile, setOrigProfileMobile] = useState('9876543210');
  const [origProfileEmail, setOrigProfileEmail] = useState('bhargav@example.com');
  const [profileOTP, setProfileOTP] = useState('');
  
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (showProfileOTPPage && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showProfileOTPPage, otpTimer]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      {showProfilePage && (
        <div
          className="profile-page-container"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#ffffff',
            zIndex: 100000,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            overflowY: 'auto'
          }}
        >
          <div className="profile-header">
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#222222', margin: 0 }}>
              Profile
            </h2>
            <button
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#222222'
              }}
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible' }}><path d="m6 6 20 20M26 6 6 26"></path></svg>
            </button>
          </div>

          <div className="profile-content">
            <div className="profile-card">
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: '600', color: '#222222', flexShrink: 0 }}>
                {profileName ? profileName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="profile-info">
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#222222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {profileName || 'User'}
                </div>
                <div style={{ fontSize: '14px', color: '#717171', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {profileMobile}
                </div>
                <div style={{ fontSize: '14px', color: '#717171', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {profileEmail}
                </div>
              </div>
            </div>

            <div className="profile-fields">
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#222222', marginBottom: '8px' }}>Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  readOnly={editingProfileField !== 'name'}
                  style={{ width: '100%', padding: '16px', paddingRight: '80px', borderRadius: '12px', border: '1px solid #b0b0b0', fontSize: '16px', boxSizing: 'border-box', background: editingProfileField !== 'name' ? '#f7f7f7' : '#ffffff', color: editingProfileField !== 'name' ? '#717171' : '#222222' }}
                />
                <button
                  onClick={() => {
                    if (editingProfileField === 'name') {
                      setEditingProfileField(null);
                    } else {
                      setEditingProfileField('name');
                    }
                  }}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: editingProfileField === 'name' ? '#059669' : '#222222',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  {editingProfileField === 'name' ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#222222', marginBottom: '8px' }}>Mobile number</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={profileMobile}
                  onChange={(e) => setProfileMobile(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  readOnly={editingProfileField !== 'mobile'}
                  style={{ width: '100%', padding: '16px', paddingRight: '80px', borderRadius: '12px', border: '1px solid #b0b0b0', fontSize: '16px', boxSizing: 'border-box', background: editingProfileField !== 'mobile' ? '#f7f7f7' : '#ffffff', color: editingProfileField !== 'mobile' ? '#717171' : '#222222' }}
                />
                <button
                  onClick={() => {
                    if (editingProfileField === 'mobile') {
                      if (profileMobile !== origProfileMobile) {
                        setShowProfilePage(false);
                        setOtpTimer(59);
                        setShowProfileOTPPage(true);
                      }
                      setEditingProfileField(null);
                    } else {
                      setEditingProfileField('mobile');
                    }
                  }}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: editingProfileField === 'mobile' ? '#059669' : '#222222',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  {editingProfileField === 'mobile' ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#222222', marginBottom: '8px' }}>Mail ID</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  readOnly={editingProfileField !== 'email'}
                  style={{ width: '100%', padding: '16px', paddingRight: '80px', borderRadius: '12px', border: '1px solid #b0b0b0', fontSize: '16px', boxSizing: 'border-box', background: editingProfileField !== 'email' ? '#f7f7f7' : '#ffffff', color: editingProfileField !== 'email' ? '#717171' : '#222222' }}
                />
                <button
                  onClick={() => {
                    if (editingProfileField === 'email') {
                      if (profileEmail !== origProfileEmail) {
                        setShowProfilePage(false);
                        setOtpTimer(59);
                        setShowProfileOTPPage(true);
                      }
                      setEditingProfileField(null);
                    } else {
                      setEditingProfileField('email');
                    }
                  }}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: editingProfileField === 'email' ? '#059669' : '#222222',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  {editingProfileField === 'email' ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Profile OTP Page */}
      {showProfileOTPPage && (
        <div className="profile-otp-overlay">
          <div className="profile-otp-panel">
          <button
            onClick={() => {
              setShowProfileOTPPage(false);
              setShowProfilePage(true);
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              marginBottom: '32px',
              textAlign: 'left',
              width: 'fit-content',
              color: '#222222',
              padding: 0
            }}
          >
            ←
          </button>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#222222', marginTop: 0, marginBottom: '24px', textAlign: 'left' }}>
            Verify Details
          </h2>
          <div style={{ textAlign: 'left', marginBottom: '24px' }}>
            <div style={{ fontSize: '15px', color: '#717171', marginBottom: '24px' }}>
              OTP sent to {profileMobile !== origProfileMobile ? profileMobile : profileEmail}
            </div>

            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={profileOTP}
              onChange={(e) => setProfileOTP(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #222222',
                fontSize: '18px',
                outline: 'none',
                boxSizing: 'border-box',
                letterSpacing: '4px',
                textAlign: 'center'
              }}
            />
          </div>
          <button
            disabled={profileOTP.length !== 6}
            onClick={() => {
              if (profileOTP.length === 6) {
                setOrigProfileMobile(profileMobile);
                setOrigProfileEmail(profileEmail);
                setProfileOTP('');
                setShowProfileOTPPage(false);
                setShowProfilePage(true);
              }
            }}
            style={{
              width: '100%',
              padding: '16px',
              background: '#e61e4d',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: profileOTP.length === 6 ? 'pointer' : 'not-allowed',
              opacity: profileOTP.length === 6 ? 1 : 0.5,
              marginTop: '24px'
            }}
          >
            Verify & Save
          </button>

          {profileMobile !== origProfileMobile && (
            <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: '#717171' }}>
              Didn't receive OTP?{' '}
              {otpTimer > 0 ? (
                <span style={{ color: '#222222', fontWeight: '600' }}>0:{String(otpTimer).padStart(2, '0')}</span>
              ) : (
                <button
                  onClick={() => setOtpTimer(59)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e61e4d',
                    fontWeight: '600',
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline'
                  }}
                >
                  Send again
                </button>
              )}
            </div>
          )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
