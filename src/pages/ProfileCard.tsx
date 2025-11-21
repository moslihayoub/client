import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MonProfile from "../svgs/sideTitle/MonProfile";
import ProfileHeader from "../components/profile/Info/ProfileHeader";
import Session from "../components/profile/Info/Session";
import ProfileUpdate from "./ProfileUpdate";
import { Heart, Star, Zap } from "lucide-react";

export default function ProfileCard() {
  const navigate = useNavigate();
  const [showUpdate, setShowUpdate] = useState(false);

  const handleModifierClick = () => {
    setShowUpdate(true);
  };

  const handleBack = () => {
    setShowUpdate(false);
  };

  return (
    <div className="relative w-full h-full ">
      <AnimatePresence mode="wait">
        {!showUpdate ? (
          <motion.div
            key="profile-card"
            className="bg-white flex flex-col items-center gap-[12px] py-6 px-4 w-full h-full"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ProfileHeader onModifierClick={handleModifierClick} />

            {/* Session History section */}
            <div className="flex justify-center items-start w-full">
              <Session />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="profile-update"
            className="w-full h-full"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ProfileUpdate onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
