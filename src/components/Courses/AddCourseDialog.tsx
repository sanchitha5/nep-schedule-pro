import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Course } from "@/hooks/useCourses";

interface AddCourseDialogProps {
  onAddCourse: (course: Omit<Course, 'created_at' | 'updated_at'>) => void;
}

export const AddCourseDialog = ({ onAddCourse }: AddCourseDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    program: "",
    semester: 1,
    credits: 1,
    type: "",
    faculty: "",
    theory_hours: 0,
    practical_hours: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.program || !formData.type || !formData.faculty) {
      return;
    }
    
    onAddCourse(formData);
    setFormData({
      id: "",
      name: "",
      program: "",
      semester: 1,
      credits: 1,
      type: "",
      faculty: "",
      theory_hours: 0,
      practical_hours: 0,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="courseId">Course ID</Label>
            <Input
              id="courseId"
              value={formData.id}
              onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
              placeholder="e.g., EDU101"
              required
            />
          </div>

          <div>
            <Label htmlFor="courseName">Course Name</Label>
            <Input
              id="courseName"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Educational Psychology"
              required
            />
          </div>

          <div>
            <Label htmlFor="program">Program</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, program: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B.Ed.">B.Ed.</SelectItem>
                <SelectItem value="M.Ed.">M.Ed.</SelectItem>
                <SelectItem value="FYUP">FYUP</SelectItem>
                <SelectItem value="ITEP">ITEP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="semester">Semester</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, semester: parseInt(value) }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                min="1"
                max="10"
                value={formData.credits}
                onChange={(e) => setFormData(prev => ({ ...prev, credits: parseInt(e.target.value) || 1 }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="type">Course Type</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Major">Major</SelectItem>
                <SelectItem value="Minor">Minor</SelectItem>
                <SelectItem value="Core">Core</SelectItem>
                <SelectItem value="Practical">Practical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="faculty">Faculty</Label>
            <Input
              id="faculty"
              value={formData.faculty}
              onChange={(e) => setFormData(prev => ({ ...prev, faculty: e.target.value }))}
              placeholder="e.g., Dr. Smith"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="theoryHours">Theory Hours</Label>
              <Input
                id="theoryHours"
                type="number"
                min="0"
                max="10"
                value={formData.theory_hours}
                onChange={(e) => setFormData(prev => ({ ...prev, theory_hours: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div>
              <Label htmlFor="practicalHours">Practical Hours</Label>
              <Input
                id="practicalHours"
                type="number"
                min="0"
                max="10"
                value={formData.practical_hours}
                onChange={(e) => setFormData(prev => ({ ...prev, practical_hours: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">Add Course</Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};