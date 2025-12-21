import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Cards from '../components/Cards'
import MobileSearchbar from '../components/MobileSearchbar'
import BgLottie from '../components/BgLottie'
import cardsData from '../data/cardsData.json'
import { useNavigate } from 'react-router-dom'

interface User {
    img: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    voyageFav: Voyage;
    experienceFav: Experience;
    upComingVoyage: Voyage;
    note: Note;
    restaurantFav: Restaurant;
}

interface Voyage {
    img: string;
    name: string;
    description: string;
}

interface Experience {
    img: string;
    name: string;
    description: string;
}

interface Note {
    img: string;
    name: string;
    description: string;
}

interface Restaurant {
    img: string;
    name: string;
    description: string;
}

const user: User = {
    img: "/users/user1.png",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    address: "123 Main St",
    city: "New York",
    country: "USA",
    voyageFav: { img: "/images/voyage.png", name: "Voyage", description: "Voyage à Paris" },
    experienceFav: { img: "/images/experience.png", name: "Experience", description: "Experience à Paris" },
    upComingVoyage: { img: "/images/voyage.png", name: "Voyage", description: "Voyage à Paris" },
    note: { img: "/images/note.png", name: "Note", description: "Note à Paris" },
    restaurantFav: { img: "/images/restaurant.png", name: "Restaurant", description: "Restaurant à Paris" },
}

function Homepage3() {
    const navigate = useNavigate();
    const [fullscreen, setFullscreen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [reservations, setReservations] = useState<any[]>([]);

    useEffect(() => {
        setIsMobile(window.innerWidth < 400);
        console.log(isMobile);
    }, []);

    // Load reservations from localStorage
    useEffect(() => {
        const loadReservations = () => {
            const savedReservations = localStorage.getItem('nexastay_calendar_reminders');
            if (savedReservations) {
                try {
                    const reservationsData = JSON.parse(savedReservations);
                    // Sort by date (most recent first)
                    const sortedReservations = [...reservationsData].sort((a, b) => {
                        const dateA = new Date(a.reservationDate || a.createdAt).getTime();
                        const dateB = new Date(b.reservationDate || b.createdAt).getTime();
                        return dateB - dateA;
                    });
                    setReservations(sortedReservations);
                } catch (error) {
                    console.error('Error loading reservations:', error);
                }
            }
        };

        loadReservations();

        // Listen for storage changes
        const handleStorageChange = () => {
            loadReservations();
        };

        window.addEventListener('localStorageChange', handleStorageChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('localStorageChange', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Handle reservation deletion
    const handleDeleteReservation = (reservationId: string) => {
        const updatedReservations = reservations.filter(r => r.id !== reservationId);
        setReservations(updatedReservations);
        localStorage.setItem('nexastay_calendar_reminders', JSON.stringify(updatedReservations));
        window.dispatchEvent(new Event('localStorageChange'));
    };

    // Convert iconPath to icon for Icon cards and add navigation for Memory cards
    const systemCards = cardsData.cards.map((card: any) => {
        if (card.type === 'Icon' && card.iconPath) {
            return {
                ...card,
                icon: <img src={card.iconPath} alt={card.title} className="w-full h-full object-cover" />
            };
        }
        // Add navigation for Memory cards
        if (card.type === 'Memory') {
            if (card.title === 'Mes favoris') {
                return {
                    ...card,
                    onNavigate: () => navigate('/favorites')
                };
            } else if (card.title === 'Mémoires') {
                return {
                    ...card,
                    onNavigate: () => navigate('/memories')
                };
            }
        }
        return card;
    });

    // Convert reservations to cards
    const reservationCards = reservations.map((reservation) => {
        // Parse description to extract details
        const descriptionLines = reservation.description.split('\n');
        const details = descriptionLines.slice(1).filter((line: string) => line.trim()).join('\n');
        
        return {
            type: 'Reservation' as const,
            id: reservation.id,
            title: reservation.title.replace('Réservation: ', ''),
            description: details || 'Réservation confirmée',
            reservationDate: reservation.date,
            reservationType: reservation.type,
            backgroundColor: reservation.type === 'Hotel' ? '#0EA5E9' : 
                            reservation.type === 'Service' ? '#14B8A6' : 
                            reservation.type === 'Experience' ? '#D946EF' : 
                            '#F87171', // Health
            onNavigate: () => {
                // Navigate to details page if needed
                console.log('Navigate to reservation details');
            },
        };
    });

    // Combine reservation cards first, then system cards
    const cards = [...reservationCards, ...systemCards];

    return (
        <div 
            className="relative w-full min-h-screen overflow-y-auto scrollbar-hide" 
            style={{ 
                scrollBehavior: 'smooth', 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none'
            }}
        >
            <BgLottie />

            {/* Responsive Layout */}
            <div className={`relative z-30 flex flex-col min-h-screen w-full ${fullscreen ? "blur-md" : ""}`}>
                <Navbar logoColor="normal" background={"transparent"} blur={true} iconVariant="transparent" profileImg={user.img} setIsMobileMenu={setIsMobileMenuOpen} />

                {/* Main content area - responsive */}
                <div className="flex-1 w-full px-2 sm:px-4 py-6 md:px-6 md:pb-32 md:py-0 flex flex-col items-center justify-start md:justify-center">
                    {/* Mobile Layout */}
                    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 items-center mt-[20%] mb-[40%] md:hidden">
                        {/* Header Section */}
                        <div className="flex flex-col items-center text-center w-full">
                            <h1 className="text-[30px] sm:text-3xl font-semibold text-slate-950 font-bricolagegrotesque leading-[40px] mb-0">
                                Votre logement idéal!
                            </h1>
                            <p className="text-[18px] font-medium text-slate-900 font-vendsans leading-[28px] mt-0">
                                Découvrez notre marketplace intelligente
                            </p>
                        </div>

                        {/* Cards Section */}
                        <div className="w-full md:pt-[10%] lg:pt-[10%] xl:pt-[10%]">
                            <Cards 
                                cards={cards} 
                                onDeleteReservation={handleDeleteReservation}
                            />
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex flex-col items-center justify-center w-full max-w-7xl mx-auto gap-[22px] mt-[1%] md:mt-[10%] lg:mt-[5%] xl:mt-[8%] ">
                        {/* Header Section */}
                        <div className="flex flex-col items-center text-center w-full">
                            <h1 className="text-[36px] font-semibold text-slate-950 font-bricolagegrotesque leading-[40px] mb-0">
                                Votre logement idéal!
                            </h1>
                            <p className="text-[18px] font-medium text-slate-900 font-vendsans leading-[24px] mt-0">
                                Découvrez notre marketplace intelligente
                            </p>
                        </div>

                        {/* Cards Section */}
                        <div className="w-[70%]">
                            <Cards 
                                cards={cards} 
                                onDeleteReservation={handleDeleteReservation}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* SearchBar Container - Fixed at bottom center */}
            {!isMobileMenuOpen && (
                <div className={`fixed rounded-[22px] z-30 bottom-0 left-0 h-[23%] w-[30%] sm:w-full md:w-[50%] flex items-end justify-center p-4 mx-0 md:mx-[25%] transition-all duration-500 ease-in-out  ${isMobile ? 'mb-[50px]' : ''} `}
                    style={{ height: fullscreen ? '70%' : '' }}
                >
                    {isMobile ? ( 
                    <MobileSearchbar
                        fullscreen={fullscreen}
                        setFullscreen={setFullscreen}
                        width={100}
                        fullHeight={90}
                        height={100}
                    />
                    ) : (
                        <SearchBar
                            fullscreen={fullscreen}
                            setFullscreen={setFullscreen}
                            width={100}
                        fullHeight={90}
                        height={87}
                    />
                    )}

                </div>
            )}
        </div>
    )
}

export default Homepage3