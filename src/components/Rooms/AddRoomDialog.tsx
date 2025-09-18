import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { Room } from "@/hooks/useRooms";

interface AddRoomDialogProps {
  onAddRoom: (room: Omit<Room, 'id' | 'created_at' | 'updated_at'>) => void;
}

const FACILITY_OPTIONS = [
  "Projector", "Air Conditioning", "Whiteboard", "Smart Board", 
  "Audio System", "Microphone", "WiFi", "Computer Lab", "Laboratory Equipment"
];

export const AddRoomDialog = ({ onAddRoom }: AddRoomDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    room_number: "",
    name: "",
    type: "",
    capacity: 1,
    floor: "",
    building: "",
    facilities: [] as string[],
    status: "Available",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.room_number || !formData.name || !formData.type) {
      return;
    }
    
    onAddRoom(formData);
    setFormData({
      room_number: "",
      name: "",
      type: "",
      capacity: 1,
      floor: "",
      building: "",
      facilities: [],
      status: "Available",
    });
    setOpen(false);
  };

  const handleFacilityChange = (facility: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, facilities: [...prev.facilities, facility] }));
    } else {
      setFormData(prev => ({ ...prev, facilities: prev.facilities.filter(f => f !== facility) }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                value={formData.room_number}
                onChange={(e) => setFormData(prev => ({ ...prev, room_number: e.target.value }))}
                placeholder="e.g., 101"
                required
              />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 1 }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="name">Room Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Main Lecture Hall"
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Room Type</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Classroom">Classroom</SelectItem>
                <SelectItem value="Laboratory">Laboratory</SelectItem>
                <SelectItem value="Lecture Hall">Lecture Hall</SelectItem>
                <SelectItem value="Seminar Room">Seminar Room</SelectItem>
                <SelectItem value="Conference Room">Conference Room</SelectItem>
                <SelectItem value="Library">Library</SelectItem>
                <SelectItem value="Office">Office</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                value={formData.floor}
                onChange={(e) => setFormData(prev => ({ ...prev, floor: e.target.value }))}
                placeholder="e.g., Ground Floor"
              />
            </div>
            <div>
              <Label htmlFor="building">Building</Label>
              <Input
                id="building"
                value={formData.building}
                onChange={(e) => setFormData(prev => ({ ...prev, building: e.target.value }))}
                placeholder="e.g., Main Block"
              />
            </div>
          </div>

          <div>
            <Label>Facilities</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {FACILITY_OPTIONS.map((facility) => (
                <div key={facility} className="flex items-center space-x-2">
                  <Checkbox
                    id={facility}
                    checked={formData.facilities.includes(facility)}
                    onCheckedChange={(checked) => handleFacilityChange(facility, checked as boolean)}
                  />
                  <Label htmlFor={facility} className="text-sm">{facility}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">Add Room</Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};