import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertTriangle, CheckCircle, User, Building } from "lucide-react";

interface TicketData {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  assignee: string;
  reporter: string;
  created: string;
  updated: string;
  dueDate: string;
}

interface OverviewTabProps {
  ticket: TicketData;
}

export const OverviewTab = ({ ticket }: OverviewTabProps) => {
  // Mock SLA data
  const slaData = {
    responseTime: {
      target: 2,
      current: 1.5,
      status: "met"
    },
    resolutionTime: {
      target: 24,
      current: 18,
      status: "at_risk"
    }
  };

  const getSLAIcon = (status: string) => {
    switch (status) {
      case "met":
        return <CheckCircle className="w-4 h-4 text-status-approved" />;
      case "at_risk":
        return <AlertTriangle className="w-4 h-4 text-status-pending" />;
      case "breached":
        return <AlertTriangle className="w-4 h-4 text-status-rejected" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSLAProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getSLAColor = (status: string) => {
    switch (status) {
      case "met":
        return "text-status-approved";
      case "at_risk":
        return "text-status-pending";
      case "breached":
        return "text-status-rejected";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Ticket Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-sm mt-1 leading-relaxed">{ticket.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <p className="text-sm mt-1">{ticket.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Reporter</label>
                <p className="text-sm mt-1">{ticket.reporter}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created</label>
                <p className="text-sm mt-1">{new Date(ticket.created).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Due Date</label>
                <p className="text-sm mt-1">{new Date(ticket.dueDate).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SLA Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Service Level Agreement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Response Time SLA */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSLAIcon(slaData.responseTime.status)}
                  <span className="font-medium">Response Time</span>
                </div>
                <Badge 
                  variant="outline"
                  className={getSLAColor(slaData.responseTime.status)}
                >
                  {slaData.responseTime.current}h / {slaData.responseTime.target}h
                </Badge>
              </div>
              <Progress 
                value={getSLAProgress(slaData.responseTime.current, slaData.responseTime.target)}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                Target: Respond within {slaData.responseTime.target} hours
              </p>
            </div>

            {/* Resolution Time SLA */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSLAIcon(slaData.resolutionTime.status)}
                  <span className="font-medium">Resolution Time</span>
                </div>
                <Badge 
                  variant="outline"
                  className={getSLAColor(slaData.resolutionTime.status)}
                >
                  {slaData.resolutionTime.current}h / {slaData.resolutionTime.target}h
                </Badge>
              </div>
              <Progress 
                value={getSLAProgress(slaData.resolutionTime.current, slaData.resolutionTime.target)}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                Target: Resolve within {slaData.resolutionTime.target} hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">3</div>
              <div className="text-sm text-muted-foreground">Total Comments</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">2</div>
              <div className="text-sm text-muted-foreground">Attachments</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">5</div>
              <div className="text-sm text-muted-foreground">History Events</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};