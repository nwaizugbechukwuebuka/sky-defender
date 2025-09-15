import { SecurityHeader } from "@/components/SecurityHeader";
import { SecurityMetrics } from "@/components/SecurityMetrics";
import { ThreatAlerts } from "@/components/ThreatAlerts";
import { SecurityCharts } from "@/components/SecurityCharts";
import { IncidentResponse } from "@/components/IncidentResponse";
import { LogMonitor } from "@/components/LogMonitor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SecurityHeader />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Security Overview Metrics */}
        <SecurityMetrics />
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Threat Detection & Alerts */}
          <ThreatAlerts />
          
          {/* Security Analytics Charts */}
          <SecurityCharts />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Incident Response Panel */}
          <IncidentResponse />
          
          {/* Live Log Monitor */}
          <LogMonitor />
        </div>
      </main>
    </div>
  );
};

export default Index;