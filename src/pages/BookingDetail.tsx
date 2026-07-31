import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const RoundedStar = ({ active, size = 16 }: { active: boolean; size?: number }) => (
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

const BookingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  // Menu & Pricing Data
  const guests = 120;
  const serviceType = 'Sit-down';
  const servicePricePerPerson = 10;

  const basePrice = 3461;
  const totalServiceCost = serviceType === 'Sit-down' ? guests * servicePricePerPerson : 0;
  const subtotal = basePrice + totalServiceCost; // e.g. 4661

  const discount = 1500;
  const couponDiscount = 0;
  const totalSavings = discount + couponDiscount;

  const total = subtotal - totalSavings;
  const advance = Math.round(total * 0.4); // 40% advance
  const platformFee = 11.80;
  const advancePay = advance + platformFee;


  // Countdown for upcoming bookings
  const getTimeLeft = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(booking?.status === 'Upcoming' ? getTimeLeft(booking.eventDateRaw) : null);

  useEffect(() => {
    if (booking?.status !== 'Upcoming') return;
    const timer = setInterval(() => setTimeLeft(getTimeLeft(booking.eventDateRaw)), 1000);
    return () => clearInterval(timer);
  }, []);

  // Star rating
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [popupRating, setPopupRating] = useState(0);
  const [popupHoverRating, setPopupHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  if (!booking) {
    return (
      <div style={{ padding: '40px 24px', fontFamily: 'sans-serif' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#222' }}>← Back</button>
        <p>Booking not found.</p>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#f8fafc', overflowY: 'auto', zIndex: 100000,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '52px 16px 20px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
            color: '#222222', fontSize: '16px', fontWeight: '600', padding: 0
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
      </div>

      {/* Booking Detail Card */}
      <div style={{ padding: '0 16px 64px' }}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          border: '1px solid #e2e8f0', borderRadius: '24px',
          backgroundColor: '#ffffff'
        }}>

          {/* Vendor Info */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px' }}>
            <img
              src={booking.image}
              alt="Venue"
              style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '12px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#222222', margin: 0 }}>{booking.name}</h3>
              <div style={{ fontSize: '12px', fontWeight: '500', color: '#717171' }}>Event: {booking.eventDate}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>Order placed on: 15 Jul, 2:30 PM</div>
              <div style={{
                fontSize: '12px', fontWeight: '500',
                color: booking.status === 'Upcoming' ? '#059669' : '#9ca3af'
              }}>
                {booking.status}
              </div>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0' }}></div>

          {/* Details body */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '20px 16px', gap: '20px' }}>

            {/* Event Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>Event Details</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '11px', fontWeight: '500', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date &amp; Slot</div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#222222' }}>31 July 2026</div>
                <div style={{ fontSize: '12px', color: '#717171' }}>8:00 AM – 8:15 AM</div>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e2e8f0' }}></div>

            {/* Location */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>Location</div>
              <div style={{ fontSize: '12px', color: '#717171', lineHeight: '1.6' }}>{booking.location}</div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e2e8f0' }}></div>

            {/* Menu Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>Menu Details</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Menu</div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#222222' }}>Premium South Indian Thali</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Guests</div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#222222' }}>{guests}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Type</div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#222222' }}>
                    {serviceType} {serviceType === 'Sit-down' && `(₹${servicePricePerPerson}/person)`}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e2e8f0' }}></div>

            {/* Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>Contact Details</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#222222' }}>Ravi Kumar</div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>+91 98765 43210</div>
              </div>
            </div>

            {/* Countdown (Upcoming only) */}
            {booking.status === 'Upcoming' && timeLeft && (
              <>
                <div style={{ height: '1px', backgroundColor: '#e2e8f0' }}></div>
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

            {/* Star Rating (Completed only) */}
            {booking.status === 'Completed' && (
              <>
                <div style={{ height: '1px', backgroundColor: '#e2e8f0' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Rate your experience</div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => handleStarClick(star)}
                        onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'transform 0.1s ease', transform: hoverRating >= star || rating >= star ? 'scale(1.2)' : 'scale(1)' }}
                      >
                        <RoundedStar active={hoverRating >= star || rating >= star} size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

        {/* ── Price Details Card ── */}
        <div style={{
          marginTop: '16px',
          border: '1px solid #e2e8f0', borderRadius: '24px',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '20px 16px', gap: '0' }}>

            {/* Heading */}
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#222222', marginBottom: '16px' }}>Price details</div>

            {/* Total price row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#222222' }}>Total price</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Incl. applicable taxes</div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#222222' }}>₹{subtotal.toLocaleString('en-IN')}</div>
            </div>

            {/* Discount */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#059669' }}>Discount</div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#059669' }}>-₹{discount.toLocaleString('en-IN')}</div>
            </div>

            {/* Coupon discount */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#059669' }}>Coupon discount</div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#059669' }}>-₹{couponDiscount.toLocaleString('en-IN')}</div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '14px 0' }}></div>

            {/* Total row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#222222' }}>Total</div>
                <div style={{ backgroundColor: '#dcfce7', color: '#059669', fontSize: '11px', fontWeight: '600', borderRadius: '20px', padding: '2px 8px' }}>Saved ₹{totalSavings.toLocaleString('en-IN')}</div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#222222' }}>₹{total.toLocaleString('en-IN')}</div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '14px 0' }}></div>

            {/* Advance */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', color: '#222222' }}>Advance</div>
              <div style={{ fontSize: '13px', color: '#222222' }}>₹{advance.toLocaleString('en-IN')}</div>
            </div>

            {/* Platform fee */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', color: '#222222' }}>Platform fee</div>
              <div style={{ fontSize: '13px', color: '#222222' }}>₹{platformFee.toFixed(2)}</div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '14px 0' }}></div>

            {/* Advance pay */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#222222' }}>Advance pay</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Incl. applicable taxes</div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#222222' }}>₹{advancePay.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>

            {/* Savings banner */}
            <div style={{
              marginTop: '16px',
              backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
              borderRadius: '12px', padding: '12px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              <div style={{ width: '22px', height: '22px', backgroundColor: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#059669' }}>You saved 38% with this booking!</div>
            </div>

            {booking.status === 'Upcoming' && (
              <>
                {/* Pay remaining note */}
                <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: '500', color: '#222222', marginTop: '12px' }}>
                  Pay remaining amount on event day directly to Partner
                </div>

                <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '14px 0' }}></div>

                {/* Cancellation Policy */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#222222' }}>Cancellation Policy</div>
                  <div style={{ fontSize: '12px', color: '#717171', lineHeight: '1.6' }}>
                    Once order is placed, Partners immediately begin reserving time and resources for your event. Therefore, cancellations, modifications, or refunds are not permitted after order placed.
                  </div>
                </div>
              </>
            )}

            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '14px 0' }}></div>

            {/* Payment Method Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#222222' }}>Payment Method</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '13px', color: '#717171' }}>UPI (PhonePe)</div>
                <div style={{ fontSize: '13px', color: '#222222', fontWeight: '500' }}>₹1,167.80</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '13px', color: '#717171' }}>Payment Date &amp; Time</div>
                <div style={{ fontSize: '13px', color: '#222222', fontWeight: '500' }}>15 Jul, 2:30 PM</div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Documents Card ── */}
        <div style={{
          marginTop: '16px',
          border: '1px solid #e2e8f0', borderRadius: '24px',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '20px 16px', gap: '16px' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#222222' }}>Documents</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#222222' }}>Advance receipt</div>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#059669', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: 0 }}>View</button>
            </div>

            {booking.status !== 'Upcoming' && (
              <>
                <div style={{ height: '1px', backgroundColor: '#e2e8f0' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#222222' }}>Tax invoice</div>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: '#059669', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: 0 }}>View</button>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Review Popup */}
      {showReviewPopup && (
        <div onClick={() => setShowReviewPopup(false)} style={{ position: 'fixed', inset: 0, zIndex: 200000, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '480px', backgroundColor: '#ffffff', borderRadius: '28px 28px 0 0', padding: '24px 24px 40px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 -4px 40px rgba(0,0,0,0.12)' }}>
            <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb', margin: '0 auto' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#222222' }}>Rate your experience</div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>{booking.name}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setPopupRating(star)}
                  onMouseEnter={() => setPopupHoverRating(star)} onMouseLeave={() => setPopupHoverRating(0)}
                  style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', transition: 'transform 0.1s ease', transform: popupHoverRating >= star || popupRating >= star ? 'scale(1.2)' : 'scale(1)' }}
                >
                  <RoundedStar active={popupHoverRating >= star || popupRating >= star} size={26} />
                </button>
              ))}
            </div>
            <textarea placeholder="Write a short review (optional)..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={3}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '14px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#222222', resize: 'none', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', backgroundColor: '#f8fafc' }}
            />
            <button onClick={handleSubmitReview} disabled={popupRating === 0}
              style={{ padding: '16px', borderRadius: '14px', border: 'none', backgroundColor: popupRating > 0 ? '#222222' : '#e5e7eb', color: popupRating > 0 ? '#ffffff' : '#9ca3af', fontSize: '15px', fontWeight: '700', cursor: popupRating > 0 ? 'pointer' : 'not-allowed', transition: 'background-color 0.2s ease' }}
            >
              {submitted ? '✓ Submitted!' : 'Submit Review'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetail;
