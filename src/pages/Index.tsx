
import { useState, useEffect } from "react";
import { Settings, Search, Clock, Star, Grid3X3, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import SettingsPanel from "@/components/SettingsPanel";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyVisited, setRecentlyVisited] = useState([
    { title: "React Documentation", url: "https://react.dev", time: "2 hours ago" },
    { title: "Tailwind CSS", url: "https://tailwindcss.com", time: "4 hours ago" },
    { title: "TypeScript Handbook", url: "https://typescriptlang.org", time: "1 day ago" },
  ]);

  // Load settings from localStorage
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('magtinum-settings');
    return saved ? JSON.parse(saved) : {
      searchEngine: "google",
      homepage: "new-tab",
      darkMode: false,
    };
  });

  // Apply dark mode
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

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

  const searchEngines = {
    google: "https://www.google.com/search?q=",
    bing: "https://www.bing.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    yahoo: "https://search.yahoo.com/search?p=",
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      let url;
      
      // Check if it's a direct URL
      if (isValidUrl(searchQuery)) {
        url = searchQuery;
      } else if (searchQuery.includes('.') && !searchQuery.includes(' ')) {
        // Looks like a domain
        url = `https://${searchQuery}`;
      } else {
        // Use selected search engine
        const searchEngine = searchEngines[settings.searchEngine as keyof typeof searchEngines];
        url = searchEngine + encodeURIComponent(searchQuery);
      }

      // Add to recently visited
      const newVisit = {
        title: searchQuery,
        url: url,
        time: "Just now"
      };
      
      setRecentlyVisited(prev => [newVisit, ...prev.slice(0, 2)]);
      
      // Open in new tab
      window.open(url, '_blank');
      
      toast({
        title: "Opening",
        description: `Navigating to ${url}`,
      });
      
      setSearchQuery("");
    }
  };

  const handleQuickAccessClick = (site: typeof quickAccess[0]) => {
    // Add to recently visited
    const newVisit = {
      title: site.name,
      url: site.url,
      time: "Just now"
    };
    
    setRecentlyVisited(prev => [newVisit, ...prev.slice(0, 2)]);
    
    // Open in new tab
    window.open(site.url, '_blank');
    
    toast({
      title: "Opening",
      description: `Opening ${site.name}`,
    });
  };

  const handleGameClick = () => {
    const gameUrl = "Magtinum://Magtinum/game";
    
    // Add to recently visited
    const newVisit = {
      title: "Minecraft Game",
      url: gameUrl,
      time: "Just now"
    };
    
    setRecentlyVisited(prev => [newVisit, ...prev.slice(0, 2)]);
    
    // Try to open the custom URL scheme
    window.location.href = gameUrl;
    
    toast({
      title: "Launching Game",
      description: "Opening Minecraft server game",
    });
  };

  const handleRecentVisitClick = (site: typeof recentlyVisited[0]) => {
    window.open(site.url, '_blank');
    toast({
      title: "Opening",
      description: `Opening ${site.title}`,
    });
  };

  const updateSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
    localStorage.setItem('magtinum-settings', JSON.stringify(newSettings));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors">
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
        
        <div className="flex items-center space-x-3">
          <Button 
            onClick={handleGameClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Gamepad2 className="h-4 w-4" />
            <span>Play Game</span>
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Magtinum Settings</DialogTitle>
              </DialogHeader>
              <SettingsPanel settings={settings} onSettingsChange={updateSettings} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Search Bar */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-light text-slate-800 dark:text-slate-200">Good morning!</h2>
            <p className="text-slate-600 dark:text-slate-400">What would you like to explore today?</p>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search the web or enter a URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl shadow-sm hover:border-slate-300 dark:hover:border-slate-500 focus:border-blue-500 transition-colors dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
          </form>
        </div>

        {/* Quick Access */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Grid3X3 className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Quick Access</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickAccess.map((site, index) => (
              <Card 
                key={index} 
                className="hover:shadow-md transition-shadow cursor-pointer group dark:bg-slate-800 dark:border-slate-700"
                onClick={() => handleQuickAccessClick(site)}
              >
                <CardContent className="p-4 text-center space-y-3">
                  <div className={`w-12 h-12 ${site.color} rounded-xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="text-white font-semibold text-lg">
                      {site.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{site.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recently Visited */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Recently Visited</h3>
          </div>
          
          <div className="space-y-2">
            {recentlyVisited.map((site, index) => (
              <Card 
                key={index} 
                className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer dark:bg-slate-800 dark:border-slate-700"
                onClick={() => handleRecentVisitClick(site)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{site.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{site.url}</p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-400 dark:text-slate-500">{site.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
        <p>Magtinum Browser • Fast, Secure, Private</p>
      </div>
    </div>
  );
};

export default Index;
