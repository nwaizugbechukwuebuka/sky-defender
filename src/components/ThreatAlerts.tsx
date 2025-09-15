import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Zap, Globe, User, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface Alert {
  id: string;
  title: string;
  severity: "high" | "medium" | "low";
  source: string;
  timestamp: string;
  status: "active" | "investigating" | "resolved";
  description: string;
  icon: typeof AlertTriangle;
}

const initialAlerts: Alert[] = [
  {
    id: "1",
    title: "Brute Force Attack Detected",
    severity: "high",
    source: "192.168.1.100",
    timestamp: "2 minutes ago",
    status: "active",
    description: "Multiple failed login attempts from suspicious IP",
    icon: AlertTriangle
  },
  {
    id: "2", 
    title: "Unusual API Activity",
    severity: "medium",
    source: "api.company.com",
    timestamp: "15 minutes ago", 
    status: "investigating",
    description: "Anomalous API request patterns detected",
    icon: Zap
  },
  {
    id: "3",
    title: "Geo-Location Anomaly", 
    severity: "medium",
    source: "user@company.com",
    timestamp: "1 hour ago",
    status: "investigating", 
    description: "Login from unexpected geographic location",
    icon: Globe
  },
  {
    id: "4",
    title: "Privilege Escalation Attempt",
    severity: "high", 
    source: "internal-user",
    timestamp: "2 hours ago",
    status: "resolved",
    description: "User attempted to access restricted resources",
    icon: User
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "destructive";
    case "medium":
      return "secondary";
    case "low":
      return "outline";
    default:
      return "secondary";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-destructive pulse-danger";
    case "investigating":
      return "text-accent";
    case "resolved":
      return "text-success";
    default:
      return "text-muted-foreground";
  }
};

export const ThreatAlerts = () => {
  const [alerts, setAlerts] = useState(initialAlerts);

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAlert: Alert = {
        id: Date.now().toString(),
        title: "New Security Event",
        severity: Math.random() > 0.7 ? "high" : Math.random() > 0.5 ? "medium" : "low",
        source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        timestamp: "Just now",
        status: "active",
        description: "Automated threat detection triggered",
        icon: Shield
      };

      setAlerts(prev => [randomAlert, ...prev.slice(0, 4)]);
    }, 30000); // New alert every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <span>Threat Detection Alerts</span>
          <Badge variant="destructive" className="ml-auto">
            {alerts.filter(a => a.status === "active").length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200"
            >
              <Icon className={`h-5 w-5 mt-0.5 ${getStatusColor(alert.status)}`} />
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{alert.title}</h4>
                  <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {alert.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Source: {alert.source}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                Investigate
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};