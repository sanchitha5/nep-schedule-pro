import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, User, BookOpen, Clock, Mail, Phone, GraduationCap, Download, Edit, Bell, AlertTriangle, Beaker } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Student Dashboard Component
const StudentDashboard = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [selectedElective, setSelectedElective] = useState("Subject Pedagogy");
  const [notifications, setNotifications] = useState([
    { id: 1, type: "timetable", message: "Teaching Methods class moved to Room 203", time: "2 hours ago" },
    { id: 2, type: "exam", message: "Midterm exam scheduled for Educational Psychology on March 15", time: "1 day ago" }
  ]);
  const [studentData, setStudentData] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.student_id) {
      fetchStudentData();
      fetchCourses();
    }
  }, [profile]);

  const fetchStudentData = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('student_id', profile?.student_id)
        .single();

      if (error) throw error;
      setStudentData(data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

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
      "9:00-10:00": { course: "Educational Psychology", faculty: "Dr. Smith", room: "101", type: "major" },
      "10:00-11:00": { course: "Curriculum Studies", faculty: "Prof. Johnson", room: "102", type: "major" },
      "2:00-3:00": { course: "Teaching Methods", faculty: "Dr. Brown", room: "Lab A", type: "lab" },
    },
    "Tuesday": {
      "9:00-10:00": { course: "Philosophy of Education", faculty: "Dr. Wilson", room: "103", type: "minor" },
      "11:00-12:00": { course: "Research Methods", faculty: "Prof. Davis", room: "104", type: "minor" },
    },
    "Wednesday": {
      "10:00-11:00": { course: "Educational Psychology", faculty: "Dr. Smith", room: "101", type: "major" },
      "2:00-3:00": { course: selectedElective, faculty: "Dr. Taylor", room: "201", type: "elective" },
    },
    "Thursday": {
      "9:00-10:00": { course: "Teaching Methods", faculty: "Dr. Brown", room: "Lab A", type: "lab" },
      "11:00-12:00": { course: "Philosophy of Education", faculty: "Dr. Wilson", room: "103", type: "minor" },
    },
    "Friday": {
      "9:00-10:00": { course: "Research Methods", faculty: "Prof. Davis", room: "104", type: "minor" },
      "10:00-11:00": { course: "Curriculum Studies", faculty: "Prof. Johnson", room: "102", type: "major" },
    }
  };

  const electiveOptions = [
    "Subject Pedagogy",
    "Educational Technology", 
    "Special Education",
    "Language Teaching Methods",
    "Science Education"
  ];

  const examSchedule = [
    { subject: "Educational Psychology", date: "March 15, 2024", time: "9:00 AM", type: "Midterm" },
    { subject: "Curriculum Studies", date: "March 18, 2024", time: "2:00 PM", type: "Final" },
    { subject: "Teaching Methods", date: "March 22, 2024", time: "11:00 AM", type: "Practical" }
  ];

  const getCourseStyle = (type: string) => {
    switch (type) {
      case "major":
        return "bg-primary/10 border-primary/30 text-primary-foreground";
      case "minor": 
        return "bg-secondary/10 border-secondary/30 text-secondary-foreground";
      case "lab":
        return "bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-300";
      case "elective":
        return "bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-300";
      default:
        return "bg-muted";
    }
  };

  const downloadPDF = async () => {
    try {
      const element = document.getElementById('timetable-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      
      const imgWidth = 297;
      const pageHeight = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${profile?.full_name || 'Student'}_Timetable.pdf`);
      toast({
        title: "PDF Downloaded",
        description: "Your timetable has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleElectiveChange = (newElective: string) => {
    setSelectedElective(newElective);
    toast({
      title: "Elective Updated",
      description: `Your elective has been changed to ${newElective}`,
    });
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
                    <span>{studentData?.program || 'Not assigned'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Semester:</span>
                    <span>{studentData?.semester ? `${studentData.semester}${studentData.semester === 1 ? 'st' : studentData.semester === 2 ? 'nd' : studentData.semester === 3 ? 'rd' : 'th'} Semester` : 'Not assigned'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Batch:</span>
                    <span>{studentData?.batch || 'Not assigned'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{studentData?.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>
              
              {/* Academic Details */}
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Enrolled Courses</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {courses.length > 0 ? (
                    courses.slice(0, 6).map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-2 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{course.name}</div>
                          <div className="text-xs text-muted-foreground">{course.type} • {course.credits} credits</div>
                        </div>
                        <Badge variant="outline" className="text-xs">{course.program}</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No courses found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      {notifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Alert key={notification.id} className={notification.type === 'exam' ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20' : ''}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex justify-between items-start">
                      <span>{notification.message}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exam Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Upcoming Exams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {examSchedule.map((exam, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800">
                <div>
                  <div className="font-medium">{exam.subject}</div>
                  <div className="text-sm text-muted-foreground">{exam.date} at {exam.time}</div>
                </div>
                <Badge variant="destructive">{exam.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Timetable */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              My Weekly Timetable
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Change Elective
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Elective Course</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Select New Elective:</label>
                      <Select value={selectedElective} onValueChange={handleElectiveChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {electiveOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={downloadPDF} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardTitle>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary/20 border border-primary/30"></div>
              <span>Major Subjects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-secondary/20 border border-secondary/30"></div>
              <span>Minor Subjects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-100 border border-orange-300"></div>
              <span>Lab Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-100 border border-purple-300"></div>
              <span>Electives</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div id="timetable-content" className="overflow-x-auto">
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
                            <div className={`p-2 rounded-lg border ${getCourseStyle(slot.type)} space-y-2`}>
                              <div className="font-medium text-sm flex items-center gap-1">
                                {slot.type === "lab" && <Beaker className="h-3 w-3" />}
                                {slot.course}
                              </div>
                              <div className="text-xs opacity-80">
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