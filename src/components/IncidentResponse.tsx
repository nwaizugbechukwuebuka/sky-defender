import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Ban, Lock, AlertOctagon, CheckCircle, Clock } from "lucide-react";

interface Incident {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium";
  status: "open" | "investigating" | "mitigated" | "resolved";
  timestamp: string;
  actions: string[];
}

const incidents: Incident[] = [
  {
    id: "INC-001",
    title: "Suspicious IP Brute Force",
    severity: "high",
    status: "investigating",
    timestamp: "5 min ago",
    actions: ["Block IP", "Lock Account", "Notify Admin"]
  },
  {
    id: "INC-002", 
    title: "Malware Detection",
    severity: "critical",
    status: "mitigated",
    timestamp: "1 hour ago",
    actions: ["Isolate Host", "Run Scan", "Update Signatures"]
  },
  {
    id: "INC-003",
    title: "Privilege Escalation",
    severity: "medium", 
    status: "resolved",
    timestamp: "3 hours ago",
    actions: ["Revoke Access", "Audit Logs", "User Training"]
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "destructive";
    case "high":
      return "secondary";
    case "medium":
      return "outline";
    default:
      return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "open":
      return <AlertOctagon className="h-4 w-4 text-destructive" />;
    case "investigating":
      return <Clock className="h-4 w-4 text-accent" />;
    case "mitigated":
      return <Shield className="h-4 w-4 text-primary" />;
    case "resolved":
      return <CheckCircle className="h-4 w-4 text-success" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export const IncidentResponse = () => {
  const handleAutomateResponse = (incidentId: string, action: string) => {
    console.log(`Executing automated response: ${action} for incident ${incidentId}`);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Incident Response</span>
          <Badge variant="secondary" className="ml-auto">
            {incidents.filter(i => i.status === "open" || i.status === "investigating").length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(incident.status)}
                <div>
                  <h4 className="text-sm font-medium">{incident.title}</h4>
                  <p className="text-xs text-muted-foreground">{incident.id} • {incident.timestamp}</p>
                </div>
              </div>
              <Badge variant={getSeverityColor(incident.severity)} className="text-xs">
                {incident.severity.toUpperCase()}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {incident.actions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAutomateResponse(incident.id, action)}
                  className="text-xs"
                >
                  {action === "Block IP" && <Ban className="w-3 h-3 mr-1" />}
                  {action === "Lock Account" && <Lock className="w-3 h-3 mr-1" />}
                  {action}
                </Button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className={`capitalize ${
                incident.status === "resolved" ? "text-success" : 
                incident.status === "mitigated" ? "text-primary" :
                incident.status === "investigating" ? "text-accent" : "text-destructive"
              }`}>
                Status: {incident.status}
              </span>
              <Button variant="link" size="sm" className="text-xs p-0">
                View Details →
              </Button>
            </div>
          </div>
        ))}
        
        <Button className="w-full" variant="outline">
          <Shield className="w-4 h-4 mr-2" />
          Run Full Incident Response Playbook
        </Button>
      </CardContent>
    </Card>
  );
};