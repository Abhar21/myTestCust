import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const [bookingsSearchQuery, setBookingsSearchQuery] = useState('');
  const navigate = useNavigate();

  // Upcoming booking countdown
  const eventDate = new Date('2026-07-31T08:00:00');
  const getTimeLeft = () => {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Star rating for completed booking
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [popupRating, setPopupRating] = useState(0);
  const [popupHoverRating, setPopupHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Rounded SVG star
  const RoundedStar = ({ active, size = 22 }: { active: boolean; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 51 48" fill="none">
      <path
        d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
        fill={active ? '#f59e0b' : '#e5e7eb'}
        stroke={active ? '#f59e0b' : '#e5e7eb'}
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );

  const handleStarClick = (star: number) => {
    setRating(star);
    setPopupRating(star);
    setShowReviewPopup(true);
  };

  const handleSubmitReview = () => {
    setSubmitted(true);
    setTimeout(() => {
      setShowReviewPopup(false);
      setSubmitted(false);
    }, 1500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        zIndex: 100000,
        overflowY: 'auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '40px 24px 0 24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#222222', margin: 0 }}>
          Bookings
        </h2>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            marginRight: '-8px',
            cursor: 'pointer',
            color: '#222222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '24px', padding: '0 24px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5" style={{ position: 'absolute', left: '40px', top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search bookings..."
          value={bookingsSearchQuery}
          onChange={(e) => setBookingsSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '16px 16px 16px 48px',
            borderRadius: '12px',
            border: '1px solid #ddd',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 24px 64px 24px' }}>

        {/* ── Upcoming Booking Card ── */}
        <div
          onClick={() => navigate('/booking-detail', { state: { booking: { name: 'Sri Venkata Carters', eventDate: '31 July 2026', eventDateRaw: '2026-07-31T08:00:00', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=200&h=200', location: 'Road No. 21, Building 3B, Flat 406, Gachibowli, Hyderabad, Telangana, 500032' } } })}
          style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: '24px', backgroundColor: '#ffffff', filter: 'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.08))', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px' }}>
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=200&h=200"
              alt="Venue"
              style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '12px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#222222', margin: 0 }}>Sri Venkata Carters</h3>
              <div style={{ fontSize: '12px', fontWeight: '500', color: '#717171' }}>Event: 31 July 2026</div>
              <div style={{ fontSize: '12px', fontWeight: '500', color: '#059669' }}>Upcoming</div>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '100%' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>Location</div>
              <div style={{ fontSize: '12px', color: '#717171', lineHeight: '1.5' }}>
                Road No. 21, Building 3B, Flat 406, Gachibowli, Hyderabad, Telangana, 500032
              </div>
            </div>

            {timeLeft && (
              <>
                <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '100%' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Event Countdown</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[{ label: 'Days', val: timeLeft.days }, { label: 'Hrs', val: timeLeft.hours }, { label: 'Min', val: timeLeft.minutes }, { label: 'Sec', val: timeLeft.seconds }].map(({ label, val }) => (
                      <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', backgroundColor: '#f8fafc', borderRadius: '10px', padding: '8px 4px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: '#222222', lineHeight: 1 }}>{String(val).padStart(2, '0')}</span>
                        <span style={{ fontSize: '10px', fontWeight: '500', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Completed Booking Card ── */}
        <div
          onClick={() => navigate('/booking-detail', { state: { booking: { name: 'Grand Spice Kitchen', eventDate: '10 June 2026', eventDateRaw: '2026-06-10T08:00:00', status: 'Completed', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=200&h=200', location: 'Plot 12, Jubilee Hills, Hyderabad, Telangana, 500033' } } })}
          style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: '24px', backgroundColor: '#ffffff', filter: 'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.08))', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px' }}>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=200&h=200"
              alt="Venue"
              style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '12px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#222222', margin: 0 }}>Grand Spice Kitchen</h3>
              <div style={{ fontSize: '12px', fontWeight: '500', color: '#717171' }}>Event: 10 June 2026</div>
              <div style={{ fontSize: '12px', fontWeight: '500', color: '#9ca3af' }}>Completed</div>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '100%' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>Location</div>
              <div style={{ fontSize: '12px', color: '#717171', lineHeight: '1.5' }}>
                Plot 12, Jubilee Hills, Hyderabad, Telangana, 500033
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '100%' }}></div>

            {/* Star Rating */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Rate your experience</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{
                      background: 'none', border: 'none', padding: 0,
                      cursor: 'pointer', lineHeight: 1,
                      transition: 'transform 0.1s ease',
                      transform: hoverRating >= star || rating >= star ? 'scale(1.2)' : 'scale(1)'
                    }}
                  >
                    <RoundedStar active={hoverRating >= star || rating >= star} size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Review Popup Modal */}
      {showReviewPopup && (
        <div
          onClick={() => setShowReviewPopup(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200000,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            backdropFilter: 'blur(2px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '480px',
              backgroundColor: '#ffffff',
              borderRadius: '28px 28px 0 0',
              padding: '24px 24px 40px',
              display: 'flex', flexDirection: 'column', gap: '24px',
              boxShadow: '0 -4px 40px rgba(0,0,0,0.12)'
            }}
          >
            {/* Handle */}
            <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb', margin: '0 auto -4px' }}></div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#222222' }}>Rate your experience</div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>Grand Spice Kitchen</div>
            </div>

            {/* Stars in popup */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setPopupRating(star)}
                  onMouseEnter={() => setPopupHoverRating(star)}
                  onMouseLeave={() => setPopupHoverRating(0)}
                  style={{
                    background: 'none', border: 'none', padding: 4, cursor: 'pointer',
                    transition: 'transform 0.1s ease',
                    transform: popupHoverRating >= star || popupRating >= star ? 'scale(1.2)' : 'scale(1)'
                  }}
                >
                  <RoundedStar active={popupHoverRating >= star || popupRating >= star} size={26} />
                </button>
              ))}
            </div>

            {/* Review text box */}
            <textarea
              placeholder="Write a short review (optional)..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={3}
              style={{
                width: '100%', padding: '14px 16px',
                borderRadius: '14px', border: '1px solid #e2e8f0',
                fontSize: '14px', color: '#222222',
                resize: 'none', outline: 'none',
                fontFamily: 'inherit', boxSizing: 'border-box',
                backgroundColor: '#f8fafc'
              }}
            />

            {/* Submit */}
            <button
              onClick={handleSubmitReview}
              disabled={popupRating === 0}
              style={{
                padding: '16px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: popupRating > 0 ? '#222222' : '#e5e7eb',
                color: popupRating > 0 ? '#ffffff' : '#9ca3af',
                fontSize: '15px', fontWeight: '700',
                cursor: popupRating > 0 ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s ease'
              }}
            >
              {submitted ? '✓ Submitted!' : 'Submit Review'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
