
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Globe, Palette, Zap, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsPanelProps {
  settings: {
    darkMode: boolean;
    notifications: boolean;
    autoUpdates: boolean;
    trackingProtection: boolean;
    searchEngine: string;
    homepage: string;
    downloadLocation: string;
    clearDataOnExit: boolean;
    adBlocker: boolean;
    cookieBlocking: boolean;
  };
  onSettingsChange: (newSettings: any) => void;
}

const SettingsPanel = ({ settings, onSettingsChange }: SettingsPanelProps) => {
  const { toast } = useToast();

  const handleSettingChange = (key: string, value: boolean | string) => {
    const newSettings = { ...settings, [key]: value };
    onSettingsChange(newSettings);
    
    toast({
      title: "Setting updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : 'changed'}`,
    });
  };

  const clearBrowsingData = () => {
    // Clear localStorage data
    const keysToKeep = ['magtinum-settings'];
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });

    toast({
      title: "Browsing data cleared",
      description: "Cache, cookies, and browsing history have been cleared.",
    });
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      darkMode: false,
      notifications: true,
      autoUpdates: true,
      trackingProtection: true,
      searchEngine: "google",
      homepage: "new-tab",
      downloadLocation: "/Downloads",
      clearDataOnExit: false,
      adBlocker: true,
      cookieBlocking: false,
    };
    
    onSettingsChange(defaultSettings);
    
    toast({
      title: "Settings reset",
      description: "All settings have been reset to their default values.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Browsing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Search Engine</Label>
                <Select 
                  value={settings.searchEngine} 
                  onValueChange={(value) => handleSettingChange("searchEngine", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="bing">Bing</SelectItem>
                    <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
                    <SelectItem value="yahoo">Yahoo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Homepage</Label>
                <Select 
                  value={settings.homepage} 
                  onValueChange={(value) => handleSettingChange("homepage", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-tab">New Tab Page</SelectItem>
                    <SelectItem value="blank">Blank Page</SelectItem>
                    <SelectItem value="custom">Custom URL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Updates</Label>
                  <p className="text-sm text-muted-foreground">Keep Magtinum up to date automatically</p>
                </div>
                <Switch
                  checked={settings.autoUpdates}
                  onCheckedChange={(checked) => handleSettingChange("autoUpdates", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Privacy & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tracking Protection</Label>
                  <p className="text-sm text-muted-foreground">Block trackers and enhance privacy</p>
                </div>
                <Switch
                  checked={settings.trackingProtection}
                  onCheckedChange={(checked) => handleSettingChange("trackingProtection", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ad Blocker</Label>
                  <p className="text-sm text-muted-foreground">Block intrusive advertisements</p>
                </div>
                <Switch
                  checked={settings.adBlocker}
                  onCheckedChange={(checked) => handleSettingChange("adBlocker", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cookie Blocking</Label>
                  <p className="text-sm text-muted-foreground">Block third-party cookies</p>
                </div>
                <Switch
                  checked={settings.cookieBlocking}
                  onCheckedChange={(checked) => handleSettingChange("cookieBlocking", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Clear Data on Exit</Label>
                  <p className="text-sm text-muted-foreground">Automatically clear browsing data when closing</p>
                </div>
                <Switch
                  checked={settings.clearDataOnExit}
                  onCheckedChange={(checked) => handleSettingChange("clearDataOnExit", checked)}
                />
              </div>

              <div className="pt-4 border-t">
                <Button onClick={clearBrowsingData} variant="outline" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Browsing Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme for the browser interface</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications</Label>
                  <p className="text-sm text-muted-foreground">Show browser notifications</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Advanced Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="download-location">Download Location</Label>
                <div className="flex space-x-2">
                  <Input
                    id="download-location"
                    value={settings.downloadLocation}
                    onChange={(e) => handleSettingChange("downloadLocation", e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Feature not available",
                      description: "File browser is not available in web version",
                    });
                  }}>
                    <Download className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="space-y-2">
                  <h4 className="font-medium">Reset Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Reset all settings to their default values
                  </p>
                  <Button variant="destructive" size="sm" onClick={resetToDefaults}>
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
