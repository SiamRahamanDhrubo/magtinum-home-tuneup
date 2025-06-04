
import { useState } from "react";
import { ArrowLeft, Play, Folder, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useGameLibrary } from "@/hooks/useGameLibrary";
import { useToast } from "@/hooks/use-toast";

const NonMagtinumGames = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userGames, loading, refreshUserGames } = useGameLibrary();
  
  const externalGames = userGames.filter(game => game.game_type === 'external');

  const handleScanGames = () => {
    console.log("Scanning PC for games...");
    toast({
      title: "Scanning for Games",
      description: "Searching your PC for installed games...",
    });
    // In a real implementation, this would scan the PC for games
    setTimeout(() => {
      refreshUserGames();
      toast({
        title: "Scan Complete",
        description: "Finished scanning for games",
      });
    }, 2000);
  };

  const handlePlayGame = (game: any) => {
    console.log(`Launching game: ${game.game_name} from ${game.file_path}`);
    toast({
      title: "Launching Game",
      description: `Starting ${game.game_name}...`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

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
            External Games Library
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Your External Games</h2>
          <Button
            onClick={handleScanGames}
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Scan for Games</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {externalGames.map((game) => (
            <Card key={game.id} className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700 transition-colors">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">🎮</div>
                <CardTitle className="text-lg">{game.game_name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-400 text-sm truncate">{game.file_path}</p>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handlePlayGame(game)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Play</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    size="icon"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {externalGames.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-white mb-2">No External Games Found</h3>
            <p className="text-slate-400 mb-4">Add games from the main game page or scan your PC</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NonMagtinumGames;
