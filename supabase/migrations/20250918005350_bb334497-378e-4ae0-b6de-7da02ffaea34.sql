-- Create students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  program TEXT NOT NULL,
  semester INTEGER NOT NULL,
  batch TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create faculty table
CREATE TABLE public.faculty (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  department TEXT NOT NULL,
  designation TEXT NOT NULL,
  specialization TEXT,
  qualification TEXT,
  experience_years INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rooms table
CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  floor TEXT,
  building TEXT,
  facilities TEXT[],
  status TEXT NOT NULL DEFAULT 'Available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (academic management system)
CREATE POLICY "Students are viewable by everyone" ON public.students FOR SELECT USING (true);
CREATE POLICY "Students can be created by everyone" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Students can be updated by everyone" ON public.students FOR UPDATE USING (true);
CREATE POLICY "Students can be deleted by everyone" ON public.students FOR DELETE USING (true);

CREATE POLICY "Faculty are viewable by everyone" ON public.faculty FOR SELECT USING (true);
CREATE POLICY "Faculty can be created by everyone" ON public.faculty FOR INSERT WITH CHECK (true);
CREATE POLICY "Faculty can be updated by everyone" ON public.faculty FOR UPDATE USING (true);
CREATE POLICY "Faculty can be deleted by everyone" ON public.faculty FOR DELETE USING (true);

CREATE POLICY "Rooms are viewable by everyone" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Rooms can be created by everyone" ON public.rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Rooms can be updated by everyone" ON public.rooms FOR UPDATE USING (true);
CREATE POLICY "Rooms can be deleted by everyone" ON public.rooms FOR DELETE USING (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faculty_updated_at
BEFORE UPDATE ON public.faculty
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at
BEFORE UPDATE ON public.rooms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable real-time updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.students;
ALTER PUBLICATION supabase_realtime ADD TABLE public.faculty;
ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;