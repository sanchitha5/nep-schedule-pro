import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Plus, RefreshCw } from "lucide-react";

const TimetableView = () => {
  const timeSlots = [
    "9:00-10:00",
    "10:00-11:00", 
    "11:00-12:00",
    "12:00-1:00",
    "1:00-2:00",
    "2:00-3:00",
    "3:00-4:00",
    "4:00-5:00"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const sampleSchedule = {
    "Monday": {
      "9:00-10:00": { course: "Educational Psychology", faculty: "Dr. Smith", room: "101", program: "B.Ed." },
      "10:00-11:00": { course: "Curriculum Studies", faculty: "Prof. Johnson", room: "102", program: "M.Ed." },
      "2:00-3:00": { course: "Teaching Methods", faculty: "Dr. Brown", room: "Lab A", program: "ITEP" },
    },
    "Tuesday": {
      "9:00-10:00": { course: "Philosophy of Education", faculty: "Dr. Wilson", room: "103", program: "B.Ed." },
      "11:00-12:00": { course: "Research Methods", faculty: "Prof. Davis", room: "104", program: "M.Ed." },
      "3:00-4:00": { course: "Subject Pedagogy", faculty: "Dr. Taylor", room: "201", program: "FYUP" },
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Timetable Management</h2>
          <p className="text-muted-foreground">
            Generate and manage academic schedules
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Generate New
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Program" />
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
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
                <SelectItem value="3">Semester 3</SelectItem>
                <SelectItem value="4">Semester 4</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Faculty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Faculty</SelectItem>
                <SelectItem value="smith">Dr. Smith</SelectItem>
                <SelectItem value="johnson">Prof. Johnson</SelectItem>
                <SelectItem value="brown">Dr. Brown</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timetable Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-muted text-left min-w-24">Time</th>
                  {days.map(day => (
                    <th key={day} className="border p-2 bg-muted text-left min-w-48">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(time => (
                  <tr key={time}>
                    <td className="border p-2 font-medium bg-muted/50">{time}</td>
                    {days.map(day => {
                      const slot = sampleSchedule[day]?.[time];
                      return (
                        <td key={`${day}-${time}`} className="border p-2 h-20 align-top">
                          {slot ? (
                            <div className="space-y-1">
                              <div className="font-medium text-sm">{slot.course}</div>
                              <div className="text-xs text-muted-foreground">{slot.faculty}</div>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="text-xs">
                                  {slot.room}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {slot.program}
                                </Badge>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground">Free</div>
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
    </div>
  );
};

export default TimetableView;