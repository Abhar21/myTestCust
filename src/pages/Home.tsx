import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "../App.css"
import "../responsive.css"

type TabType = 'caters' | 'mehendi' | 'makeup' | 'theatres' | 'photography' | 'decors' | 'venues'

interface Suggestion {
  name: string
  description: string
  colorBg: string
  icon: React.ReactNode
}

interface HomeListing {
  title: string;
  image: string;
  price: string;
  originalPrice: string;
  rating: string;
  isGuestFavourite: boolean;
  categories: string[];
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const homeListings: HomeListing[] = [
  {
    title: 'Sri Venkata Carters',
    image: '/homes/apartment_somajiguda.png',
    price: '₹99/plate',
    originalPrice: '₹149/plate',
    rating: '4.9',
    isGuestFavourite: true,
    categories: ['Breakfast', 'Lunch', 'Dinner']
  },
  {
    title: 'Figma Caters',
    image: '/homes/flat_tolichowki.png',
    price: '₹49/plate',
    originalPrice: '₹79/plate',
    rating: '4.98',
    isGuestFavourite: true,
    categories: ['Lunch', 'Dinner']
  },
  {
    title: 'Brother company',
    image: '/homes/villa_jubilee_hills.png',
    price: '₹149/plate',
    originalPrice: '₹199/plate',
    rating: '4.87',
    isGuestFavourite: false,
    categories: ['Breakfast', 'Lunch', 'Snacks', 'Dinner']
  },
  {
    title: 'Exotic One',
    image: '/homes/flat_kondapur.png',
    price: '₹199/plate',
    originalPrice: '₹279/plate',
    rating: '4.96',
    isGuestFavourite: true,
    categories: ['Snacks', 'Dinner']
  },
  {
    title: 'The Real company',
    image: '/homes/flat_tolichowki.png',
    price: '₹249/plate',
    originalPrice: '₹349/plate',
    rating: '5.0',
    isGuestFavourite: false,
    categories: ['Breakfast', 'Lunch']
  },
  {
    title: 'Golden Plate Service',
    image: '/homes/flat_kondapur.png',
    price: '₹299/plate',
    originalPrice: '₹399/plate',
    rating: '4.92',
    isGuestFavourite: true,
    categories: ['Lunch', 'Snacks', 'Dinner']
  },
  {
    title: 'Annapurna Catering',
    image: '/homes/apartment_somajiguda.png',
    price: '₹399/plate',
    originalPrice: '₹499/plate',
    rating: '4.87',
    isGuestFavourite: true,
    categories: ['Breakfast', 'Lunch', 'Dinner']
  }
];

const bestRatingListings: HomeListing[] = [
  {
    title: 'Gourmet Foods',
    image: '/homes/flat_kondapur.png',
    price: '₹199/plate',
    originalPrice: '₹279/plate',
    rating: '4.98',
    isGuestFavourite: false,
    categories: ['Lunch', 'Dinner']
  },
  {
    title: 'Swad Catering',
    image: '/homes/flat_tolichowki.png',
    price: '₹299/plate',
    originalPrice: '₹399/plate',
    rating: '4.95',
    isGuestFavourite: false,
    categories: ['Breakfast', 'Lunch', 'Dinner']
  },
  {
    title: 'Royal Chef Services',
    image: '/homes/villa_jubilee_hills.png',
    price: '₹349/plate',
    originalPrice: '₹449/plate',
    rating: '4.99',
    isGuestFavourite: false,
    categories: ['Breakfast', 'Lunch', 'Snacks', 'Dinner']
  },
  {
    title: 'Elite Feasts',
    image: '/homes/apartment_somajiguda.png',
    price: '₹150/plate',
    originalPrice: '₹220/plate',
    rating: '5.0',
    isGuestFavourite: false,
    categories: ['Lunch', 'Dinner']
  },
  {
    title: 'The Spice Story',
    image: '/homes/flat_kondapur.png',
    price: '₹450/plate',
    originalPrice: '₹599/plate',
    rating: '4.97',
    isGuestFavourite: false,
    categories: ['Lunch', 'Snacks', 'Dinner']
  },
  {
    title: 'Feast & Co.',
    image: '/homes/flat_tolichowki.png',
    price: '₹270/plate',
    originalPrice: '₹349/plate',
    rating: '4.96',
    isGuestFavourite: false,
    categories: ['Breakfast', 'Lunch']
  },
  {
    title: 'Celebrations Catering',
    image: '/homes/apartment_somajiguda.png',
    price: '₹180/plate',
    originalPrice: '₹249/plate',
    rating: '4.94',
    isGuestFavourite: false,
    categories: ['Breakfast', 'Lunch', 'Dinner']
  }
];

const checkoutListings: HomeListing[] = [
  {
    title: 'Capital Caters',
    image: '/homes/flat_kondapur.png',
    price: '₹120/plate',
    originalPrice: '₹180/plate',
    rating: '4.85',
    isGuestFavourite: true,
    categories: ['Lunch', 'Dinner']
  },
  {
    title: 'Grand Banquet Services',
    image: '/homes/apartment_somajiguda.png',
    price: '₹220/plate',
    originalPrice: '₹300/plate',
    rating: '4.91',
    isGuestFavourite: false,
    categories: ['Breakfast', 'Lunch', 'Dinner']
  },
  {
    title: 'Pinnacle Catering',
    image: '/homes/flat_tolichowki.png',
    price: '₹180/plate',
    originalPrice: '₹250/plate',
    rating: '4.88',
    isGuestFavourite: true,
    categories: ['Breakfast', 'Lunch', 'Snacks', 'Dinner']
  },
  {
    title: 'Spice Route Caters',
    image: '/homes/villa_jubilee_hills.png',
    price: '₹299/plate',
    originalPrice: '₹399/plate',
    rating: '4.94',
    isGuestFavourite: false,
    categories: ['Lunch', 'Dinner']
  },
  {
    title: 'Dosa House Catering',
    image: '/homes/flat_kondapur.png',
    price: '₹75/plate',
    originalPrice: '₹120/plate',
    rating: '4.90',
    isGuestFavourite: true,
    categories: ['Breakfast', 'Snacks']
  },
  {
    title: 'Biryani Express Services',
    image: '/homes/flat_tolichowki.png',
    price: '₹150/plate',
    originalPrice: '₹210/plate',
    rating: '4.82',
    isGuestFavourite: false,
    categories: ['Lunch', 'Dinner']
  },
  {
    title: 'Royal Feast Hyderabad',
    image: '/homes/apartment_somajiguda.png',
    price: '₹380/plate',
    originalPrice: '₹480/plate',
    rating: '4.97',
    isGuestFavourite: true,
    categories: ['Breakfast', 'Lunch', 'Dinner']
  }
];

const getFoodType = (title: string): string => {
  const lower = title.toLowerCase();
  if (lower.includes('venkata') || lower.includes('annapurna') || lower.includes('swad')) {
    return 'Veg';
  }
  if (lower.includes('brother')) {
    return 'Non-Veg';
  }
  return 'Veg & Non-Veg';
};

const getCaterTravelInfo = (title: string): string => {
  const lower = title.toLowerCase();
  if (lower.includes('venkata')) {
    return '🚚 22 mins • 15 km';
  }
  if (lower.includes('figma')) {
    return '🚚 18 mins • 12 km';
  }
  if (lower.includes('brother')) {
    return '🚚 35 mins • 22 km';
  }
  if (lower.includes('exotic')) {
    return '🚚 25 mins • 18 km';
  }
  if (lower.includes('real')) {
    return '🚚 30 mins • 20 km';
  }
  if (lower.includes('golden')) {
    return '🚚 15 mins • 10 km';
  }
  if (lower.includes('annapurna')) {
    return '🚚 20 mins • 14 km';
  }
  if (lower.includes('gourmet')) {
    return '🚚 28 mins • 19 km';
  }
  if (lower.includes('swad')) {
    return '🚚 16 mins • 11 km';
  }
  if (lower.includes('royal')) {
    return '🚚 24 mins • 16 km';
  }
  if (lower.includes('elite')) {
    return '🚚 32 mins • 21 km';
  }
  if (lower.includes('spice')) {
    return '🚚 40 mins • 28 km';
  }
  if (lower.includes('feast')) {
    return '🚚 19 mins • 13 km';
  }
  return '🚚 25 mins • 17 km';
};

const renderFoodTypeIcons = (title: string) => {
  const type = getFoodType(title);
  const vegIcon = (
    <div key="veg" style={{
      width: '14px', height: '14px', border: '1.5px solid #10b981',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: '#ffffff', borderRadius: '3px', flexShrink: 0
    }} title="Veg">
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
    </div>
  );

  const nonVegIcon = (
    <div key="nonveg" style={{
      width: '14px', height: '14px', border: '1.5px solid #b91c1c',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: '#ffffff', borderRadius: '3px', flexShrink: 0
    }} title="Non-Veg">
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#b91c1c' }} />
    </div>
  );

  if (type === 'Veg') return vegIcon;
  if (type === 'Non-Veg') return nonVegIcon;
  return (
    <div style={{ display: 'inline-flex', gap: '4px', flexShrink: 0 }}>
      {vegIcon}
      {nonVegIcon}
    </div>
  );
};


const formatWhenInput = (val: string) => {
  if (!val) return '';
  const parts = val.split('-');
  if (parts.length === 3) {
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return val;
};

if (typeof window !== 'undefined') {
  let isReload = false;
  const navEntries = performance.getEntriesByType('navigation');
  if (navEntries.length > 0) {
    if ((navEntries[0] as any).type === 'reload') {
      isReload = true;
    }
  } else if (window.performance && (window.performance as any).navigation && (window.performance as any).navigation.type === 1) {
    isReload = true;
  }

  if (isReload) {
    localStorage.removeItem('myMooment_isLoggedIn');
    localStorage.removeItem('myMooment_selectedAddress');
  }
}

const ScrollRevealText = ({ children, style }: { children: string; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div ref={ref} style={{ ...style, perspective: '400px', transformStyle: 'preserve-3d' }}>
      {isVisible
        ? [...children].map((char, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              animationDelay: `${index * 0.04}s`,
              whiteSpace: char === ' ' ? 'pre' : 'normal'
            }}
            className="wave-char-pink"
          >
            {char}
          </span>
        ))
        : <span style={{ opacity: 0 }}>{children}</span>
      }
    </div>
  );
};

function App() {
  const navigate = useNavigate();
  // Tabs: caters, mehendi, makeup, theatres, photography, decors, venues
  const [activeTab, setActiveTab] = useState<TabType>('caters')
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const [showFullScreenLogin, setShowFullScreenLogin] = useState(false)
  const [loginStep, setLoginStep] = useState(0) // 0=none, 1=mobile, 2=otp


  const [loginMobile, setLoginMobile] = useState('')
  const [loginOTP, setLoginOTP] = useState('')

  // Select Items Modal state
  const [showSelectItemsModal, setShowSelectItemsModal] = useState(false);
  const [showCheckoutPage, setShowCheckoutPage] = useState(false);
  const [checkoutFrom, setCheckoutFrom] = useState<'modal' | 'drawer'>('modal');
  const [checkoutContactName, setCheckoutContactName] = useState('John Doe');
  const [checkoutContactPhone, setCheckoutContactPhone] = useState('+91 98765 43210');
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [selectedMenuForModal, setSelectedMenuForModal] = useState<string | null>(null);
  const [modalStep, setModalStep] = useState<number>(1);
  const [modalSelectedDate, setModalSelectedDate] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const when = new URLSearchParams(window.location.search).get('when');
      if (when && when !== 'Any week') {
        const parts = when.split('-');
        if (parts.length === 3) {
          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const monthIndex = parseInt(parts[1], 10) - 1;
          const day = parseInt(parts[2], 10);
          if (monthIndex >= 0 && monthIndex < 12 && day > 0) {
            return `${monthNames[monthIndex]}-${day}`;
          }
        }
      }
    }
    return null;
  });
  const [modalSelectedSlot, setModalSelectedSlot] = useState<string | null>(null);
  const [confirmedSelection, setConfirmedSelection] = useState<{ [menuTitle: string]: { date: string, slot: string } }>({});
  const [showSelectItemsDrawer, setShowSelectItemsDrawer] = useState(false);
  const [pendingDrawerOpen, setPendingDrawerOpen] = useState(false);
  const [activeItemCategory, setActiveItemCategory] = useState<string>('Starters');
  const [selectedMenuData, setSelectedMenuData] = useState<any>(null);
  const [drawerSelectedItems, setDrawerSelectedItems] = useState<string[]>([]);
  const [previewGuestCount, setPreviewGuestCount] = useState<number>(50);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [showCouponTerms, setShowCouponTerms] = useState<string | null>(null);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [manualCouponCode, setManualCouponCode] = useState('');
  // Lock body scroll when popup or drawer is open
  useEffect(() => {
    if (showSelectItemsModal || showSelectItemsDrawer || showCouponTerms !== null || showAllOffers) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSelectItemsModal, showSelectItemsDrawer, showCouponTerms, showAllOffers]);



  const [isSearchView, setIsSearchView] = useState(
    typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('page') === 'search' || new URLSearchParams(window.location.search).get('page') === 'detail') : false
  )
  const [isHeaderSearchExpanded, setIsHeaderSearchExpanded] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showDietDropdown, setShowDietDropdown] = useState(false)
  const [showMealsDropdown, setShowMealsDropdown] = useState(false)
  const [currentSort, setCurrentSort] = useState<'relevance' | 'low-high' | 'high-low' | 'distance-low-high'>('relevance')
  const [filterVegOnly, setFilterVegOnly] = useState(false)
  const [filterNonVeg, setFilterNonVeg] = useState(false)
  const [selectedMealFilters, setSelectedMealFilters] = useState<string[]>([])
  const [partnerSearchQuery, setPartnerSearchQuery] = useState('')


  // Search Fields
  const [whereInput, setWhereInput] = useState(() => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('where') || '';
  })
  const [whenInput, setWhenInput] = useState(() => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('when') || '';
  });

  useEffect(() => {
    if (whenInput && whenInput !== 'Any week') {
      const parts = whenInput.split('-');
      if (parts.length === 3) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthIndex = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        if (monthIndex >= 0 && monthIndex < 12 && day > 0) {
          setModalSelectedDate(`${monthNames[monthIndex]}-${day}`);
        }
      }
    }
  }, [whenInput]);

  // Dropdown States
  const [showDestinations, setShowDestinations] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showInitialDateModal, setShowInitialDateModal] = useState(false)
  const [activeSearchField, setActiveSearchField] = useState<'where' | 'when' | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('myMooment_isLoggedIn') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('myMooment_isLoggedIn', String(isLoggedIn));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && pendingDrawerOpen) {
      setShowSelectItemsDrawer(true);
      setPendingDrawerOpen(false);
    }
  }, [isLoggedIn, pendingDrawerOpen]);

  const [otpTimer, setOtpTimer] = useState(59)

  useEffect(() => {
    if (loginStep === 2 && otpTimer > 0) {
      const timer = setInterval(() => setOtpTimer((prev) => prev - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [loginStep, otpTimer])

  // Year and Month navigation states (Locks initial to July 2026)
  const [currentYear, setCurrentYear] = useState(2026)
  const [currentMonth, setCurrentMonth] = useState(6) // 6 = July (0-indexed)
  const [modalYear, setModalYear] = useState(2026)
  const [modalMonth, setModalMonth] = useState(6)

  // Address Manager selected address state (initialized to null for Screen 2)
  const [selectedAddress, setSelectedAddress] = useState<{ name: string, full: string } | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('myMooment_selectedAddress');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) { }
      }
    }
    return null;
  });
  const [showMobileAddressModal, setShowMobileAddressModal] = useState(false)
  const [animateTravelInfo, setAnimateTravelInfo] = useState(false)

  const prevAddress = useRef(selectedAddress)

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem('myMooment_selectedAddress', JSON.stringify(selectedAddress));
      setWhereInput(selectedAddress.full);

      if (prevAddress.current !== selectedAddress) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setAnimateTravelInfo(true);
        prevAddress.current = selectedAddress;
        const timer = setTimeout(() => setAnimateTravelInfo(false), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedAddress]);

  const [showSidebar, setShowSidebar] = useState(false)
  const [activeMenuCategory, setActiveMenuCategory] = useState("All")
  const [selectedVendorDetail, setSelectedVendorDetail] = useState<HomeListing | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    if (params.get('page') === 'detail') {
      const vendorName = params.get('vendor');
      return [...homeListings, ...checkoutListings, ...bestRatingListings].find(item => item.title === vendorName) || null;
    }
    return null;
  })

  // Auto-show date modal removed based on request
  useEffect(() => {
    // Intentionally empty: date popup shouldn't show on vendor profile load
  }, [selectedVendorDetail]);

  useEffect(() => {
    if (showMobileAddressModal || showSelectItemsModal || showSelectItemsDrawer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileAddressModal, showSelectItemsModal, showSelectItemsDrawer]);

  const handleFilterClick = (action: () => void) => {
    action();
    if (selectedVendorDetail) {
      setSelectedVendorDetail(null);
      setIsSearchView(true);
      window.history.pushState({}, '', '?page=search');
    }
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((prev) => prev - 1)
    } else {
      setCurrentMonth((prev) => prev - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((prev) => prev + 1)
    } else {
      setCurrentMonth((prev) => prev + 1)
    }
  }

  const handleModalPrevMonth = () => {
    if (modalMonth === 0) {
      setModalMonth(11)
      setModalYear((prev) => prev - 1)
    } else {
      setModalMonth((prev) => prev - 1)
    }
  }

  const handleModalNextMonth = () => {
    if (modalMonth === 11) {
      setModalMonth(0)
      setModalYear((prev) => prev + 1)
    } else {
      setModalMonth((prev) => prev + 1)
    }
  }

  const handleCardClick = (caterTitle: string) => {
    window.location.href = `?page=detail&vendor=${encodeURIComponent(caterTitle)}&when=${encodeURIComponent(whenInput)}`;
  }

  const actualToday = new Date();
  const actualMonth = actualToday.getMonth();
  const actualYear = actualToday.getFullYear();
  const isPrevDisabled = currentYear < actualYear || (currentYear === actualYear && currentMonth <= actualMonth);
  const maxYear = actualYear + 1;
  const isNextDisabled = currentYear > maxYear || (currentYear === maxYear && currentMonth >= actualMonth);
  const isModalPrevDisabled = modalYear < actualYear || (modalYear === actualYear && modalMonth <= actualMonth);
  const isModalNextDisabled = modalYear > maxYear || (modalYear === maxYear && modalMonth >= actualMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const targetWhere = whereInput.trim() || 'Hyderabad'
    window.location.href = `?page=search&where=${encodeURIComponent(targetWhere)}&when=${encodeURIComponent(whenInput)}`
  }

  const handleScroll = (containerId: string, direction: 'left' | 'right') => {
    const container = document.getElementById(containerId)
    if (container) {
      const scrollAmount = 300
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  // Airbnb style destination suggestions list
  const suggestions: Suggestion[] = [
    {
      name: 'Nearby',
      description: "Find what's around you",
      colorBg: '#eff6ff',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      )
    },
    {
      name: 'Hyderabad, Telangana',
      description: 'For sights like Charminar',
      colorBg: '#f1f5f9',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'Bengaluru, Karnataka',
      description: 'For its top-notch dining',
      colorBg: '#fff1f2',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'North Goa, Goa',
      description: 'Popular beach destination',
      colorBg: '#fef3c7',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'South Goa, Goa',
      description: 'For nature lovers',
      colorBg: '#f0fdf4',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'Tirupati, Andhra Pradesh',
      description: 'A hidden gem',
      colorBg: '#fff7ed',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'Puri, Odisha',
      description: 'For its seaside allure',
      colorBg: '#ecfeff',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'Mumbai, Maharashtra',
      description: 'City of Dreams & Bollywood',
      colorBg: '#e0e7ff',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'Delhi NCR',
      description: 'Historic monuments & food heritage',
      colorBg: '#fef3c7',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'Chennai, Tamil Nadu',
      description: 'Coastal culture & traditional temples',
      colorBg: '#ccfbf1',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'Kolkata, West Bengal',
      description: 'Art, literature & majestic heritage',
      colorBg: '#ffe4e6',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'Pune, Maharashtra',
      description: 'Oxford of the East & pleasant weather',
      colorBg: '#f3e8ff',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'Jaipur, Rajasthan',
      description: 'The majestic Pink City & forts',
      colorBg: '#ffedd5',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'Kochi, Kerala',
      description: 'Queen of the Arabian Sea & backwaters',
      colorBg: '#d1fae5',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      name: 'Udaipur, Rajasthan',
      description: 'The romantic City of Lakes & palaces',
      colorBg: '#cffafe',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    }
  ]

  // Filter suggestions dynamically based on user input
  const filteredSuggestions = suggestions.filter((item) => {
    if (!whereInput.trim()) return true;

    // If the input exactly matches one of our suggestion names (meaning it was selected),
    // still show all suggestions so they can choose others!
    const exactMatch = suggestions.some(s => s.name.toLowerCase() === whereInput.trim().toLowerCase());
    if (exactMatch) return true;

    const query = whereInput.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  // Dynamic Month Calendar Days grid generation
  const getCalendarDays = (year: number, month: number) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const days: Array<{ day: number | null, isPast: boolean }> = [];
    // Add empty leading cells
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ day: null, isPast: true });
    }
    // Add actual month days
    for (let d = 1; d <= totalDaysInMonth; d++) {
      const cellDate = new Date(year, month, d);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const minSelectableDate = new Date(today);
      minSelectableDate.setDate(minSelectableDate.getDate() + 3);
      const maxSelectableDate = new Date(today);
      maxSelectableDate.setFullYear(today.getFullYear() + 1);
      let isBooked = false;
      if (year === 2026 && month === 7) {
        isBooked = d === 10 || d === 11 || d === 12 || d === 24 || d === 25;
      } else if (year === 2026 && month === 8) {
        isBooked = d === 5 || d === 6 || d === 25 || d === 26 || d === 27 || d === 28;
      }
      const isPast = cellDate < minSelectableDate || cellDate > maxSelectableDate || isBooked;
      days.push({ day: d, isPast });
    }
    return days;
  };

  const calendarDays = getCalendarDays(currentYear, currentMonth);
  const modalCalendarDays = getCalendarDays(modalYear, modalMonth);

  // Combine and deduplicate listings for search view
  const allCaters = [...homeListings, ...checkoutListings, ...bestRatingListings]
  const uniqueCatersRaw = allCaters.filter((item, index, self) =>
    self.findIndex(t => t.title === item.title) === index
  )

  const getCaterDetails = (title: string) => {
    // Generate deterministic values based on char codes of title
    const codeSum = title.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
    const isVegOnly = codeSum % 2 === 0
    const isNonVeg = !isVegOnly || codeSum % 3 === 0

    const meals: string[] = []
    if (codeSum % 2 === 0) meals.push('Breakfast')
    if (codeSum % 3 !== 1) meals.push('Lunch')
    if (codeSum % 4 === 0) meals.push('Snacks')
    if (codeSum % 3 !== 2) meals.push('Dinner')

    return { isVegOnly, isNonVeg, meals }
  }

  const getPriceNum = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0
  }

  const uniqueCaters = [...uniqueCatersRaw].filter(item => {
    const details = getCaterDetails(item.title)

    if (filterVegOnly && !details.isVegOnly) {
      return false
    }
    if (filterNonVeg && !details.isNonVeg) {
      return false
    }
    if (selectedMealFilters.length > 0) {
      const hasAllSelectedMeals = selectedMealFilters.every(meal => details.meals.includes(meal))
      if (!hasAllSelectedMeals) {
        return false
      }
    }
    if (partnerSearchQuery.trim() !== '') {
      if (!item.title.toLowerCase().includes(partnerSearchQuery.toLowerCase())) {
        return false
      }
    }
    return true
  }).sort((a, b) => {
    if (currentSort === 'low-high') {
      return getPriceNum(a.price) - getPriceNum(b.price)
    } else if (currentSort === 'high-low') {
      return getPriceNum(b.price) - getPriceNum(a.price)
    } else if (currentSort === 'distance-low-high') {
      const getDistanceNum = (title: string) => {
        const info = getCaterTravelInfo(title)
        const m = info.match(/•\s*(\d+)\s*km/)
        return m ? parseInt(m[1], 10) : 17
      }
      return getDistanceNum(a.title) - getDistanceNum(b.title)
    }
    return 0 // relevance
  })

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderSearchBar = (isHeaderMode = false) => {
    return (
      <form className={`search-bar-container ${isHeaderMode && !isHeaderSearchExpanded ? 'search-bar-container--header' : ''}`} onSubmit={handleSearchSubmit}>
        <div
          className={`search-field-section ${activeSearchField === 'where' ? 'active' : ''}`}
          onClick={() => {
            setActiveSearchField('where')
            setShowDestinations(true)
          }}
        >
          <div className="search-field-label">Where</div>
          <input
            type="text"
            placeholder="Search destinations"
            className="search-field-input"
            value={whereInput}
            onChange={(e) => {
              setWhereInput(e.target.value)
              setShowDestinations(true)
            }}
          />
          {whereInput && (
            <button
              className="clear-input-btn"
              onClick={(e) => {
                e.stopPropagation()
                setWhereInput('')
                setActiveSearchField('where')
                setShowDestinations(true)
              }}
            >
              ×
            </button>
          )}

          {showDestinations && activeSearchField === 'where' && (
            <div className="destinations-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="dropdown-title">Popular Cities</div>
              <div className="destinations-list">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((dest) => (
                    <div
                      key={dest.name}
                      className="destination-item"
                      onClick={() => {
                        setWhereInput(dest.name)
                        setShowDestinations(false)
                        setActiveSearchField('when')
                        setShowCalendar(true)
                      }}
                    >
                      <div className="destination-icon">📍</div>
                      <div className="destination-details">
                        <div className="destination-name">{dest.name}</div>
                        <div className="destination-desc">{dest.desc}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-destinations">
                    No destinations found for "{whereInput}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="search-field-divider"></div>

        <div
          className={`search-field-section ${activeSearchField === 'when' ? 'active' : ''}`}
          onClick={() => {
            setActiveSearchField('when')
            setShowCalendar(true)
          }}
        >
          <div className="search-field-label">When</div>
          <div className={`search-field-value ${!whenInput ? 'placeholder' : ''}`}>
            {formatWhenInput(whenInput) || 'Add dates'}
          </div>
          {whenInput && (
            <button
              className="clear-input-btn"
              onClick={(e) => {
                e.stopPropagation()
                setWhenInput('')
                setActiveSearchField('when')
                setShowCalendar(true)
              }}
            >
              ×
            </button>
          )}

          {showCalendar && activeSearchField === 'when' && (
            <div className="calendar-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="calendar-header">
                <button
                  type="button"
                  className="calendar-nav-btn"
                  onClick={handlePrevMonth}
                  disabled={currentMonth === 6 && currentYear === 2026}
                >
                  &lt;
                </button>
                <div className="calendar-month-year">
                  {monthNames[currentMonth]} {currentYear}
                </div>
                <button
                  type="button"
                  className="calendar-nav-btn"
                  onClick={handleNextMonth}
                  disabled={isNextDisabled}
                  style={{ color: isNextDisabled ? '#d1d5db' : '#717171', cursor: isNextDisabled ? 'default' : 'pointer' }}
                >
                  &gt;
                </button>
              </div>

              <div className="calendar-days-grid-header">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="calendar-day-header">
                    {day}
                  </div>
                ))}
              </div>

              <div className="calendar-days-grid">
                {calendarDays.map((cell, idx) => {
                  const isSelected = cell.day !== null &&
                    whenInput === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`

                  return (
                    <div
                      key={idx}
                      className={`calendar-day-cell ${cell.day === null ? 'empty' : ''} ${cell.isPast ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        if (cell.day !== null && !cell.isPast) {
                          const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`
                          setWhenInput(dateString)
                          setShowCalendar(false)
                          setActiveSearchField(null)
                        }
                      }}
                    >
                      {cell.day}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="search-btn-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>Search</span>
        </button>
      </form>
    )
  }
  */

  const renderSearchBar = (isHeaderMode = false) => {
    return (
      <form className={`search-bar-container ${isHeaderMode && !isHeaderSearchExpanded ? 'search-bar-container--header' : ''}`} onSubmit={handleSearchSubmit}>
        {/* Where Field Section */}
        <div
          className={`search-field-section ${activeSearchField === 'where' ? 'active' : ''}`}
          onClick={() => {
            setActiveSearchField('where')
            setShowDestinations(true)
            setShowCalendar(false)
            const inputElement = document.getElementById(isHeaderMode ? 'where-input-header' : 'where-input') as HTMLInputElement
            if (inputElement) inputElement.focus()
          }}
        >
          <div className="search-field-content-row">
            <div className="search-field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="search-field-text-col">
              <span className="search-field-lbl">Where</span>
              <input
                id={isHeaderMode ? 'where-input-header' : 'where-input'}
                type="text"
                placeholder="Search destinations"
                className="search-field-input"
                value={whereInput}
                onChange={(e) => setWhereInput(e.target.value)}
                onFocus={() => {
                  setActiveSearchField('where')
                  setShowDestinations(true)
                  setShowCalendar(false)
                }}
                autoComplete="off"
              />
            </div>
          </div>

          {whereInput && (
            <button
              type="button"
              aria-label="Clear destination"
              className="clear-input-btn"
              onClick={(e) => {
                e.stopPropagation()
                setWhereInput('')
                const inputElement = document.getElementById(isHeaderMode ? 'where-input-header' : 'where-input') as HTMLInputElement
                if (inputElement) inputElement.focus()
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}

          {/* Destinations Autocomplete Dropdown */}
          {showDestinations && (
            <div className="destinations-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="dropdown-title">Suggested destinations</div>
              <div className="suggestions-list">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, idx) => (
                    <div
                      key={idx}
                      className="suggestion-item"
                      onClick={(e) => {
                        e.stopPropagation()
                        setWhereInput(item.name)
                        setShowDestinations(false)
                        setActiveSearchField('when')
                        setShowCalendar(true)
                      }}
                    >
                      <div className="suggestion-icon-wrapper" style={{ backgroundColor: item.colorBg }}>
                        {item.icon}
                      </div>
                      <div className="suggestion-text">
                        <div className="suggestion-name">{item.name}</div>
                        <div className="suggestion-desc">{item.description}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '20px 24px', color: '#717171', fontSize: '14px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    No destinations found for "{whereInput}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="search-divider"></div>

        {/* When Field Section */}
        <div
          className={`search-field-section ${activeSearchField === 'when' ? 'active' : ''}`}
          onClick={() => {
            setActiveSearchField('when')
            setShowDestinations(false)
            setShowCalendar(true)
          }}
        >
          <div className="search-field-content-row">
            <div className="search-field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div className="search-field-text-col">
              <span className="search-field-lbl">When</span>
              <input
                type="text"
                className="search-field-input"
                placeholder="Add dates"
                value={formatWhenInput(whenInput)}
                readOnly
              />
            </div>
          </div>

          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className="calendar-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="calendar-header">
                <button
                  type="button"
                  className="calendar-nav-btn"
                  aria-label="Previous Month"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevMonth()
                  }}
                  disabled={isPrevDisabled}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <div className="calendar-month-title">{monthName} {currentYear}</div>
                <button
                  type="button"
                  className="calendar-nav-btn"
                  aria-label="Next Month"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNextMonth()
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              <div className="calendar-weekdays">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              <div className="calendar-grid">
                {calendarDays.map((cell, idx) => {
                  if (cell.day === null) {
                    return <div key={idx} className="calendar-day-cell past"></div>
                  }

                  const formattedDate = `${monthName} ${cell.day}, ${currentYear}`
                  const isSelected = whenInput === formattedDate

                  return (
                    <div
                      key={idx}
                      className={`calendar-day-cell ${cell.isPast ? 'past' : 'active'} ${isSelected ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (cell.isPast) return
                        setWhenInput(formattedDate)
                        setShowCalendar(false)
                        setActiveSearchField(null)
                      }}
                    >
                      {cell.day}
                    </div>
                  )
                })}
              </div>

              {/* Peak booking info note */}
              <div className="calendar-info-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>Due to peak time booking, we allow you to book min 3 days in advance.</span>
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="search-btn-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>Search</span>
        </button>
      </form>
    )
  }

  if (false) {
    renderSearchBar();
  }

  const renderFilters = () => {
    return (
      <div className="filters-container">
        {/* DESKTOP FILTERS (Pills) */}
        <div className="filters-desktop-group">
          {/* Sort Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className={`filter-pill ${currentSort !== 'relevance' ? 'active' : ''}`}
              type="button"
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={() => {
                setShowSortDropdown(!showSortDropdown)
                setShowDietDropdown(false)
                setShowMealsDropdown(false)
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="12" x2="14" y2="12"></line>
                <line x1="4" y1="18" x2="8" y2="18"></line>
              </svg>
              <span>Sort: {currentSort === 'relevance' ? 'Relevance' : currentSort === 'low-high' ? 'Price: Low to high' : currentSort === 'high-low' ? 'Price: High to low' : 'Distance: Low to high'}</span>
            </button>

            {showSortDropdown && (
              <div className="sort-dropdown-menu">
                <div
                  className={`sort-dropdown-item ${currentSort === 'relevance' ? 'selected' : ''}`}
                  onClick={() => handleFilterClick(() => {
                    setCurrentSort('relevance')
                    setShowSortDropdown(false)
                  })}
                >
                  Relevance
                </div>
                <div
                  className={`sort-dropdown-item ${currentSort === 'low-high' ? 'selected' : ''}`}
                  onClick={() => handleFilterClick(() => {
                    setCurrentSort('low-high')
                    setShowSortDropdown(false)
                  })}
                >
                  Price: Low to high
                </div>
                <div
                  className={`sort-dropdown-item ${currentSort === 'high-low' ? 'selected' : ''}`}
                  onClick={() => handleFilterClick(() => {
                    setCurrentSort('high-low')
                    setShowSortDropdown(false)
                  })}
                >
                  Price: High to low
                </div>
                <div
                  className={`sort-dropdown-item ${currentSort === 'distance-low-high' ? 'selected' : ''}`}
                  onClick={() => handleFilterClick(() => {
                    setCurrentSort('distance-low-high')
                    setShowSortDropdown(false)
                  })}
                >
                  Distance: Low to high
                </div>
              </div>
            )}
          </div>

          <div className="filter-vertical-divider"></div>

          <button
            className={`filter-pill ${(!filterVegOnly && !filterNonVeg && selectedMealFilters.length === 0) ? 'active' : ''}`}
            type="button"
            onClick={() => handleFilterClick(() => {
              setFilterVegOnly(false)
              setFilterNonVeg(false)
              setSelectedMealFilters([])
            })}
          >
            All Caters
          </button>
          <button
            className={`filter-pill ${filterVegOnly ? 'active' : ''}`}
            type="button"
            onClick={() => handleFilterClick(() => {
              setFilterVegOnly(!filterVegOnly)
            })}
          >
            Veg Only
          </button>
          <button
            className={`filter-pill ${filterNonVeg ? 'active' : ''}`}
            type="button"
            onClick={() => handleFilterClick(() => {
              setFilterNonVeg(!filterNonVeg)
            })}
          >
            Non-Veg Included
          </button>

          <div className="filter-vertical-divider"></div>

          {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map(meal => {
            const isSelected = selectedMealFilters.includes(meal)
            return (
              <button
                key={meal}
                className={`filter-pill ${isSelected ? 'active' : ''}`}
                type="button"
                onClick={() => handleFilterClick(() => {
                  if (isSelected) {
                    setSelectedMealFilters(selectedMealFilters.filter(m => m !== meal))
                  } else {
                    setSelectedMealFilters([...selectedMealFilters, meal])
                  }
                })}
              >
                {meal}
              </button>
            )
          })}
        </div>

        {/* MOBILE FILTERS (Dropdowns) */}
        <div className="filters-mobile-group">
          {/* Sort Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className={`filter-pill ${currentSort !== 'relevance' ? 'active' : ''}`}
              type="button"
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={() => {
                setShowSortDropdown(!showSortDropdown)
                setShowDietDropdown(false)
                setShowMealsDropdown(false)
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="12" x2="14" y2="12"></line>
                <line x1="4" y1="18" x2="8" y2="18"></line>
              </svg>
              <span>Sort: {currentSort === 'relevance' ? 'Relevance' : currentSort === 'low-high' ? 'Price: Low to high' : currentSort === 'high-low' ? 'Price: High to low' : 'Distance: Low to high'}</span>
            </button>

            {showSortDropdown && (
              <div className="sort-dropdown-menu">
                <div
                  className={`sort-dropdown-item ${currentSort === 'relevance' ? 'selected' : ''}`}
                  onClick={() => handleFilterClick(() => {
                    setCurrentSort('relevance')
                    setShowSortDropdown(false)
                  })}
                >
                  Relevance
                </div>
                <div
                  className={`sort-dropdown-item ${currentSort === 'low-high' ? 'selected' : ''}`}
                  onClick={() => handleFilterClick(() => {
                    setCurrentSort('low-high')
                    setShowSortDropdown(false)
                  })}
                >
                  Price: Low to high
                </div>
                <div
                  className={`sort-dropdown-item ${currentSort === 'high-low' ? 'selected' : ''}`}
                  onClick={() => handleFilterClick(() => {
                    setCurrentSort('high-low')
                    setShowSortDropdown(false)
                  })}
                >
                  Price: High to low
                </div>
                <div
                  className={`sort-dropdown-item ${currentSort === 'distance-low-high' ? 'selected' : ''}`}
                  onClick={() => handleFilterClick(() => {
                    setCurrentSort('distance-low-high')
                    setShowSortDropdown(false)
                  })}
                >
                  Distance: Low to high
                </div>
              </div>
            )}
          </div>

          {/* Dietary Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className={`filter-pill ${(filterVegOnly || filterNonVeg) ? 'active' : ''}`}
              type="button"
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={() => {
                setShowDietDropdown(!showDietDropdown)
                setShowSortDropdown(false)
                setShowMealsDropdown(false)
              }}
            >
              <span>
                {filterVegOnly
                  ? 'Diet: Veg Only'
                  : filterNonVeg
                    ? 'Diet: Non-Veg Included'
                    : 'Dietary'}
              </span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {showDietDropdown && (
              <div className="sort-dropdown-menu">
                <div
                  className={`sort-dropdown-item ${(!filterVegOnly && !filterNonVeg) ? 'selected' : ''}`}
                  onClick={() => handleFilterClick(() => {
                    setFilterVegOnly(false)
                    setFilterNonVeg(false)
                    setShowDietDropdown(false)
                  })}
                >
                  All Diets
                </div>
                <div
                  className={`sort-dropdown-item ${filterVegOnly ? 'selected' : ''}`}
                  onClick={() => handleFilterClick(() => {
                    setFilterVegOnly(true)
                    setFilterNonVeg(false)
                    setShowDietDropdown(false)
                  })}
                >
                  Veg Only
                </div>
                <div
                  className={`sort-dropdown-item ${filterNonVeg ? 'selected' : ''}`}
                  onClick={() => handleFilterClick(() => {
                    setFilterNonVeg(true)
                    setFilterVegOnly(false)
                    setShowDietDropdown(false)
                  })}
                >
                  Non-Veg Included
                </div>
              </div>
            )}
          </div>

          {/* Meals Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className={`filter-pill ${selectedMealFilters.length > 0 ? 'active' : ''}`}
              type="button"
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={() => {
                setShowMealsDropdown(!showMealsDropdown)
                setShowSortDropdown(false)
                setShowDietDropdown(false)
              }}
            >
              <span>
                {selectedMealFilters.length === 0
                  ? 'Meals'
                  : selectedMealFilters.length === 1
                    ? `Meal: ${selectedMealFilters[0]}`
                    : `Meals (${selectedMealFilters.length})`}
              </span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {showMealsDropdown && (
              <div className="sort-dropdown-menu meals-dropdown-menu" style={{ minWidth: '160px' }}>
                {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map(meal => {
                  const isSelected = selectedMealFilters.includes(meal)
                  return (
                    <div
                      key={meal}
                      className={`sort-dropdown-item dropdown-checkbox-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleFilterClick(() => {
                        if (isSelected) {
                          setSelectedMealFilters(selectedMealFilters.filter(m => m !== meal))
                        } else {
                          setSelectedMealFilters([...selectedMealFilters, meal])
                        }
                      })}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <span className="dropdown-item-checkbox-box">
                        {isSelected && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </span>
                      <span>{meal}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Vertical divider line and reset icon at the very end */}
        <div className="filter-vertical-divider"></div>
        <button
          className="filter-pill"
          type="button"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px' }}
          title="Reset all filters"
          onClick={() => handleFilterClick(() => {
            setFilterVegOnly(false)
            setFilterNonVeg(false)
            setSelectedMealFilters([])
            setCurrentSort('relevance')
          })}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <polyline points="3 3 3 8 8 8"></polyline>
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Checkout Page Full Screen Overlay */}
      {showCheckoutPage && (
        <div style={{
          minHeight: '100vh',
          background: '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}>
          {(() => {
            const actualPricePerPlate = (() => {
              if (!selectedMenuData || !selectedMenuData.price) return 49;
              const match = selectedMenuData.price.match(/\d+/);
              return match ? parseInt(match[0], 10) : 49;
            })();
            const minGuests = (() => {
              if (!selectedMenuData || !selectedMenuData.guestCount) return 50;
              const match = selectedMenuData.guestCount.match(/Min\s+(\d+)/i);
              return match ? parseInt(match[1], 10) : 50;
            })();
            const maxGuests = (() => {
              if (!selectedMenuData || !selectedMenuData.guestCount) return 500;
              const match = selectedMenuData.guestCount.match(/Max\s+(\d+)/i);
              return match ? parseInt(match[1], 10) : 500;
            })();

            const couponDiscount = (() => {
              if (appliedCouponCode === 'FLAT500') {
                const subtotal = previewGuestCount * actualPricePerPlate;
                return Math.round(subtotal * 0.1);
              }
              if (appliedCouponCode === 'SAVE10') {
                return 100;
              }
              if (appliedCouponCode === 'FLAT200') {
                return 200;
              }
              return 0;
            })();

            const subtotal = previewGuestCount * actualPricePerPlate;
            const originalPricePerPlate = (() => {
              if (!selectedMenuData || !selectedMenuData.originalPrice) return actualPricePerPlate;
              const match = selectedMenuData.originalPrice.match(/\d+/);
              return match ? parseInt(match[0], 10) : actualPricePerPlate;
            })();
            const originalSubtotal = previewGuestCount * originalPricePerPlate;
            const gst = Math.round(subtotal * 0.18);
            const subtotalWithGST = subtotal + gst;
            const finalDiscountedPrice = Math.max(0, subtotalWithGST - couponDiscount);
            const advance = Math.round(finalDiscountedPrice * 0.4);
            const advancePay = advance + 11.8;
            const totalSavedAmount = Math.max(0, originalSubtotal - subtotal) + couponDiscount;
            const totalSavedPercentage = originalSubtotal > 0 ? Math.round((totalSavedAmount / originalSubtotal) * 100) : 0;

            return (
              <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 16px 32px 16px' }}>
                  <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#222222', margin: '0', letterSpacing: '-0.02em' }}>Confirm and pay</h1>
                  <button onClick={() => {
                    setShowCheckoutPage(false);
                    if (checkoutFrom === 'drawer') {
                      setShowSelectItemsDrawer(true);
                    } else {
                      setShowSelectItemsModal(true);
                    }
                  }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#222222' }}>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible' }}><path d="m6 6 20 20M26 6 6 26"></path></svg>
                  </button>
                </div>

                <div style={{ padding: '0 16px' }}>

                  {/* Vendor Card */}
                  <div style={{ border: '1px solid #dddddd', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: '16px', display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <img src={selectedVendorDetail?.image || '/homes/flat_kondapur.png'} alt="Vendor" style={{ width: '84px', height: '84px', borderRadius: '12px', objectFit: 'cover' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                      <div style={{ fontSize: '12px', color: '#717171', marginBottom: '4px', fontWeight: '400' }}>Cater</div>
                      <div style={{ fontSize: '16px', fontWeight: '550', color: '#222222', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{selectedVendorDetail?.title || 'Vendor Name'}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#3b82f6', fontWeight: '500' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '2px' }}>
                          <path d="M12 2C12.42 2 12.83 2.12 13.18 2.34L14.73 3.32C15.08 3.54 15.49 3.66 15.91 3.66L17.75 3.66C18.85 3.66 19.75 4.56 19.75 5.66L19.75 7.5C19.75 7.92 19.87 8.33 20.09 8.68L21.07 10.23C21.6 11.08 21.6 12.16 21.07 13.01L20.09 14.56C19.87 14.91 19.75 15.32 19.75 15.74L19.75 17.58C19.75 18.68 18.85 19.58 17.75 19.58L15.91 19.58C15.49 19.58 15.08 19.7 14.73 19.92L13.18 20.9C12.46 21.36 11.54 21.36 10.82 20.9L9.27 19.92C8.92 19.7 8.51 19.58 8.09 19.58L6.25 19.58C5.15 19.58 4.25 18.68 4.25 17.58L4.25 15.74C4.25 15.32 4.13 14.91 3.91 14.56L2.93 13.01C2.4 12.16 2.4 11.08 2.93 10.23L3.91 8.68C4.13 8.33 4.25 7.92 4.25 7.5L4.25 5.66C4.25 4.56 5.15 3.66 6.25 3.66L8.09 3.66C8.51 3.66 8.92 3.54 9.27 3.32L10.82 2.34C11.17 2.12 11.58 2 12 2Z" fill="#3b82f6" />
                          <path d="M10.75 15.25C10.55 15.25 10.36 15.17 10.22 15.03L7.72 12.53C7.43 12.24 7.43 11.76 7.72 11.47C8.01 11.18 8.49 11.18 8.78 11.47L10.75 13.44L15.22 8.97C15.51 8.68 15.99 8.68 16.28 8.97C16.57 9.26 16.57 9.74 16.28 10.03L11.28 15.03C11.14 15.17 10.95 15.25 10.75 15.25Z" fill="white" />
                        </svg>
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details Box */}
                  <div style={{ border: '1px solid #dddddd', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', marginBottom: '24px', backgroundColor: '#ffffff' }}>

                    {/* Dates */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222', marginBottom: '8px' }}>Date & Slot</div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#222222', marginBottom: '8px' }}>
                          {modalSelectedDate ? `${modalSelectedDate.split('-')[0]} ${modalSelectedDate.split('-')[1]}, 2026` : 'Select date'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span
                            onClick={() => { setModalStep(2); setShowSelectItemsModal(true); }}
                            style={{ fontSize: '14px', fontWeight: '500', color: '#FF35E0', textDecoration: 'underline', cursor: 'pointer' }}
                          >
                            {modalSelectedSlot || 'Select time slot'}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => { setModalStep(1); setShowSelectItemsModal(true); }} style={{ background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: '500', fontSize: '14px', color: '#222222', cursor: 'pointer', padding: '8px 16px', height: 'fit-content' }}>Change</button>
                    </div>

                    <div style={{ borderBottom: '1px solid #dddddd', marginBottom: '24px' }}></div>

                    {/* Menu and Guests Merged */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222', marginBottom: '8px' }}>Menu</div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#222222', marginBottom: '8px' }}>{selectedMenuForModal || 'Standard Menu'}</div>
                        <div style={{ fontSize: '12px', color: '#717171' }}>Min: {minGuests} -  Max: {maxGuests}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                          {selectedMenuData?.originalPrice && (
                            <span style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through' }}>{selectedMenuData.originalPrice}</span>
                          )}
                          <span style={{ fontSize: '12px', fontWeight: '500', color: '#222222' }}>{selectedMenuData?.price || `₹49/plate`}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          disabled={typeof previewGuestCount === 'number' && previewGuestCount <= minGuests}
                          onClick={() => setPreviewGuestCount(Math.max(minGuests, (typeof previewGuestCount === 'number' ? previewGuestCount : minGuests) - 5))}
                          style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #b0b0b0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: (typeof previewGuestCount === 'number' && previewGuestCount <= minGuests) ? 'not-allowed' : 'pointer', opacity: (typeof previewGuestCount === 'number' && previewGuestCount <= minGuests) ? 0.5 : 1, color: '#717171', fontSize: '18px' }}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={previewGuestCount}
                          onChange={(e) => {
                            const valRaw = e.target.value.replace(/\D/g, '');
                            if (valRaw === '') {
                              setPreviewGuestCount('' as any);
                            } else {
                              const valNum = parseInt(valRaw, 10);
                              setPreviewGuestCount(valNum > maxGuests ? maxGuests : valNum);
                            }
                          }}
                          onBlur={() => {
                            let val = typeof previewGuestCount === 'number' ? previewGuestCount : 0;
                            if (val < minGuests) val = minGuests;
                            if (val > maxGuests) val = maxGuests;
                            setPreviewGuestCount(val);
                          }}
                          style={{ fontSize: '16px', color: '#222222', width: '36px', textAlign: 'center', border: 'none', outline: 'none', background: 'transparent', padding: 0 }}
                        />
                        <button
                          disabled={typeof previewGuestCount === 'number' && previewGuestCount >= maxGuests}
                          onClick={() => setPreviewGuestCount(Math.min(maxGuests, (typeof previewGuestCount === 'number' ? previewGuestCount : minGuests) + 5))}
                          style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #b0b0b0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: (typeof previewGuestCount === 'number' && previewGuestCount >= maxGuests) ? 'not-allowed' : 'pointer', opacity: (typeof previewGuestCount === 'number' && previewGuestCount >= maxGuests) ? 0.5 : 1, color: '#717171', fontSize: '18px' }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div style={{ borderBottom: '1px solid #dddddd', margin: '24px 0' }}></div>

                    {/* Location */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222', marginBottom: '8px' }}>Location</div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#222222', lineHeight: '1.4' }}>
                          {selectedAddress ? selectedAddress.full : 'Choose a location...'}
                        </div>
                      </div>
                    </div>

                    <div style={{ borderBottom: '1px solid #dddddd', margin: '24px 0' }}></div>

                    {/* Contact Details */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222', marginBottom: '8px' }}>Contact details</div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#222222', lineHeight: '1.4' }}>
                          <div>{checkoutContactName}</div>
                          <div style={{ color: '#717171', marginTop: '2px' }}>{checkoutContactPhone}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsEditingContact(true)}
                        style={{ background: '#f3f4f6', border: 'none', borderRadius: '8px', fontWeight: '500', fontSize: '14px', color: '#222222', cursor: 'pointer', padding: '8px 16px', height: 'fit-content', flexShrink: 0, marginLeft: '16px' }}
                      >
                        Change
                      </button>
                    </div>

                  </div>

                  {/* Coupons Section */}
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#717171', marginTop: '32px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      ACTIVE OFFERS
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Coupon 1: SAVE10 */}
                      <div style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.75 3.25L3.25 12.75C2.45 13.55 2.45 14.85 3.25 15.65L8.35 20.75C9.15 21.55 10.45 21.55 11.25 20.75L20.75 11.25C21.25 10.75 21.5 10.05 21.5 9.35V4.25C21.5 3.15 20.6 2.25 19.5 2.25H14.4C13.7 2.25 13 2.5 12.75 3.25Z" fill="#4caf50" />
                            <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: '#222222', lineHeight: '1.4' }}>
                            ₹100 off on this booking
                          </div>
                          <div
                            onClick={() => setShowCouponTerms('SAVE10')}
                            style={{ fontSize: '12px', fontWeight: '600', color: '#222222', marginTop: '2px', textDecoration: 'underline', cursor: 'pointer' }}
                          >
                            Terms apply
                          </div>
                        </div>
                        <button
                          onClick={() => setAppliedCouponCode(appliedCouponCode === 'SAVE10' ? null : 'SAVE10')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            background: appliedCouponCode === 'SAVE10' ? '#fee2e2' : '#000000',
                            color: appliedCouponCode === 'SAVE10' ? '#ef4444' : '#ffffff',
                            border: appliedCouponCode === 'SAVE10' ? '1px dashed #ef4444' : '1px solid #000000',
                            userSelect: 'none',
                            minWidth: '70px',
                            textTransform: 'uppercase'
                          }}
                        >
                          {appliedCouponCode === 'SAVE10' ? 'Remove' : 'Apply'}
                        </button>
                      </div>

                      {/* Coupon 2: FLAT500 */}
                      <div style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.75 3.25L3.25 12.75C2.45 13.55 2.45 14.85 3.25 15.65L8.35 20.75C9.15 21.55 10.45 21.55 11.25 20.75L20.75 11.25C21.25 10.75 21.5 10.05 21.5 9.35V4.25C21.5 3.15 20.6 2.25 19.5 2.25H14.4C13.7 2.25 13 2.5 12.75 3.25Z" fill="#4caf50" />
                            <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: '#222222', lineHeight: '1.4' }}>
                            10% off on this booking
                          </div>
                          <div
                            onClick={() => setShowCouponTerms('FLAT500')}
                            style={{ fontSize: '12px', fontWeight: '600', color: '#222222', marginTop: '2px', textDecoration: 'underline', cursor: 'pointer' }}
                          >
                            Terms apply
                          </div>
                        </div>
                        <button
                          onClick={() => setAppliedCouponCode(appliedCouponCode === 'FLAT500' ? null : 'FLAT500')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '600',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            background: appliedCouponCode === 'FLAT500' ? '#fee2e2' : '#000000',
                            color: appliedCouponCode === 'FLAT500' ? '#ef4444' : '#ffffff',
                            border: appliedCouponCode === 'FLAT500' ? '1px dashed #ef4444' : '1px solid #000000',
                            userSelect: 'none',
                            minWidth: '70px',
                            textTransform: 'uppercase'
                          }}
                        >
                          {appliedCouponCode === 'FLAT500' ? 'Remove' : 'Apply'}
                        </button>
                      </div>

                      {/* Coupon 3: Disabled */}
                      <div style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.75 3.25L3.25 12.75C2.45 13.55 2.45 14.85 3.25 15.65L8.35 20.75C9.15 21.55 10.45 21.55 11.25 20.75L20.75 11.25C21.25 10.75 21.5 10.05 21.5 9.35V4.25C21.5 3.15 20.6 2.25 19.5 2.25H14.4C13.7 2.25 13 2.5 12.75 3.25Z" fill="#4caf50" />
                            <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: '#222222', lineHeight: '1.4' }}>
                            ₹200 off on this booking
                          </div>
                          {subtotal < 5000 && (
                            <div style={{ fontSize: '11px', fontWeight: '500', color: '#ef4444', marginTop: '4px', marginBottom: '2px' }}>
                              Add more ₹{Math.max(0, 5000 - subtotal)} to apply
                            </div>
                          )}
                          <div
                            onClick={() => setShowCouponTerms('FLAT200')}
                            style={{ fontSize: '12px', fontWeight: '600', color: '#222222', marginTop: '2px', textDecoration: 'underline', cursor: 'pointer' }}
                          >
                            Terms apply
                          </div>
                        </div>
                        <button
                          disabled={subtotal < 5000}
                          onClick={() => setAppliedCouponCode(appliedCouponCode === 'FLAT200' ? null : 'FLAT200')}
                          style={
                            subtotal < 5000 ? {
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '600',
                              letterSpacing: '1px',
                              cursor: 'not-allowed',
                              background: '#f3f4f6',
                              color: '#9ca3af',
                              border: '1px solid #d1d5db',
                              userSelect: 'none',
                              minWidth: '70px',
                              textTransform: 'uppercase'
                            } : {
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '700',
                              letterSpacing: '1px',
                              cursor: 'pointer',
                              background: appliedCouponCode === 'FLAT200' ? '#fee2e2' : '#000000',
                              color: appliedCouponCode === 'FLAT200' ? '#ef4444' : '#ffffff',
                              border: appliedCouponCode === 'FLAT200' ? '1px dashed #ef4444' : '1px solid #000000',
                              userSelect: 'none',
                              minWidth: '70px',
                              textTransform: 'uppercase'
                            }
                          }
                        >
                          {subtotal >= 5000 && appliedCouponCode === 'FLAT200' ? 'Remove' : 'Apply'}
                        </button>
                      </div>

                      <div
                        onClick={() => setShowAllOffers(true)}
                        style={{
                          textAlign: 'center',
                          marginTop: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#222222',
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }}
                      >
                        View more offers
                      </div>
                    </div>
                  </div>

                  <div style={{ borderBottom: '1px solid #dddddd', marginBottom: '24px' }}></div>

                  {/* Price Details */}
                  <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#222222', marginBottom: '16px' }}>Price details</h2>

                  {/* Total price - MRP, no strikethrough */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px', color: '#222222' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span>Total price</span>
                      <span style={{ fontSize: '12px', color: '#717171', marginTop: '2px' }}>Incl. applicable taxes</span>
                    </div>
                    <span>₹{(originalSubtotal + Math.round(originalSubtotal * 0.18)).toLocaleString()}</span>
                  </div>

                  {/* Discount = MRP - actual price */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px', color: '#059669', fontWeight: '500' }}>
                    <span>Discount</span>
                    <span>-₹{Math.max(0, originalSubtotal - subtotal).toLocaleString()}</span>
                  </div>

                  {/* Coupon discount */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px', color: '#059669', fontWeight: '500' }}>
                    <span>Coupon discount</span>
                    <span>{couponDiscount > 0 ? `-₹${couponDiscount.toLocaleString()}` : '₹0'}</span>
                  </div>

                  <div style={{ borderBottom: '1px solid #dddddd', margin: '16px 0' }}></div>

                  {/* Total after discounts */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', fontWeight: '700', color: '#222222', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Total</span>
                      {totalSavedAmount > 0 && (
                        <span style={{ background: '#ecfdf5', color: '#059669', fontSize: '11px', fontWeight: '600', padding: '2px 6px', borderRadius: '4px' }}>
                          Saved ₹{totalSavedAmount.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span>₹{finalDiscountedPrice.toLocaleString()}</span>
                  </div>

                  <div style={{ borderBottom: '1px solid #dddddd', margin: '16px 0' }}></div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px', color: '#222222' }}>
                    <span>Advance</span>
                    <span>₹{advance.toLocaleString()}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px', color: '#222222' }}>
                    <span>Platform fee</span>
                    <span>₹11.80</span>
                  </div>

                  <div style={{ borderBottom: '1px solid #dddddd', margin: '16px 0' }}></div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700', color: '#222222', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span>Advance pay</span>
                      <span style={{ fontSize: '12px', color: '#717171', fontWeight: '400', marginTop: '4px' }}>Incl. applicable taxes</span>
                    </div>
                    <span>₹{advancePay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  {totalSavedPercentage > 0 && (
                    <div style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '6px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ background: '#22c55e', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.75 3.25L3.25 12.75C2.45 13.55 2.45 14.85 3.25 15.65L8.35 20.75C9.15 21.55 10.45 21.55 11.25 20.75L20.75 11.25C21.25 10.75 21.5 10.05 21.5 9.35V4.25C21.5 3.15 20.6 2.25 19.5 2.25H14.4C13.7 2.25 13 2.5 12.75 3.25Z" />
                          <circle cx="16.5" cy="7.5" r="1.5" fill="#22c55e" />
                        </svg>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#166534' }}>
                        You saved {totalSavedPercentage}% with this booking!
                      </div>
                    </div>
                  )}

                  <ScrollRevealText style={{ fontSize: '13px', color: '#ec4899', marginBottom: '16px', textAlign: 'center', fontWeight: '500' }}>
                    Pay remaining amount on event day directly to Partner
                  </ScrollRevealText>

                  <div style={{ borderBottom: '1px solid #dddddd', margin: '16px 0' }}></div>

                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#636363ff', marginBottom: '6px' }}>Cancellation Policy</div>
                    <div style={{ fontSize: '13px', color: '#717171', lineHeight: '1.5' }}>Please verify your event details before booking. Once an order is placed, it cannot be refunded.</div>
                  </div>

                  <div style={{ borderBottom: '1px solid #dddddd', margin: '24px 0' }}></div>

                  {/* Disclaimer */}
                  <div style={{ fontSize: '12px', color: '#717171', marginBottom: '12px', textAlign: 'center' }}>
                    You'll be directed to Razorpay to complete payment securely.
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => {
                      alert('Proceeding to Razorpay with total: ₹' + advancePay);
                      setShowCheckoutPage(false);
                      setConfirmedSelection(prev => ({
                        ...prev,
                        [selectedMenuForModal || '']: {
                          date: modalSelectedDate ? (modalSelectedDate.split('-')[0] + ' ' + modalSelectedDate.split('-')[1] + ', 2026') : '',
                          slot: modalSelectedSlot || ''
                        }
                      }));
                    }}
                    style={{
                      width: '100%',
                      background: '#222222',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '14px 24px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ fontWeight: '700' }}>Continue with</span>
                    <img
                      src="Razorpay.png"
                      alt="Razorpay"
                      style={{ height: '22px', fontWeight: '400', objectFit: 'contain', verticalAlign: 'middle', filter: 'brightness(0) invert(1)' }}
                    />
                  </button>

                </div>
              </div>
            );
          })()}
        </div>
      )}

      {!showCheckoutPage && (
        <>
          {/* Background Catcher Overlay to close dropdown when clicking outside */}
          {(showDestinations || showCalendar || isHeaderSearchExpanded || showSortDropdown || showDietDropdown || showMealsDropdown) && (
            <div
              className="dropdown-overlay"
              onClick={() => {
                setShowDestinations(false)
                setShowCalendar(false)
                setActiveSearchField(null)
                setIsHeaderSearchExpanded(false)
                setShowSortDropdown(false)
                setShowDietDropdown(false)
                setShowMealsDropdown(false)
              }}
            />
          )}

          {/* Premium Airbnb-Style Header */}
          <header className={`airbnb-header-container ${isSearchView ? 'airbnb-header-container--search' : ''} ${selectedVendorDetail ? 'airbnb-header-container--detail' : ''}`}>
            {/* Row 1: Logo, Navigation Tabs, User Menu */}
            <div className="airbnb-header-row">
              {/* Left Section (flexible col) */}
              <div className="header-left-col">
                <div className="logo-section" onClick={() => window.location.href = window.location.origin + window.location.pathname}>
                  <span className="logo-text">myMooment</span>
                </div>
              </div>

              {/* Center Section (flexible col, centered) */}
              <div className="header-center-col">
                {selectedVendorDetail ? (
                  <>
                    {/* Location badge on desktop for vendor detail */}
                    <div
                      className="mobile-location-badge desktop-location-badge"
                      onClick={() => setShowMobileAddressModal(true)}
                    >
                      {selectedAddress ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      )}
                      <span className="badge-name">{selectedAddress ? selectedAddress.name.toUpperCase() : 'LOCATION'}</span>
                      <span className="badge-full">{selectedAddress ? selectedAddress.full : 'Choose a location...'}</span>
                      <svg className="badge-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <div className="header-filters-wrapper vendor-detail-filters">
                      {renderFilters()}
                    </div>
                  </>
                ) : isSearchView ? (
                  <>
                    {/* Mobile Location Badge (Image 2 style) */}
                    <div
                      className="mobile-location-badge"
                      onClick={() => setShowMobileAddressModal(true)}
                    >
                      {selectedAddress ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      )}
                      <span className="badge-name">{selectedAddress ? selectedAddress.name.toUpperCase() : 'LOCATION'}</span>
                      <span className="badge-full">{selectedAddress ? selectedAddress.full : 'Choose a location...'}</span>
                      <svg className="badge-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <div className="header-filters-wrapper">
                      {renderFilters()}
                    </div>
                  </>
                ) : (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div
                      className="mobile-location-badge desktop-location-badge"
                      onClick={() => setShowMobileAddressModal(true)}
                    >
                      {selectedAddress ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      )}
                      <span className="badge-name">{selectedAddress ? selectedAddress.name.toUpperCase() : 'LOCATION'}</span>
                      <span className="badge-full">{selectedAddress ? selectedAddress.full : 'Choose a location...'}</span>
                      <svg className="badge-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>

                    <div className="center-tabs">

                      <div
                        className={`tab-item ${activeTab === 'caters' ? 'active' : ''}`}
                        onClick={() => setActiveTab('caters')}
                      >
                        <span className="tab-icon">🍽</span>
                        <span>Caters</span>
                      </div>

                      <div
                        className={`tab-item ${activeTab === 'mehendi' ? 'active' : ''}`}
                        onClick={() => setActiveTab('mehendi')}
                      >
                        <span className="tab-badge">Soon</span>
                        <span className="tab-icon">🎨</span>
                        <span>Mehendi</span>
                      </div>

                      <div
                        className={`tab-item ${activeTab === 'makeup' ? 'active' : ''}`}
                        onClick={() => setActiveTab('makeup')}
                      >
                        <span className="tab-badge">Soon</span>
                        <span className="tab-icon">💄</span>
                        <span>Makeup</span>
                      </div>

                      <div
                        className={`tab-item ${activeTab === 'theatres' ? 'active' : ''}`}
                        onClick={() => setActiveTab('theatres')}
                      >
                        <span className="tab-badge">Soon</span>
                        <span className="tab-icon">🎬</span>
                        <span>Private Theatres</span>
                      </div>

                      <div
                        className={`tab-item ${activeTab === 'photography' ? 'active' : ''}`}
                        onClick={() => setActiveTab('photography')}
                      >
                        <span className="tab-badge">Soon</span>
                        <span className="tab-icon">📸</span>
                        <span>Photography</span>
                      </div>

                      <div
                        className={`tab-item ${activeTab === 'decors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('decors')}
                      >
                        <span className="tab-badge">Soon</span>
                        <span className="tab-icon">🎭</span>
                        <span>Decors</span>
                      </div>

                      <div
                        className={`tab-item ${activeTab === 'venues' ? 'active' : ''}`}
                        onClick={() => setActiveTab('venues')}
                      >
                        <span className="tab-badge">Soon</span>
                        <span className="tab-icon">🏛</span>
                        <span>Venues</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Section (flexible col) */}
              <div className="header-right-col">
                <div className="right-actions">
                  <button
                    type="button"
                    aria-label="Menu"
                    onClick={() => setShowSidebar(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FF35E0'
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Large Floating Search Bar or Filters */}
            {selectedVendorDetail ? null : isSearchView ? (
              <div className="filters-bar-row mobile-filters-row">
                {renderFilters()}
              </div>
            ) : null}
          </header>

          {/* Page Body: Listing Segments or Search Results Grid */}
          {selectedVendorDetail ? (
            <main className="detail-view-container">
              <div className="detail-split-layout">
                {/* Left side: Image and details */}
                <div className="detail-left-pane">
                  <img src={selectedVendorDetail.image} alt={selectedVendorDetail.title} className="detail-large-image" />

                  <div className="detail-under-image-info">
                    <div className="detail-profile-header">
                      <h1 className="detail-left-title">{selectedVendorDetail.title}</h1>
                      <div className="detail-left-rating-row">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '2px' }}>
                          <path d="M12 2C12.42 2 12.83 2.12 13.18 2.34L14.73 3.32C15.08 3.54 15.49 3.66 15.91 3.66L17.75 3.66C18.85 3.66 19.75 4.56 19.75 5.66L19.75 7.5C19.75 7.92 19.87 8.33 20.09 8.68L21.07 10.23C21.6 11.08 21.6 12.16 21.07 13.01L20.09 14.56C19.87 14.91 19.75 15.32 19.75 15.74L19.75 17.58C19.75 18.68 18.85 19.58 17.75 19.58L15.91 19.58C15.49 19.58 15.08 19.7 14.73 19.92L13.18 20.9C12.46 21.36 11.54 21.36 10.82 20.9L9.27 19.92C8.92 19.7 8.51 19.58 8.09 19.58L6.25 19.58C5.15 19.58 4.25 18.68 4.25 17.58L4.25 15.74C4.25 15.32 4.13 14.91 3.91 14.56L2.93 13.01C2.4 12.16 2.4 11.08 2.93 10.23L3.91 8.68C4.13 8.33 4.25 7.92 4.25 7.5L4.25 5.66C4.25 4.56 5.15 3.66 6.25 3.66L8.09 3.66C8.51 3.66 8.92 3.54 9.27 3.32L10.82 2.34C11.17 2.12 11.58 2 12 2Z" fill="#3b82f6" />
                          <path d="M10.75 15.25C10.55 15.25 10.36 15.17 10.22 15.03L7.72 12.53C7.43 12.24 7.43 11.76 7.72 11.47C8.01 11.18 8.49 11.18 8.78 11.47L10.75 13.44L15.22 8.97C15.51 8.68 15.99 8.68 16.28 8.97C16.57 9.26 16.57 9.74 16.28 10.03L11.28 15.03C11.14 15.17 10.95 15.25 10.75 15.25Z" fill="white" />
                        </svg>
                        <span style={{ color: '#3b82f6', fontWeight: '400', fontSize: '12px' }}>Verified</span>
                      </div>
                    </div>

                    <div className="detail-left-divider"></div>

                    <div className="detail-left-meta-section">
                      <div className="detail-left-meta-item">
                        <div className="detail-left-meta-label">CATEGORIES</div>
                        <div className="detail-left-meta-value">{selectedVendorDetail.categories.join(' · ')}</div>
                      </div>

                      <div className="detail-left-meta-item">
                        <div className="detail-left-meta-label">TYPE</div>
                        <div className="detail-left-meta-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="detail-type-icon">
                            {renderFoodTypeIcons(selectedVendorDetail.title)}
                          </span>
                          <span className="detail-type-text">
                            {getFoodType(selectedVendorDetail.title)}
                          </span>
                        </div>
                      </div>

                      <div className="detail-left-meta-item">
                        <div className="detail-left-meta-label">TRAVEL INFO</div>
                        <div className="detail-left-meta-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {animateTravelInfo ? (
                            <span style={{ display: 'inline-block', perspective: '400px', transformStyle: 'preserve-3d' }}>
                              {[...getCaterTravelInfo(selectedVendorDetail.title)].map((char, index) => (
                                <span
                                  key={index}
                                  style={{
                                    display: 'inline-block',
                                    animationDelay: `${index * 0.04}s`,
                                    whiteSpace: char === ' ' ? 'pre' : 'normal'
                                  }}
                                  className="wave-char-pink"
                                >
                                  {char}
                                </span>
                              ))}
                            </span>
                          ) : (
                            getCaterTravelInfo(selectedVendorDetail.title)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Recommended Vendors */}
                <div className="detail-right-pane">
                  <div className="detail-vendor-categories-box" style={{ marginBottom: '32px' }}>
                    <div className="hide-scrollbar category-filters-scroll-container" style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          background: activeMenuCategory === 'All' ? '#222222' : '#ffffff',
                          border: activeMenuCategory === 'All' ? '1px solid #222222' : '1px solid #dddddd',
                          borderRadius: '24px',
                          padding: '6px 16px',
                          fontSize: '12px',
                          fontWeight: activeMenuCategory === 'All' ? '600' : '500',
                          color: activeMenuCategory === 'All' ? '#ffffff' : '#222222',
                          cursor: 'pointer',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}
                        onClick={() => setActiveMenuCategory('All')}
                      >
                        All
                      </div>
                      {selectedVendorDetail.categories.map(category => (
                        <div
                          key={category}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: activeMenuCategory === category ? '#222222' : '#ffffff',
                            border: activeMenuCategory === category ? '1px solid #222222' : '1px solid #dddddd',
                            borderRadius: '24px',
                            padding: '6px 16px',
                            fontSize: '12px',
                            fontWeight: activeMenuCategory === category ? '600' : '500',
                            color: activeMenuCategory === category ? '#ffffff' : '#222222',
                            cursor: 'pointer',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                          }}
                          onClick={() => setActiveMenuCategory(category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Caters Section */}
                  <div className="detail-recommendations-section" style={{ marginTop: '0' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#717171', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Menu's
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                      {[
                        {
                          title: "Breakfast Menu 1",
                          category: "Breakfast",
                          type: "Veg & Non-Veg",
                          guestCount: "Min 50 · Max 500",
                          originalPrice: "₹79/plate",
                          price: "₹49/plate",
                          image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                        },
                        {
                          title: "Lunch Menu 1",
                          category: "Lunch",
                          type: "Non-Veg",
                          guestCount: "Min 100 · Max 1000",
                          originalPrice: "₹199/plate",
                          price: "₹149/plate",
                          image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
                        },
                        {
                          title: "Snacks Menu 1",
                          category: "Snacks",
                          type: "Veg",
                          guestCount: "Min 30 · Max 300 count",
                          originalPrice: "₹99/plate",
                          price: "₹69/plate",
                          image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80"
                        },
                        {
                          title: "Dinner Menu 1",
                          category: "Dinner",
                          type: "Veg & Non-Veg",
                          guestCount: "Min 100 · Max 1500 count",
                          originalPrice: "₹249/plate",
                          price: "₹199/plate",
                          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                        }
                      ]
                        .filter(menu => activeMenuCategory === 'All' || menu.category === activeMenuCategory)
                        .map((menu, idx) => (
                          <div
                            key={idx}
                            className="detail-recommended-card"
                            style={{ cursor: 'default' }}
                          >
                            <img src={menu.image} alt={menu.title} className="detail-recommended-img" />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '6px' }}>
                              <span className="detail-recommended-title" style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={menu.title}>
                                {menu.title}
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: '4px' }}>
                                {(menu.type === 'Veg' || menu.type === 'Veg & Non-Veg') && (
                                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '12px', height: '12px', border: '1px solid #10b981', padding: '1px', boxSizing: 'border-box', background: '#ffffff' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                                  </div>
                                )}
                                {(menu.type === 'Non-Veg' || menu.type === 'Veg & Non-Veg') && (
                                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '12px', height: '12px', border: '1px solid #ef4444', padding: '1px', boxSizing: 'border-box', background: '#ffffff' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="detail-recommended-categories">{menu.guestCount}</div>
                            <div className="detail-recommended-price-row">
                              {menu.originalPrice && (
                                <span className="detail-recommended-price-old">{menu.originalPrice}</span>
                              )}
                              <span className="detail-recommended-price-active">{menu.price}</span>
                            </div>
                            <button
                              style={{
                                marginTop: '14px',
                                width: '100%',
                                background: '#222222',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '10px 16px',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: '#ffffff',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = '#000000'}
                              onMouseLeave={(e) => e.currentTarget.style.background = '#222222'}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMenuForModal(menu.title);
                                setModalStep(1);

                                // Set default date from previous search screen selection
                                let defaultDate: string | null = null;
                                if (whenInput && whenInput !== 'Any week') {
                                  const parts = whenInput.split('-');
                                  if (parts.length === 3) {
                                    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                    const monthIndex = parseInt(parts[1], 10) - 1;
                                    const day = parseInt(parts[2], 10);
                                    if (monthIndex >= 0 && monthIndex < 12 && day > 0) {
                                      defaultDate = `${monthNames[monthIndex]}-${day}`;
                                    }
                                  }
                                }

                                setModalSelectedDate(defaultDate);
                                setModalSelectedSlot(null);
                                setSelectedMenuData(menu);
                                const parsedMin = (() => {
                                  if (!menu || !menu.guestCount) return 50;
                                  const match = menu.guestCount.match(/Min\s+(\d+)/i);
                                  return match ? parseInt(match[1], 10) : 50;
                                })();
                                setPreviewGuestCount(parsedMin);
                                if (!isLoggedIn) {
                                  setShowLoginPopup(true);
                                } else {
                                  setShowInitialDateModal(true);
                                }
                              }}
                            >
                              Select Items
                            </button>
                            {confirmedSelection[menu.title] && (
                              <div style={{
                                marginTop: '12px',
                                fontSize: '13px',
                                color: '#222222',
                                textAlign: 'center',
                                fontWeight: '500'
                              }}>
                                Selected Date: <span style={{ fontWeight: '700', textDecoration: 'underline' }}>{confirmedSelection[menu.title].date}</span>
                              </div>
                            )}
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  {/* Active Offers Section Heading */}
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#717171', marginTop: '32px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Active Offers
                  </h3>

                  {/* Coupon Card 1: 10% off */}
                  <div className="detail-offer-card" style={{
                    marginTop: 0,
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.75 3.25L3.25 12.75C2.45 13.55 2.45 14.85 3.25 15.65L8.35 20.75C9.15 21.55 10.45 21.55 11.25 20.75L20.75 11.25C21.25 10.75 21.5 10.05 21.5 9.35V4.25C21.5 3.15 20.6 2.25 19.5 2.25H14.4C13.7 2.25 13 2.5 12.75 3.25Z" fill="#4caf50" />
                        <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#222222', lineHeight: '1.4' }}>
                        ₹100 off on this booking
                      </div>
                      <a
                        href="#terms"
                        onClick={(e) => { e.preventDefault(); setShowCouponTerms('SAVE10'); }}
                        style={{ fontSize: '12px', fontWeight: '600', color: '#222222', textDecoration: 'underline' }}
                      >
                        Terms apply
                      </a>
                    </div>
                    <div
                      style={{
                        border: '1px dashed #717171',
                        background: '#f5f5f5',
                        color: '#717171',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}
                      title="Click to copy code"
                      onClick={() => { navigator.clipboard.writeText('SAVE10'); alert('Code "SAVE10" copied to clipboard!'); }}
                    >
                      SAVE10
                    </div>
                  </div>

                  {/* Coupon Card 2: Flat ₹500 off */}
                  <div className="detail-offer-card" style={{
                    marginTop: 0,
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.75 3.25L3.25 12.75C2.45 13.55 2.45 14.85 3.25 15.65L8.35 20.75C9.15 21.55 10.45 21.55 11.25 20.75L20.75 11.25C21.25 10.75 21.5 10.05 21.5 9.35V4.25C21.5 3.15 20.6 2.25 19.5 2.25H14.4C13.7 2.25 13 2.5 12.75 3.25Z" fill="#4caf50" />
                        <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#222222', lineHeight: '1.4' }}>
                        10% off on this booking
                      </div>
                      <a
                        href="#terms"
                        onClick={(e) => { e.preventDefault(); setShowCouponTerms('FLAT500'); }}
                        style={{ fontSize: '12px', fontWeight: '600', color: '#222222', textDecoration: 'underline' }}
                      >
                        Terms apply
                      </a>
                    </div>
                    <div
                      style={{
                        border: '1px dashed #717171',
                        background: '#f5f5f5',
                        color: '#717171',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}
                      title="Click to copy code"
                      onClick={() => { navigator.clipboard.writeText('FLAT500'); alert('Code "FLAT500" copied to clipboard!'); }}
                    >
                      FLAT500
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Inline Calendar (Responsive Only) */}
              <div className="mobile-inline-calendar">
                <div style={{ marginTop: '32px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#717171', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Calendar View
                    </h3>
                    {whenInput && (
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#0891b2', marginTop: '6px' }}>
                        Selected date : {formatWhenInput(whenInput)}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <button
                      type="button"
                      className="calendar-nav-btn"
                      onClick={handlePrevMonth}
                      disabled={isPrevDisabled}
                      style={{ background: 'none', border: 'none', cursor: isPrevDisabled ? 'default' : 'pointer', padding: '4px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isPrevDisabled ? '#d1d5db' : '#222222'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <div style={{ fontWeight: '600', fontSize: '16px', color: '#222222' }}>
                      {monthNames[currentMonth]} {currentYear}
                    </div>
                    <button
                      type="button"
                      className="calendar-nav-btn"
                      onClick={handleNextMonth}
                      disabled={isNextDisabled}
                      style={{ background: 'none', border: 'none', cursor: isNextDisabled ? 'default' : 'pointer', padding: '4px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isNextDisabled ? '#d1d5db' : '#222222'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#717171', marginBottom: '12px' }}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                      <div key={`inline-cal-header-${idx}`}>
                        {day}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: '8px', textAlign: 'center' }}>
                    {calendarDays.map((cell, idx) => {
                      const isSelected = cell.day !== null &&
                        whenInput === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;

                      return (
                        <div
                          key={`inline-cal-${idx}`}
                          className={`calendar-day-cell ${cell.day === null ? 'empty' : ''} ${cell.isPast ? 'past' : ''} ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            if (cell.day !== null && !cell.isPast) {
                              const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
                              setWhenInput(dateString);
                            }
                          }}
                          style={cell.isPast ? { color: '#d1d5db', textDecoration: 'line-through', fontWeight: '400', cursor: 'default' } : (cell.day !== null ? { cursor: 'pointer', color: '#222222', fontWeight: '600' } : {})}
                        >
                          {cell.day}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: '24px', fontSize: '11px', color: '#717171', textAlign: 'center', fontWeight: '500' }}>
                    Max upto 1 year calender released
                  </div>
                </div>

                <div style={{ width: '100%', height: '1px', backgroundColor: '#e2e8f0', marginTop: '48px', marginBottom: '48px' }}></div>

                <div className="detail-reviews-section" style={{ paddingBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#222222" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        <span style={{ fontSize: '36px', fontWeight: '800', color: '#222222', lineHeight: '1', letterSpacing: '-1px' }}>4.9</span>
                      </div>
                      <div style={{ fontSize: '15px', color: '#717171', fontWeight: '500', marginTop: '8px' }}>112 reviews</div>
                    </div>
                    <button style={{ padding: '10px 18px', backgroundColor: '#ffffff', border: '1px solid #222222', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#222222', cursor: 'pointer', transition: 'background-color 0.2s', outline: 'none' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>
                      Show all
                    </button>
                  </div>
                  <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '16px', margin: '0 -24px', padding: '0 24px 16px 24px', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    
                    {/* Card 1 */}
                    <div style={{ minWidth: '280px', maxWidth: '280px', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: '#ffffff' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="#f1f5f9" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '20px', right: '20px' }}>
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                      </svg>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>B</div>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Bhargav Ambati</div>
                          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '2px', fontWeight: '500' }}>1 month ago</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= 4 ? "#0f172a" : "#e2e8f0"} xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                        ))}
                      </div>
                      <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', marginBottom: '32px', flex: 1, fontWeight: '500' }}>
                        Food was good
                      </div>
                      <div>
                        <span style={{ backgroundColor: '#fdf2f8', color: '#ec4899', fontSize: '12px', fontWeight: '700', padding: '6px 12px', borderRadius: '6px' }}>
                          Ordered : Breakfast Menu 1
                        </span>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div style={{ minWidth: '280px', maxWidth: '280px', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: '#ffffff' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="#f1f5f9" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '20px', right: '20px' }}>
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                      </svg>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>P</div>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Pooja Gupta</div>
                          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '2px', fontWeight: '500' }}>3 months ago</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#0f172a" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                        ))}
                      </div>
                      <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', marginBottom: '32px', flex: 1, fontWeight: '500' }}>
                        Very hygienic packaging and prompt delivery. Highly recommended for family events!
                      </div>
                      <div>
                        <span style={{ backgroundColor: '#fdf2f8', color: '#ec4899', fontSize: '12px', fontWeight: '700', padding: '6px 12px', borderRadius: '6px' }}>
                          Ordered : Breakfast Menu 1
                        </span>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div style={{ minWidth: '280px', maxWidth: '280px', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: '#ffffff' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="#f1f5f9" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '20px', right: '20px' }}>
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                      </svg>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>S</div>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Sneha Reddy</div>
                          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '2px', fontWeight: '500' }}>2 weeks ago</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#0f172a" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                        ))}
                      </div>
                      <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', marginBottom: '32px', flex: 1, fontWeight: '500' }}>
                        On-time setup and clean presentation. The filter coffee was a huge hit among all our guests.
                      </div>
                      <div>
                        <span style={{ backgroundColor: '#fdf2f8', color: '#ec4899', fontSize: '12px', fontWeight: '700', padding: '6px 12px', borderRadius: '6px' }}>
                          Ordered : Veg Breakfast
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </main>
          ) : isSearchView ? (
            <main className="search-split-layout">
              {/* Left Pane: Caters Grid (60% width) */}
              <div className="search-left-pane">
                <div className="search-results-header">
                  <div className="header-text-group">
                    <h1> Caters Hyderabad, India</h1>
                    <p className="search-results-subtitle">Showing top-rated caters</p>
                  </div>
                  <div className="location-search-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                      type="text"
                      placeholder="Search partner name..."
                      className="location-search-field"
                      value={partnerSearchQuery}
                      onChange={(e) => setPartnerSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {uniqueCaters.length > 0 ? (
                  <div className="search-results-grid">
                    {uniqueCaters.map((home, idx) => (
                      <div key={idx} className="home-card search-card" onClick={() => handleCardClick(home.title)}>
                        <div className="card-image-wrapper">
                          <img src={home.image} alt={home.title} className="card-img" />
                        </div>
                        <div className="card-info">
                          <div className="card-title-row">
                            <span className="card-title">{home.title}</span>
                          </div>
                          <div className="card-categories-row" style={{ marginTop: '8px' }}>
                            {home.categories.join(' · ')}
                          </div>
                          <div className="card-food-type-row" style={{ fontSize: '13px', color: '#717171', marginTop: '8px', fontWeight: '400' }}>
                            {getFoodType(home.title)}
                          </div>
                          <div className="card-travel-row" style={{ fontSize: '13px', color: '#717171', marginTop: '8px', fontWeight: '500' }}>
                            {getCaterTravelInfo(home.title)}
                          </div>
                          <div className="card-details-row" style={{ marginTop: '8px' }}>
                            <span className="card-original-price">{home.originalPrice}</span>
                            <span className="card-active-price">{home.price}</span>
                            
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#717171' }}>
                    <div style={{ fontSize: '32px', marginBottom: '16px' }}>🍽</div>
                    <h3 style={{ fontSize: '18px', color: '#222222', marginBottom: '8px' }}>No caters match your filters</h3>
                    <p style={{ fontSize: '14px', marginBottom: '24px' }}>Try choosing fewer filters or reset them to view all options.</p>
                    <button
                      className="filter-pill active"
                      onClick={() => {
                        setFilterVegOnly(false)
                        setFilterNonVeg(false)
                        setSelectedMealFilters([])
                      }}
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>

              {/* Right Pane: Address Manager (40% width) */}
              <div className="search-right-pane">
                <div className="address-manager-card">
                  {/* Search Box Input Bar */}
                  <div className="address-search-bar">
                    <input
                      type="text"
                      placeholder="Enter your address..."
                      className="address-search-input"
                      defaultValue=""
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const val = (e.target as HTMLInputElement).value.trim();
                          if (val) {
                            setSelectedAddress({
                              name: 'Custom Location',
                              full: val
                            });
                          }
                        }
                      }}
                    />
                    <div
                      className="address-search-btn"
                      onClick={() => {
                        const inputEl = document.querySelector('.address-search-input') as HTMLInputElement;
                        if (inputEl && inputEl.value.trim()) {
                          setSelectedAddress({
                            name: 'Custom Location',
                            full: inputEl.value.trim()
                          });
                        }
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                  </div>


                  {/* Saved Addresses Section */}
                  <div className="saved-addresses-section">
                    <div className="saved-addresses-header">
                      <div className="saved-addresses-title">Saved Addresses</div>
                      <button className="add-address-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Address
                      </button>
                    </div>

                    <div className="saved-addresses-list">
                      {/* Item 1: Home */}
                      <div
                        className={`saved-address-item ${selectedAddress?.name === 'Home' ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedAddress({
                            name: 'Home',
                            full: 'Road No. 21, Building 3B, Flat 406, Gachibowli, Hyderabad, Telangana, 500032'
                          })
                        }}
                      >
                        <div className="address-icon-circle">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                        </div>
                        <div className="address-item-details">
                          <div className="address-item-name">Home</div>
                          <div className="address-item-text">Road No. 21, Building 3B, Flat 406, Gachibowli, Hyderabad, Telangana, 500032</div>
                        </div>
                      </div>

                      {/* Item 2: Work */}
                      <div
                        className={`saved-address-item ${selectedAddress?.name === 'Work' ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedAddress({
                            name: 'Work',
                            full: 'Building 1A, DLF Cyber City, Madhapur, Hyderabad, 500081'
                          })
                        }}
                      >
                        <div className="address-icon-circle">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                          </svg>
                        </div>
                        <div className="address-item-details">
                          <div className="address-item-name">Work</div>
                          <div className="address-item-text">Building 1A, DLF Cyber City, Madhapur, Hyderabad, 500081</div>
                        </div>
                      </div>

                      {/* Item 3: Parents' House */}
                      <div
                        className={`saved-address-item ${selectedAddress?.name === "Parents' House" ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedAddress({
                            name: "Parents' House",
                            full: 'Road No. 12, Banjara Hills, Hyderabad, Telangana, 500034'
                          })
                        }}
                      >
                        <div className="address-icon-circle">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                          </svg>
                        </div>
                        <div className="address-item-details">
                          <div className="address-item-name">Parents' House</div>
                          <div className="address-item-text">Road No. 12, Banjara Hills, Hyderabad, Telangana, 500034</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="add-select-address-mobile-btn"
                    onClick={() => setShowMobileAddressModal(true)}
                  >
                    Add / Select address
                  </button>
                </div>
              </div>
            </main>
          ) : (
            <main className="listings-container">
              {/* Segment 1: Popular Caters */}
              <div className="listings-segment">
                <div className="listings-header">
                  <div className="listings-title-row" onClick={() => window.open('?page=search', '_self')}>
                    <h2>Best caters in Hyderabad</h2>
                    <span className="title-chevron">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </span>
                  </div>
                  <div className="listings-nav-arrows">
                    <button className="nav-arrow-btn" aria-label="Scroll left" onClick={() => handleScroll('listings-scroll-container', 'left')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <button className="nav-arrow-btn" aria-label="Scroll right" onClick={() => handleScroll('listings-scroll-container', 'right')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="listings-scroll-row" id="listings-scroll-container">
                  {homeListings.map((home, idx) => (
                    <div key={idx} className="home-card" onClick={() => handleCardClick(home.title)}>
                      <div className="card-image-wrapper">
                        <img src={home.image} alt={home.title} className="card-img" />
                      </div>
                      <div className="card-info">
                        <div className="card-title-row">
                          <span className="card-title">{home.title}</span>
                        </div>
                        <div className="card-travel-row" style={{ fontSize: '13px', color: '#717171', marginTop: '4px', marginBottom: '4px', fontWeight: '500' }}>
                          {getCaterTravelInfo(home.title)}
                        </div>
                        <div className="card-details-row">
                          <span className="card-active-price">{home.price}</span>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Segment: Checkout Caters */}
              <div className="listings-segment">
                <div className="listings-header">
                  <div className="listings-title-row" onClick={() => window.open('?page=search', '_self')}>
                    <h2>Checkout caters in Hyderabad</h2>
                    <span className="title-chevron">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </span>
                  </div>
                  <div className="listings-nav-arrows">
                    <button className="nav-arrow-btn" aria-label="Scroll left" onClick={() => handleScroll('listings-scroll-container-checkout', 'left')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <button className="nav-arrow-btn" aria-label="Scroll right" onClick={() => handleScroll('listings-scroll-container-checkout', 'right')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="listings-scroll-row" id="listings-scroll-container-checkout">
                  {checkoutListings.map((home, idx) => (
                    <div key={idx} className="home-card" onClick={() => handleCardClick(home.title)}>
                      <div className="card-image-wrapper">
                        <img src={home.image} alt={home.title} className="card-img" />
                      </div>
                      <div className="card-info">
                        <div className="card-title-row">
                          <span className="card-title">{home.title}</span>
                        </div>
                        <div className="card-travel-row" style={{ fontSize: '13px', color: '#717171', marginTop: '4px', marginBottom: '4px', fontWeight: '500' }}>
                          {getCaterTravelInfo(home.title)}
                        </div>
                        <div className="card-details-row">
                          <span className="card-active-price">{home.price}</span>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Cards: The Latest */}
              <div className="listings-segment">
                <div className="listings-header">
                  <div className="listings-title-row">
                    <h2 className="promo-heading-bold">Special offers only for special occasions</h2>
                  </div>
                </div>

                <div className="listings-scroll-row promo-scroll-row" id="promo-scroll-container">
                  <div className="promo-card promo-card--light">
                    <div className="promo-card__title">Premium<br />Catering Package</div>
                    <div className="promo-card__subtitle">All-inclusive service for all occasions.</div>
                    <div className="promo-card__price">From ₹399/plate</div>
                  </div>
                  <div className="promo-card promo-card--light">
                    <div className="promo-card__title">Budget Catering<br />Made Easy</div>
                    <div className="promo-card__subtitle">Great taste at the right price.</div>
                    <div className="promo-card__price">From ₹49/plate</div>
                  </div>
                  <div className="promo-card promo-card--light">
                    <div className="promo-card__title">Book Early,<br />Save Big.</div>
                    <div className="promo-card__subtitle">Get 20% off on advance bookings of 3+ days.</div>
                    <div className="promo-card__price">Offer ends soon</div>
                  </div>
                  <div className="promo-card promo-card--light">
                    <div className="promo-card__title">Wedding<br />Special Menus</div>
                    <div className="promo-card__subtitle">Curated multi-course meals for your big day.</div>
                    <div className="promo-card__price">From ₹249/plate</div>
                  </div>
                </div>
              </div>

              {/* Segment 2: Best in Rating */}
              <div className="listings-segment">
                <div className="listings-header">
                  <div className="listings-title-row" onClick={() => window.open('?page=search', '_self')}>
                    <h2>Verified caters in Hyderabad</h2>
                    <span className="title-chevron">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </span>
                  </div>
                  <div className="listings-nav-arrows">
                    <button className="nav-arrow-btn" aria-label="Scroll left" onClick={() => handleScroll('listings-scroll-container-best', 'left')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <button className="nav-arrow-btn" aria-label="Scroll right" onClick={() => handleScroll('listings-scroll-container-best', 'right')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="listings-scroll-row" id="listings-scroll-container-best">
                  {bestRatingListings.map((home, idx) => (
                    <div key={idx} className="home-card" onClick={() => handleCardClick(home.title)}>
                      <div className="card-image-wrapper">
                        <img src={home.image} alt={home.title} className="card-img" />
                      </div>
                      <div className="card-info">
                        <div className="card-title-row">
                          <span className="card-title">{home.title}</span>
                        </div>
                        <div className="card-travel-row" style={{ fontSize: '13px', color: '#717171', marginTop: '4px', marginBottom: '4px', fontWeight: '500' }}>
                          {getCaterTravelInfo(home.title)}
                        </div>
                        <div className="card-details-row">
                          <span className="card-active-price">{home.price}</span>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Big Banner Frame */}
              <div className="banner-frame">
                <div className="banner-frame__inner">
                  <div className="banner-frame__left">
                    <div className="banner-frame__eyebrow">myMooment</div>
                    <h2 className="banner-frame__title">Find the best cater<br />for your next event.</h2>
                    <p className="banner-frame__subtitle">Browse top-rated catering services across India from intimate gatherings to grand weddings.</p>
                    <div className="banner-frame__actions">
                      <button className="banner-frame__btn banner-frame__btn--primary">Explore all caters</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking.com Style Genius Card */}
              <div className="genius-segment">
                <h2 className="genius-section-title">Celebrate more with less effort</h2>
                <div className="genius-card">
                  <div className="genius-card__left">
                    <h3 className="genius-card__title">Sign in to avail all offers</h3>
                    <p className="genius-card__subtitle">Save 15% or more only in myMooment</p>
                    <div className="genius-card__actions">
                      <button className="genius-card__btn-primary" type="button" onClick={() => alert('Signing in...')}>Sign in</button>
                      <button className="genius-card__btn-link" type="button" onClick={() => alert('Registering...')}>Register</button>
                    </div>
                  </div>
                  <div className="genius-card__right">
                    {/* Cute SVG Illustration of Gift Box with Ribbon & Confetti */}
                    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="genius-gift-svg">
                      {/* Confetti / Sparks */}
                      <circle cx="15" cy="50" r="2.5" fill="#f59e0b" />
                      <circle cx="25" cy="25" r="2" fill="#3b82f6" />
                      <circle cx="105" cy="35" r="3" fill="#f59e0b" />
                      <circle cx="95" cy="70" r="2" fill="#ef4444" />
                      <path d="M 15 80 Q 20 75 25 85" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      <path d="M 98 20 Q 103 25 100 30" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" />

                      {/* Gift Box Main Body (Blue) */}
                      <rect x="35" y="55" width="50" height="40" rx="8" fill="#006ce4" />

                      {/* Gift Box Lid (Blue, slightly larger) */}
                      <rect x="31" y="47" width="58" height="10" rx="4" fill="#0056b3" />

                      {/* Ribbon Vertical (Yellow) */}
                      <rect x="56" y="47" width="8" height="48" fill="#f59e0b" />

                      {/* Ribbon Horizontal (Yellow) */}
                      <rect x="35" y="68" width="50" height="8" fill="#f59e0b" />

                      {/* Bow Ribbons on Top */}
                      <path d="M 60 47 C 50 32 38 42 56 47 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
                      <path d="M 60 47 C 70 32 82 42 64 47 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />

                      {/* Gift Label text: Genius/Mooment */}
                      <text x="60" y="80" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Mooment</text>
                    </svg>
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* Footer Section */}
          <footer className="mooment-footer">
            <div className="footer-inner">
              <div className="footer-top-split">
                {/* Left Col: Logo, Title, LinkedIn icon */}
                <div className="footer-brand-col">
                  <div className="footer-logo-row">
                    <span className="logo-text">myMooment</span>
                  </div>
                  <h2 className="footer-tagline">
                    India's 1st direct<br className="tagline-break" /> booking event platform
                  </h2>
                  <a
                    href="#linkedin"
                    className="footer-social-circle"
                    aria-label="LinkedIn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF35E0">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>

                {/* Right Col: Navigation Links Stack */}
                <div className="footer-links-stack">
                  <a href="#about" className="footer-stack-link">About Us</a>
                  <a href="#register-partner" className="footer-stack-link partner-link">
                    Register as Partner
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '4px', verticalAlign: 'middle' }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <span className="free-badge">FREE</span>
                  </a>
                  <a href="mailto:info@mymooment.com" className="footer-stack-link email-link">
                    info@mymooment.com
                  </a>
                </div>
              </div>

              <div className="footer-divider-line"></div>

              <div className="footer-bottom-row">
                <div className="footer-bottom-left">
                  <span>© 2026 myMooment. All Rights Reserved</span>
                </div>
                <div className="footer-bottom-right-links">
                  <a href="#privacy">Privacy Policy</a>
                  <a href="#terms">Terms & Conditions</a>
                </div>
              </div>
            </div>
          </footer>
          {/* Sidebar Drawer */}
          <div className={`sidebar-backdrop ${showSidebar ? 'open' : ''}`} onClick={() => setShowSidebar(false)}></div>
          <div className={`sidebar-drawer ${showSidebar ? 'open' : ''}`}>
            <div className="sidebar-header">
              <span className="sidebar-title">Menu</span>
              <button className="sidebar-close-btn" onClick={() => setShowSidebar(false)} aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="sidebar-content">
              {/* Become Partner */}
              <div className="sidebar-menu-item" onClick={() => { alert('Become Partner clicked'); setShowSidebar(false); }}>
                <div className="sidebar-menu-text-col">
                  <span className="sidebar-menu-label">Become Partner</span>
                  <span className="sidebar-menu-subtitle">List your business in just under 5 mintues for FREE</span>
                  <div className="sidebar-offer-ticker">
                    <span className="sidebar-offer-text-wave">
                      {"₹0 Onboarding & ₹0 Maintenance Fee".split('').map((char, index) => (
                        <span
                          key={index}
                          style={{
                            display: 'inline-block',
                            animationDelay: `${index * 0.08}s`,
                            whiteSpace: char === ' ' ? 'pre' : 'normal'
                          }}
                          className="wave-char"
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
                <div className="sidebar-menu-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              {isLoggedIn ? (
                <>
                  <div className="sidebar-divider"></div>
                  <div className="sidebar-menu-item" onClick={() => {
                    setShowSidebar(false);
                    navigate('/profile');
                  }}>
                    <div className="sidebar-menu-text-col">
                      <span className="sidebar-menu-label">Profile</span>
                    </div>
                    <div className="sidebar-menu-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>

                  <div className="sidebar-divider"></div>
                  <div className="sidebar-menu-item" onClick={() => {
                    setShowSidebar(false);
                    navigate('/bookings');
                  }}>
                    <div className="sidebar-menu-text-col">
                      <span className="sidebar-menu-label">Bookings</span>
                    </div>
                    <div className="sidebar-menu-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>

                  <div className="sidebar-divider"></div>
                  <div className="sidebar-menu-item" onClick={() => { setShowSidebar(false); setShowMobileAddressModal(true); }}>
                    <div className="sidebar-menu-text-col">
                      <span className="sidebar-menu-label">Add location</span>
                    </div>
                    <div className="sidebar-menu-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>

                  <div className="sidebar-divider"></div>
                  <div className="sidebar-menu-item" onClick={() => {
                    setShowLogoutPopup(true);
                  }}>
                    <div className="sidebar-menu-text-col">
                      <span className="sidebar-menu-label" style={{ color: '#e61e4d' }}>Logout</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="sidebar-divider"></div>
                  <div className="sidebar-menu-item" onClick={() => {
                    setShowSidebar(false);

                    setLoginStep(1);
                    setShowFullScreenLogin(true);
                  }}>
                    <div className="sidebar-menu-text-col">
                      <span className="sidebar-menu-label">Log in or sign up</span>
                    </div>
                    <div className="sidebar-menu-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>)}

      {/* Initial Date Selection Modal */}
      {showInitialDateModal && (
        <div
          className="modal-backdrop-animate"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1000010,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            padding: '20px'
          }}
        >
          <div
            className="modal-content-animate"
            style={{
              width: '400px',
              maxWidth: '100%',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowInitialDateModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f3f4f6',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: '700',
                color: '#4b5563',
                fontSize: '16px',
                zIndex: 10
              }}
            >
              ×
            </button>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#222222', margin: '0 0 6px 0' }}>
                Select Booking Date
              </h3>
              <p style={{ fontSize: '13px', color: '#717171', margin: 0 }}>
                {whenInput ? `Selected: ${formatWhenInput(whenInput)}` : 'Choose the perfect date'}
              </p>
            </div>

            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <button
                  type="button"
                  className="calendar-nav-btn"
                  onClick={handleModalPrevMonth}
                  disabled={isModalPrevDisabled}
                  style={{ background: 'none', border: 'none', cursor: isModalPrevDisabled ? 'default' : 'pointer', padding: '4px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isModalPrevDisabled ? '#d1d5db' : '#222222'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <div style={{ fontWeight: '700', fontSize: '15px', color: '#222222' }}>
                  {monthNames[modalMonth]} {modalYear}
                </div>
                <button
                  type="button"
                  className="calendar-nav-btn"
                  onClick={handleModalNextMonth}
                  disabled={isModalNextDisabled}
                  style={{ background: 'none', border: 'none', cursor: isModalNextDisabled ? 'default' : 'pointer', padding: '4px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isModalNextDisabled ? '#d1d5db' : '#222222'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#717171', marginBottom: '12px' }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <div key={`modal-cal-header-${idx}`}>
                    {day}
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: '8px', textAlign: 'center' }}>
                {modalCalendarDays.map((cell, idx) => {
                  const isSelected = cell.day !== null &&
                    whenInput === `${modalYear}-${String(modalMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;

                  return (
                    <div
                      key={`modal-cal-${idx}`}
                      className={`calendar-day-cell ${cell.day === null ? 'empty' : ''} ${cell.isPast ? 'past' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        if (cell.day !== null && !cell.isPast) {
                          const dateString = `${modalYear}-${String(modalMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
                          setWhenInput(dateString);

                          const url = new URL(window.location.href);
                          url.searchParams.set('when', dateString);
                          window.history.replaceState({}, '', url.toString());

                          // Optional: Auto-sync inline calendar to chosen date's month
                          setCurrentMonth(modalMonth);
                          setCurrentYear(modalYear);

                          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                          setModalSelectedDate(`${monthNames[modalMonth]}-${cell.day}`);

                          setShowInitialDateModal(false);

                          if (!isLoggedIn) {
                            setPendingDrawerOpen(true);
                            setShowLoginPopup(true);
                          } else {
                            setShowSelectItemsDrawer(true);
                          }
                        }
                      }}
                      style={cell.isPast ? { color: '#d1d5db', textDecoration: 'line-through', fontWeight: '400', cursor: 'default' } : (cell.day !== null ? { cursor: 'pointer', color: '#222222', fontWeight: '600' } : {})}
                    >
                      {cell.day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Select Items Modal Popup */}
      {showSelectItemsModal && (
        <div
          className="modal-backdrop-animate bottom-sheet-on-mobile"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1000010,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflowY: 'auto',
            padding: '40px 0',
            backdropFilter: 'blur(4px)',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}
        >
          <div
            className="modal-content-animate"
            style={{
              width: modalStep === 1 ? '680px' : modalStep === 3 ? '460px' : '400px',
              maxWidth: '95%',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              transition: 'width 0.2s ease-out'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSelectItemsModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#222222',
                fontWeight: 'bold',
                fontSize: '16px',
                zIndex: 10
              }}
            >
              ×
            </button>

            {modalStep === 1 ? (
              // Step 1: Select Date (Airbnb style side-by-side Calendar)
              <>
                <div style={{ textAlign: 'left', marginTop: '4px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#222222', margin: 0 }}>
                    Select event date
                  </h3>
                  <p style={{ fontSize: '12px', color: '#717171', marginTop: '4px' }}>
                    Choose the perfect date for your event
                  </p>
                </div>

                {/* Month Picker Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', marginTop: '10px' }}>
                  <button
                    onClick={handleModalPrevMonth}
                    disabled={isModalPrevDisabled}
                    style={{ background: 'transparent', border: 'none', cursor: isModalPrevDisabled ? 'default' : 'pointer', color: isModalPrevDisabled ? '#d1d5db' : '#717171', padding: '4px' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#222222', textAlign: 'center' }}>
                      {new Date(modalYear, modalMonth).toLocaleString('default', { month: 'long' })} {modalYear}
                    </span>
                  </div>

                  <button
                    onClick={handleModalNextMonth}
                    disabled={isModalNextDisabled}
                    style={{ background: 'transparent', border: 'none', cursor: isModalNextDisabled ? 'default' : 'pointer', color: isModalNextDisabled ? '#d1d5db' : '#717171', padding: '4px' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Single Month Container */}
                <div style={{ marginTop: '16px' }}>
                  {/* Weekday initials */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontWeight: '600', fontSize: '11px', color: '#717171', marginBottom: '8px' }}>
                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                  </div>
                  {/* Days grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                    {modalCalendarDays.map((cell, idx) => {
                      if (cell.day === null) {
                        return <div key={idx} style={{ height: '32px' }} />;
                      }

                      const monthName = new Date(modalYear, modalMonth).toLocaleString('default', { month: 'long' });
                      const dateKey = `${monthName}-${cell.day}`;
                      const isSelected = modalSelectedDate === dateKey;

                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (!cell.isPast) {
                              setModalSelectedDate(dateKey);
                            }
                          }}
                          style={{
                            padding: '0',
                            borderRadius: '50%',
                            cursor: !cell.isPast ? 'pointer' : 'default',
                            color: isSelected ? '#ffffff' : (!cell.isPast ? '#222222' : '#d1d5db'),
                            background: isSelected ? '#222222' : 'transparent',
                            fontWeight: !cell.isPast ? '600' : '400',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '32px',
                            width: '32px',
                            margin: '0 auto',
                            textDecoration: cell.isPast ? 'line-through' : 'none',
                            transition: 'all 0.15s'
                          }}
                          className={!cell.isPast && !isSelected ? 'modal-day-hover' : ''}
                        >
                          {cell.day}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer buttons row */}
                <div style={{ marginTop: '32px' }}>
                  <button
                    disabled={!modalSelectedDate}
                    onClick={() => setModalStep(2)}
                    style={{
                      width: '100%',
                      background: modalSelectedDate ? '#222222' : '#e5e7eb',
                      color: modalSelectedDate ? '#ffffff' : '#9ca3af',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px 24px',
                      fontWeight: '500',
                      fontSize: '14px',
                      cursor: modalSelectedDate ? 'pointer' : 'default',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    Confirm Date
                  </button>
                </div>
              </>
            ) : modalStep === 2 ? (
              // Step 2: Select Time Slot (Scroll and select)
              <div style={{ display: 'flex', flexDirection: 'column', height: '420px' }}>
                {/* Fixed Title */}
                <div style={{ textAlign: 'left', paddingBottom: '12px', flexShrink: 0 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#222222', margin: 0 }}>
                    Select arrival slot
                  </h3>
                  <p style={{ fontSize: '12px', color: '#717171', marginTop: '4px' }}>
                    Select slot for partner arrival at your location
                  </p>
                </div>

                {/* Scrollable Slots — only this area scrolls */}
                <div style={{
                  flex: 1,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {(() => {
                    const slots = [
                      "8:00 AM to 8:15 AM",
                      "8:15 AM to 8:30 AM",
                      "8:30 AM to 8:45 AM",
                      "8:45 AM to 9:00 AM",
                      "9:00 AM to 9:15 AM",
                      "9:15 AM to 9:30 AM",
                      "9:30 AM to 9:45 AM",
                      "9:45 AM to 10:00 AM"
                    ];
                    return (
                      <>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: 0,
                          right: 0,
                          height: '54px',
                          marginTop: '-27px',
                          background: '#f3f4f6',
                          borderRadius: '16px',
                          pointerEvents: 'none',
                          zIndex: 0
                        }} />
                        <div
                          className="hide-scrollbar"
                          onScroll={(e) => {
                            const scrollTop = e.currentTarget.scrollTop;
                            const index = Math.round(scrollTop / 54);
                            const safeIndex = Math.max(0, Math.min(slots.length - 1, index));
                            if (slots[safeIndex] && modalSelectedSlot !== slots[safeIndex]) {
                              setModalSelectedSlot(slots[safeIndex]);
                            }
                          }}
                          style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            overflowY: 'auto',
                            scrollSnapType: 'y mandatory',
                            zIndex: 1
                          }}
                        >
                          <div style={{ height: 'calc(50% - 27px)' }} />
                          {slots.map((slot, sIdx) => {
                            const isSelected = modalSelectedSlot === slot;
                            return (
                              <div
                                key={sIdx}
                                onClick={(e) => {
                                  e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  setModalSelectedSlot(slot);
                                }}
                                style={{
                                  height: '54px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  scrollSnapAlign: 'center',
                                  cursor: 'pointer',
                                  fontWeight: '700',
                                  color: isSelected ? '#222222' : '#71717a',
                                  fontSize: '15px',
                                  transition: 'color 0.15s',
                                  flexShrink: 0
                                }}
                              >
                                {slot}
                              </div>
                            );
                          })}
                          <div style={{ height: 'calc(50% - 27px)' }} />
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Fixed Footer — Next */}
                <div style={{ display: 'flex', gap: '12px', paddingTop: '12px', flexShrink: 0 }}>
                  <button
                    disabled={!modalSelectedSlot}
                    onClick={() => {
                      const isDesktop = window.innerWidth >= 768;
                      setCheckoutFrom(isDesktop ? 'modal' : 'drawer');
                      setShowSelectItemsModal(false);
                      setShowSelectItemsDrawer(false);
                      setShowCheckoutPage(true);
                    }}
                    style={{
                      background: modalSelectedSlot ? '#222222' : '#e5e7eb',
                      color: modalSelectedSlot ? '#ffffff' : '#9ca3af',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '16px',
                      fontWeight: '600',
                      fontSize: '16px',
                      cursor: modalSelectedSlot ? 'pointer' : 'default',
                      flex: 1,
                      textAlign: 'center',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
      {/* Logout Popup */}
      {showLogoutPopup && (
        <div
          className="modal-overlay-animate"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowLogoutPopup(false)}
        >
          <div
            className="modal-content-animate"
            style={{
              width: '320px',
              maxWidth: '100%',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              textAlign: 'center',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#222222', marginTop: 0, marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
              Confirm Logout
            </h3>
            <p style={{ fontSize: '14px', color: '#717171', marginTop: '2px', marginBottom: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
              Are you sure you want to log out?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowLogoutPopup(false)}
                style={{
                  flex: 1,
                  background: '#f3f4f6',
                  color: '#222222',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setShowSidebar(false);
                  setShowLogoutPopup(false);
                }}
                style={{
                  flex: 1,
                  background: '#e61e4d',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {showLoginPopup && (
        <div
          className="modal-overlay-animate"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => { setShowLoginPopup(false); setLoginStep(0); }}
        >
          <div
            className="modal-content-animate"
            style={{
              width: '320px',
              maxWidth: '100%',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              textAlign: 'center',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#222222', marginTop: 0, marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
              Login Required
            </h3>
            <p style={{ fontSize: '14px', color: '#717171', marginTop: '2px', marginBottom: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
              Please login to proceed with selection.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  setLoginStep(0);
                }}
                style={{
                  flex: 1,
                  background: '#f3f4f6',
                  color: '#222222',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLoginPopup(false);

                  setLoginStep(1);
                  setShowFullScreenLogin(true);
                }}
                style={{
                  flex: 1,
                  background: '#222222',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Login Flow */}
      {showFullScreenLogin && (
        <div 
          className="login-modal-overlay" 
          onClick={() => {
            setShowFullScreenLogin(false);
            setLoginStep(0);
          }}
        >
          <div className="login-modal-container" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              if (loginStep === 2) {
                setLoginStep(1);
              } else {
                setShowFullScreenLogin(false);
                setLoginStep(0);
              }
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


          {loginStep === 1 && (
            <>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#222222', marginTop: 0, marginBottom: '24px', textAlign: 'left', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                Welcome
              </h2>
              <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#717171', marginBottom: '8px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                  Enter your mobile number
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  boxSizing: 'border-box',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                }}>
                  <span style={{ color: '#717171', fontSize: '16px', marginRight: '8px' }}>+91</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    value={loginMobile}
                    onChange={(e) => setLoginMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder=""
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      fontSize: '16px',
                      padding: 0,
                      background: 'transparent',
                      color: '#222222',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>
              <button
                disabled={loginMobile.length !== 10}
                onClick={() => {
                  if (loginMobile.length === 10) {
                    setLoginStep(2);
                    setOtpTimer(59);
                  }
                }}
                style={{
                  width: '100%',
                  background: '#222222',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loginMobile.length === 10 ? 'pointer' : 'not-allowed',
                  opacity: loginMobile.length === 10 ? 1 : 0.5,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                }}
              >
                Continue
              </button>
            </>
          )}

          {loginStep === 2 && (
            <>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#222222', marginTop: 0, marginBottom: '24px', textAlign: 'left', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                Enter OTP
              </h2>
              <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#717171', marginBottom: '8px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                  Code sent to {loginMobile}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={loginOTP}
                  onChange={(e) => setLoginOTP(e.target.value.replace(/\D/g, ''))}
                  placeholder="0 0 0 0 0 0"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '20px',
                    letterSpacing: '8px',
                    textAlign: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                  }}
                />
              </div>
              <button
                disabled={loginOTP.length !== 6}
                onClick={() => {
                  if (loginOTP.length === 6) {
                    setIsLoggedIn(true);
                    setShowFullScreenLogin(false);
                    setLoginStep(0);
                    setShowMobileAddressModal(true);
                  }
                }}
                style={{
                  width: '100%',
                  background: '#222222',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loginOTP.length === 6 ? 'pointer' : 'not-allowed',
                  opacity: loginOTP.length === 6 ? 1 : 0.5,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                }}
              >
                Verify & Continue
              </button>
              <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#717171', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                {otpTimer > 0 ? (
                  `Didn't receive? 0:${String(otpTimer).padStart(2, '0')}`
                ) : (
                  <>
                    Didn't receive? <span onClick={() => setOtpTimer(59)} style={{ color: '#222222', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}>Send again</span>
                  </>
                )}
              </div>
            </>
          )}
          </div>
        </div>
      )}

      {/* Select Items Sliding Drawer */}
      {showSelectItemsDrawer && (
        <div
          className="drawer-overlay-animate"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 1000000,
            backdropFilter: 'blur(2px)'
          }}
          onClick={() => setShowSelectItemsDrawer(false)}
        >
          <div
            className="drawer-panel-animate"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '500px',
              maxWidth: '100%',
              background: '#ffffff',
              zIndex: 1000001,
              boxShadow: '-10px 0 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Content (Now at the top since image is removed) */}
            <div style={{
              padding: '24px 24px 18px 24px',
              color: '#222222',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              borderBottom: '1px solid #e2e8f0'
            }}>
              {/* Close Button on Top Right Corner */}
              <button
                onClick={() => setShowSelectItemsDrawer(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#222222',
                  fontSize: '24px',
                  fontWeight: '400',
                  lineHeight: '1',
                  zIndex: 10
                }}
              >
                ×
              </button>

              {/* Header Title Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#222222', margin: 0 }}>
                  {selectedMenuData?.title || 'Standard Breakfast'}
                </h3>
              </div>

              {/* Badges row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#717171', flexWrap: 'wrap' }}>
                {/* Pax count */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#717171',
                  fontWeight: '400'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.8 }}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>
                    {selectedMenuData?.guestCount
                      ? selectedMenuData.guestCount.replace('Min ', '').replace(' · Max ', '-').replace(' count', ' pax')
                      : '20-100 pax'}
                  </span>
                </div>

                <span style={{ color: '#d1d5db', margin: '0 4px' }}>·</span>

                {/* Veg/Non-Veg badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: '400',
                  color: '#717171'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: selectedMenuData?.type?.toLowerCase().includes('non') ? '#ef4444' : '#10b981'
                  }} />
                  {selectedMenuData?.type || 'Veg'}
                </div>

                <span style={{ color: '#d1d5db', margin: '0 4px' }}>·</span>

                {/* Price badge */}
                <div style={{
                  fontWeight: '500',
                  color: '#222222'
                }}>
                  {selectedMenuData?.price ? `${selectedMenuData.price.replace('/plate', '')} / Plate` : '₹250 / Plate'}
                </div>
              </div>
            </div>

            {/* Scrollable Drawer Body Content */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#222222', margin: 0 }}>
                    Items
                  </h4>
                  <p style={{ fontSize: '13px', color: '#717171', marginTop: '4px', marginBottom: 0 }}>
                    Customise your menu
                  </p>
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#10b981',
                  background: '#f0fdf4',
                  padding: '6px 16px',
                  borderRadius: '16px',
                  marginTop: '2px'
                }}>
                  {(() => {
                    const limits: Record<string, number | null> = { 'Starters': 2, 'Main Course': 2, 'Desserts': 2, 'Curries': 2, 'Tiffins': 2, 'Rice & Breads': null, 'Beverages': null, 'Extra Items': null };
                    const limit = limits[activeItemCategory];
                    if (limit !== null && limit !== undefined) {
                      const allItems = activeItemCategory === 'Starters' ? ['Idli', 'Vada', 'Medu Vada', 'Poha'] :
                        activeItemCategory === 'Main Course' ? ['Dal Tadka', 'Paneer Butter Masala', 'Aloo Matar', 'Mixed Veg Curry'] :
                          activeItemCategory === 'Curries' ? ['Veg Kurma', 'Gutti Vankaya', 'Mushroom Masala', 'Palak Paneer'] :
                            activeItemCategory === 'Tiffins' ? ['Dosa', 'Upma', 'Bonda', 'Uttapam'] :
                              ['Kesari Bath', 'Gulab Jamun', 'Payasam'];
                      return `Added ${allItems.filter(x => drawerSelectedItems.includes(x)).length}/${limit}`;
                    }
                    return 'All items included';
                  })()}
                </div>
              </div>

              {/* Tabs Row */}
              <div className="hide-scrollbar" style={{
                display: 'grid',
                gridTemplateRows: 'auto auto',
                gridAutoFlow: 'column',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '8px',
                margin: '0 -24px',
                paddingLeft: '24px',
                paddingRight: '24px'
              }}>
                {(() => {
                  const catLimits: Record<string, number | null> = { 'Starters': 2, 'Main Course': 2, 'Desserts': 2, 'Curries': 2, 'Tiffins': 2, 'Rice & Breads': null, 'Beverages': null, 'Extra Items': null };
                  const getCatItems = (cat: string) =>
                    cat === 'Starters' ? ['Idli', 'Vada', 'Medu Vada', 'Poha'] :
                      cat === 'Main Course' ? ['Dal Tadka', 'Paneer Butter Masala', 'Aloo Matar', 'Mixed Veg Curry'] :
                        cat === 'Curries' ? ['Veg Kurma', 'Gutti Vankaya', 'Mushroom Masala', 'Palak Paneer'] :
                          cat === 'Tiffins' ? ['Dosa', 'Upma', 'Bonda', 'Uttapam'] :
                            ['Kesari Bath', 'Gulab Jamun', 'Payasam'];

                  return ['Starters', 'Rice & Breads', 'Desserts', 'Extra Items', 'Main Course', 'Beverages', 'Curries', 'Tiffins'].map(cat => {
                    const limit = catLimits[cat];
                    const isFull = limit === null || getCatItems(cat).filter(x => drawerSelectedItems.includes(x)).length >= limit;
                    const isActive = activeItemCategory === cat;

                    const bg = isFull ? (isActive ? '#d1fae5' : '#f0fdf4') : (isActive ? '#222222' : '#f3f4f6');
                    const color = isFull ? (isActive ? '#047857' : '#10b981') : (isActive ? '#ffffff' : '#4b5563');
                    const border = isFull ? (isActive ? '1px solid #10b981' : '1px solid #bbf7d0') : (isActive ? '1px solid #222222' : '1px solid #e5e7eb');

                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveItemCategory(cat)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          background: bg,
                          border: border,
                          borderRadius: '24px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          color: color,
                          cursor: 'pointer',
                          boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                          transition: 'all 0.15s'
                        }}
                      >
                        {cat}
                      </button>
                    );
                  });
                })()}
              </div>

              {/* Items List */}
              {(() => {
                const starterItems = [
                  { id: 'Idli', name: 'Idli', desc: 'Soft steamed rice cakes served with sambar & chutney' },
                  { id: 'Vada', name: 'Vada', desc: 'Crispy deep fried lentil fritters with coconut chutney' },
                  { id: 'Medu Vada', name: 'Medu Vada', desc: 'Fluffy donut-shaped fritters with a golden crust' },
                  { id: 'Poha', name: 'Poha', desc: 'Flattened rice with mustard seeds, curry leaves & peanuts' },
                ];
                const fixedSections: Record<string, { id: string; name: string; desc: string }[]> = {
                  'Main Course': [
                    { id: 'Dal Tadka', name: 'Dal Tadka', desc: 'Yellow lentils tempered with ghee & spices' },
                    { id: 'Paneer Butter Masala', name: 'Paneer Butter Masala', desc: 'Cottage cheese in a rich tomato-cream gravy' },
                    { id: 'Aloo Matar', name: 'Aloo Matar', desc: 'Spiced potato and peas curry in onion-tomato base' },
                    { id: 'Mixed Veg Curry', name: 'Mixed Veg Curry', desc: 'Seasonal vegetables slow-cooked in aromatic masala' },
                  ],
                  'Rice & Breads': [
                    { id: 'Steamed Rice', name: 'Steamed Rice', desc: 'Long grain basmati rice, perfectly steamed' },
                    { id: 'Jeera Rice', name: 'Jeera Rice', desc: 'Fragrant basmati rice tempered with cumin seeds' },
                    { id: 'Chapati', name: 'Chapati', desc: 'Soft whole wheat flatbread, freshly made' },
                    { id: 'Puri', name: 'Puri', desc: 'Deep-fried puffed wheat bread, light & crisp' },
                  ],
                  'Beverages': [
                    { id: 'Buttermilk', name: 'Buttermilk', desc: 'Chilled spiced yogurt drink with mint & jeera' },
                    { id: 'Masala Chai', name: 'Masala Chai', desc: 'Aromatic spiced tea brewed with ginger & cardamom' },
                    { id: 'Lemonade', name: 'Lemonade', desc: 'Fresh lime with sugar, salt & mint leaves' },
                  ],
                  'Desserts': [
                    { id: 'Kesari Bath', name: 'Kesari Bath', desc: 'Sweet semolina pudding flavored with ghee & saffron' },
                    { id: 'Gulab Jamun', name: 'Gulab Jamun', desc: 'Soft milk-solid dumplings soaked in rose sugar syrup' },
                    { id: 'Payasam', name: 'Payasam', desc: 'Creamy vermicelli & milk pudding with cashews & raisins' },
                  ],
                  'Curries': [
                    { id: 'Veg Kurma', name: 'Veg Kurma', desc: 'Mixed vegetables in a coconut and cashew gravy' },
                    { id: 'Gutti Vankaya', name: 'Gutti Vankaya', desc: 'Stuffed eggplants cooked in a rich peanut and sesame sauce' },
                    { id: 'Mushroom Masala', name: 'Mushroom Masala', desc: 'Earthy mushrooms in a spicy tomato and onion base' },
                    { id: 'Palak Paneer', name: 'Palak Paneer', desc: 'Cottage cheese cubes in a creamy spinach puree' },
                  ],
                  'Extra Items': [
                    { id: 'Papad', name: 'Papad', desc: 'Crispy roasted lentil wafers' },
                    { id: 'Pickle', name: 'Pickle', desc: 'Spicy and tangy mixed vegetable pickle' },
                    { id: 'Raita', name: 'Raita', desc: 'Cool yogurt with cucumber, onions, and mild spices' },
                    { id: 'Salad', name: 'Salad', desc: 'Fresh cucumber, carrot, and onion slices with lemon' },
                  ],
                  'Tiffins': [
                    { id: 'Dosa', name: 'Dosa', desc: 'Crispy fermented crepe made from rice and lentils' },
                    { id: 'Upma', name: 'Upma', desc: 'Savory semolina porridge with vegetables and spices' },
                    { id: 'Bonda', name: 'Bonda', desc: 'Deep-fried potato dumplings in a gram flour batter' },
                    { id: 'Uttapam', name: 'Uttapam', desc: 'Thick savory pancake topped with onions and tomatoes' },
                  ],
                };

                /* Photo / image placeholder icon — dims when disabled */
                const getItemThumbnail = (isDisabled: boolean) => (
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '12px',
                    background: '#f0f4f8', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    opacity: isDisabled ? 0.4 : 1,
                    transition: 'opacity 0.15s'
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                );

                const limits: Record<string, number | null> = { 'Starters': 2, 'Main Course': 2, 'Desserts': 2, 'Curries': 2, 'Tiffins': 2, 'Rice & Breads': null, 'Beverages': null, 'Extra Items': null };
                const limit = limits[activeItemCategory];
                const currentItems = activeItemCategory === 'Starters' ? starterItems : (fixedSections[activeItemCategory] || []);
                const currentSelectedCount = currentItems.filter(i => drawerSelectedItems.includes(i.id)).length;
                const limitReached = limit !== null && currentSelectedCount >= limit;

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {currentItems.map(item => {
                      const isSelected = limit !== null ? drawerSelectedItems.includes(item.id) : true;
                      const isDisabled = limit !== null ? (!isSelected && limitReached) : true;

                      return (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            {getItemThumbnail(isDisabled && limit !== null)}
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: '600', color: (isDisabled && limit !== null) ? '#9ca3af' : '#222222' }}>{item.name}</div>
                              <div style={{ fontSize: '12px', color: '#717171', marginTop: '3px', lineHeight: '1.4' }}>{item.desc}</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '78px', flexShrink: 0 }}>
                            {limit !== null ? (
                              <button
                                disabled={isDisabled}
                                onClick={() => {
                                  if (isSelected) {
                                    setDrawerSelectedItems(drawerSelectedItems.filter(x => x !== item.id));
                                  } else {
                                    setDrawerSelectedItems([...drawerSelectedItems, item.id]);
                                  }
                                }}
                                style={{
                                  background: isDisabled ? '#f9fafb' : isSelected ? '#fef2f2' : '#f0fdf4',
                                  color: isDisabled ? '#9ca3af' : isSelected ? '#ef4444' : '#10b981',
                                  border: isDisabled ? '1px solid #e5e7eb' : isSelected ? '1px solid #ef4444' : '1px solid #10b981',
                                  borderRadius: '10px', padding: '6px 12px', fontWeight: '500',
                                  fontSize: '12px', cursor: isDisabled ? 'default' : 'pointer',
                                  width: '100%', textAlign: 'center', transition: 'all 0.15s'
                                }}
                              >
                                {isSelected ? 'Remove' : 'Add'}
                              </button>
                            ) : (
                              <button
                                disabled={true}
                                style={{
                                  background: '#f9fafb', color: '#9ca3af',
                                  border: '1px solid #e5e7eb', borderRadius: '10px',
                                  padding: '6px 12px', fontWeight: '500', fontSize: '12px', cursor: 'default',
                                  width: '100%', textAlign: 'center'
                                }}
                              >
                                Add
                              </button>
                            )}

                            <span style={{
                              fontSize: '11px',
                              fontWeight: isSelected ? '500' : '400',
                              color: isSelected ? '#10b981' : '#8e8e93',
                              marginTop: '8px'
                            }}>
                              {isSelected ? 'Selected' : 'Select'}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    <div style={{ marginTop: '32px', textAlign: 'center', paddingBottom: '16px' }}>
                      <button
                        onClick={() => setDrawerSelectedItems([])}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#475569',
                          textDecoration: 'underline',
                          textUnderlineOffset: '4px',
                          textDecorationThickness: '1px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          fontWeight: '500'
                        }}
                      >
                        Clear all items
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Footer proceeds trigger */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid #e2e8f0',
              background: '#ffffff'
            }}>
              {(() => {
                const catLimits: Record<string, number | null> = { 'Starters': 2, 'Main Course': 2, 'Desserts': 2, 'Curries': 2, 'Tiffins': 2, 'Rice & Breads': null, 'Beverages': null, 'Extra Items': null };
                const getCatItems = (cat: string) =>
                  cat === 'Starters' ? ['Idli', 'Vada', 'Medu Vada', 'Poha'] :
                    cat === 'Main Course' ? ['Dal Tadka', 'Paneer Butter Masala', 'Aloo Matar', 'Mixed Veg Curry'] :
                      cat === 'Curries' ? ['Veg Kurma', 'Gutti Vankaya', 'Mushroom Masala', 'Palak Paneer'] :
                        cat === 'Tiffins' ? ['Dosa', 'Upma', 'Bonda', 'Uttapam'] :
                          ['Kesari Bath', 'Gulab Jamun', 'Payasam'];

                const isAllItemsSelected = Object.entries(catLimits).every(([cat, limit]) => {
                  if (limit === null) return true;
                  const catItems = getCatItems(cat);
                  const selectedCount = catItems.filter(x => drawerSelectedItems.includes(x)).length;
                  return selectedCount === limit;
                });

                return (
                  <button
                    disabled={!isAllItemsSelected}
                    onClick={() => {
                      setModalStep(modalSelectedDate ? 2 : 1);
                      setShowSelectItemsModal(true);
                      // Drawer stays open in the background
                    }}
                    style={{
                      background: isAllItemsSelected ? '#222222' : '#e5e7eb',
                      color: isAllItemsSelected ? '#ffffff' : '#9ca3af',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: isAllItemsSelected ? 'pointer' : 'not-allowed',
                      textAlign: 'center',
                      width: '100%',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {isAllItemsSelected ? 'Next' : 'Select all required items'}
                  </button>
                );
              })()}
            </div>

          </div>
        </div>
      )}

      {/* Contact Details Modal Overlay */}
      {isEditingContact && (
        <div className="mobile-address-modal-overlay" onClick={() => setIsEditingContact(false)} style={{ zIndex: 1000020 }}>
          <div className="mobile-address-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-address-modal-header" style={{ borderBottom: 'none', paddingBottom: '0', alignItems: 'flex-start' }}>
              <div style={{ textAlign: 'left', marginTop: '4px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#222222', margin: 0 }}>
                  Update contact details
                </h3>
                <p style={{ fontSize: '12px', color: '#717171', margin: '4px 0 0 0' }}>
                  Provide correct contact details for better service
                </p>
              </div>
              <button
                onClick={() => setIsEditingContact(false)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#222222',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: 0
                }}
              >
                ×
              </button>
            </div>
            <div className="mobile-address-modal-body" style={{ padding: '16px 0 32px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#717171', marginBottom: '8px' }}>Name</label>
                  <input
                    type="text"
                    value={checkoutContactName}
                    onChange={(e) => setCheckoutContactName(e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px', border: '1px solid #dddddd', borderRadius: '8px', fontSize: '16px', color: '#222222', outline: 'none' }}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#717171', marginBottom: '8px' }}>Mobile Number</label>
                  <input
                    type="text"
                    value={checkoutContactPhone}
                    onChange={(e) => setCheckoutContactPhone(e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px', border: '1px solid #dddddd', borderRadius: '8px', fontSize: '16px', color: '#222222', outline: 'none' }}
                    placeholder="Enter mobile number"
                  />
                </div>
                <button
                  onClick={() => setIsEditingContact(false)}
                  style={{ background: '#222222', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Address Selector Modal Overlay */}
      {showMobileAddressModal && (
        <div className="mobile-address-modal-overlay" onClick={() => setShowMobileAddressModal(false)}>
          <div className="mobile-address-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-address-modal-header">
              <h3>Add / Select Address</h3>
              <button className="mobile-address-modal-close" onClick={() => setShowMobileAddressModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="mobile-address-modal-body">
              {/* Address Search Bar inside modal */}
              <div className="address-search-bar modal-search-bar" style={{ display: 'flex' }}>
                <input
                  type="text"
                  placeholder="Enter your address..."
                  className="address-search-input modal-search-input"
                  defaultValue=""
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val) {
                        setSelectedAddress({
                          name: 'Custom Location',
                          full: val
                        });
                        setShowMobileAddressModal(false);
                      }
                    }
                  }}
                />
                <div
                  className="address-search-btn"
                  onClick={() => {
                    const inputEl = document.querySelector('.modal-search-input') as HTMLInputElement;
                    if (inputEl && inputEl.value.trim()) {
                      setSelectedAddress({
                        name: 'Custom Location',
                        full: inputEl.value.trim()
                      });
                      setShowMobileAddressModal(false);
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>


              {/* Saved Addresses Section inside modal */}
              <div className="saved-addresses-section modal-saved-addresses" style={{ display: 'block', marginTop: '20px' }}>
                <div className="saved-addresses-header">
                  <div className="saved-addresses-title">Saved Addresses</div>
                  <button className="add-address-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Address
                  </button>
                </div>
                <div className="saved-addresses-list">
                  {/* Home */}
                  <div
                    className={`saved-address-item ${selectedAddress?.name === 'Home' ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedAddress({
                        name: 'Home',
                        full: 'Road No. 21, Building 3B, Flat 406, Gachibowli, Hyderabad, Telangana, 500032'
                      });
                      setShowMobileAddressModal(false);
                    }}
                  >
                    <div className="address-icon-circle">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </div>
                    <div className="address-item-details">
                      <div className="address-item-name">Home</div>
                      <div className="address-item-text">Road No. 21, Building 3B, Flat 406, Gachibowli, Hyderabad, Telangana, 500032</div>
                    </div>
                  </div>

                  {isLoggedIn && (
                    <>
                      {/* Work */}
                      <div
                        className={`saved-address-item ${selectedAddress?.name === 'Work' ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedAddress({
                            name: 'Work',
                            full: 'Building 1A, DLF Cyber City, Madhapur, Hyderabad, 500081'
                          });
                          setShowMobileAddressModal(false);
                        }}
                      >
                        <div className="address-icon-circle">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                          </svg>
                        </div>
                        <div className="address-item-details">
                          <div className="address-item-name">Work</div>
                          <div className="address-item-text">Building 1A, DLF Cyber City, Madhapur, Hyderabad, 500081</div>
                        </div>
                      </div>

                      {/* Parents' House */}
                      <div
                        className={`saved-address-item ${selectedAddress?.name === "Parents' House" ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedAddress({
                            name: "Parents' House",
                            full: 'Road No. 12, Banjara Hills, Hyderabad, Telangana, 500034'
                          });
                          setShowMobileAddressModal(false);
                        }}
                      >
                        <div className="address-icon-circle">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                          </svg>
                        </div>
                        <div className="address-item-details">
                          <div className="address-item-name">Parents' House</div>
                          <div className="address-item-text">Road No. 12, Banjara Hills, Hyderabad, Telangana, 500034</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {animateTravelInfo && (
        <div className="travel-toast-pill">
          <span style={{ fontSize: '16px' }}>🚚</span>
          <span style={{ display: 'inline-block', perspective: '400px', transformStyle: 'preserve-3d', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>
            {[..."Travel Distance is updated"].map((char, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  animationDelay: `${index * 0.04}s`,
                  whiteSpace: char === ' ' ? 'pre' : 'normal'
                }}
                className="wave-char-pink"
              >
                {char}
              </span>
            ))}
          </span>
        </div>
      )}

      {/* Coupon Terms Bottom Sheet */}
      {showCouponTerms && (
        <div
          className="modal-backdrop-animate bottom-sheet-on-mobile"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 2000000,
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
          onClick={() => setShowCouponTerms(null)}
        >
          <div
            className="drawer-panel-animate"
            style={{
              background: '#ffffff',
              width: '100%',
              maxWidth: '600px',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px 16px',
              boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
              position: 'relative',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              fontFamily: "'Inter', sans-serif"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#222222', margin: 0, letterSpacing: '-0.3px' }}>Coupon details</h3>
                <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', fontWeight: '500' }}>We provide best offers only for you</div>
              </div>
              <button
                onClick={() => setShowCouponTerms(null)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom: '20px',
                borderBottom: '1px solid #e5e7eb',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '15px', fontWeight: '800', color: '#222222', lineHeight: '1.4', flex: 1, paddingRight: '12px' }}>
                  {showCouponTerms === 'SAVE10' ? '₹100 off on this booking' : showCouponTerms === 'FLAT500' ? '10% off on this booking' : 'Flat ₹200 off on this booking'}
                </div>
                <div
                  style={{
                    border: '1px dashed #9ca3af',
                    background: '#ffffff',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  onClick={() => { navigator.clipboard.writeText(showCouponTerms || ''); alert('Code copied!'); }}
                >
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#222222', letterSpacing: '0.5px' }}>
                    {showCouponTerms}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <circle cx="12" cy="12" r="3" fill="#4b5563" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>
                    Use code {showCouponTerms} to apply the offer
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <circle cx="12" cy="12" r="3" fill="#4b5563" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>
                    Valid on minimum transaction value of {showCouponTerms === 'FLAT200' ? '₹5,000' : '₹0'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <circle cx="12" cy="12" r="3" fill="#4b5563" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>
                    {showCouponTerms === 'FLAT500' ? '10% discount up to ₹500 will be applied' : 'Discount will be applied to your total immediately'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCouponTerms(null)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#333333'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#000000'}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* All Offers Bottom Sheet */}
      {showAllOffers && (
        <div
          className="modal-backdrop-animate bottom-sheet-on-mobile"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 1000000,
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
          onClick={() => setShowAllOffers(false)}
        >
          <div
            className="drawer-panel-animate"
            style={{
              background: '#f9fafb',
              width: '100%',
              maxWidth: '600px',
              height: '90vh',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
              position: 'relative',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              fontFamily: "'Inter', sans-serif"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 16px 16px 16px', background: '#ffffff', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#222222', margin: 0, letterSpacing: '-0.3px' }}>Offers</h3>
              <button
                onClick={() => setShowAllOffers(false)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 16px' }}>
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '32px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px 16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={manualCouponCode}
                  onChange={(e) => setManualCouponCode(e.target.value.toUpperCase())}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#222222',
                    textTransform: 'uppercase'
                  }}
                />
                <button
                  onClick={() => {
                    const inlineSubtotal = previewGuestCount * (selectedMenuData?.price ? parseInt(selectedMenuData.price.match(/\d+/)![0], 10) : 49);
                    if (manualCouponCode.trim() === 'SAVE10' || manualCouponCode.trim() === 'FLAT500' || (manualCouponCode.trim() === 'FLAT200' && inlineSubtotal >= 5000)) {
                      setAppliedCouponCode(manualCouponCode.trim());
                      setShowAllOffers(false);
                      setManualCouponCode('');
                    } else if (manualCouponCode.trim() === 'FLAT200') {
                      alert('Add more items to your cart to use this coupon.');
                    } else {
                      alert('Invalid coupon code');
                    }
                  }}
                  disabled={!manualCouponCode.trim()}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    cursor: manualCouponCode.trim() ? 'pointer' : 'not-allowed',
                    background: manualCouponCode.trim() ? '#000000' : '#f3f4f6',
                    color: manualCouponCode.trim() ? '#ffffff' : '#9ca3af',
                    border: 'none',
                    textTransform: 'uppercase'
                  }}
                >
                  Apply
                </button>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#717171', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
                AVAILABLE OFFERS
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Coupon 1: SAVE10 */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.75 3.25L3.25 12.75C2.45 13.55 2.45 14.85 3.25 15.65L8.35 20.75C9.15 21.55 10.45 21.55 11.25 20.75L20.75 11.25C21.25 10.75 21.5 10.05 21.5 9.35V4.25C21.5 3.15 20.6 2.25 19.5 2.25H14.4C13.7 2.25 13 2.5 12.75 3.25Z" fill="#4caf50" />
                      <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#222222', lineHeight: '1.4' }}>
                      ₹100 off on this booking
                    </div>
                    <div
                      onClick={() => setShowCouponTerms('SAVE10')}
                      style={{ fontSize: '13px', fontWeight: '600', color: '#222222', marginTop: '4px', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Terms apply
                    </div>
                  </div>
                  <button
                    onClick={() => setAppliedCouponCode(appliedCouponCode === 'SAVE10' ? null : 'SAVE10')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      background: appliedCouponCode === 'SAVE10' ? '#fee2e2' : '#000000',
                      color: appliedCouponCode === 'SAVE10' ? '#ef4444' : '#ffffff',
                      border: appliedCouponCode === 'SAVE10' ? '1px dashed #ef4444' : '1px solid #000000',
                      userSelect: 'none',
                      minWidth: '80px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {appliedCouponCode === 'SAVE10' ? 'Remove' : 'Apply'}
                  </button>
                </div>

                {/* Coupon 2: FLAT500 */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.75 3.25L3.25 12.75C2.45 13.55 2.45 14.85 3.25 15.65L8.35 20.75C9.15 21.55 10.45 21.55 11.25 20.75L20.75 11.25C21.25 10.75 21.5 10.05 21.5 9.35V4.25C21.5 3.15 20.6 2.25 19.5 2.25H14.4C13.7 2.25 13 2.5 12.75 3.25Z" fill="#4caf50" />
                      <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#222222', lineHeight: '1.4' }}>
                      10% off on this booking
                    </div>
                    <div
                      onClick={() => setShowCouponTerms('FLAT500')}
                      style={{ fontSize: '13px', fontWeight: '600', color: '#222222', marginTop: '4px', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Terms apply
                    </div>
                  </div>
                  <button
                    onClick={() => setAppliedCouponCode(appliedCouponCode === 'FLAT500' ? null : 'FLAT500')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      background: appliedCouponCode === 'FLAT500' ? '#fee2e2' : '#000000',
                      color: appliedCouponCode === 'FLAT500' ? '#ef4444' : '#ffffff',
                      border: appliedCouponCode === 'FLAT500' ? '1px dashed #ef4444' : '1px solid #000000',
                      userSelect: 'none',
                      minWidth: '80px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {appliedCouponCode === 'FLAT500' ? 'Remove' : 'Apply'}
                  </button>
                </div>

                {/* Coupon 3: Disabled */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.75 3.25L3.25 12.75C2.45 13.55 2.45 14.85 3.25 15.65L8.35 20.75C9.15 21.55 10.45 21.55 11.25 20.75L20.75 11.25C21.25 10.75 21.5 10.05 21.5 9.35V4.25C21.5 3.15 20.6 2.25 19.5 2.25H14.4C13.7 2.25 13 2.5 12.75 3.25Z" fill="#4caf50" />
                      <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#222222', lineHeight: '1.4' }}>
                      ₹200 off on this booking
                    </div>
                    {(previewGuestCount * (selectedMenuData?.price ? parseInt(selectedMenuData.price.match(/\d+/)![0], 10) : 49)) < 5000 && (
                      <div style={{ fontSize: '12px', fontWeight: '500', color: '#ef4444', marginTop: '4px', marginBottom: '2px' }}>
                        Add more ₹{Math.max(0, 5000 - (previewGuestCount * (selectedMenuData?.price ? parseInt(selectedMenuData.price.match(/\d+/)![0], 10) : 49)))} to apply
                      </div>
                    )}
                    <div
                      onClick={() => setShowCouponTerms('FLAT200')}
                      style={{ fontSize: '13px', fontWeight: '600', color: '#222222', marginTop: '4px', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Terms apply
                    </div>
                  </div>
                  <button
                    disabled={(previewGuestCount * (selectedMenuData?.price ? parseInt(selectedMenuData.price.match(/\d+/)![0], 10) : 49)) < 5000}
                    onClick={() => setAppliedCouponCode(appliedCouponCode === 'FLAT200' ? null : 'FLAT200')}
                    style={
                      (previewGuestCount * (selectedMenuData?.price ? parseInt(selectedMenuData.price.match(/\d+/)![0], 10) : 49)) < 5000 ? {
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        cursor: 'not-allowed',
                        background: '#f3f4f6',
                        color: '#9ca3af',
                        border: '1px solid #d1d5db',
                        userSelect: 'none',
                        minWidth: '80px',
                        textTransform: 'uppercase'
                      } : {
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        background: appliedCouponCode === 'FLAT200' ? '#fee2e2' : '#000000',
                        color: appliedCouponCode === 'FLAT200' ? '#ef4444' : '#ffffff',
                        border: appliedCouponCode === 'FLAT200' ? '1px dashed #ef4444' : '1px solid #000000',
                        userSelect: 'none',
                        minWidth: '80px',
                        textTransform: 'uppercase'
                      }
                    }
                  >
                    {(previewGuestCount * (selectedMenuData?.price ? parseInt(selectedMenuData.price.match(/\d+/)![0], 10) : 49)) >= 5000 && appliedCouponCode === 'FLAT200' ? 'Remove' : 'Apply'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
