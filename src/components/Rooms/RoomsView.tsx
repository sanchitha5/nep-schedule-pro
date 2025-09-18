import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Search, Edit, Trash2, Users, MapPin, Loader2 } from "lucide-react";
import { useRooms } from "@/hooks/useRooms";
import { AddRoomDialog } from "./AddRoomDialog";
import { useState } from "react";

const RoomsView = () => {
  const { rooms, loading, addRoom, deleteRoom } = useRooms();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.building?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || room.type === typeFilter;
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (confirm("Are you sure you want to delete this room?")) {
      await deleteRoom(roomId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-success text-success-foreground";
      case "Occupied": return "bg-warning text-warning-foreground";
      case "Maintenance": return "bg-destructive text-destructive-foreground";
      case "Reserved": return "bg-primary text-primary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Classroom": return "bg-primary text-primary-foreground";
      case "Laboratory": return "bg-accent text-accent-foreground";
      case "Lecture Hall": return "bg-success text-success-foreground";
      case "Seminar Room": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Room Management</h2>
          <p className="text-muted-foreground">
            Manage room allocation and facilities
          </p>
        </div>
        <AddRoomDialog onAddRoom={addRoom} />
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search rooms..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Classroom">Classroom</SelectItem>
                <SelectItem value="Laboratory">Laboratory</SelectItem>
                <SelectItem value="Lecture Hall">Lecture Hall</SelectItem>
                <SelectItem value="Seminar Room">Seminar Room</SelectItem>
                <SelectItem value="Conference Room">Conference Room</SelectItem>
                <SelectItem value="Library">Library</SelectItem>
                <SelectItem value="Office">Office</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading rooms...</span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              {rooms.length === 0 ? "No rooms found. Add your first room!" : "No rooms match your filters."}
            </div>
          ) : (
            filteredRooms.map((room) => (
              <Card key={room.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <p className="text-sm text-muted-foreground font-mono">Room {room.room_number}</p>
                    </div>
                    <Building className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getTypeColor(room.type)}>{room.type}</Badge>
                    <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                    <Badge variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      {room.capacity}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {room.building && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{room.building}{room.floor && `, ${room.floor}`}</span>
                      </div>
                    )}
                  </div>

                  {room.facilities && room.facilities.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Facilities:</span>
                      <div className="flex flex-wrap gap-1">
                        {room.facilities.slice(0, 3).map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {room.facilities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{room.facilities.length - 3} more
                          </Badge>
                        )}
                      </div>
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
                      onClick={() => handleDeleteRoom(room.id)}
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
          <CardTitle>Room Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-primary">{filteredRooms.length}</p>
              <p className="text-sm text-muted-foreground">Total Rooms</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-success">
                {filteredRooms.filter(r => r.status === "Available").length}
              </p>
              <p className="text-sm text-muted-foreground">Available Rooms</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-warning">
                {filteredRooms.reduce((sum, room) => sum + room.capacity, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Capacity</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-info">
                {new Set(filteredRooms.map(r => r.type)).size}
              </p>
              <p className="text-sm text-muted-foreground">Room Types</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomsView;