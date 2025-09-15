import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Terminal, Activity, Search, Filter, Download } from "lucide-react";
import { useState, useEffect } from "react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "DEBUG";
  source: string;
  message: string;
  ip?: string;
}

const initialLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "14:23:45",
    level: "ERROR",
    source: "auth-service",
    message: "Failed login attempt from suspicious IP",
    ip: "192.168.1.100"
  },
  {
    id: "2", 
    timestamp: "14:23:32",
    level: "WARN",
    source: "api-gateway",
    message: "Rate limit exceeded for API endpoint /user/profile"
  },
  {
    id: "3",
    timestamp: "14:23:18",
    level: "INFO", 
    source: "user-service",
    message: "Successful user authentication"
  },
  {
    id: "4",
    timestamp: "14:23:05",
    level: "DEBUG",
    source: "security-scanner",
    message: "Vulnerability scan completed - 0 critical issues found"
  },
  {
    id: "5",
    timestamp: "14:22:51",
    level: "ERROR",
    source: "firewall",
    message: "Blocked suspicious traffic from external IP",
    ip: "203.45.67.89"
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "ERROR":
      return "destructive";
    case "WARN":
      return "secondary";
    case "INFO":
      return "outline";
    case "DEBUG":
      return "secondary";
    default:
      return "secondary";
  }
};

const getLevelStyle = (level: string) => {
  switch (level) {
    case "ERROR":
      return "text-destructive";
    case "WARN":
      return "text-accent";
    case "INFO":
      return "text-success";
    case "DEBUG":
      return "text-muted-foreground";
    default:
      return "text-foreground";
  }
};

export const LogMonitor = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [isStreaming, setIsStreaming] = useState(true);

  // Simulate real-time log streaming
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        level: Math.random() > 0.8 ? "ERROR" : Math.random() > 0.6 ? "WARN" : Math.random() > 0.4 ? "INFO" : "DEBUG",
        source: ["auth-service", "api-gateway", "user-service", "security-scanner", "firewall"][Math.floor(Math.random() * 5)],
        message: [
          "Security event detected",
          "API request processed", 
          "User session started",
          "System health check completed",
          "Network traffic analyzed"
        ][Math.floor(Math.random() * 5)],
        ip: Math.random() > 0.7 ? `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` : undefined
      };

      setLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 scanning">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Terminal className="h-5 w-5 text-primary" />
            <span>Live Security Logs</span>
            <Badge variant={isStreaming ? "secondary" : "outline"} className="ml-2">
              <Activity className="w-3 h-3 mr-1" />
              {isStreaming ? "Live" : "Paused"}
            </Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-1" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start space-x-3 p-2 rounded border border-border/30 hover:border-primary/20 transition-colors font-mono text-sm"
            >
              <span className="text-muted-foreground min-w-[60px]">
                {log.timestamp}
              </span>
              
              <Badge variant={getLevelColor(log.level)} className="min-w-[50px] text-xs">
                {log.level}
              </Badge>
              
              <span className="text-primary min-w-[100px] truncate">
                {log.source}
              </span>
              
              <div className="flex-1">
                <span className={getLevelStyle(log.level)}>
                  {log.message}
                </span>
                {log.ip && (
                  <span className="ml-2 text-accent">
                    [{log.ip}]
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
          <span className="text-sm text-muted-foreground">
            Showing {logs.length} recent entries
          </span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsStreaming(!isStreaming)}
          >
            {isStreaming ? "Pause" : "Resume"} Stream
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};