
import { useState } from "react";
import { X, Phone, Video, MessageCircle, Trophy, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AtsappPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AtsappPopup = ({ isOpen, onClose }: AtsappPopupProps) => {
  const { toast } = useToast();
  const [friendCode, setFriendCode] = useState("");
  const [message, setMessage] = useState("");
  const [userCode] = useState("ATG-" + Math.random().toString(36).substr(2, 6).toUpperCase());
  const [friends] = useState([
    { id: 1, name: "GamerFriend1", code: "ATG-ABC123", status: "online" },
    { id: 2, name: "ProPlayer99", code: "ATG-XYZ789", status: "in-game" },
  ]);

  if (!isOpen) return null;

  const handleAddFriend = () => {
    if (!friendCode.trim()) {
      toast({
        title: "Invalid Code",
        description: "Please enter a friend code",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Friend Request Sent",
      description: `Sent friend request to ${friendCode}`,
    });
    setFriendCode("");
  };

  const handleVideoCall = (friend: any) => {
    toast({
      title: "Video Call",
      description: `Starting video call with ${friend.name}`,
    });
  };

  const handleAudioCall = (friend: any) => {
    toast({
      title: "Audio Call", 
      description: `Starting audio call with ${friend.name}`,
    });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the group chat",
    });
    setMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-slate-900 border-slate-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-green-800 to-emerald-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-2xl">Atsapp - Gamer Chat</CardTitle>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Info & Add Friends */}
            <div className="space-y-4">
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-lg text-green-400">Your Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <p className="font-mono text-lg text-green-300">{userCode}</p>
                    <p className="text-slate-400 text-sm mt-1">Share this with friends</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-400">Add Friend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Enter friend code"
                    value={friendCode}
                    onChange={(e) => setFriendCode(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Button
                    onClick={handleAddFriend}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Add Friend</span>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-lg text-yellow-400">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">First Friend Added</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">Gaming Streak: 5 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Friends List */}
            <div>
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-400">Friends Online</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {friends.map((friend) => (
                    <div key={friend.id} className="bg-slate-700 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{friend.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          friend.status === 'online' ? 'bg-green-600' : 'bg-orange-600'
                        }`}>
                          {friend.status}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleVideoCall(friend)}
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleAudioCall(friend)}
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Chat Area */}
            <div>
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-lg text-green-400">Group Chat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-700 p-3 rounded-lg h-48 overflow-y-auto">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-blue-400">GamerFriend1:</span>
                        <span className="ml-2">Ready for the next match?</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-purple-400">ProPlayer99:</span>
                        <span className="ml-2">Let's go! I'm warmed up</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white resize-none"
                      rows={2}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AtsappPopup;
