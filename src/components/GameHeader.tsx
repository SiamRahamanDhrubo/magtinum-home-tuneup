
import { ArrowLeft, Gamepad2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GameHeaderProps {
  onOpenAtsapp: () => void;
}

const GameHeader = ({ onOpenAtsapp }: GameHeaderProps) => {
  const navigate = useNavigate();

  return (
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
        onClick={onOpenAtsapp}
        className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
      >
        <MessageCircle className="h-4 w-4" />
        <span>Atsapp</span>
      </Button>
    </div>
  );
};

export default GameHeader;
