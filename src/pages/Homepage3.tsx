import { useEffect, useState } from 'react'
import BgCyan from '../components/BgCyan'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import ServiceCards from '../components/ServiceCards'
import MobileSearchbar from '../components/MobileSearchbar'

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

    return (
        <div className="fixed w-full h-screen overflow-hidden">
            <BgCyan />

            {/* Responsive Layout */}
            <div className={`z-10 flex-col h-full fixed w-full ${fullscreen ? "blur-md" : ""}`}>
                <Navbar logoColor="normal" background="transparent" blur={true} iconVariant="transparent" profileImg={user.img} setIsMobileMenu={setIsMobileMenuOpen} />

                {/* Main content area - responsive */}
                <div className="flex-1 h-full w-full px-4 py-6 md:px-6 md:pb-32 md:py-0 overflow-y-auto md:overflow-visible flex items-center justify-center md:items-center md:justify-center">
                    <ServiceCards />
                </div>
            </div>

            {/* SearchBar Container - Fixed at bottom center */}
            {!isMobileMenuOpen && (
                <div className='fixed rounded-[22px] z-20 bottom-0 left-0 h-[25%] w-[30%] sm:w-full md:w-[50%] flex items-end justify-center p-4 mx-0 md:mx-[25%] transition-all duration-500 ease-in-out bg-gradient-to-b from-transparent sm:from-[24.52%] to-transparent backdrop-blur-[2px]'
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