import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Room {
  id: string;
  room_number: string;
  name: string;
  type: string;
  capacity: number;
  floor?: string;
  building?: string;
  facilities: string[];
  status: string;
  created_at?: string;
  updated_at?: string;
}

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRooms();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('rooms-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'rooms' },
        (payload) => {
          setRooms(prev => [...prev, payload.new as Room]);
          toast({
            title: "Room Added",
            description: `${payload.new.name} has been added successfully.`,
          });
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'rooms' },
        (payload) => {
          setRooms(prev => prev.map(room => 
            room.id === payload.new.id ? payload.new as Room : room
          ));
          toast({
            title: "Room Updated",
            description: `${payload.new.name} has been updated.`,
          });
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'rooms' },
        (payload) => {
          setRooms(prev => prev.filter(room => room.id !== payload.old.id));
          toast({
            title: "Room Deleted",
            description: `Room has been removed.`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast({
        title: "Error",
        description: "Failed to load rooms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addRoom = async (roomData: Omit<Room, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .insert([roomData]);

      if (error) throw error;
    } catch (error) {
      console.error('Error adding room:', error);
      toast({
        title: "Error",
        description: "Failed to add room. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateRoom = async (id: string, updates: Partial<Room>) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating room:', error);
      toast({
        title: "Error",
        description: "Failed to update room. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteRoom = async (id: string) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting room:', error);
      toast({
        title: "Error",
        description: "Failed to delete room. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    rooms,
    loading,
    addRoom,
    updateRoom,
    deleteRoom,
    refetch: fetchRooms,
  };
};