import { 
  Calendar, 
  Users, 
  BookOpen, 
  Building, 
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react";
import StatsCard from "./StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DashboardView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Academic timetable management system for NEP 2020 compliance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Courses"
          value={247}
          description="Across all programs"
          icon={BookOpen}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Faculty Members"
          value={89}
          description="Active this semester"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Students Enrolled"
          value={1842}
          description="All programs combined"
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Rooms & Labs"
          value={45}
          description="Available facilities"
          icon={Building}
        />
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Timetable Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium">B.Ed. Semester 3 - Updated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <Badge variant="outline">Success</Badge>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <div className="flex-1">
                  <p className="text-sm font-medium">M.Ed. Conflict Detected</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-info" />
                <div className="flex-1">
                  <p className="text-sm font-medium">FYUP Schedule Generated</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <Badge variant="outline">Completed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Generate New Timetable
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add Faculty Member
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Create Course
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Building className="mr-2 h-4 w-4" />
                Manage Rooms
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Program Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Program Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">B.Ed.</h3>
              <p className="text-2xl font-bold text-primary">156</p>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">M.Ed.</h3>
              <p className="text-2xl font-bold text-primary">89</p>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">FYUP</h3>
              <p className="text-2xl font-bold text-primary">1,245</p>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">ITEP</h3>
              <p className="text-2xl font-bold text-primary">352</p>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardView;