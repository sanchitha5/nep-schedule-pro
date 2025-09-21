import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useStudents } from "@/hooks/useStudents";
import { 
  Users, 
  Clock, 
  BookOpen, 
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  MapPin
} from "lucide-react";

const FacultyDashboard = () => {
  const { profile } = useAuth();
  const { students, loading: studentsLoading } = useStudents();

  // Mock timetable data - this would come from a real API
  const mockTimetable = [
    { time: "9:00 - 10:00", monday: "Educational Psychology", tuesday: "", wednesday: "Educational Psychology", thursday: "", friday: "Research Methods" },
    { time: "10:00 - 11:00", monday: "Teaching Methods", tuesday: "Curriculum Studies", wednesday: "Teaching Methods", thursday: "Curriculum Studies", friday: "" },
    { time: "11:00 - 12:00", monday: "", tuesday: "Educational Psychology", wednesday: "", thursday: "Educational Psychology", friday: "Teaching Methods" },
    { time: "12:00 - 1:00", monday: "Office Hours", tuesday: "Office Hours", wednesday: "Office Hours", thursday: "Office Hours", friday: "Office Hours" },
    { time: "2:00 - 3:00", monday: "Curriculum Studies", tuesday: "", wednesday: "Research Methods", thursday: "", friday: "Educational Psychology" },
    { time: "3:00 - 4:00", monday: "", tuesday: "Teaching Methods", wednesday: "", thursday: "Research Methods", friday: "" },
  ];

  const activeStudents = students.filter(student => student.status === 'Active');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getProgramColor = (program: string) => {
    const colors: { [key: string]: string } = {
      'Bachelor of Education': 'bg-blue-100 text-blue-800',
      'Master of Education': 'bg-green-100 text-green-800',
      'PhD in Education': 'bg-purple-100 text-purple-800',
      'Diploma in Education': 'bg-orange-100 text-orange-800',
    };
    return colors[program] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Faculty Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Faculty Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {getInitials(profile?.full_name || 'Faculty')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-semibold">{profile?.full_name}</h3>
                <p className="text-muted-foreground">Faculty Member</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{profile?.department || 'Department of Education'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>Faculty ID: {profile?.faculty_id || 'FAC001'}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Students ({activeStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {studentsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-2">Loading students...</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activeStudents.map((student) => (
                  <div key={student.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-sm">
                        {getInitials(student.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{student.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {student.student_id}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{student.program}</span>
                        <span>•</span>
                        <span>Semester {student.semester}</span>
                      </div>
                      <Badge className={`text-xs mt-1 ${getProgramColor(student.program)}`}>
                        {student.batch}
                      </Badge>
                    </div>
                  </div>
                ))}
                {activeStudents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No active students found
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Personal Timetable */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              My Timetable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Time</th>
                    <th className="text-left p-2 font-medium">Mon</th>
                    <th className="text-left p-2 font-medium">Tue</th>
                    <th className="text-left p-2 font-medium">Wed</th>
                    <th className="text-left p-2 font-medium">Thu</th>
                    <th className="text-left p-2 font-medium">Fri</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTimetable.map((slot, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium text-muted-foreground">{slot.time}</td>
                      <td className="p-2">
                        {slot.monday && (
                          <Badge variant="default" className="text-xs">
                            {slot.monday}
                          </Badge>
                        )}
                      </td>
                      <td className="p-2">
                        {slot.tuesday && (
                          <Badge variant="default" className="text-xs">
                            {slot.tuesday}
                          </Badge>
                        )}
                      </td>
                      <td className="p-2">
                        {slot.wednesday && (
                          <Badge variant="default" className="text-xs">
                            {slot.wednesday}
                          </Badge>
                        )}
                      </td>
                      <td className="p-2">
                        {slot.thursday && (
                          <Badge variant="default" className="text-xs">
                            {slot.thursday}
                          </Badge>
                        )}
                      </td>
                      <td className="p-2">
                        {slot.friday && (
                          <Badge variant="default" className="text-xs">
                            {slot.friday}
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{activeStudents.length}</p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Classes/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Office Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;