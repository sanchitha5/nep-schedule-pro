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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, MapPin, Users, Monitor, Wifi } from "lucide-react";

interface Room {
  id: string;
  name: string;
  type: "classroom" | "lab" | "seminar" | "auditorium" | "library";
  building: string;
  floor: number;
  capacity: number;
  facilities: string[];
  status: "available" | "occupied" | "maintenance";
  subjects: string[];
  equipment: string[];
  accessibility: boolean;
}

const RoomsView = () => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "Room 101",
      type: "classroom",
      building: "Main Block",
      floor: 1,
      capacity: 60,
      facilities: ["Projector", "Whiteboard", "AC", "Wi-Fi"],
      status: "available",
      subjects: ["Educational Psychology", "General Teaching"],
      equipment: ["Digital Projector", "Sound System", "Marker Board"],
      accessibility: true
    },
    {
      id: "2",
      name: "Science Lab A",
      type: "lab",
      building: "Science Block",
      floor: 2,
      capacity: 30,
      facilities: ["Lab Equipment", "Safety Features", "Ventilation", "Wi-Fi"],
      status: "available",
      subjects: ["Chemistry Practicals", "Physics Experiments", "Biology Lab"],
      equipment: ["Microscopes", "Chemical Apparatus", "Safety Equipment", "Lab Benches"],
      accessibility: true
    },
    {
      id: "3",
      name: "Computer Lab 1",
      type: "lab",
      building: "IT Block",
      floor: 1,
      capacity: 40,
      facilities: ["Computers", "Internet", "AC", "Projector"],
      status: "occupied",
      subjects: ["Computer Education", "Digital Literacy", "ICT in Teaching"],
      equipment: ["40 Desktop Computers", "Interactive Board", "Printer", "Scanner"],
      accessibility: true
    },
    {
      id: "4",
      name: "Seminar Hall",
      type: "seminar",
      building: "Main Block",
      floor: 2,
      capacity: 100,
      facilities: ["Audio System", "Projector", "Stage", "AC"],
      status: "available",
      subjects: ["Seminars", "Guest Lectures", "Presentations"],
      equipment: ["Wireless Mic", "Podium", "Large Screen", "Recording Equipment"],
      accessibility: true
    },
    {
      id: "5",
      name: "Main Auditorium",
      type: "auditorium",
      building: "Auditorium Block",
      floor: 1,
      capacity: 300,
      facilities: ["Professional Audio", "Lighting", "Stage", "AC"],
      status: "maintenance",
      subjects: ["Annual Functions", "Major Events", "Conferences"],
      equipment: ["Stage Lighting", "Sound System", "Backstage Area", "Recording Studio"],
      accessibility: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedBuilding, setSelectedBuilding] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const roomTypes = ["classroom", "lab", "seminar", "auditorium", "library"];
  const buildings = ["Main Block", "Science Block", "IT Block", "Auditorium Block", "Library Block"];

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.facilities.some(facility => facility.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         room.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || room.type === selectedType;
    const matchesBuilding = selectedBuilding === "all" || room.building === selectedBuilding;
    return matchesSearch && matchesType && matchesBuilding;
  });

  const getRoomsByType = (type: string) => rooms.filter(room => room.type === type);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "occupied": return "bg-yellow-500";
      case "maintenance": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleAddRoom = () => {
    // Add room logic will be implemented
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rooms & Labs Management</h1>
        <p className="text-muted-foreground">Manage classrooms, laboratories, and other academic spaces</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rooms.length}</div>
            <p className="text-xs text-muted-foreground">Across all buildings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classrooms</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getRoomsByType("classroom").length}</div>
            <p className="text-xs text-muted-foreground">Regular classrooms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laboratories</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getRoomsByType("lab").length}</div>
            <p className="text-xs text-muted-foreground">Specialized labs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.reduce((sum, room) => sum + room.capacity, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Students capacity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <div className={`h-2 w-2 rounded-full ${getStatusColor("available")}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.filter(room => room.status === "available").length}
            </div>
            <p className="text-xs text-muted-foreground">Ready for use</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
          <TabsTrigger value="labs">Labs</TabsTrigger>
          <TabsTrigger value="special">Special Rooms</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Controls */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <Input
                placeholder="Search rooms by name, facilities, or subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {roomTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Building" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Buildings</SelectItem>
                  {buildings.map((building) => (
                    <SelectItem key={building} value={building}>
                      {building}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Room
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Room/Lab</DialogTitle>
                  <DialogDescription>
                    Add a new room or laboratory to the system with facilities and equipment details.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomName">Room Name/Number</Label>
                      <Input id="roomName" placeholder="Room 101" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roomType">Room Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="building">Building</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select building" />
                        </SelectTrigger>
                        <SelectContent>
                          {buildings.map((building) => (
                            <SelectItem key={building} value={building}>
                              {building}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="floor">Floor</Label>
                      <Input id="floor" type="number" placeholder="1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input id="capacity" type="number" placeholder="60" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facilities">Facilities</Label>
                    <Textarea id="facilities" placeholder="Projector, Whiteboard, AC, Wi-Fi" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="equipment">Equipment Details</Label>
                    <Textarea id="equipment" placeholder="Digital Projector, Sound System, Marker Board" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subjects">Suitable for Subjects</Label>
                    <Textarea id="subjects" placeholder="Educational Psychology, General Teaching" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRoom}>Add Room</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Rooms Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Rooms & Labs ({filteredRooms.length})</CardTitle>
              <CardDescription>
                Complete inventory of academic spaces with their facilities and current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room Details</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Capacity & Type</TableHead>
                    <TableHead>Facilities</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{room.name}</div>
                          <Badge variant="outline" className="capitalize">
                            {room.type}
                          </Badge>
                          {room.accessibility && (
                            <Badge variant="secondary">Accessible</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-3 w-3" />
                            {room.building}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Floor {room.floor}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Users className="h-3 w-3" />
                            {room.capacity} students
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {room.type}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {room.facilities.slice(0, 3).map((facility, index) => (
                            <Badge key={index} variant="secondary" className="mr-1 mb-1 text-xs">
                              {facility}
                            </Badge>
                          ))}
                          {room.facilities.length > 3 && (
                            <div className="text-sm text-muted-foreground">
                              +{room.facilities.length - 3} more
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(room.status)}`} />
                          <span className="text-sm capitalize">{room.status}</span>
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
        </TabsContent>

        <TabsContent value="classrooms">
          <Card>
            <CardHeader>
              <CardTitle>Classrooms ({getRoomsByType("classroom").length})</CardTitle>
              <CardDescription>Regular teaching classrooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getRoomsByType("classroom").map((room) => (
                  <Card key={room.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(room.status)}`} />
                      </div>
                      <CardDescription>{room.building} - Floor {room.floor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Capacity:</span>
                          <span className="font-medium">{room.capacity} students</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {room.facilities.map((facility, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs">
          <Card>
            <CardHeader>
              <CardTitle>Laboratories ({getRoomsByType("lab").length})</CardTitle>
              <CardDescription>Specialized laboratory spaces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {getRoomsByType("lab").map((room) => (
                  <Card key={room.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(room.status)}`} />
                      </div>
                      <CardDescription>{room.building} - Floor {room.floor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Capacity:</span>
                          <span className="font-medium">{room.capacity} students</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-1">Equipment:</div>
                          <div className="flex flex-wrap gap-1">
                            {room.equipment.slice(0, 3).map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                            {room.equipment.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{room.equipment.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-1">Subjects:</div>
                          <div className="text-sm text-muted-foreground">
                            {room.subjects.join(", ")}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="special">
          <Card>
            <CardHeader>
              <CardTitle>Special Rooms</CardTitle>
              <CardDescription>Auditoriums, seminar halls, and other special purpose rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {rooms.filter(room => ["seminar", "auditorium", "library"].includes(room.type)).map((room) => (
                  <Card key={room.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{room.name}</CardTitle>
                          <CardDescription>{room.building} - Floor {room.floor}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">{room.type}</Badge>
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(room.status)}`} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="text-sm font-medium mb-2">Details:</div>
                          <div className="space-y-1 text-sm">
                            <div>Capacity: {room.capacity} people</div>
                            <div>Status: <span className="capitalize">{room.status}</span></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Equipment & Facilities:</div>
                          <div className="flex flex-wrap gap-1">
                            {room.equipment.map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoomsView;