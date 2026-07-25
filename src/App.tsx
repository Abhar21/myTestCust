import { useState, useEffect } from 'react'
import './App.css'
import './responsive.css'

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

const renderReviewStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: '#ffb100' }}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    } else if (i - 0.5 === rating) {
      stars.push(
        <span key={i} style={{ display: 'inline-flex', position: 'relative', width: '14px', height: '14px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#e2e8f0" stroke="none" style={{ position: 'absolute' }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: '#ffb100', position: 'absolute', clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </span>
      );
    } else {
      stars.push(
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#e2e8f0" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    }
  }
  return stars;
};

function App() {
  // Tabs: caters, mehendi, makeup, theatres, photography, decors, venues
  const [activeTab, setActiveTab] = useState<TabType>('caters')

  // Select Items Modal state
  const [showSelectItemsModal, setShowSelectItemsModal] = useState(false);
  const [selectedMenuForModal, setSelectedMenuForModal] = useState<string | null>(null);
  const [modalStep, setModalStep] = useState<number>(1);
  const [modalSelectedDate, setModalSelectedDate] = useState<string | null>(null);
  const [modalSelectedSlot, setModalSelectedSlot] = useState<string | null>(null);
  const [confirmedSelection, setConfirmedSelection] = useState<{ [menuTitle: string]: { date: string, slot: string } }>({});
  const [showSelectItemsDrawer, setShowSelectItemsDrawer] = useState(false);
  const [activeItemCategory, setActiveItemCategory] = useState<string>('Starters');
  const [selectedMenuData, setSelectedMenuData] = useState<any>(null);
  const [drawerSelectedItems, setDrawerSelectedItems] = useState<string[]>(['Idli']);
  const [previewGuestCount, setPreviewGuestCount] = useState<number>(50);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);

  // Lock body scroll when popup or drawer is open
  useEffect(() => {
    if (showSelectItemsModal || showSelectItemsDrawer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSelectItemsModal, showSelectItemsDrawer]);



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
  })

  // Dropdown States
  const [showDestinations, setShowDestinations] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showInitialDateModal, setShowInitialDateModal] = useState(false)
  const [activeSearchField, setActiveSearchField] = useState<'where' | 'when' | null>(null)

  // Year and Month navigation states (Locks initial to July 2026)
  const [currentYear, setCurrentYear] = useState(2026)
  const [currentMonth, setCurrentMonth] = useState(6) // 6 = July (0-indexed)

  // Address Manager selected address state (initialized to null for Screen 2)
  const [selectedAddress, setSelectedAddress] = useState<{ name: string, full: string } | null>(null)
  const [showMobileAddressModal, setShowMobileAddressModal] = useState(false)

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

  useEffect(() => {
    if (selectedVendorDetail && !whenInput.trim()) {
      setShowInitialDateModal(true);
    }
  }, [selectedVendorDetail, whenInput]);

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

  const handleCardClick = (caterTitle: string) => {
    window.location.href = `?page=detail&vendor=${encodeURIComponent(caterTitle)}&when=${encodeURIComponent(whenInput)}`;
  }

  const isPrevDisabled = currentYear === 2026 && currentMonth === 6
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
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays: Array<{ day: number | null, isPast: boolean }> = [];
  // Add empty leading cells
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push({ day: null, isPast: true });
  }
  // Add actual month days
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const cellDate = new Date(currentYear, currentMonth, d);
    const minSelectableDate = new Date(2026, 6, 22); // July 19, 2026 (today) + 3 days = July 22, 2026
    const isPast = cellDate < minSelectableDate;
    calendarDays.push({ day: d, isPast });
  }

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
            {whenInput || 'Add dates'}
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
                value={whenInput}
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
            {isSearchView ? (
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
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
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
            ) : selectedVendorDetail ? null : (
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: '#ff385c', marginRight: '4px' }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span className="detail-left-rating-val">{selectedVendorDetail.rating}</span>
                    <span className="detail-left-rating-count">· 48 reviews</span>
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
                      {getCaterTravelInfo(selectedVendorDetail.title)}
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
                <div style={{ display: 'flex', gap: '16px' }}>
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
                    .slice(0, 2)
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
                            if (whenInput) {
                              const cleaned = whenInput.trim();
                              if (cleaned.startsWith("July")) {
                                const match = cleaned.match(/July\s+(\d+)/i);
                                if (match) {
                                  const dayNum = parseInt(match[1]);
                                  if (dayNum >= 20 && dayNum <= 26) {
                                    defaultDate = `July-${dayNum}`;
                                  }
                                }
                              } else if (cleaned.startsWith("August")) {
                                const match = cleaned.match(/August\s+(\d+)/i);
                                if (match) {
                                  const dayNum = parseInt(match[1]);
                                  const isBlocked = dayNum === 10 || dayNum === 11 || dayNum === 12 || dayNum === 24 || dayNum === 25;
                                  if (!isBlocked) {
                                    defaultDate = `August-${dayNum}`;
                                  }
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
                            setShowSelectItemsDrawer(true);
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
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#222222', lineHeight: '1.4' }}>
                    Get upto 10% off on the booking
                  </div>
                  <a
                    href="#terms"
                    onClick={(e) => { e.preventDefault(); alert('Terms: Max discount up to ₹1000. Valid on all orders.'); }}
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
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#222222', lineHeight: '1.4' }}>
                    Flat ₹500 off on the booking
                  </div>
                  <a
                    href="#terms"
                    onClick={(e) => { e.preventDefault(); alert('Terms: Min booking value must be ₹5000. Valid on first booking.'); }}
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

          {/* Reviews and Ratings Section */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#717171', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Reviews & Ratings
              </h3>
              <button
                onClick={() => { alert('Show all reviews modal would open'); }}
                style={{
                  border: 'none',
                  background: '#f3f4f6',
                  color: '#111827',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  outline: 'none'
                }}
                className="show-all-reviews-btn"
              >
                Show all reviews
              </button>
            </div>

            <div className="reviews-grid-scrollable hide-scrollbar">
              {[
                {
                  name: "Bhargav Ambati",
                  firstName: "Bhargav",
                  time: "1 month ago",
                  rating: "4.0/5",
                  stars: 4,
                  ordered: "Breakfast Menu 1",
                  text: "Food was good"
                },
                {
                  name: "Anirudh Kumar",
                  firstName: "Anirudh",
                  time: "2 weeks ago",
                  rating: "5.0/5",
                  stars: 5,
                  ordered: "Lunch Menu 1",
                  text: "Extremely professional catering service. The biryani was outstanding and all guests loved the presentation."
                },
                {
                  name: "Pooja Gupta",
                  firstName: "Pooja",
                  time: "3 months ago",
                  rating: "4.5/5",
                  stars: 4.5,
                  ordered: "Breakfast Menu 1",
                  text: "Very hygienic packaging and prompt delivery. Highly recommended for family events!"
                },
                {
                  name: "Rajesh Verma",
                  firstName: "Rajesh",
                  time: "1 month ago",
                  rating: "4.8/5",
                  stars: 5,
                  ordered: "Lunch Menu 2",
                  text: "Excellent taste and quantity. The paneer tikka starter was exceptionally soft and delicious."
                },
                {
                  name: "Sneha Reddy",
                  firstName: "Sneha",
                  time: "2 weeks ago",
                  rating: "4.6/5",
                  stars: 4.5,
                  ordered: "Veg Breakfast",
                  text: "On-time setup and clean presentation. The filter coffee was a huge hit among all our guests."
                },
                {
                  name: "Amit Sharma",
                  firstName: "Amit",
                  time: "3 weeks ago",
                  rating: "5.0/5",
                  stars: 5,
                  ordered: "Premium Dinner",
                  text: "The service staff was very courteous. Highly professional management, everything went very smoothly."
                }
              ].map((rev, rIdx) => (
                <div
                  key={rIdx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e8e8e8',
                    borderRadius: '24px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.04)',
                    width: '100%',
                    flexShrink: 0,
                    boxSizing: 'border-box',
                    scrollSnapAlign: 'start'
                  }}
                >
                  {/* Top Header Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {/* Avatar Circle with Gray BG & Black First Name Initial */}
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: '#e5e5e5',
                        color: '#222222',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '18px',
                        textTransform: 'uppercase',
                        overflow: 'hidden',
                        padding: '4px',
                        textAlign: 'center',
                        boxSizing: 'border-box'
                      }}>
                        {rev.firstName.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#222222' }}>
                          {rev.name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#717171', marginTop: '2px' }}>
                          {rev.time}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {renderReviewStars(rev.stars)}
                      </div>
                      <div style={{ fontSize: '12px', color: '#717171', fontWeight: '500' }}>
                        {rev.rating}
                      </div>
                    </div>
                  </div>

                  {/* Ordered Menu Row */}
                  <div style={{ fontSize: '14px', color: '#717171' }}>
                    Ordered : <strong style={{ color: '#222222', fontWeight: '600' }}>{rev.ordered}</strong>
                  </div>

                  {/* Dashed Line Divider */}
                  <div style={{ borderTop: '1px dashed #e2e8f0' }}></div>

                  {/* Review Text */}
                  <div style={{ fontSize: '14px', color: '#484848', lineHeight: '1.5' }}>
                    {rev.text}
                  </div>
                </div>
              ))}
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
                        <span className="card-dot">·</span>
                        <span className="card-rating-inline">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginRight: '2px' }}>
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          {home.rating}
                        </span>
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
                    <div className="card-details-row">
                      <span className="card-active-price">{home.price}</span>
                      <span className="card-dot">·</span>
                      <span className="card-rating-inline">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginRight: '2px' }}>
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {home.rating}
                      </span>
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
                    <div className="card-details-row">
                      <span className="card-active-price">{home.price}</span>
                      <span className="card-dot">·</span>
                      <span className="card-rating-inline">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginRight: '2px' }}>
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {home.rating}
                      </span>
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
                <h2>Best in rating in Hyderabad</h2>
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
                    <div className="card-details-row">
                      <span className="card-active-price">{home.price}</span>
                      <span className="card-dot">·</span>
                      <span className="card-rating-inline">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginRight: '2px' }}>
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {home.rating}
                      </span>
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

          <div className="sidebar-divider"></div>

          {/* Log in or sign up */}
          <div className="sidebar-menu-item" onClick={() => { alert('Login or Signup clicked'); setShowSidebar(false); }}>
            <div className="sidebar-menu-text-col">
              <span className="sidebar-menu-label">Log in or sign up</span>
            </div>
            <div className="sidebar-menu-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

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
            zIndex: 99999,
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
              width: '680px',
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

            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#222222', margin: '0 0 6px 0' }}>
                Select Booking Date
              </h3>
              <p style={{ fontSize: '13px', color: '#717171', margin: 0 }}>
                Please choose a date to see availability and menus for <strong style={{ color: '#222222' }}>{selectedVendorDetail?.title}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '32px', marginTop: '10px' }}>
              {/* August 2026 */}
              <div style={{ flex: 1 }}>
                <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '15px', color: '#222222', marginBottom: '12px' }}>
                  August 2026
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontWeight: '600', fontSize: '11px', color: '#717171', marginBottom: '8px' }}>
                  <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                  {/* Aug starts Saturday, 6 empty cells */}
                  {Array(6).fill(null).map((_, i) => <div key={`empty-aug-${i}`} />)}
                  {Array(31).fill(0).map((_, dIdx) => {
                    const dayNum = dIdx + 1;
                    const isBlocked = dayNum === 10 || dayNum === 11 || dayNum === 12 || dayNum === 24 || dayNum === 25;
                    const dateStr = `August ${dayNum}, 2026`;
                    return (
                      <div
                        key={`aug-${dayNum}`}
                        onClick={() => {
                          if (!isBlocked) {
                            setWhenInput(dateStr);
                            const url = new URL(window.location.href);
                            url.searchParams.set('when', dateStr);
                            window.history.replaceState({}, '', url.toString());
                            setShowInitialDateModal(false);
                          }
                        }}
                        style={{
                          height: '34px',
                          width: '34px',
                          margin: '0 auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          cursor: isBlocked ? 'default' : 'pointer',
                          color: isBlocked ? '#d1d5db' : '#222222',
                          fontWeight: isBlocked ? '400' : '600',
                          fontSize: '13px',
                          textDecoration: isBlocked ? 'line-through' : 'none',
                          transition: 'all 0.15s'
                        }}
                        className={!isBlocked ? 'detail-calendar-day-hover' : ''}
                      >
                        {dayNum}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* September 2026 */}
              <div style={{ flex: 1 }}>
                <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '15px', color: '#222222', marginBottom: '12px' }}>
                  September 2026
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontWeight: '600', fontSize: '11px', color: '#717171', marginBottom: '8px' }}>
                  <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                  {/* Sep starts Tuesday, 2 empty cells */}
                  {Array(2).fill(null).map((_, i) => <div key={`empty-sep-${i}`} />)}
                  {Array(30).fill(0).map((_, dIdx) => {
                    const dayNum = dIdx + 1;
                    const isBlocked = dayNum === 5 || dayNum === 6 || dayNum === 25 || dayNum === 26 || dayNum === 27 || dayNum === 28;
                    const dateStr = `September ${dayNum}, 2026`;
                    return (
                      <div
                        key={`sep-${dayNum}`}
                        onClick={() => {
                          if (!isBlocked) {
                            setWhenInput(dateStr);
                            const url = new URL(window.location.href);
                            url.searchParams.set('when', dateStr);
                            window.history.replaceState({}, '', url.toString());
                            setShowInitialDateModal(false);
                          }
                        }}
                        style={{
                          height: '34px',
                          width: '34px',
                          margin: '0 auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          cursor: isBlocked ? 'default' : 'pointer',
                          color: isBlocked ? '#d1d5db' : '#222222',
                          fontWeight: isBlocked ? '400' : '600',
                          fontSize: '13px',
                          textDecoration: isBlocked ? 'line-through' : 'none',
                          transition: 'all 0.15s'
                        }}
                        className={!isBlocked ? 'detail-calendar-day-hover' : ''}
                      >
                        {dayNum}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Select Items Modal Popup */}
      {showSelectItemsModal && (
        <div
          className="modal-backdrop-animate"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99999,
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
                <div style={{ textAlign: 'center', marginTop: '4px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#222222', margin: 0 }}>
                    Select Date
                  </h3>
                  <p style={{ fontSize: '12px', color: '#717171', marginTop: '4px' }}>
                    Choose booking date for {selectedMenuForModal}
                  </p>
                </div>

                {/* Month Picker Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', marginTop: '10px' }}>
                  <button
                    onClick={() => alert('Only July and August 2026 are active')}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#717171', padding: '4px' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#222222', width: '50%', textAlign: 'center' }}>
                      July 2026
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#222222', width: '50%', textAlign: 'center' }}>
                      August 2026
                    </span>
                  </div>

                  <button
                    onClick={() => alert('Only July and August 2026 are active')}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#717171', padding: '4px' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Double Month Columns Container */}
                <div style={{ display: 'flex', gap: '32px', justifyContent: 'space-between' }}>

                  {/* July Column */}
                  <div style={{ flex: 1 }}>
                    {/* Weekday initials */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontWeight: '600', fontSize: '11px', color: '#717171', marginBottom: '8px' }}>
                      <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                    </div>
                    {/* July Days grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                      {[
                        // July starts Wednesday, so 3 empty cells
                        ...Array(3).fill({ day: null, enabled: false }),
                        ...Array(31).fill(0).map((_, dIdx) => {
                          const dayNum = dIdx + 1;
                          return {
                            day: dayNum,
                            // July 20-26 are enabled. 1-19 (past/peak time advance) and 27-31 (blocked) are disabled.
                            enabled: dayNum >= 20 && dayNum <= 26
                          };
                        })
                      ].map((item, idx) => {
                        if (!item.day) return <div key={idx} />;
                        const dateKey = `July-${item.day}`;
                        const isSelected = modalSelectedDate === dateKey;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              if (item.enabled) {
                                setModalSelectedDate(dateKey);
                              }
                            }}
                            style={{
                              padding: '0',
                              borderRadius: '50%',
                              cursor: item.enabled ? 'pointer' : 'default',
                              color: isSelected ? '#ffffff' : (item.enabled ? '#222222' : '#d1d5db'),
                              background: isSelected ? '#222222' : 'transparent',
                              fontWeight: item.enabled ? '600' : '400',
                              fontSize: '13px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '32px',
                              width: '32px',
                              margin: '0 auto',
                              textDecoration: !item.enabled ? 'line-through' : 'none',
                              transition: 'all 0.15s'
                            }}
                            className={item.enabled && !isSelected ? 'modal-day-hover' : ''}
                          >
                            {item.day}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* August Column */}
                  <div style={{ flex: 1 }}>
                    {/* Weekday initials */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontWeight: '600', fontSize: '11px', color: '#717171', marginBottom: '8px' }}>
                      <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                    </div>
                    {/* August Days grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                      {[
                        // August starts Saturday, so 6 empty cells
                        ...Array(6).fill({ day: null, enabled: false }),
                        ...Array(31).fill(0).map((_, dIdx) => {
                          const dayNum = dIdx + 1;
                          // Block some random future days: e.g. August 10, 11, 12 and 24, 25
                          const isBlocked = dayNum === 10 || dayNum === 11 || dayNum === 12 || dayNum === 24 || dayNum === 25;
                          return {
                            day: dayNum,
                            enabled: !isBlocked
                          };
                        })
                      ].map((item, idx) => {
                        if (!item.day) return <div key={idx} />;
                        const dateKey = `August-${item.day}`;
                        const isSelected = modalSelectedDate === dateKey;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              if (item.enabled) {
                                setModalSelectedDate(dateKey);
                              }
                            }}
                            style={{
                              padding: '0',
                              borderRadius: '50%',
                              cursor: item.enabled ? 'pointer' : 'default',
                              color: isSelected ? '#ffffff' : (item.enabled ? '#222222' : '#d1d5db'),
                              background: isSelected ? '#222222' : 'transparent',
                              fontWeight: item.enabled ? '600' : '400',
                              fontSize: '13px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '32px',
                              width: '32px',
                              margin: '0 auto',
                              textDecoration: !item.enabled ? 'line-through' : 'none',
                              transition: 'all 0.15s'
                            }}
                            className={item.enabled && !isSelected ? 'modal-day-hover' : ''}
                          >
                            {item.day}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Warning Message */}
                <div style={{
                  background: '#fffbeb',
                  border: '1px solid #fef3c7',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  marginTop: '4px'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span style={{ fontSize: '11px', color: '#b45309', fontWeight: '500', textAlign: 'left' }}>
                    Due to peak time booking, we allow you to book min 3 days in advance.
                  </span>
                </div>

                {/* Footer buttons row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                  {/* Clear button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span
                      onClick={() => setModalSelectedDate(null)}
                      style={{ fontSize: '12px', fontWeight: '600', color: '#222222', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Clear dates
                    </span>
                  </div>

                  <button
                    disabled={!modalSelectedDate}
                    onClick={() => setModalStep(2)}
                    style={{
                      background: modalSelectedDate ? '#222222' : '#e5e7eb',
                      color: modalSelectedDate ? '#ffffff' : '#9ca3af',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontWeight: '600',
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
                <div style={{ textAlign: 'center', paddingBottom: '12px', flexShrink: 0 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#222222', margin: 0 }}>
                    Select Time Slot
                  </h3>
                  <p style={{ fontSize: '12px', color: '#717171', marginTop: '4px' }}>
                    For {modalSelectedDate ? (modalSelectedDate.split('-')[0] + ' ' + modalSelectedDate.split('-')[1] + ', 2026') : ''}
                  </p>
                </div>

                {/* Scrollable Slots — only this area scrolls */}
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  paddingRight: '4px',
                }}>
                  {[
                    "8:00 AM to 8:15 AM",
                    "8:15 AM to 8:30 AM",
                    "8:30 AM to 8:45 AM",
                    "8:45 AM to 9:00 AM",
                    "9:00 AM to 9:15 AM",
                    "9:15 AM to 9:30 AM",
                    "9:30 AM to 9:45 AM",
                    "9:45 AM to 10:00 AM"
                  ].map((slot, sIdx) => {
                    const isSelected = modalSelectedSlot === slot;
                    return (
                      <div
                        key={sIdx}
                        onClick={() => setModalSelectedSlot(slot)}
                        style={{
                          padding: '13px 16px',
                          border: 'none',
                          background: isSelected ? '#f3f4f6' : '#fafafa',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          fontWeight: isSelected ? '600' : '400',
                          color: isSelected ? '#222222' : '#555555',
                          fontSize: '14px',
                          transition: 'all 0.15s',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexShrink: 0
                        }}
                      >
                        <span>{slot}</span>
                        {isSelected && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#222222' }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Fixed Footer — Back + Next */}
                <div style={{ display: 'flex', gap: '12px', paddingTop: '12px', flexShrink: 0 }}>
                  <button
                    onClick={() => setModalStep(1)}
                    style={{
                      background: '#ffffff',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '14px',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      flex: 1,
                      color: '#222222',
                      textAlign: 'center'
                    }}
                  >
                    Back
                  </button>
                  <button
                    disabled={!modalSelectedSlot}
                    onClick={() => setModalStep(3)}
                    style={{
                      background: modalSelectedSlot ? '#222222' : '#e5e7eb',
                      color: modalSelectedSlot ? '#ffffff' : '#9ca3af',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: modalSelectedSlot ? 'pointer' : 'default',
                      flex: 1,
                      textAlign: 'center',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (() => {
              const actualPricePerPlate = (() => {
                if (!selectedMenuData || !selectedMenuData.price) return 49;
                const match = selectedMenuData.price.match(/\d+/);
                return match ? parseInt(match[0], 10) : 49;
              })();
              const originalPricePerPlate = (() => {
                if (!selectedMenuData || !selectedMenuData.originalPrice) return 54;
                const match = selectedMenuData.originalPrice.match(/\d+/);
                return match ? parseInt(match[0], 10) : 54;
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
              const quickSelectOptions = (() => {
                if (maxGuests <= 300) {
                  return [30, 50, 100, 150, 200];
                } else if (maxGuests >= 1000) {
                  return [100, 250, 500, 750, 1000];
                }
                return [50, 100, 150, 200, 250];
              })();

              return (
                // Step 3: Booking Preview
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>

                  {/* ── Heading ── */}
                  <div style={{ textAlign: 'left', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>Review & Confirm</h3>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Check your booking details before paying</p>
                  </div>

                  {/* ── Section 1: Guest Count Widget ── */}
                  <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>Guest Count</div>
                          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '3px' }}>We recommend you to add some extra guests</div>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: '#4b5563', marginTop: '10px', display: 'inline-block', background: '#f3f4f6', padding: '2px 8px', borderRadius: '6px' }}>
                            Limit: {minGuests} - {maxGuests} pax
                          </div>
                        </div>
                      </div>
                      {/* Numeric Input container */}
                      <div style={{
                        display: 'flex', alignItems: 'center',
                        border: '1px solid #e5e7eb', borderRadius: '12px', padding: '8px 14px',
                        flexShrink: 0
                      }}>
                        <input
                          type="number"
                          className="always-show-spin"
                          value={previewGuestCount || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') {
                              setPreviewGuestCount(0);
                            } else {
                              const parsed = parseInt(val, 10);
                              if (!isNaN(parsed)) {
                                if (parsed <= maxGuests) {
                                  setPreviewGuestCount(parsed);
                                }
                              }
                            }
                          }}
                          onBlur={() => {
                            if (previewGuestCount < minGuests) setPreviewGuestCount(minGuests);
                            if (previewGuestCount > maxGuests) setPreviewGuestCount(maxGuests);
                          }}
                          style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#111827',
                            width: '55px',
                            textAlign: 'center',
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            padding: 0,
                            margin: 0
                          }}
                        />
                      </div>
                    </div>

                    {/* Quick Select Buttons */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                      {quickSelectOptions.map((num) => {
                        const isSelected = previewGuestCount === num;
                        return (
                          <button
                            key={num}
                            onClick={() => setPreviewGuestCount(num)}
                            style={{
                              flex: 1,
                              background: isSelected ? '#111827' : '#ffffff',
                              color: isSelected ? '#ffffff' : '#374151',
                              border: isSelected ? '1px solid #111827' : '1px solid #e5e7eb',
                              borderRadius: '8px',
                              padding: '6px 0',
                              fontSize: '13px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                              textAlign: 'center'
                            }}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>


                    {/* Price per plate banner */}
                    <div style={{
                      marginTop: '20px',
                      background: '#eff6ff',
                      borderRadius: '10px',
                      padding: '10px',
                      textAlign: 'center',
                      color: '#2563eb',
                      fontWeight: '700',
                      fontSize: '15px'
                    }}>
                      Just {selectedMenuData?.price || '₹49/plate'}
                    </div>
                  </div>

                  {/* ── Section 2: Date & Time Slot ── */}
                  <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '14px 16px',
                    marginBottom: '12px',
                    display: 'flex',
                    gap: '16px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginTop: '4px' }}>
                        {modalSelectedDate ? (modalSelectedDate.split('-')[0] + ' ' + modalSelectedDate.split('-')[1] + ', 2026') : '—'}
                      </div>
                    </div>
                    <div style={{ width: '1px', background: '#e5e7eb', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time Slot</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginTop: '4px' }}>{modalSelectedSlot || '—'}</div>
                    </div>
                  </div>

                  {/* ── Section 3: Offers & Coupons ── */}
                  <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 2px 0' }}>Offers & Coupons</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>only 1 Coupon applicable at a time</div>

                    {[
                      {
                        code: 'FLAT100',
                        title: '₹100 OFF on this Order',
                        desc: 'Flat ₹100 OFF on bookings above ₹8,999'
                      },
                      {
                        code: 'TENPERCENT',
                        title: '10% OFF on this Order',
                        desc: 'Upto ₹199 OFF on above ₹7,599'
                      }
                    ].map((c, idx) => {
                      const isApplied = appliedCouponCode === c.code;
                      return (
                        <div key={c.code}>
                          {idx > 0 && <div style={{ borderTop: '1px dashed #e5e7eb', margin: '14px 0' }} />}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                              {/* Serrated discount badge SVG */}
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="#10b981" style={{ flexShrink: 0 }}>
                                <path d="M12 2l2.4 1.8 2.9-.6.8 2.9 2.9.8-.6 2.9 1.8 2.4-1.8 2.4.6 2.9-2.9.8-.8 2.9-2.9-.6L12 22l-2.4-1.8-2.9.6-.8-2.9-2.9-.8.6-2.9-1.8-2.4 1.8-2.4-.6-2.9 2.9-.8.8-2.9 2.9.6L12 2z" />
                                <circle cx="9.5" cy="9.5" r="1.5" fill="#ffffff" />
                                <circle cx="14.5" cy="14.5" r="1.5" fill="#ffffff" />
                                <line x1="14.5" y1="9.5" x2="9.5" y2="14.5" stroke="#ffffff" strokeWidth="2" />
                              </svg>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#10b981' }}>{c.title}</div>
                                <div style={{ fontSize: '12px', color: '#717171', marginTop: '2px' }}>{c.desc}</div>
                              </div>
                            </div>

                            <button
                              onClick={() => setAppliedCouponCode(isApplied ? null : c.code)}
                              style={{
                                border: isApplied ? '1px solid #fecaca' : '1px solid #a7f3d0',
                                background: isApplied ? '#fee2e2' : '#ecfdf5',
                                color: isApplied ? '#ef4444' : '#10b981',
                                borderRadius: '16px',
                                padding: isApplied ? '8px 16px' : '8px 20px',
                                fontSize: '13px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                                flexShrink: 0
                              }}
                            >
                              {isApplied ? 'Remove' : 'Apply'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ── Section 4: Order Summary Card ── */}
                  {(() => {
                    const couponDiscount = (() => {
                      if (appliedCouponCode === 'FLAT100') return 100;
                      if (appliedCouponCode === 'TENPERCENT') {
                        const subtotal = previewGuestCount * actualPricePerPlate;
                        return Math.min(199, Math.round(subtotal * 0.1));
                      }
                      return 0;
                    })();

                    const subtotal = previewGuestCount * actualPricePerPlate;
                    const finalDiscountedPrice = Math.max(0, subtotal - couponDiscount);
                    const originalTotal = previewGuestCount * originalPricePerPlate;
                    const totalSavedAmount = originalTotal - finalDiscountedPrice;

                    return (
                      <div style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        marginBottom: '12px'
                      }}>
                        {/* Delivery Address */}
                        <div style={{ padding: '14px 16px', borderBottom: '1px dashed #d1d5db' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>Delivery Address</span>
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginTop: '4px' }}>12/34-AB, South India SH, Diamond Hills...</div>
                        </div>
                        {/* Menu Details */}
                        <div style={{ padding: '14px 16px', borderBottom: '1px dashed #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                              <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>Menu Details</span>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginTop: '4px' }}>{selectedMenuForModal || 'Veg, Breakfast'}</div>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                        </div>
                        {/* Contact Details */}
                        <div style={{ padding: '14px 16px', borderBottom: '1px dashed #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                              <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>Contact Details</span>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginTop: '4px' }}>Bhargav Ambati, +91 9876543210</div>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                        </div>
                        {/* Bill Details */}
                        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                              <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>Bill Details</span>
                              {totalSavedAmount > 0 && (
                                <span style={{ fontSize: '11px', fontWeight: '700', color: '#ec4899', background: '#fce7f3', borderRadius: '6px', padding: '2px 8px', marginLeft: '6px' }}>
                                  Saved ₹{totalSavedAmount.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginTop: '4px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontWeight: '400' }}>₹{originalTotal.toLocaleString()}</span>
                              <span>₹{finalDiscountedPrice.toLocaleString()}</span>
                            </div>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                        </div>
                      </div>
                    );
                  })()}

                  {/* ── Section 5: Cancellation Policy ── */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#9ca3af', marginBottom: '4px' }}>Cancellation Policy</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1.5' }}>Please verify your event details before booking. Once an order is placed, it cannot be refunded.</div>
                  </div>

                  {/* ── Pay Advance CTA ── */}
                  <button
                    onClick={() => {
                      setConfirmedSelection(prev => ({
                        ...prev,
                        [selectedMenuForModal || '']: {
                          date: modalSelectedDate ? (modalSelectedDate.split('-')[0] + ' ' + modalSelectedDate.split('-')[1] + ', 2026') : '',
                          slot: modalSelectedSlot || ''
                        }
                      }));
                      setShowSelectItemsModal(false);
                    }}
                    style={{
                      background: '#111827',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '16px',
                      fontWeight: '700',
                      fontSize: '15px',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'center',
                      letterSpacing: '0.02em',
                      flexShrink: 0
                    }}
                  >
                    Pay Advance
                  </button>
                </div>
              );
            })()}
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
            zIndex: 99980,
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
              zIndex: 99990,
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
                    Items are customisable and fixed
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
                  {activeItemCategory === 'Starters'
                    ? `Added ${['Idli', 'Vada', 'Medu Vada', 'Poha'].filter(x => drawerSelectedItems.includes(x)).length}/2`
                    : 'All items included'}
                </div>
              </div>

              {/* Tabs Row */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Starters', 'Main Course', 'Rice & Breads', 'Beverages', 'Desserts'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveItemCategory(cat)}
                    style={{
                      background: activeItemCategory === cat ? '#222222' : '#f3f4f6',
                      border: activeItemCategory === cat ? '1px solid #222222' : '1px solid #e5e7eb',
                      borderRadius: '24px',
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: activeItemCategory === cat ? '#ffffff' : '#4b5563',
                      cursor: 'pointer',
                      boxShadow: activeItemCategory === cat ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                      transition: 'all 0.15s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
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

                const STARTER_MAX = 2;
                const starterSelectedCount = starterItems.filter(i => drawerSelectedItems.includes(i.id)).length;
                const starterLimitReached = starterSelectedCount >= STARTER_MAX;

                if (activeItemCategory === 'Starters') {
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {starterItems.map(item => {
                        const isSelected = drawerSelectedItems.includes(item.id);
                        const isDisabled = !isSelected && starterLimitReached;
                        return (
                          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              {getItemThumbnail(isDisabled)}
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: isDisabled ? '#9ca3af' : '#222222' }}>{item.name}</div>
                                <div style={{ fontSize: '12px', color: '#717171', marginTop: '3px', lineHeight: '1.4' }}>{item.desc}</div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '78px', flexShrink: 0 }}>
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
                    </div>
                  );
                }

                const currentItems = fixedSections[activeItemCategory] || [];
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {currentItems.map(item => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          {getItemThumbnail(false)}
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#222222' }}>{item.name}</div>
                            <div style={{ fontSize: '12px', color: '#717171', marginTop: '3px', lineHeight: '1.4' }}>{item.desc}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '78px', flexShrink: 0 }}>
                          <button
                            disabled={true}
                            style={{
                              background: '#f9fafb', color: '#9ca3af',
                              border: '1px solid #e5e7eb', borderRadius: '10px',
                              padding: '6px 12px', fontWeight: '500', fontSize: '12px',
                              cursor: 'default', width: '100%', textAlign: 'center'
                            }}
                          >
                            Add
                          </button>
                          <span style={{ fontSize: '11px', fontWeight: '500', color: '#10b981', marginTop: '8px' }}>
                            Selected
                          </span>
                        </div>
                      </div>
                    ))}
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
              <button
                onClick={() => {
                  setShowSelectItemsModal(true);
                }}
                style={{
                  background: '#222222',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  width: '100%',
                  transition: 'background-color 0.2s'
                }}
              >
                Next
              </button>
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
