
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameStatusCardProps {
  gameStatus: string;
}

const GameStatusCard = ({ gameStatus }: GameStatusCardProps) => {
  return (
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
        {gameStatus === "connecting" && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameStatusCard;
