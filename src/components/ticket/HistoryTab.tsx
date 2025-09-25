import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Clock, 
  User, 
  MessageCircle, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Settings,
  UserPlus
} from "lucide-react";

interface HistoryTabProps {
  ticketId: string;
}

interface HistoryEvent {
  id: string;
  type: 'status_change' | 'assignment' | 'comment' | 'attachment' | 'approval' | 'update';
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  metadata?: {
    fromValue?: string;
    toValue?: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
  };
}

export const HistoryTab = ({ ticketId }: HistoryTabProps) => {
  // Mock history data
  const historyEvents: HistoryEvent[] = [
    {
      id: "1",
      type: "status_change",
      title: "Status Changed",
      description: "Ticket status updated from Open to In Progress",
      user: { name: "Sarah Chen" },
      timestamp: "2024-03-16T14:45:00Z",
      metadata: { fromValue: "Open", toValue: "In Progress" }
    },
    {
      id: "2",
      type: "approval",
      title: "Approval Received",
      description: "Jennifer Rodriguez approved the maintenance request",
      user: { name: "Jennifer Rodriguez" },
      timestamp: "2024-03-15T14:15:00Z"
    },
    {
      id: "3",
      type: "comment",
      title: "Comment Added",
      description: "Added technical details about the hardware replacement procedure",
      user: { name: "Sarah Chen" },
      timestamp: "2024-03-15T13:20:00Z"
    },
    {
      id: "4",
      type: "approval",
      title: "Approval Received", 
      description: "David Wilson approved the budget allocation for hardware replacement",
      user: { name: "David Wilson" },
      timestamp: "2024-03-15T11:30:00Z"
    },
    {
      id: "5",
      type: "assignment",
      title: "Ticket Assigned",
      description: "Ticket assigned to Sarah Chen for resolution",
      user: { name: "Mike Johnson" },
      timestamp: "2024-03-15T10:45:00Z",
      metadata: { toValue: "Sarah Chen" }
    },
    {
      id: "6",
      type: "attachment",
      title: "Attachment Added",
      description: "Uploaded server diagnostics report and error logs",
      user: { name: "Mike Johnson" },
      timestamp: "2024-03-15T10:35:00Z"
    },
    {
      id: "7",
      type: "update",
      title: "Ticket Created",
      description: "New service desk ticket created for hardware replacement",
      user: { name: "Mike Johnson" },
      timestamp: "2024-03-15T10:30:00Z",
      metadata: { priority: "high" }
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'status_change':
        return <Settings className="w-4 h-4" />;
      case 'assignment':
        return <UserPlus className="w-4 h-4" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4" />;
      case 'attachment':
        return <FileText className="w-4 h-4" />;
      case 'approval':
        return <CheckCircle className="w-4 h-4" />;
      case 'update':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'status_change':
        return 'text-primary bg-primary/10';
      case 'assignment':
        return 'text-blue-600 bg-blue-50';
      case 'comment':
        return 'text-green-600 bg-green-50';
      case 'attachment':
        return 'text-purple-600 bg-purple-50';
      case 'approval':
        return 'text-status-approved bg-status-approved/10';
      case 'update':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-muted-foreground bg-muted/50';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Activity Timeline ({historyEvents.length} events)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-6">
              {historyEvents.map((event, index) => (
                <div key={event.id} className="relative flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className={`
                    relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 border-background
                    ${getEventColor(event.type)}
                  `}>
                    {getEventIcon(event.type)}
                  </div>
                  
                  {/* Event content */}
                  <div className="flex-1 min-w-0 pb-6">
                    <div className="bg-card border rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={event.user.avatar} alt={event.user.name} />
                            <AvatarFallback className="text-xs">
                              {getInitials(event.user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-sm">{event.title}</h3>
                            <p className="text-xs text-muted-foreground">
                              by {event.user.name}
                            </p>
                          </div>
                        </div>
                        <time className="text-xs text-muted-foreground shrink-0">
                          {new Date(event.timestamp).toLocaleString()}
                        </time>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {event.description}
                      </p>
                      
                      {/* Metadata */}
                      {event.metadata && (
                        <div className="flex gap-2 mt-2">
                          {event.metadata.fromValue && event.metadata.toValue && (
                            <div className="flex items-center gap-2 text-xs">
                              <Badge variant="outline" className="text-xs">
                                {event.metadata.fromValue}
                              </Badge>
                              <span className="text-muted-foreground">→</span>
                              <Badge variant="outline" className="text-xs">
                                {event.metadata.toValue}
                              </Badge>
                            </div>
                          )}
                          {event.metadata.priority && (
                            <Badge variant="outline" className="text-xs">
                              Priority: {event.metadata.priority}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};