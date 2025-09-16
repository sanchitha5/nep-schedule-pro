import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Mail, Phone, GraduationCap } from "lucide-react";

interface Faculty {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  qualification: string;
  specialization: string[];
  experience: number;
  subjects: string[];
  availability: string;
  maxHours: number;
}

const FacultyView = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@college.edu",
      phone: "+91 98765 43210",
      department: "Education",
      designation: "Professor",
      qualification: "Ph.D. in Education",
      specialization: ["Educational Psychology", "Curriculum Development"],
      experience: 15,
      subjects: ["Educational Psychology", "Research Methodology", "Statistics in Education"],
      availability: "Monday to Friday",
      maxHours: 20
    },
    {
      id: "2",
      name: "Prof. Meera Sharma",
      email: "meera.sharma@college.edu",
      phone: "+91 98765 43211",
      department: "Education",
      designation: "Associate Professor",
      qualification: "M.Ed., Ph.D.",
      specialization: ["Special Education", "Inclusive Education"],
      experience: 12,
      subjects: ["Special Education", "Inclusive Practices", "Child Development"],
      availability: "Monday to Saturday",
      maxHours: 18
    },
    {
      id: "3",
      name: "Dr. Anand Verma",
      email: "anand.verma@college.edu",
      phone: "+91 98765 43212",
      department: "Science Education",
      designation: "Assistant Professor",
      qualification: "M.Sc. Chemistry, B.Ed., Ph.D.",
      specialization: ["Science Education", "Chemistry Teaching"],
      experience: 8,
      subjects: ["Science Education", "Chemistry for Teachers", "Environmental Science"],
      availability: "Monday to Friday",
      maxHours: 22
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const departments = ["Education", "Science Education", "Social Science Education", "Language Education"];
  const designations = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer"];

  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === "all" || f.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleAddFaculty = () => {
    // Add faculty logic will be implemented
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Faculty Management</h1>
        <p className="text-muted-foreground">Manage faculty members, their qualifications, and teaching assignments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faculty.length}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professors</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faculty.filter(f => f.designation === "Professor").length}</div>
            <p className="text-xs text-muted-foreground">Senior faculty members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(faculty.reduce((sum, f) => sum + f.experience, 0) / faculty.length)} years
            </div>
            <p className="text-xs text-muted-foreground">Teaching experience</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Departments</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(faculty.map(f => f.department)).size}
            </div>
            <p className="text-xs text-muted-foreground">Academic departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-4">
          <Input
            placeholder="Search faculty by name, email, or subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Faculty Member</DialogTitle>
              <DialogDescription>
                Add a new faculty member to the system with their details and qualifications.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Dr. John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@college.edu" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      {designations.map((designation) => (
                        <SelectItem key={designation} value={designation}>
                          {designation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input id="experience" type="number" placeholder="5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualifications</Label>
                <Input id="qualification" placeholder="Ph.D. in Education, M.Ed." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Textarea id="specialization" placeholder="Educational Psychology, Curriculum Development" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects Can Teach</Label>
                <Textarea id="subjects" placeholder="Educational Psychology, Research Methodology" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFaculty}>Add Faculty</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Faculty Table */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Members ({filteredFaculty.length})</CardTitle>
          <CardDescription>
            Complete list of faculty members with their details and assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Faculty Details</TableHead>
                <TableHead>Department & Designation</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.map((facultyMember) => (
                <TableRow key={facultyMember.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{facultyMember.name}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {facultyMember.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {facultyMember.phone}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {facultyMember.experience} years experience
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="outline">{facultyMember.department}</Badge>
                      <div className="text-sm font-medium">{facultyMember.designation}</div>
                      <div className="text-sm text-muted-foreground">{facultyMember.qualification}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {facultyMember.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="mr-1 mb-1">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {facultyMember.subjects.slice(0, 2).map((subject, index) => (
                        <div key={index} className="text-sm">
                          {subject}
                        </div>
                      ))}
                      {facultyMember.subjects.length > 2 && (
                        <div className="text-sm text-muted-foreground">
                          +{facultyMember.subjects.length - 2} more
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Max: {facultyMember.maxHours}h/week</div>
                      <div className="text-sm text-muted-foreground">{facultyMember.availability}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyView;