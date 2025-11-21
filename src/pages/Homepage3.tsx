import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Cards from '../components/Cards'
import MobileSearchbar from '../components/MobileSearchbar'
import BgLottie from '../components/BgLottie'
import cardsData from '../data/cardsData.json'

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
    img: "/images/boy.png",
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
    const [fullscreen, setFullscreen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 400);
        console.log(isMobile);
    }, []);

    // Convert iconPath to icon for Icon cards
    const cards = cardsData.cards.map((card: any) => {
        if (card.type === 'Icon' && card.iconPath) {
            return {
                ...card,
                icon: <img src={card.iconPath} alt={card.title} className="w-full h-full object-cover" />
            };
        }
        return card;
    });

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
            <div className={`relative z-10 flex flex-col min-h-screen w-full ${fullscreen ? "blur-md" : ""}`}>
                <Navbar logoColor="normal" background={"transparent"} blur={true} iconVariant="transparent" profileImg={user.img} setIsMobileMenu={setIsMobileMenuOpen} />

                {/* Main content area - responsive */}
                <div className="flex-1 w-full px-2 sm:px-4 py-6 md:px-6 md:pb-32 md:py-0 flex flex-col items-center justify-start md:justify-center">
                    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 items-center mt-[20%] mb-[40%]">
                        {/* Header Section */}
                        <div className="flex flex-col items-center text-center w-full">
                            <h1 className="text-3xl sm:text-3xl font-semibold text-slate-950 font-bricolagegrotesque leading-[40px] mb-0">
                                Votre logement idéal!
                            </h1>
                            <p className="text-lg font-medium text-slate-900 font-vendsans leading-[28px] mt-0">
                                Découvrez notre marketplace intelligente
                            </p>
                        </div>

                        {/* Cards Section */}
                        <div className="w-full">
                            <Cards cards={cards} />
                        </div>
                    </div>
                </div>
            </div>

            {/* SearchBar Container - Fixed at bottom center */}
            {!isMobileMenuOpen && (
                <div className='fixed rounded-[22px] z-20 bottom-0 left-0 h-[25%] w-[30%] sm:w-full md:w-[50%] flex items-end justify-center p-4 mx-0 md:mx-[25%] transition-all duration-500 ease-in-out bg-gradient-to-b from-transparent sm:from-[24.52%] to-transparent backdrop-blur-[1px]'
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
                        height={100}
                    />
                    )}

                </div>
            )}

            <div className="absolute sm:hidden md:hidden bottom-4 right-4 w-[120px] h-[120px] z-15">
                <img
                    src="/images/bot.png"
                    alt="Bot"
                    className="w-full h-full animate-float"
                />
            </div>
        </div>
    )
}

export default Homepage3