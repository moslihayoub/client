import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MonProfile from "../svgs/sideTitle/MonProfile";
import ProfileHeader from "../components/ProfileHeader";
import { Heart, Star, Zap } from "lucide-react";
import StatsGrid from "../components/StatGridProp";

export default function ProfileCard() {
  const stats = [
    { icon: "/profile/travel.png", value: 5, label: "Voyages" },
    { icon: "/profile/services.png", value: 12, label: "Services" },
    { icon: "/profile/experience.png", value: 3, label: "Expériences" },
    { icon: "/profile/connection.png", value: 32, label: "Connexion" },
    { icon: "/profile/community.png", value: 3, label: "Communautés" },
    { icon: "/profile/alert.png", value: 2, label: "Réclamations" },
  ];

  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white flex flex-col items-center py-6 px-4"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <ProfileHeader />

      {/* Stats section */}
      <div className="flex justify-center items-start w-full p-4 mt-4">
        <StatsGrid stats={stats} />
      </div>
    </motion.div>

  );
}
