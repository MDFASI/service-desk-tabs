import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Users, Clock, FileText } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Service Desk</h1>
              <p className="text-muted-foreground mt-1">Manage and track support tickets</p>
            </div>
            <Button onClick={() => navigate('/ticket/TK-2024-0156')}>
              View Sample Ticket
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Modern Ticket Management System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience a clean, professional interface for managing service desk tickets with 
            comprehensive tracking, approvals, and collaboration features.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Ticket className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle className="text-lg">Ticket Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive ticket details with SLA tracking and priority management
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle className="text-lg">Approval Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Multi-level approval system with status tracking and comments
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle className="text-lg">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Complete audit trail with timeline view of all ticket activities
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <FileText className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle className="text-lg">Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Threaded comments and file attachments for seamless teamwork
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Ready to explore?</h3>
              <p className="text-muted-foreground mb-6">
                Click below to view a sample ticket and experience the full feature set including 
                tabbed navigation, status indicators, and collaborative tools.
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/ticket/TK-2024-0156')}
                className="gap-2"
              >
                <Ticket className="w-5 h-5" />
                View Sample Ticket
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
