import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Plus, Search, Edit, Trash2 } from "lucide-react";

const CoursesView = () => {
  const courses = [
    {
      id: "EDU101",
      name: "Educational Psychology",
      program: "B.Ed.",
      semester: 1,
      credits: 4,
      type: "Major",
      faculty: "Dr. Smith",
      hours: { theory: 3, practical: 1 }
    },
    {
      id: "CUR201",
      name: "Curriculum Development",
      program: "M.Ed.",
      semester: 2,
      credits: 6,
      type: "Core",
      faculty: "Prof. Johnson",
      hours: { theory: 4, practical: 2 }
    },
    {
      id: "MATH301",
      name: "Advanced Mathematics",
      program: "FYUP",
      semester: 3,
      credits: 3,
      type: "Minor",
      faculty: "Dr. Brown",
      hours: { theory: 3, practical: 0 }
    },
    {
      id: "PRAC401",
      name: "Teaching Practice",
      program: "ITEP",
      semester: 4,
      credits: 8,
      type: "Practical",
      faculty: "Multiple",
      hours: { theory: 2, practical: 6 }
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Major": return "bg-primary text-primary-foreground";
      case "Minor": return "bg-accent text-accent-foreground";
      case "Core": return "bg-success text-success-foreground";
      case "Practical": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Course Management</h2>
          <p className="text-muted-foreground">
            Manage courses across all programs and semesters
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search courses..." className="pl-10" />
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
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="major">Major</SelectItem>
                <SelectItem value="minor">Minor</SelectItem>
                <SelectItem value="core">Core</SelectItem>
                <SelectItem value="practical">Practical</SelectItem>
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

      {/* Courses Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono">{course.id}</p>
                </div>
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{course.program}</Badge>
                <Badge className={getTypeColor(course.type)}>{course.type}</Badge>
                <Badge variant="secondary">Sem {course.semester}</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Credits:</span>
                  <span className="ml-1 font-medium">{course.credits}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Faculty:</span>
                  <span className="ml-1 font-medium">{course.faculty}</span>
                </div>
              </div>

              <div className="text-sm">
                <span className="text-muted-foreground">Hours:</span>
                <span className="ml-1">
                  Theory: {course.hours.theory}, Practical: {course.hours.practical}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Course Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-primary">{courses.length}</p>
              <p className="text-sm text-muted-foreground">Total Courses</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-success">
                {courses.reduce((sum, course) => sum + course.credits, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Credits</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-warning">
                {courses.reduce((sum, course) => sum + course.hours.theory, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Theory Hours</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-info">
                {courses.reduce((sum, course) => sum + course.hours.practical, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Practical Hours</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesView;