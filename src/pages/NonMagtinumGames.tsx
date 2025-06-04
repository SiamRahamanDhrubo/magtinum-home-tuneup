
import { useState } from "react";
import { ArrowLeft, Play, Folder, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const NonMagtinumGames = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([
    // Sample games for demonstration
    { id: 1, name: "Steam Game 1", path: "C:/Games/Steam/Game1", icon: "🎮" },
    { id: 2, name: "Epic Game 2", path: "C:/Games/Epic/Game2", icon: "🎯" },
    { id: 3, name: "Origin Game 3", path: "C:/Games/Origin/Game3", icon: "⚡" },
  ]);

  const handleScanGames = () => {
    // In a real implementation, this would scan the PC for games
    console.log("Scanning PC for games...");
    // For now, we'll just simulate finding more games
  };

  const handlePlayGame = (game: any) => {
    console.log(`Launching game: ${game.name} from ${game.path}`);
    // In a real implementation, this would launch the game
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button
          onClick={() => navigate("/game")}
          variant="outline"
          className="flex items-center space-x-2 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Game</span>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Folder className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Non-Magtinum Games
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Your PC Games Library</h2>
          <Button
            onClick={handleScanGames}
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Scan for Games</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700 transition-colors">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{game.icon}</div>
                <CardTitle className="text-lg">{game.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-400 text-sm truncate">{game.path}</p>
                <Button
                  onClick={() => handlePlayGame(game)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Play Game</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {games.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Games Found</h3>
            <p className="text-slate-400 mb-4">Click "Scan for Games" to detect games on your PC</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NonMagtinumGames;
