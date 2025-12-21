import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import cardsData from '../data/cardsData.json';

function Memories() {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Get all memory cards and their images
    const memoryCards = cardsData.cards.filter((card: any) => card.type === 'Memory');
    const allImages: { image: string; title: string; description?: string }[] = [];

    memoryCards.forEach((card: any) => {
        if (card.images && Array.isArray(card.images)) {
            card.images.forEach((image: string) => {
                allImages.push({
                    image,
                    title: card.title,
                    description: card.description || '',
                });
            });
        }
    });

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && currentImageIndex < allImages.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
        if (isRightSwipe && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
                setCurrentImageIndex(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight' && currentImageIndex < allImages.length - 1) {
                setCurrentImageIndex(currentImageIndex + 1);
            } else if (e.key === 'Escape') {
                navigate(-1);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentImageIndex, allImages.length, navigate]);

    const goToPrevious = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const goToNext = () => {
        if (currentImageIndex < allImages.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    if (allImages.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar logoColor="normal" background={"transparent"} blur={true} iconVariant="transparent" />
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center">
                        <p className="text-xl font-semibold text-slate-600 font-bricolagegrotesque mb-4">
                            Aucune mémoire disponible
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 rounded-[16px] bg-nexastay-gradient text-white font-semibold font-bricolagegrotesque hover:shadow-lg transition-all"
                        >
                            Retour
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
            <Navbar logoColor="white" background={"transparent"} blur={true} iconVariant="transparent" />
            
            {/* Close button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-[100px] right-[24px] z-50 w-[48px] h-[48px] rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Fermer"
            >
                <X size={24} className="text-white" />
            </button>

            {/* Main carousel container */}
            <div
                className="relative w-full h-screen flex items-center justify-center"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Image display */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {allImages.map((item, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        >
                            <img
                                src={item.image}
                                alt={`${item.title} - ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient overlay for better text visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </div>
                    ))}
                </div>

                {/* Navigation arrows */}
                {currentImageIndex > 0 && (
                    <button
                        onClick={goToPrevious}
                        className="absolute left-[24px] z-30 w-[56px] h-[56px] rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                        aria-label="Image précédente"
                    >
                        <ChevronLeft size={28} className="text-white group-hover:scale-110 transition-transform" />
                    </button>
                )}

                {currentImageIndex < allImages.length - 1 && (
                    <button
                        onClick={goToNext}
                        className="absolute right-[24px] z-30 w-[56px] h-[56px] rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                        aria-label="Image suivante"
                    >
                        <ChevronRight size={28} className="text-white group-hover:scale-110 transition-transform" />
                    </button>
                )}

                {/* Image info overlay (bottom) */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-[32px] pb-[80px]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white font-bricolagegrotesque mb-[8px]">
                            {allImages[currentImageIndex]?.title}
                        </h2>
                        {allImages[currentImageIndex]?.description && (
                            <p className="text-lg text-white/90 font-vendsans">
                                {allImages[currentImageIndex]?.description}
                            </p>
                        )}
                        <p className="text-sm text-white/70 font-vendsans mt-[12px]">
                            {currentImageIndex + 1} / {allImages.length}
                        </p>
                    </div>
                </div>

                {/* Thumbnail navigation (bottom) */}
                <div className="absolute bottom-[24px] left-0 right-0 z-20">
                    <div className="max-w-6xl mx-auto px-[24px]">
                        <div className="flex gap-[12px] overflow-x-auto scrollbar-hide justify-center pb-[8px]">
                            {allImages.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`flex-shrink-0 w-[80px] h-[80px] rounded-[12px] overflow-hidden border-2 transition-all duration-200 ${
                                        index === currentImageIndex
                                            ? 'border-white scale-110 shadow-lg'
                                            : 'border-white/30 opacity-60 hover:opacity-80'
                                    }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Memories;

