import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useStudents } from "@/hooks/useStudents";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Clock, 
  BookOpen, 
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Download,
  Edit,
  Settings,
  ChevronRight,
  Bell,
  AlertTriangle,
  CheckCircle,
  FileText,
  MessageSquare,
  Calendar as CalendarIcon,
  Target,
  TrendingUp,
  BarChart3,
  Plus,
  X
} from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Enhanced Faculty Dashboard Component
const FacultyDashboard = () => {
  const { profile } = useAuth();
  const { students, loading: studentsLoading } = useStudents();
  const { toast } = useToast();

  // State management
  const [personalDetails, setPersonalDetails] = useState({
    qualification: "PhD in Education",
    specialization: "Educational Psychology, Curriculum Development",
    experience: "8 years",
    phone: "+1-234-567-8900",
    address: "123 University Ave, Academic City",
    emergencyContact: "+1-234-567-8901"
  });

  const [workloadSettings, setWorkloadSettings] = useState({
    maxHoursPerWeek: 20,
    maxClassesPerDay: 4,
    preferredSubjects: ["Educational Psychology", "Teaching Methods", "Curriculum Studies"]
  });

  const [availability, setAvailability] = useState({
    monday: { available: true, timeSlots: ["9:00-12:00", "14:00-17:00"] },
    tuesday: { available: true, timeSlots: ["10:00-13:00", "15:00-18:00"] },
    wednesday: { available: true, timeSlots: ["9:00-12:00", "14:00-17:00"] },
    thursday: { available: true, timeSlots: ["10:00-13:00", "15:00-18:00"] },
    friday: { available: true, timeSlots: ["9:00-12:00"] },
    saturday: { available: false, timeSlots: [] },
    sunday: { available: false, timeSlots: [] }
  });

  const [extraDuties, setExtraDuties] = useState([
    { id: 1, title: "Exam Committee Member", status: "Active", deadline: "2024-12-15" },
    { id: 2, title: "Curriculum Review Board", status: "Pending", deadline: "2024-11-30" },
    { id: 3, title: "Student Counselor", status: "Active", deadline: "Ongoing" }
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Faculty Meeting - Dec 20", content: "Monthly faculty meeting scheduled", type: "info", date: "2024-12-18" },
    { id: 2, title: "Exam Schedule Updated", content: "Final exam dates have been revised", type: "warning", date: "2024-12-17" },
    { id: 3, title: "Holiday Notice", content: "University closed Dec 24-Jan 2", type: "success", date: "2024-12-16" }
  ]);

  const [timetableChangeRequests, setTimetableChangeRequests] = useState([]);

  // Enhanced timetable with more details
  const currentTimetable = [
    { 
      time: "9:00 - 10:00", 
      monday: { subject: "Educational Psychology", type: "Theory", room: "A101" },
      tuesday: { subject: "", type: "", room: "" },
      wednesday: { subject: "Educational Psychology", type: "Theory", room: "A101" },
      thursday: { subject: "", type: "", room: "" },
      friday: { subject: "Research Methods", type: "Theory", room: "B205" }
    },
    { 
      time: "10:00 - 11:00", 
      monday: { subject: "Teaching Methods", type: "Practical", room: "Lab-1" },
      tuesday: { subject: "Curriculum Studies", type: "Theory", room: "C302" },
      wednesday: { subject: "Teaching Methods", type: "Practical", room: "Lab-1" },
      thursday: { subject: "Curriculum Studies", type: "Theory", room: "C302" },
      friday: { subject: "", type: "", room: "" }
    },
    { 
      time: "11:00 - 12:00", 
      monday: { subject: "", type: "", room: "" },
      tuesday: { subject: "Educational Psychology", type: "Theory", room: "A101" },
      wednesday: { subject: "", type: "", room: "" },
      thursday: { subject: "Educational Psychology", type: "Theory", room: "A101" },
      friday: { subject: "Teaching Methods", type: "Practical", room: "Lab-1" }
    },
    { 
      time: "12:00 - 1:00", 
      monday: { subject: "Office Hours", type: "Office", room: "Faculty-205" },
      tuesday: { subject: "Office Hours", type: "Office", room: "Faculty-205" },
      wednesday: { subject: "Office Hours", type: "Office", room: "Faculty-205" },
      thursday: { subject: "Office Hours", type: "Office", room: "Faculty-205" },
      friday: { subject: "Office Hours", type: "Office", room: "Faculty-205" }
    },
    { 
      time: "2:00 - 3:00", 
      monday: { subject: "Curriculum Studies", type: "Theory", room: "C302" },
      tuesday: { subject: "", type: "", room: "" },
      wednesday: { subject: "Research Methods", type: "Theory", room: "B205" },
      thursday: { subject: "", type: "", room: "" },
      friday: { subject: "Educational Psychology", type: "Theory", room: "A101" }
    },
    { 
      time: "3:00 - 4:00", 
      monday: { subject: "", type: "", room: "" },
      tuesday: { subject: "Teaching Methods", type: "Practical", room: "Lab-1" },
      wednesday: { subject: "", type: "", room: "" },
      thursday: { subject: "Research Methods", type: "Theory", room: "B205" },
      friday: { subject: "", type: "", room: "" }
    }
  ];

  const activeStudents = students.filter(student => student.status === 'Active');

  // Helper functions
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getSubjectTypeColor = (type: string) => {
    switch (type) {
      case 'Theory': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Practical': return 'bg-green-100 text-green-800 border-green-200';
      case 'Office': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateWeeklyStats = () => {
    let totalHours = 0;
    let theoryHours = 0;
    let practicalHours = 0;
    let officeHours = 0;

    currentTimetable.forEach(slot => {
      ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
        const daySlot = slot[day as keyof typeof slot] as any;
        if (daySlot.subject) {
          totalHours += 1;
          if (daySlot.type === 'Theory') theoryHours += 1;
          else if (daySlot.type === 'Practical') practicalHours += 1;
          else if (daySlot.type === 'Office') officeHours += 1;
        }
      });
    });

    return { totalHours, theoryHours, practicalHours, officeHours };
  };

  const weeklyStats = calculateWeeklyStats();

  const downloadPDF = async () => {
    try {
      const element = document.getElementById('faculty-dashboard-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
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

      pdf.save(`faculty-dashboard-${profile?.full_name?.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "PDF Downloaded",
        description: "Your faculty dashboard has been downloaded as PDF.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const requestTimetableChange = () => {
    const newRequest = {
      id: Date.now(),
      type: "Schedule Change",
      description: "Request to modify weekly schedule",
      status: "Pending",
      date: new Date().toISOString().split('T')[0]
    };
    setTimetableChangeRequests(prev => [...prev, newRequest]);
    toast({
      title: "Request Submitted",
      description: "Your timetable change request has been submitted to administration.",
    });
  };

  return (
    <div id="faculty-dashboard-content" className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
          <p className="text-muted-foreground">Manage your academic profile and schedule</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={downloadPDF} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Faculty Settings</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="workload">Workload</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                  <TabsTrigger value="duties">Duties</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Qualification</label>
                      <Input 
                        value={personalDetails.qualification}
                        onChange={(e) => setPersonalDetails(prev => ({ ...prev, qualification: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Experience</label>
                      <Input 
                        value={personalDetails.experience}
                        onChange={(e) => setPersonalDetails(prev => ({ ...prev, experience: e.target.value }))}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">Specialization</label>
                      <Textarea 
                        value={personalDetails.specialization}
                        onChange={(e) => setPersonalDetails(prev => ({ ...prev, specialization: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <Input 
                        value={personalDetails.phone}
                        onChange={(e) => setPersonalDetails(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Emergency Contact</label>
                      <Input 
                        value={personalDetails.emergencyContact}
                        onChange={(e) => setPersonalDetails(prev => ({ ...prev, emergencyContact: e.target.value }))}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">Address</label>
                      <Textarea 
                        value={personalDetails.address}
                        onChange={(e) => setPersonalDetails(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="workload" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Max Hours Per Week</label>
                      <Input 
                        type="number"
                        value={workloadSettings.maxHoursPerWeek}
                        onChange={(e) => setWorkloadSettings(prev => ({ ...prev, maxHoursPerWeek: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Max Classes Per Day</label>
                      <Input 
                        type="number"
                        value={workloadSettings.maxClassesPerDay}
                        onChange={(e) => setWorkloadSettings(prev => ({ ...prev, maxClassesPerDay: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Preferred Subjects</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {workloadSettings.preferredSubjects.map((subject, index) => (
                        <Badge key={index} variant="secondary">
                          {subject}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => setWorkloadSettings(prev => ({
                              ...prev,
                              preferredSubjects: prev.preferredSubjects.filter((_, i) => i !== index)
                            }))}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="availability" className="space-y-4">
                  {Object.entries(availability).map(([day, dayData]) => (
                    <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Switch 
                          checked={dayData.available}
                          onCheckedChange={(checked) => setAvailability(prev => ({
                            ...prev,
                            [day]: { ...prev[day as keyof typeof prev], available: checked }
                          }))}
                        />
                        <span className="capitalize font-medium">{day}</span>
                      </div>
                      {dayData.available && (
                        <div className="flex gap-2">
                          {dayData.timeSlots.map((slot, index) => (
                            <Badge key={index} variant="outline">{slot}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="duties" className="space-y-4">
                  <div className="space-y-3">
                    {extraDuties.map((duty) => (
                      <div key={duty.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{duty.title}</h4>
                          <p className="text-sm text-muted-foreground">Deadline: {duty.deadline}</p>
                        </div>
                        <Badge variant={duty.status === 'Active' ? 'default' : 'secondary'}>
                          {duty.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Faculty Profile Enhanced */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Personal Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-xl">
                {getInitials(profile?.full_name || 'Faculty')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{profile?.full_name}</h3>
                <p className="text-muted-foreground text-lg">{personalDetails.qualification}</p>
                <p className="text-sm text-muted-foreground">{personalDetails.specialization}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{personalDetails.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{profile?.department || 'Department of Education'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>Faculty ID: {profile?.faculty_id || 'FAC001'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Experience: {personalDetails.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{personalDetails.address}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Overview and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{weeklyStats.totalHours}</p>
                <p className="text-xs text-muted-foreground">Total Hours/Week</p>
                <Progress 
                  value={(weeklyStats.totalHours / workloadSettings.maxHoursPerWeek) * 100} 
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{weeklyStats.theoryHours}</p>
                <p className="text-xs text-muted-foreground">Theory Hours</p>
                <div className="text-xs text-muted-foreground mt-1">
                  {weeklyStats.practicalHours} Practical
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{activeStudents.length}</p>
                <p className="text-xs text-muted-foreground">Active Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{extraDuties.length}</p>
                <p className="text-xs text-muted-foreground">Extra Duties</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Weekly Timetable */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Schedule
            </CardTitle>
            <Button onClick={requestTimetableChange} variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Request Change
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 font-medium border-b">Time</th>
                    <th className="text-left p-3 font-medium border-b">Mon</th>
                    <th className="text-left p-3 font-medium border-b">Tue</th>
                    <th className="text-left p-3 font-medium border-b">Wed</th>
                    <th className="text-left p-3 font-medium border-b">Thu</th>
                    <th className="text-left p-3 font-medium border-b">Fri</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTimetable.map((slot, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground border-r">
                        {slot.time}
                      </td>
                      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => {
                        const daySlot = slot[day as keyof typeof slot] as any;
                        return (
                          <td key={day} className="p-3 border-r">
                            {daySlot.subject && (
                              <div className="space-y-1">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getSubjectTypeColor(daySlot.type)}`}
                                >
                                  {daySlot.subject}
                                </Badge>
                                <div className="text-xs text-muted-foreground">
                                  {daySlot.room}
                                </div>
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

        {/* Announcements and Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-2">
                    {announcement.type === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />}
                    {announcement.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                    {announcement.type === 'info' && <Bell className="h-4 w-4 text-blue-500 mt-0.5" />}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{announcement.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{announcement.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">{announcement.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students and Extra Duties */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              My Students ({activeStudents.length})
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
                {activeStudents.slice(0, 8).map((student) => (
                  <div key={student.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
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
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{student.program}</span>
                        <span>•</span>
                        <span>Sem {student.semester}</span>
                      </div>
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

        {/* Extra Duties */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Extra Duties & Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {extraDuties.map((duty) => (
                <div key={duty.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{duty.title}</h4>
                    <p className="text-xs text-muted-foreground">Deadline: {duty.deadline}</p>
                  </div>
                  <Badge variant={duty.status === 'Active' ? 'default' : 'secondary'}>
                    {duty.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add New Duty
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;