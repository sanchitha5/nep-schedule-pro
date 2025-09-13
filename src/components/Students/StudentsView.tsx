import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap, Plus, Search, Edit, Trash2, BookOpen, Award } from "lucide-react";

const StudentsView = () => {
  const students = [
    {
      id: "ST001",
      name: "Priya Sharma",
      program: "B.Ed.",
      semester: 2,
      enrolledCredits: 22,
      totalCredits: 160,
      rollNumber: "BED2023001",
      email: "priya.sharma@edu.ac.in",
      electives: [
        { courseId: "PSY201", courseName: "Child Psychology", type: "Major Elective", credits: 4 },
        { courseId: "TECH101", courseName: "Educational Technology", type: "Skill Enhancement", credits: 2 },
        { courseId: "ENV201", courseName: "Environmental Studies", type: "Value Added", credits: 2 }
      ]
    },
    {
      id: "ST002", 
      name: "Arjun Patel",
      program: "M.Ed.",
      semester: 1,
      enrolledCredits: 18,
      totalCredits: 80,
      rollNumber: "MED2024001",
      email: "arjun.patel@edu.ac.in",
      electives: [
        { courseId: "RES301", courseName: "Research Methodology", type: "Core", credits: 6 },
        { courseId: "LEAD201", courseName: "Educational Leadership", type: "Major Elective", credits: 4 }
      ]
    },
    {
      id: "ST003",
      name: "Sneha Singh",
      program: "FYUP",
      semester: 3,
      enrolledCredits: 20,
      totalCredits: 176,
      rollNumber: "FYUP2022045",
      email: "sneha.singh@edu.ac.in",
      electives: [
        { courseId: "MATH201", courseName: "Statistics", type: "Major", credits: 4 },
        { courseId: "PHIL101", courseName: "Philosophy of Education", type: "Minor", credits: 3 },
        { courseId: "COMP101", courseName: "Computer Applications", type: "Ability Enhancement", credits: 2 }
      ]
    }
  ];

  const getProgressPercentage = (enrolled: number, total: number) => {
    return Math.round((enrolled / total) * 100);
  };

  const getElectiveTypeColor = (type: string) => {
    switch (type) {
      case "Major": case "Core": return "bg-primary text-primary-foreground";
      case "Minor": return "bg-accent text-accent-foreground";
      case "Major Elective": return "bg-blue-500 text-white";
      case "Skill Enhancement": return "bg-green-500 text-white";
      case "Ability Enhancement": return "bg-purple-500 text-white";
      case "Value Added": return "bg-orange-500 text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Management</h2>
          <p className="text-muted-foreground">
            Manage student data, elective choices, and credit enrollment
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-10" />
            </div>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="bed">B.Ed.</SelectItem>
                <SelectItem value="med">M.Ed.</SelectItem>
                <SelectItem value="fyup">FYUP</SelectItem>
                <SelectItem value="itep">ITEP</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
                <SelectItem value="3">Semester 3</SelectItem>
                <SelectItem value="4">Semester 4</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">Clear Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Overview */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="electives">Elective Analysis</TabsTrigger>
          <TabsTrigger value="credits">Credit Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {students.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {student.rollNumber} • {student.email}
                      </p>
                    </div>
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{student.program}</Badge>
                    <Badge variant="secondary">Semester {student.semester}</Badge>
                    <Badge className="bg-success text-success-foreground">
                      {student.enrolledCredits}/{student.totalCredits} Credits
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Credit Progress</span>
                      <span>{getProgressPercentage(student.enrolledCredits, student.totalCredits)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(student.enrolledCredits, student.totalCredits)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Current Electives ({student.electives.length})
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {student.electives.map((elective, index) => (
                        <Badge 
                          key={index} 
                          className={`text-xs ${getElectiveTypeColor(elective.type)}`}
                        >
                          {elective.courseId} ({elective.credits}c)
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Award className="h-4 w-4 mr-1" />
                      Manage Electives
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="electives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Elective Choice Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Enrolled Students</TableHead>
                    <TableHead>Credits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">PSY201</TableCell>
                    <TableCell>Child Psychology</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500 text-white">Major Elective</Badge>
                    </TableCell>
                    <TableCell>15 students</TableCell>
                    <TableCell>4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">TECH101</TableCell>
                    <TableCell>Educational Technology</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-white">Skill Enhancement</Badge>
                    </TableCell>
                    <TableCell>23 students</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">PHIL101</TableCell>
                    <TableCell>Philosophy of Education</TableCell>
                    <TableCell>
                      <Badge className="bg-accent text-accent-foreground">Minor</Badge>
                    </TableCell>
                    <TableCell>8 students</TableCell>
                    <TableCell>3</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Credit Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">B.Ed. Program</span>
                    <span className="text-sm font-medium">Average: 20.5 credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">M.Ed. Program</span>
                    <span className="text-sm font-medium">Average: 18.0 credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">FYUP Program</span>
                    <span className="text-sm font-medium">Average: 19.2 credits</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enrollment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Students</span>
                    <span className="text-sm font-medium text-green-600">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending Registration</span>
                    <span className="text-sm font-medium text-orange-600">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Credit Deficient</span>
                    <span className="text-sm font-medium text-red-600">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Electives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Educational Technology</span>
                    <span className="text-sm font-medium">23 students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Child Psychology</span>
                    <span className="text-sm font-medium">15 students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Research Methods</span>
                    <span className="text-sm font-medium">12 students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentsView;