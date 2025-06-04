import { useState, useEffect } from "react";
import { ArrowLeft, Gamepad2, Plus, Upload, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AtsappPopup from "@/components/AtsappPopup";

const Game = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const handleBrowseStore = () => {
    window.open("https://store.steampowered.com/", "_blank");
  };

  const handleMyLibrary = () => {
    window.open("https://steamcommunity.com/my/games/", "_blank");
  };

  const handleAddNonMagtinumGames = () => {
    navigate("/non-magtinum-games");
  };

  const handleMpkFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.mpk')) {
        toast({
          title: "Invalid File",
          description: "Please select a .mpk file",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Loading MPK Game",
        description: `Processing ${file.name}...`,
      });

      try {
        // Simulate extracting MPK file to .MPK_games folder
        const userName = "User"; // In a real app, you'd get this from the system
        const extractPath = `C:/Users/${userName}/.MPK_games/${file.name.replace('.mpk', '')}`;
        
        console.log("MPK file selected:", file.name, "Size:", file.size);
        console.log("Extracting to:", extractPath);
        
        // Here you would implement the actual extraction using JSZip or similar
        // For now, we'll simulate the process
        setTimeout(() => {
          toast({
            title: "MPK Game Loaded",
            description: `${file.name} extracted to .MPK_games folder`,
          });
        }, 2000);
        
      } catch (error) {
        console.error("Error processing MPK file:", error);
        toast({
          title: "Error",
          description: "Failed to process MPK file",
          variant: "destructive",
        });
      }
      
      // Reset the file input
      event.target.value = '';
    }
  };

  const triggerMpkLoad = () => {
    const fileInput = document.getElementById('mpk-file-input') as HTMLInputElement;
    fileInput?.click();
  };

  const handleOpenAtsapp = () => {
    setIsAtsappOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="flex items-center space-x-2 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Browser</span>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
            <Gamepad2 className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Magtinum Game
          </h1>
        </div>

        <Button
          onClick={handleOpenAtsapp}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Atsapp</span>
        </Button>
      </div>

      {/* Game Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="bg-slate-800 border-slate-600 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">🕹️ Welcome to the Magtinum Game!</CardTitle>
            <p className="text-slate-300">
              {gameStatus === "connecting" 
                ? "Connecting to game server..." 
                : "Game client ready to launch"}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {gameStatus === "connecting" ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-slate-700 border-slate-600">
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-green-400 mb-2">Game Store</h3>
                      <p className="text-slate-300 text-sm mb-4">Browse and download new games</p>
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleBrowseStore}
                      >
                        Browse Store
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-700 border-slate-600">
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">View Installed Games</h3>
                      <p className="text-slate-300 text-sm mb-4">Access your game library</p>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleMyLibrary}
                      >
                        My Library
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700 border-slate-600">
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-purple-400 mb-2">Add External Games</h3>
                      <p className="text-slate-300 text-sm mb-4">Add non-Magtinum games to your library</p>
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
                        onClick={handleAddNonMagtinumGames}
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Games</span>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700 border-slate-600">
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-orange-400 mb-2">Load MPK Game</h3>
                      <p className="text-slate-300 text-sm mb-4">Load games from .mpk files</p>
                      <Button 
                        className="bg-orange-600 hover:bg-orange-700 text-white flex items-center space-x-2"
                        onClick={triggerMpkLoad}
                      >
                        <Upload className="h-4 w-4" />
                        <span>Load .mpk</span>
                      </Button>
                      <input
                        id="mpk-file-input"
                        type="file"
                        accept=".mpk"
                        onChange={handleMpkFileSelect}
                        className="hidden"
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-white">Server Status</h3>
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      {serverStatus === "checking" ? (
                        <>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                          <span className="text-yellow-400 font-mono">CHECKING...</span>
                        </>
                      ) : serverStatus === "online" ? (
                        <>
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-green-400 font-mono">ONLINE</span>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-red-400 font-mono">OFFLINE</span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm mt-2">
                      Client Ready For Gaming
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AtsappPopup isOpen={isAtsappOpen} onClose={() => setIsAtsappOpen(false)} />
    </div>
  );
};

export default Game;
