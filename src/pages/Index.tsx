import { useState } from "react";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import DashboardView from "@/components/Dashboard/DashboardView";
import TimetableView from "@/components/Timetable/TimetableView";
import CoursesView from "@/components/Courses/CoursesView";
import StudentsView from "@/components/Students/StudentsView";
import CurriculumView from "@/components/Curriculum/CurriculumView";
import FacultyView from "@/components/Faculty/FacultyView";
import RoomsView from "@/components/Rooms/RoomsView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardView />;
      case "timetable":
        return <TimetableView />;
      case "courses":
        return <CoursesView />;
      case "curriculum":
        return <CurriculumView />;
      case "students":
        return <StudentsView />;
      case "faculty":
        return <FacultyView />;
      case "rooms":
        return <RoomsView />;
      case "schedules":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Generated Schedules</h2>
            <Card>
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Schedule history and management features will be available soon.
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case "reports":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
            <Card>
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Reporting and analytics features will be available soon.
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  System configuration features will be available soon.
                </p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;