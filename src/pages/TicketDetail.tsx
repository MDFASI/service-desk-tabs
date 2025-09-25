import { useState } from "react";
import { ArrowLeft, Clock, Flag, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/ticket/OverviewTab";
import { ApproversTab } from "@/components/ticket/ApproversTab";
import { HistoryTab } from "@/components/ticket/HistoryTab";
import { CommentsTab } from "@/components/ticket/CommentsTab";
import { AttachmentsTab } from "@/components/ticket/AttachmentsTab";

const TicketDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock ticket data
  const ticket = {
    id: "TK-2024-0156",
    title: "Replace faulty server hardware in Data Center 2",
    description: "Critical server hardware failure detected in production environment. Immediate replacement required to prevent service disruption.",
    status: "In Progress",
    priority: "High",
    category: "Hardware",
    assignee: "Sarah Chen",
    reporter: "Mike Johnson",
    created: "2024-03-15T10:30:00Z",
    updated: "2024-03-16T14:45:00Z",
    dueDate: "2024-03-18T17:00:00Z"
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-priority-critical text-white';
      case 'high': return 'bg-priority-high text-white';
      case 'medium': return 'bg-priority-medium text-priority-medium-foreground';
      case 'low': return 'bg-priority-low text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-status-pending text-status-pending-foreground';
      case 'in progress': return 'bg-primary text-primary-foreground';
      case 'resolved': return 'bg-status-approved text-status-approved-foreground';
      case 'closed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Tickets
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {ticket.id}
                </Badge>
                <Badge className={getPriorityColor(ticket.priority)}>
                  <Flag className="w-3 h-3 mr-1" />
                  {ticket.priority}
                </Badge>
                <Badge className={getStatusColor(ticket.status)}>
                  {ticket.status}
                </Badge>
              </div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                {ticket.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>Assigned to {ticket.assignee}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Due {new Date(ticket.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Updated {new Date(ticket.updated).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b px-6 py-4">
              <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="approvers">Approvers</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>
            </div>

            <CardContent className="p-6">
              <TabsContent value="overview" className="mt-0">
                <OverviewTab ticket={ticket} />
              </TabsContent>
              <TabsContent value="approvers" className="mt-0">
                <ApproversTab ticketId={ticket.id} />
              </TabsContent>
              <TabsContent value="history" className="mt-0">
                <HistoryTab ticketId={ticket.id} />
              </TabsContent>
              <TabsContent value="comments" className="mt-0">
                <CommentsTab ticketId={ticket.id} />
              </TabsContent>
              <TabsContent value="attachments" className="mt-0">
                <AttachmentsTab ticketId={ticket.id} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default TicketDetail;