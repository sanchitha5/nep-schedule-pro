import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Calendar, Clock, Users, BookOpen } from "lucide-react";

const SchedulesView = () => {
  const generatedSchedules = [
    {
      id: 1,
      name: "Computer Science - Semester 1",
      generatedAt: "2024-01-15",
      status: "active",
      conflicts: 0,
      classes: 28,
      utilization: "85%"
    },
    {
      id: 2,
      name: "Electronics - Semester 2",
      generatedAt: "2024-01-14", 
      status: "draft",
      conflicts: 2,
      classes: 32,
      utilization: "78%"
    },
    {
      id: 3,
      name: "Mechanical - Semester 3",
      generatedAt: "2024-01-13",
      status: "archived",
      conflicts: 0,
      classes: 30,
      utilization: "92%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "draft": return "bg-yellow-500";
      case "archived": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Generated Schedules</h1>
          <p className="text-muted-foreground mt-2">
            View and manage automatically generated class schedules
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Generate New Schedule
        </Button>
      </div>

      <div className="grid gap-6">
        {generatedSchedules.map((schedule) => (
          <Card key={schedule.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {schedule.name}
                    <Badge className={getStatusColor(schedule.status)}>
                      {schedule.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Generated on {new Date(schedule.generatedAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{schedule.classes}</p>
                    <p className="text-xs text-muted-foreground">Classes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">{schedule.utilization}</p>
                    <p className="text-xs text-muted-foreground">Utilization</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">{schedule.conflicts}</p>
                    <p className="text-xs text-muted-foreground">Conflicts</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">6 Days</p>
                    <p className="text-xs text-muted-foreground">Week Days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SchedulesView;