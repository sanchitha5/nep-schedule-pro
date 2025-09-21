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
import SchedulesView from "@/components/Schedules/SchedulesView";
import ReportsView from "@/components/Reports/ReportsView";
import SettingsView from "@/components/Settings/SettingsView";
import StudentDashboard from "@/components/Student/StudentDashboard";
import FacultyDashboard from "@/components/Faculty/FacultyDashboard";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { profile } = useAuth();

  // If user is a student, show only student dashboard
  if (profile?.role === 'student') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="p-6">
          <StudentDashboard />
        </main>
      </div>
    );
  }

  // If user is faculty, show only faculty dashboard
  if (profile?.role === 'faculty') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="p-6">
          <FacultyDashboard />
        </main>
      </div>
    );
  }

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
        return <SchedulesView />;
      case "reports":
        return <ReportsView />;
      case "settings":
        return <SettingsView />;
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