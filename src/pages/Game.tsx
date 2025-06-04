
import { useState, useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import AtsappPopup from "@/components/AtsappPopup";
import GameHeader from "@/components/GameHeader";
import GameStatusCard from "@/components/GameStatusCard";
import GameActionsGrid from "@/components/GameActionsGrid";
import ServerStatus from "@/components/ServerStatus";

const Game = () => {
  const [gameStatus, setGameStatus] = useState("connecting");
  const [serverStatus, setServerStatus] = useState("checking");
  const [isAtsappOpen, setIsAtsappOpen] = useState(false);

  useEffect(() => {
    // Simulate game loading
    const timer = setTimeout(() => {
      setGameStatus("ready");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check server status
    const checkServerStatus = async () => {
      try {
        // You can replace this IP with your actual server IP
        const serverIP = "127.0.0.1"; // Replace with your server IP
        const serverPort = "25565"; // Replace with your server port if different
        
        // Since we can't directly ping from browser, we'll simulate the check
        // In a real scenario, you'd need a backend endpoint to check server status
        console.log(`Checking server status for ${serverIP}:${serverPort}`);
        
        // Simulate server check with random result for demo
        const isOnline = Math.random() > 0.5;
        
        setTimeout(() => {
          setServerStatus(isOnline ? "online" : "offline");
        }, 3000);
        
      } catch (error) {
        console.error("Error checking server status:", error);
        setServerStatus("offline");
      }
    };

    checkServerStatus();
    
    // Check server status every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleOpenAtsapp = () => {
    setIsAtsappOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <GameHeader onOpenAtsapp={handleOpenAtsapp} />

      {/* Game Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <GameStatusCard gameStatus={gameStatus} />
        
        {gameStatus === "ready" && (
          <CardContent className="space-y-6 mt-6">
            <GameActionsGrid />
            <ServerStatus serverStatus={serverStatus} />
          </CardContent>
        )}
      </div>

      <AtsappPopup isOpen={isAtsappOpen} onClose={() => setIsAtsappOpen(false)} />
    </div>
  );
};

export default Game;
