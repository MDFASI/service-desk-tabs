import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Clock, XCircle, Minus } from "lucide-react";

interface ApproversTabProps {
  ticketId: string;
}

interface Approver {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'approved' | 'pending' | 'rejected' | 'skipped';
  timestamp?: string;
  comments?: string;
  avatar?: string;
}

export const ApproversTab = ({ ticketId }: ApproversTabProps) => {
  // Mock approvers data
  const approvers: Approver[] = [
    {
      id: "1",
      name: "David Wilson",
      email: "david.wilson@company.com",
      role: "IT Manager",
      department: "Information Technology",
      status: "approved",
      timestamp: "2024-03-15T11:30:00Z",
      comments: "Approved for immediate hardware replacement. Budget allocated.",
    },
    {
      id: "2", 
      name: "Jennifer Rodriguez",
      email: "jennifer.rodriguez@company.com",
      role: "Operations Director",
      department: "Operations",
      status: "approved",
      timestamp: "2024-03-15T14:15:00Z",
      comments: "Critical infrastructure - approved for off-hours maintenance window.",
    },
    {
      id: "3",
      name: "Michael Chang",
      email: "michael.chang@company.com", 
      role: "Security Officer",
      department: "Security",
      status: "pending",
    },
    {
      id: "4",
      name: "Lisa Thompson",
      email: "lisa.thompson@company.com",
      role: "Finance Manager", 
      department: "Finance",
      status: "skipped",
      comments: "Skipped due to pre-approved emergency maintenance budget.",
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-status-approved" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-status-rejected" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-status-pending" />;
      case 'skipped':
        return <Minus className="w-5 h-5 text-status-skipped" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-status-approved text-status-approved-foreground">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-status-rejected text-status-rejected-foreground">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-status-pending text-status-pending-foreground">Pending</Badge>;
      case 'skipped':
        return <Badge className="bg-status-skipped text-status-skipped-foreground">Skipped</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const approvalStats = {
    total: approvers.length,
    approved: approvers.filter(a => a.status === 'approved').length,
    pending: approvers.filter(a => a.status === 'pending').length,
    rejected: approvers.filter(a => a.status === 'rejected').length,
    skipped: approvers.filter(a => a.status === 'skipped').length,
  };

  return (
    <div className="space-y-6">
      {/* Approval Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{approvalStats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-status-approved mb-1">{approvalStats.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-status-pending mb-1">{approvalStats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-status-rejected mb-1">{approvalStats.rejected}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-status-skipped mb-1">{approvalStats.skipped}</div>
              <div className="text-sm text-muted-foreground">Skipped</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approvers List */}
      <Card>
        <CardHeader>
          <CardTitle>Approvers ({approvers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {approvers.map((approver) => (
              <div
                key={approver.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={approver.avatar} alt={approver.name} />
                  <AvatarFallback>{getInitials(approver.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{approver.name}</h3>
                      <p className="text-sm text-muted-foreground">{approver.role}</p>
                      <p className="text-sm text-muted-foreground">{approver.department}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {getStatusIcon(approver.status)}
                      {getStatusBadge(approver.status)}
                    </div>
                  </div>
                  
                  {approver.timestamp && (
                    <p className="text-xs text-muted-foreground mb-2">
                      {approver.status === 'approved' ? 'Approved' : 'Updated'} on{' '}
                      {new Date(approver.timestamp).toLocaleString()}
                    </p>
                  )}
                  
                  {approver.comments && (
                    <div className="bg-muted/50 rounded-lg p-3 mt-2">
                      <p className="text-sm">{approver.comments}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};