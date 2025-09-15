import { Shield, AlertTriangle, Activity, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const SecurityHeader = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">CyberSOC</h1>
                <p className="text-sm text-muted-foreground">Cloud Security Operations Center</p>
              </div>
            </div>
            
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <Activity className="w-3 h-3 mr-1" />
              System Online
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span className="text-sm font-medium">3 Active Threats</span>
            </div>
            
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};