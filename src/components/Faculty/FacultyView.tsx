import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Edit, Trash2, Mail, Phone, Award, Loader2 } from "lucide-react";
import { useFaculty } from "@/hooks/useFaculty";
import { AddFacultyDialog } from "./AddFacultyDialog";
import { useState } from "react";

const FacultyView = () => {
  const { faculty, loading, addFaculty, deleteFaculty } = useFaculty();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [designationFilter, setDesignationFilter] = useState("all");

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.faculty_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
    const matchesDesignation = designationFilter === "all" || member.designation === designationFilter;
    
    return matchesSearch && matchesDepartment && matchesDesignation;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("all");
    setDesignationFilter("all");
  };

  const handleDeleteFaculty = async (facultyId: string) => {
    if (confirm("Are you sure you want to delete this faculty member?")) {
      await deleteFaculty(facultyId);
    }
  };

  const getDesignationColor = (designation: string) => {
    switch (designation) {
      case "Professor": return "bg-primary text-primary-foreground";
      case "Associate Professor": return "bg-success text-success-foreground";
      case "Assistant Professor": return "bg-accent text-accent-foreground";
      case "Lecturer": return "bg-secondary text-secondary-foreground";
      case "Guest Faculty": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Inactive": return "bg-secondary text-secondary-foreground";
      case "On Leave": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Faculty Management</h2>
          <p className="text-muted-foreground">
            Manage faculty members and their assignments
          </p>
        </div>
        <AddFacultyDialog onAddFaculty={addFaculty} />
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search faculty..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Social Science">Social Science</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
              </SelectContent>
            </Select>

            <Select value={designationFilter} onValueChange={setDesignationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Designations</SelectItem>
                <SelectItem value="Professor">Professor</SelectItem>
                <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                <SelectItem value="Lecturer">Lecturer</SelectItem>
                <SelectItem value="Guest Faculty">Guest Faculty</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading faculty...</span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredFaculty.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              {faculty.length === 0 ? "No faculty found. Add your first faculty member!" : "No faculty match your filters."}
            </div>
          ) : (
            filteredFaculty.map((member) => (
              <Card key={member.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <p className="text-sm text-muted-foreground font-mono">{member.faculty_id}</p>
                    </div>
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{member.department}</Badge>
                    <Badge className={getDesignationColor(member.designation)}>{member.designation}</Badge>
                    <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{member.experience_years} years exp.</span>
                    </div>
                  </div>

                  {member.specialization && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Specialization:</span>
                      <p className="text-foreground">{member.specialization}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteFaculty(member.id)}
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
          <CardTitle>Faculty Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-primary">{filteredFaculty.length}</p>
              <p className="text-sm text-muted-foreground">Total Faculty</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-success">
                {filteredFaculty.filter(f => f.status === "Active").length}
              </p>
              <p className="text-sm text-muted-foreground">Active Faculty</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-warning">
                {new Set(filteredFaculty.map(f => f.department)).size}
              </p>
              <p className="text-sm text-muted-foreground">Departments</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-info">
                {Math.round(filteredFaculty.reduce((sum, f) => sum + f.experience_years, 0) / filteredFaculty.length) || 0}
              </p>
              <p className="text-sm text-muted-foreground">Avg Experience</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyView;