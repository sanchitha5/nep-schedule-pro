import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Course {
  id: string;
  name: string;
  program: string;
  semester: number;
  credits: number;
  type: string;
  faculty: string;
  theory_hours: number;
  practical_hours: number;
  created_at?: string;
  updated_at?: string;
}

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('courses-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'courses' },
        (payload) => {
          setCourses(prev => [...prev, payload.new as Course]);
          toast({
            title: "Course Added",
            description: `${payload.new.name} has been added successfully.`,
          });
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'courses' },
        (payload) => {
          setCourses(prev => prev.map(course => 
            course.id === payload.new.id ? payload.new as Course : course
          ));
          toast({
            title: "Course Updated",
            description: `${payload.new.name} has been updated.`,
          });
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'courses' },
        (payload) => {
          setCourses(prev => prev.filter(course => course.id !== payload.old.id));
          toast({
            title: "Course Deleted",
            description: `Course has been removed.`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error",
        description: "Failed to load courses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (courseData: Omit<Course, 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('courses')
        .insert([courseData]);

      if (error) throw error;
    } catch (error) {
      console.error('Error adding course:', error);
      toast({
        title: "Error",
        description: "Failed to add course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateCourse = async (id: string, updates: Partial<Course>) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating course:', error);
      toast({
        title: "Error",
        description: "Failed to update course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: "Error",
        description: "Failed to delete course. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    courses,
    loading,
    addCourse,
    updateCourse,
    deleteCourse,
    refetch: fetchCourses,
  };
};