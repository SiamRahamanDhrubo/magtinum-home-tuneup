
import { useState, useEffect } from "react";
import { ArrowLeft, Play, Download, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useGameLibrary } from "@/hooks/useGameLibrary";
import { useToast } from "@/hooks/use-toast";

const MPKGames = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mpkGames, userGames, loading } = useGameLibrary();
  
  const mpkUserGames = userGames.filter(game => game.game_type === 'mpk');

  const handlePlayGame = (game: any) => {
    console.log(`Launching MPK game: ${game.game_name} from ${game.install_path}`);
    toast({
      title: "Launching Game",
      description: `Starting ${game.game_name}...`,
    });
  };

  const handleDownloadGame = async (game: any) => {
    console.log(`Downloading MPK game: ${game.name} from ${game.download_url}`);
    toast({
      title: "Download Started",
      description: `Downloading ${game.name}...`,
    });
    // In a real implementation, this would download and install the game
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
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
          <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
            <Package className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            MPK Games Library
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Installed MPK Games */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Your Installed MPK Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mpkUserGames.map((game) => (
              <Card key={game.id} className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700 transition-colors">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <CardTitle className="text-lg">{game.game_name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400 text-sm truncate">{game.install_path}</p>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handlePlayGame(game)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2"
                    >
                      <Play className="h-4 w-4" />
                      <span>Play</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {mpkUserGames.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-white mb-2">No MPK Games Installed</h3>
              <p className="text-slate-400 mb-4">Load .mpk files from the main game page</p>
            </div>
          )}
        </div>

        {/* Available MPK Games from Repository */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Available MPK Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mpkGames.map((game) => (
              <Card key={game.id} className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700 transition-colors">
                <CardHeader className="text-center">
                  {game.thumbnail_url ? (
                    <img src={game.thumbnail_url} alt={game.name} className="w-full h-32 object-cover rounded mb-2" />
                  ) : (
                    <div className="text-4xl mb-2">🎮</div>
                  )}
                  <CardTitle className="text-lg">{game.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {game.description && (
                    <p className="text-slate-400 text-sm">{game.description}</p>
                  )}
                  {game.file_size && (
                    <p className="text-slate-500 text-xs">Size: {(game.file_size / 1024 / 1024).toFixed(1)} MB</p>
                  )}
                  <Button
                    onClick={() => handleDownloadGame(game)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {mpkGames.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Games Available</h3>
              <p className="text-slate-400 mb-4">Check back later for new MPK games</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MPKGames;
