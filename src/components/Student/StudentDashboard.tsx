import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, User, BookOpen, Clock, Mail, Phone, GraduationCap } from "lucide-react";

const StudentDashboard = () => {
  const { profile } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Sample student timetable data - this would come from the database
  const studentTimetable = {
    "Monday": {
      "9:00-10:00": { course: "Educational Psychology", faculty: "Dr. Smith", room: "101" },
      "10:00-11:00": { course: "Curriculum Studies", faculty: "Prof. Johnson", room: "102" },
      "2:00-3:00": { course: "Teaching Methods", faculty: "Dr. Brown", room: "Lab A" },
    },
    "Tuesday": {
      "9:00-10:00": { course: "Philosophy of Education", faculty: "Dr. Wilson", room: "103" },
      "11:00-12:00": { course: "Research Methods", faculty: "Prof. Davis", room: "104" },
    },
    "Wednesday": {
      "10:00-11:00": { course: "Educational Psychology", faculty: "Dr. Smith", room: "101" },
      "2:00-3:00": { course: "Subject Pedagogy", faculty: "Dr. Taylor", room: "201" },
    },
    "Thursday": {
      "9:00-10:00": { course: "Teaching Methods", faculty: "Dr. Brown", room: "Lab A" },
      "11:00-12:00": { course: "Philosophy of Education", faculty: "Dr. Wilson", room: "103" },
    },
    "Friday": {
      "9:00-10:00": { course: "Research Methods", faculty: "Prof. Davis", room: "104" },
      "10:00-11:00": { course: "Curriculum Studies", faculty: "Prof. Johnson", room: "102" },
    }
  };

  const timeSlots = [
    "9:00-10:00",
    "10:00-11:00", 
    "11:00-12:00",
    "12:00-1:00",
    "1:00-2:00",
    "2:00-3:00",
    "3:00-4:00"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Your personal academic information and timetable
        </p>
      </div>

      {/* Student Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            My Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-xl">
                {profile?.full_name ? getInitials(profile.full_name) : 'S'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{profile?.full_name}</h3>
                <Badge variant="secondary" className="mt-1">
                  {profile?.role}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span>{profile?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Student ID:</span>
                    <span>{profile?.student_id || 'Not assigned'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Department:</span>
                    <span>{profile?.department || 'Not assigned'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Program:</span>
                    <span>Bachelor of Education</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Semester:</span>
                    <span>4th Semester</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Batch:</span>
                    <span>2023-2025</span>
                  </div>
                </div>
              </div>
              
              {/* Academic Details */}
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Academic Information</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm text-muted-foreground mb-2">Major Subjects</h5>
                    <div className="space-y-1">
                      <Badge variant="default" className="mr-1 mb-1">Educational Psychology</Badge>
                      <Badge variant="default" className="mr-1 mb-1">Curriculum Studies</Badge>
                      <Badge variant="default" className="mr-1 mb-1">Teaching Methods</Badge>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-muted-foreground mb-2">Minor Subjects</h5>
                    <div className="space-y-1">
                      <Badge variant="secondary" className="mr-1 mb-1">Philosophy of Education</Badge>
                      <Badge variant="secondary" className="mr-1 mb-1">Research Methods</Badge>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-muted-foreground mb-2">Current Subjects</h5>
                    <div className="space-y-1">
                      <Badge variant="outline" className="mr-1 mb-1">Subject Pedagogy</Badge>
                      <Badge variant="outline" className="mr-1 mb-1">Assessment & Evaluation</Badge>
                      <Badge variant="outline" className="mr-1 mb-1">School Management</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Timetable */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            My Weekly Timetable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 bg-muted text-left min-w-24 font-medium">
                    <Clock className="h-4 w-4 inline mr-2" />
                    Time
                  </th>
                  {days.map(day => (
                    <th key={day} className="border p-3 bg-muted text-left min-w-48 font-medium">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(time => (
                  <tr key={time}>
                    <td className="border p-3 font-medium bg-muted/50">{time}</td>
                    {days.map(day => {
                      const slot = studentTimetable[day]?.[time];
                      return (
                        <td key={`${day}-${time}`} className="border p-3 h-24 align-top">
                          {slot ? (
                            <div className="space-y-2">
                              <div className="font-medium text-sm text-primary">
                                {slot.course}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {slot.faculty}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                Room {slot.room}
                              </Badge>
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground italic">
                              Free Period
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Today's Classes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Today's Classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Sample today's classes - would be dynamic based on current day */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div>
                  <div className="font-medium">Educational Psychology</div>
                  <div className="text-sm text-muted-foreground">Dr. Smith • Room 101</div>
                </div>
              </div>
              <Badge variant="secondary">9:00-10:00</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div>
                  <div className="font-medium">Curriculum Studies</div>
                  <div className="text-sm text-muted-foreground">Prof. Johnson • Room 102</div>
                </div>
              </div>
              <Badge variant="secondary">10:00-11:00</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div>
                  <div className="font-medium">Teaching Methods</div>
                  <div className="text-sm text-muted-foreground">Dr. Brown • Lab A</div>
                </div>
              </div>
              <Badge variant="secondary">2:00-3:00</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;