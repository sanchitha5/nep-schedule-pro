import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, Users, BookOpen, Building, Clock, BarChart3 } from "lucide-react";

const ReportsView = () => {
  const reports = [
    {
      id: 1,
      title: "Faculty Utilization Report",
      description: "Analysis of faculty teaching load and availability",
      type: "Faculty",
      lastGenerated: "2024-01-15",
      format: "PDF"
    },
    {
      id: 2,
      title: "Room Occupancy Analysis",
      description: "Detailed room and lab usage statistics",
      type: "Infrastructure",
      lastGenerated: "2024-01-14",
      format: "Excel"
    },
    {
      id: 3,
      title: "Schedule Conflicts Report",
      description: "Identification of scheduling conflicts and resolutions",
      type: "Scheduling",
      lastGenerated: "2024-01-13",
      format: "PDF"
    },
    {
      id: 4,
      title: "Course Distribution Analysis",
      description: "Analysis of course distribution across programs",
      type: "Academic",
      lastGenerated: "2024-01-12",
      format: "PDF"
    }
  ];

  const quickStats = [
    {
      title: "Total Faculty",
      value: "45",
      change: "+3",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Active Courses",
      value: "128",
      change: "+8",
      icon: BookOpen,
      color: "text-green-500"
    },
    {
      title: "Rooms & Labs",
      value: "24",
      change: "+1",
      icon: Building,
      color: "text-purple-500"
    },
    {
      title: "Schedule Efficiency",
      value: "89%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-orange-500"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Faculty": return "bg-blue-100 text-blue-800";
      case "Infrastructure": return "bg-green-100 text-green-800";
      case "Scheduling": return "bg-orange-100 text-orange-800";
      case "Academic": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Generate and view detailed reports on scheduling performance
          </p>
        </div>
        <Button>
          <BarChart3 className="mr-2 h-4 w-4" />
          Generate Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge variant="secondary" className="text-green-600">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Pre-built reports for comprehensive analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{report.title}</h3>
                    <Badge className={getTypeColor(report.type)}>
                      {report.type}
                    </Badge>
                    <Badge variant="outline">{report.format}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Generate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsView;