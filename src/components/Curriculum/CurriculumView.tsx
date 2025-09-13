import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Plus, Search, Settings, Clock, Users, Building2 } from "lucide-react";

const CurriculumView = () => {
  const curriculumStructure = {
    "B.Ed.": {
      totalCredits: 160,
      semesters: 4,
      categories: [
        { name: "Foundation Courses", credits: 40, mandatory: true },
        { name: "Major Courses", credits: 60, mandatory: true },
        { name: "Minor Courses", credits: 20, mandatory: false },
        { name: "Skill Enhancement", credits: 16, mandatory: true },
        { name: "Ability Enhancement", credits: 12, mandatory: true },
        { name: "Value Added Courses", credits: 8, mandatory: false },
        { name: "Teaching Practice", credits: 4, mandatory: true }
      ]
    },
    "M.Ed.": {
      totalCredits: 80,
      semesters: 2,
      categories: [
        { name: "Core Courses", credits: 40, mandatory: true },
        { name: "Major Electives", credits: 24, mandatory: false },
        { name: "Research & Dissertation", credits: 16, mandatory: true }
      ]
    },
    "FYUP": {
      totalCredits: 176,
      semesters: 8,
      categories: [
        { name: "Major Discipline", credits: 64, mandatory: true },
        { name: "Minor Discipline", credits: 32, mandatory: false },
        { name: "Multidisciplinary", credits: 24, mandatory: true },
        { name: "Ability Enhancement", credits: 20, mandatory: true },
        { name: "Skill Enhancement", credits: 16, mandatory: true },
        { name: "Value Added", credits: 12, mandatory: false },
        { name: "Internship/Project", credits: 8, mandatory: true }
      ]
    }
  };

  const detailedCourses = [
    {
      code: "EDU101",
      name: "Foundations of Education",
      program: "B.Ed.",
      semester: 1,
      category: "Foundation Courses",
      credits: 4,
      theory: 3,
      practical: 1,
      prerequisites: [],
      description: "Introduction to educational philosophies and theories",
      learningOutcomes: ["Understand educational foundations", "Analyze educational systems"],
      assessmentPattern: { continuous: 40, midterm: 20, final: 40 }
    },
    {
      code: "PSY201",
      name: "Child Psychology",
      program: "B.Ed.",
      semester: 2,
      category: "Major Courses",
      credits: 4,
      theory: 3,
      practical: 1,
      prerequisites: ["EDU101"],
      description: "Understanding child development and psychology",
      learningOutcomes: ["Analyze child behavior", "Apply developmental theories"],
      assessmentPattern: { continuous: 50, midterm: 20, final: 30 }
    },
    {
      code: "RES301",
      name: "Research Methodology",
      program: "M.Ed.",
      semester: 1,
      category: "Core Courses",
      credits: 6,
      theory: 4,
      practical: 2,
      prerequisites: [],
      description: "Advanced research methods in education",
      learningOutcomes: ["Design research studies", "Analyze educational data"],
      assessmentPattern: { continuous: 60, final: 40 }
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Foundation Courses": "bg-blue-500 text-white",
      "Major Courses": "bg-primary text-primary-foreground",
      "Core Courses": "bg-primary text-primary-foreground",
      "Minor Courses": "bg-accent text-accent-foreground",
      "Major Electives": "bg-blue-400 text-white",
      "Skill Enhancement": "bg-green-500 text-white",
      "Ability Enhancement": "bg-purple-500 text-white",
      "Value Added Courses": "bg-orange-500 text-white",
      "Teaching Practice": "bg-red-500 text-white",
      "Research & Dissertation": "bg-indigo-500 text-white",
      "Multidisciplinary": "bg-teal-500 text-white",
      "Internship/Project": "bg-pink-500 text-white"
    };
    return colors[category] || "bg-secondary text-secondary-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Curriculum Structure</h2>
          <p className="text-muted-foreground">
            NEP 2020 compliant curriculum with credit-based flexible structure
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      {/* Program Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(curriculumStructure).map(([program, structure]) => (
          <Card key={program}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                {program}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Credits:</span>
                  <span className="font-medium">{structure.totalCredits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Semesters:</span>
                  <span className="font-medium">{structure.semesters}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Categories:</span>
                  <span className="font-medium">{structure.categories.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="structure" className="space-y-4">
        <TabsList>
          <TabsTrigger value="structure">Credit Structure</TabsTrigger>
          <TabsTrigger value="courses">Course Details</TabsTrigger>
          <TabsTrigger value="mapping">Program Mapping</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="space-y-4">
          {Object.entries(curriculumStructure).map(([program, structure]) => (
            <Card key={program}>
              <CardHeader>
                <CardTitle>{program} Credit Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {structure.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(category.name)}>
                            {category.name}
                          </Badge>
                          {category.mandatory && (
                            <Badge variant="outline" className="text-xs">Required</Badge>
                          )}
                        </div>
                        <span className="font-medium">{category.credits} credits</span>
                      </div>
                      <Progress 
                        value={(category.credits / structure.totalCredits) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-4">
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
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="foundation">Foundation</SelectItem>
                    <SelectItem value="major">Major</SelectItem>
                    <SelectItem value="minor">Minor</SelectItem>
                    <SelectItem value="skill">Skill Enhancement</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">Clear Filters</Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Course Table */}
          <Card>
            <CardHeader>
              <CardTitle>Course Catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Theory/Practical</TableHead>
                    <TableHead>Prerequisites</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedCourses.map((course) => (
                    <TableRow key={course.code}>
                      <TableCell className="font-mono">{course.code}</TableCell>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{course.program}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(course.category)}>
                          {course.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            T:{course.theory}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Building2 className="w-3 h-3 mr-1" />
                            P:{course.practical}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {course.prerequisites.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {course.prerequisites.map((prereq, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {prereq}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit Requirements by Semester</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-3">B.Ed. Program (4 Semesters)</h4>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((sem) => (
                      <div key={sem} className="flex justify-between p-2 bg-muted rounded">
                        <span>Semester {sem}</span>
                        <span className="font-medium">20 credits</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">M.Ed. Program (2 Semesters)</h4>
                  <div className="space-y-2">
                    {[1, 2].map((sem) => (
                      <div key={sem} className="flex justify-between p-2 bg-muted rounded">
                        <span>Semester {sem}</span>
                        <span className="font-medium">40 credits</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cross-Program Course Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Educational Psychology</span>
                    <div className="flex gap-2">
                      <Badge variant="outline">B.Ed.</Badge>
                      <Badge variant="outline">M.Ed.</Badge>
                      <Badge variant="outline">FYUP</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Shared across programs with different credit weightings
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Research Methodology</span>
                    <div className="flex gap-2">
                      <Badge variant="outline">M.Ed.</Badge>
                      <Badge variant="outline">FYUP</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Advanced research methods for postgraduate students
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CurriculumView;