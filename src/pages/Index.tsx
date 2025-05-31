
import { useState } from "react";
import { Settings, Search, Clock, Star, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import SettingsPanel from "@/components/SettingsPanel";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const quickAccess = [
    { name: "Gmail", url: "https://gmail.com", color: "bg-red-500" },
    { name: "YouTube", url: "https://youtube.com", color: "bg-red-600" },
    { name: "GitHub", url: "https://github.com", color: "bg-gray-800" },
    { name: "Twitter", url: "https://twitter.com", color: "bg-blue-500" },
    { name: "Reddit", url: "https://reddit.com", color: "bg-orange-500" },
    { name: "LinkedIn", url: "https://linkedin.com", color: "bg-blue-700" },
    { name: "Stack Overflow", url: "https://stackoverflow.com", color: "bg-orange-600" },
    { name: "Medium", url: "https://medium.com", color: "bg-black" },
  ];

  const recentlyVisited = [
    { title: "React Documentation", url: "https://react.dev", time: "2 hours ago" },
    { title: "Tailwind CSS", url: "https://tailwindcss.com", time: "4 hours ago" },
    { title: "TypeScript Handbook", url: "https://typescriptlang.org", time: "1 day ago" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real browser, this would navigate to search results
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Magtinum
          </h1>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="hover:bg-slate-100 transition-colors">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Magtinum Settings</DialogTitle>
            </DialogHeader>
            <SettingsPanel />
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Search Bar */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-light text-slate-800">Good morning!</h2>
            <p className="text-slate-600">What would you like to explore today?</p>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search the web or enter a URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2 border-slate-200 rounded-xl shadow-sm hover:border-slate-300 focus:border-blue-500 transition-colors"
              />
            </div>
          </form>
        </div>

        {/* Quick Access */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Grid3X3 className="h-5 w-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-800">Quick Access</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickAccess.map((site, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 text-center space-y-3">
                  <div className={`w-12 h-12 ${site.color} rounded-xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="text-white font-semibold text-lg">
                      {site.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-700">{site.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recently Visited */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-800">Recently Visited</h3>
          </div>
          
          <div className="space-y-2">
            {recentlyVisited.map((site, index) => (
              <Card key={index} className="hover:bg-slate-50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{site.title}</p>
                        <p className="text-sm text-slate-500">{site.url}</p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-400">{site.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-slate-500 text-sm">
        <p>Magtinum Browser • Fast, Secure, Private</p>
      </div>
    </div>
  );
};

export default Index;
