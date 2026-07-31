
import { useNavigate } from 'react-router-dom';

const Reviews = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      background: '#ffffff', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 20px 16px 20px', position: 'sticky', top: 0, background: '#f8f6f0', zIndex: 10 }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#222222' }}>Rating & Reviews</h2>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', marginRight: '-8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#222222' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div style={{ padding: '24px 32px', background: '#f8f6f0', paddingBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '56px', fontWeight: '800', color: '#222222', lineHeight: '1', letterSpacing: '-1.5px' }}>4.9</div>
          <div style={{ fontSize: '14px', color: '#717171', fontWeight: '500', marginTop: '8px' }}>112 reviews</div>
          <div style={{ marginTop: '16px', display: 'inline-flex', backgroundColor: '#ffffff', padding: '6px 14px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#222222', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Top-rated</span>
          </div>
        </div>

        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { star: 5, count: 95, percentage: 85 },
              { star: 4, count: 10, percentage: 9 },
              { star: 3, count: 4, percentage: 4 },
              { star: 2, count: 2, percentage: 2 },
              { star: 1, count: 1, percentage: 1 }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '20px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>{item.star}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#64748b">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div style={{ width: '130px', height: '6px', backgroundColor: '#ffffff', borderRadius: '3px', margin: '0 12px', overflow: 'hidden' }}>
                  {item.count > 0 && (
                    <div style={{ width: `${item.percentage}%`, height: '100%', backgroundColor: '#222222', borderRadius: '3px' }}></div>
                  )}
                </div>
                <span style={{ width: '18px', fontSize: '13px', fontWeight: '500', color: '#64748b', textAlign: 'right' }}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 24px', display: 'flex', gap: '10px', overflowX: 'auto', whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', borderBottom: '1px solid #e2e8f0' }}>
        <style dangerouslySetInnerHTML={{__html: `
          .reviews-filter-container::-webkit-scrollbar { display: none; }
        `}} />
        <button style={{ flex: '0 0 auto', padding: '6px 16px', borderRadius: '20px', backgroundColor: '#ec4899', color: '#ffffff', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>All Reviews</button>
        {[5, 4, 3, 2, 1].map(star => (
          <button key={star} style={{ flex: '0 0 auto', padding: '6px 14px', borderRadius: '20px', backgroundColor: '#ffffff', color: '#334155', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {star} 
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#94a3b8">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </button>
        ))}
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '100%', padding: '24px 0', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>P</div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Pooja Gupta</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px', fontWeight: '500' }}>3 months ago</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
              {[1, 2, 3, 4, 5].map(s => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#0f172a" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>)}
            </div>
            <div style={{ fontSize: '14px', color: '#334155', lineHeight: '1.5', marginBottom: '20px', fontWeight: '500' }}>Very hygienic packaging and prompt delivery. Highly recommended for family events!</div>
            <div><span style={{ backgroundColor: '#fdf2f8', color: '#ec4899', fontSize: '11px', fontWeight: '700', padding: '6px 12px', borderRadius: '6px' }}>Ordered : Breakfast Menu 1</span></div>
          </div>

          <div style={{ width: '100%', padding: '24px 0', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>S</div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Sneha Reddy</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px', fontWeight: '500' }}>2 weeks ago</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
              {[1, 2, 3, 4, 5].map(s => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#0f172a" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>)}
            </div>
            <div style={{ fontSize: '14px', color: '#334155', lineHeight: '1.5', marginBottom: '20px', fontWeight: '500' }}>On-time setup and clean presentation. The filter coffee was a huge hit among all our guests.</div>
            <div><span style={{ backgroundColor: '#fdf2f8', color: '#ec4899', fontSize: '11px', fontWeight: '700', padding: '6px 12px', borderRadius: '6px' }}>Ordered : Veg Breakfast</span></div>
          </div>

          <div style={{ width: '100%', padding: '24px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>B</div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Bhargav Ambati</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px', fontWeight: '500' }}>1 month ago</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
              {[1, 2, 3, 4, 5].map(s => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s < 5 ? "#0f172a" : "#e2e8f0"} xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>)}
            </div>
            <div style={{ fontSize: '14px', color: '#334155', lineHeight: '1.5', marginBottom: '20px', fontWeight: '500' }}>Food was good</div>
            <div><span style={{ backgroundColor: '#fdf2f8', color: '#ec4899', fontSize: '11px', fontWeight: '700', padding: '6px 12px', borderRadius: '6px' }}>Ordered : Breakfast Menu 1</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
