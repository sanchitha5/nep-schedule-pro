import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Student {
  id: string;
  student_id: string;
  name: string;
  email: string;
  phone?: string;
  program: string;
  semester: number;
  batch: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStudents();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('students-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'students' },
        (payload) => {
          setStudents(prev => [...prev, payload.new as Student]);
          toast({
            title: "Student Added",
            description: `${payload.new.name} has been added successfully.`,
          });
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'students' },
        (payload) => {
          setStudents(prev => prev.map(student => 
            student.id === payload.new.id ? payload.new as Student : student
          ));
          toast({
            title: "Student Updated",
            description: `${payload.new.name} has been updated.`,
          });
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'students' },
        (payload) => {
          setStudents(prev => prev.filter(student => student.id !== payload.old.id));
          toast({
            title: "Student Deleted",
            description: `Student has been removed.`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Error",
        description: "Failed to load students. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('students')
        .insert([studentData]);

      if (error) throw error;
    } catch (error) {
      console.error('Error adding student:', error);
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const { error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating student:', error);
      toast({
        title: "Error",
        description: "Failed to update student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "Error",
        description: "Failed to delete student. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    refetch: fetchStudents,
  };
};