-- Create courses table
CREATE TABLE public.courses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  program TEXT NOT NULL,
  semester INTEGER NOT NULL,
  credits INTEGER NOT NULL,
  type TEXT NOT NULL,
  faculty TEXT NOT NULL,
  theory_hours INTEGER NOT NULL DEFAULT 0,
  practical_hours INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is an academic management system)
CREATE POLICY "Courses are viewable by everyone" 
ON public.courses 
FOR SELECT 
USING (true);

CREATE POLICY "Courses can be created by everyone" 
ON public.courses 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Courses can be updated by everyone" 
ON public.courses 
FOR UPDATE 
USING (true);

CREATE POLICY "Courses can be deleted by everyone" 
ON public.courses 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable real-time updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.courses;