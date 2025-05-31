
import { useState, useEffect } from "react";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();
  const [gameStatus, setGameStatus] = useState("connecting");

  useEffect(() => {
    // Simulate game loading
    const timer = setTimeout(() => {
      setGameStatus("ready");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
                      <h3 className="text-lg font-semibold text-green-400 mb-2">Minecraft Server</h3>
                      <p className="text-slate-300 text-sm mb-4">Connect to our custom Minecraft world</p>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Launch Minecraft
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-700 border-slate-600">
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Web Games</h3>
                      <p className="text-slate-300 text-sm mb-4">Play browser-based games</p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Browse Games
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-white">Game Status</h3>
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-mono">ONLINE</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-2">
                      Game client initialized and ready for connection
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Game;
