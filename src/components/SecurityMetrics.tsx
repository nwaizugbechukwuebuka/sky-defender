import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Activity, Users, Server, Eye } from "lucide-react";

const metrics = [
  {
    title: "Security Score",
    value: "94%",
    icon: Shield,
    status: "success",
    description: "Overall security posture"
  },
  {
    title: "Active Threats",
    value: "3",
    icon: AlertTriangle,
    status: "warning",
    description: "Threats detected in last 24h"
  },
  {
    title: "Events/Hour",
    value: "12,847",
    icon: Activity,
    status: "info",
    description: "Security events monitored"
  },
  {
    title: "Protected Users",
    value: "2,847",
    icon: Users,
    status: "success",
    description: "Active user accounts"
  },
  {
    title: "Monitored Assets",
    value: "156",
    icon: Server,
    status: "success",
    description: "Cloud resources protected"
  },
  {
    title: "Detection Rules",
    value: "847",
    icon: Eye,
    status: "info",
    description: "Active monitoring rules"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "text-success";
    case "warning":
      return "text-accent";
    case "danger":
      return "text-destructive";
    default:
      return "text-primary";
  }
};

const getGlowClass = (status: string) => {
  switch (status) {
    case "success":
      return "glow-success";
    case "warning":
      return "glow-danger";
    default:
      return "glow-primary";
  }
};

export const SecurityMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className={`bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 ${getGlowClass(metric.status)}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};