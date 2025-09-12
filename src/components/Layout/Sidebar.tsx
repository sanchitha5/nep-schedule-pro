import { 
  Calendar, 
  Users, 
  BookOpen, 
  Building, 
  Settings, 
  BarChart3,
  Clock,
  FileText,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "timetable", label: "Timetable", icon: Calendar },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "faculty", label: "Faculty", icon: Users },
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "rooms", label: "Rooms & Labs", icon: Building },
  { id: "schedules", label: "Generated Schedules", icon: Clock },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <aside className="w-64 bg-card border-r border-border">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeSection === item.id && "bg-primary text-primary-foreground"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;