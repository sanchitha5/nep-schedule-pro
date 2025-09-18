import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search, Edit, Trash2, Loader2 } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import { AddCourseDialog } from "./AddCourseDialog";
import { useState } from "react";

const CoursesView = () => {
  const { courses, loading, addCourse, deleteCourse } = useCourses();
  const [searchTerm, setSearchTerm] = useState("");
  const [programFilter, setProgramFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = programFilter === "all" || course.program === programFilter;
    const matchesType = typeFilter === "all" || course.type.toLowerCase() === typeFilter;
    const matchesSemester = semesterFilter === "all" || course.semester.toString() === semesterFilter;
    
    return matchesSearch && matchesProgram && matchesType && matchesSemester;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setProgramFilter("all");
    setTypeFilter("all");
    setSemesterFilter("all");
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(courseId);
    }
  };

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
        <AddCourseDialog onAddCourse={addCourse} />
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search courses..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="B.Ed.">B.Ed.</SelectItem>
                <SelectItem value="M.Ed.">M.Ed.</SelectItem>
                <SelectItem value="FYUP">FYUP</SelectItem>
                <SelectItem value="ITEP">ITEP</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
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

            <Select value={semesterFilter} onValueChange={setSemesterFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
                <SelectItem value="3">Semester 3</SelectItem>
                <SelectItem value="4">Semester 4</SelectItem>
                <SelectItem value="5">Semester 5</SelectItem>
                <SelectItem value="6">Semester 6</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading courses...</span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              {courses.length === 0 ? "No courses found. Add your first course!" : "No courses match your filters."}
            </div>
          ) : (
            filteredCourses.map((course) => (
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
                  Theory: {course.theory_hours}, Practical: {course.practical_hours}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
            ))
          )}
        </div>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Course Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-primary">{filteredCourses.length}</p>
              <p className="text-sm text-muted-foreground">Total Courses</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-success">
                {filteredCourses.reduce((sum, course) => sum + course.credits, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Credits</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-warning">
                {filteredCourses.reduce((sum, course) => sum + course.theory_hours, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Theory Hours</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-info">
                {filteredCourses.reduce((sum, course) => sum + course.practical_hours, 0)}
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