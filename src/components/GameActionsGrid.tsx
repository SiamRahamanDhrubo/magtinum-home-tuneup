
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const GameActionsGrid = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
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
  );
};

export default GameActionsGrid;
