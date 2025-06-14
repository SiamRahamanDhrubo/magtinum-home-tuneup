
import { Plus, Upload, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useGameLibrary } from "@/hooks/useGameLibrary";

const GameActionsGrid = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addUserGame } = useGameLibrary();

  const handleBrowseStore = () => {
    navigate("/mpk-games");
  };

  const handleMyLibrary = () => {
    navigate("/non-magtinum-games");
  };

  const handleAddNonMagtinumGames = () => {
    navigate("/non-magtinum-games");
  };

  const handleManageExternalGames = () => {
    navigate("/non-magtinum-games");
  };

  const handleManageMPKGames = () => {
    navigate("/mpk-games");
  };

  const handleExternalGameSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const gameName = file.name.replace(/\.[^/.]+$/, "");
        
        await addUserGame({
          game_name: gameName,
          game_type: 'external',
          file_path: `C:/Games/${file.name}`,
          is_installed: false,
        });

        console.log("External game file selected:", file.name, "Size:", file.size);
        
      } catch (error) {
        console.error("Error adding external game:", error);
        toast({
          title: "Error",
          description: "Failed to add external game",
          variant: "destructive",
        });
      }
      
      event.target.value = '';
    }
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
        const userName = "User";
        const extractPath = `C:/Users/${userName}/.MPK_games/${file.name.replace('.mpk', '')}`;
        const gameName = file.name.replace('.mpk', '');
        
        await addUserGame({
          game_name: gameName,
          game_type: 'mpk',
          file_path: extractPath,
          install_path: extractPath,
          is_installed: true,
        });

        console.log("MPK file selected:", file.name, "Size:", file.size);
        console.log("Extracting to:", extractPath);
        
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
      
      event.target.value = '';
    }
  };

  const triggerExternalGameLoad = () => {
    const fileInput = document.getElementById('external-game-input') as HTMLInputElement;
    fileInput?.click();
  };

  const triggerMpkLoad = () => {
    const fileInput = document.getElementById('mpk-file-input') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-slate-700 border-slate-600">
        <CardContent className="p-4 text-center">
          <h3 className="text-lg font-semibold text-green-400 mb-2">Game Store</h3>
          <p className="text-slate-300 text-sm mb-4">Browse and download MPK games</p>
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
        <CardContent className="p-4 text-center space-y-3">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">Add External Games</h3>
          <p className="text-slate-300 text-sm mb-4">Add non-Magtinum games to your library</p>
          <div className="flex flex-col space-y-2">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
              onClick={triggerExternalGameLoad}
            >
              <Plus className="h-4 w-4" />
              <span>Add Game</span>
            </Button>
            <Button 
              variant="outline"
              className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white flex items-center space-x-2"
              onClick={handleManageExternalGames}
            >
              <Settings className="h-4 w-4" />
              <span>Manage External Games</span>
            </Button>
          </div>
          <input
            id="external-game-input"
            type="file"
            accept=".exe,.msi,.zip"
            onChange={handleExternalGameSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      <Card className="bg-slate-700 border-slate-600">
        <CardContent className="p-4 text-center space-y-3">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Load MPK Game</h3>
          <p className="text-slate-300 text-sm mb-4">Load games from .mpk files</p>
          <div className="flex flex-col space-y-2">
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white flex items-center space-x-2"
              onClick={triggerMpkLoad}
            >
              <Upload className="h-4 w-4" />
              <span>Load .mpk</span>
            </Button>
            <Button 
              variant="outline"
              className="border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white flex items-center space-x-2"
              onClick={handleManageMPKGames}
            >
              <Settings className="h-4 w-4" />
              <span>Manage MPK Games</span>
            </Button>
          </div>
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
  );
};

export default GameActionsGrid;
