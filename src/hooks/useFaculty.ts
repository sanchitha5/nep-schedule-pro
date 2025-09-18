import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Faculty {
  id: string;
  faculty_id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
  specialization?: string;
  qualification?: string;
  experience_years: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export const useFaculty = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFaculty();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('faculty-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'faculty' },
        (payload) => {
          setFaculty(prev => [...prev, payload.new as Faculty]);
          toast({
            title: "Faculty Added",
            description: `${payload.new.name} has been added successfully.`,
          });
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'faculty' },
        (payload) => {
          setFaculty(prev => prev.map(member => 
            member.id === payload.new.id ? payload.new as Faculty : member
          ));
          toast({
            title: "Faculty Updated",
            description: `${payload.new.name} has been updated.`,
          });
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'faculty' },
        (payload) => {
          setFaculty(prev => prev.filter(member => member.id !== payload.old.id));
          toast({
            title: "Faculty Deleted",
            description: `Faculty member has been removed.`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchFaculty = async () => {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFaculty(data || []);
    } catch (error) {
      console.error('Error fetching faculty:', error);
      toast({
        title: "Error",
        description: "Failed to load faculty. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addFaculty = async (facultyData: Omit<Faculty, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('faculty')
        .insert([facultyData]);

      if (error) throw error;
    } catch (error) {
      console.error('Error adding faculty:', error);
      toast({
        title: "Error",
        description: "Failed to add faculty. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateFaculty = async (id: string, updates: Partial<Faculty>) => {
    try {
      const { error } = await supabase
        .from('faculty')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating faculty:', error);
      toast({
        title: "Error",
        description: "Failed to update faculty. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteFaculty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('faculty')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting faculty:', error);
      toast({
        title: "Error",
        description: "Failed to delete faculty. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    faculty,
    loading,
    addFaculty,
    updateFaculty,
    deleteFaculty,
    refetch: fetchFaculty,
  };
};