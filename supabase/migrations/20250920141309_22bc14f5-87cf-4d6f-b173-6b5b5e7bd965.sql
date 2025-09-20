-- Drop existing overly permissive RLS policies
DROP POLICY IF EXISTS "Students are viewable by everyone" ON public.students;
DROP POLICY IF EXISTS "Students can be created by everyone" ON public.students;
DROP POLICY IF EXISTS "Students can be updated by everyone" ON public.students;
DROP POLICY IF EXISTS "Students can be deleted by everyone" ON public.students;

DROP POLICY IF EXISTS "Faculty are viewable by everyone" ON public.faculty;
DROP POLICY IF EXISTS "Faculty can be created by everyone" ON public.faculty;
DROP POLICY IF EXISTS "Faculty can be updated by everyone" ON public.faculty;
DROP POLICY IF EXISTS "Faculty can be deleted by everyone" ON public.faculty;

DROP POLICY IF EXISTS "Rooms are viewable by everyone" ON public.rooms;
DROP POLICY IF EXISTS "Rooms can be created by everyone" ON public.rooms;
DROP POLICY IF EXISTS "Rooms can be updated by everyone" ON public.rooms;
DROP POLICY IF EXISTS "Rooms can be deleted by everyone" ON public.rooms;

DROP POLICY IF EXISTS "Courses are viewable by everyone" ON public.courses;
DROP POLICY IF EXISTS "Courses can be created by everyone" ON public.courses;
DROP POLICY IF EXISTS "Courses can be updated by everyone" ON public.courses;
DROP POLICY IF EXISTS "Courses can be deleted by everyone" ON public.courses;

-- Create secure RLS policies that require authentication
-- Students table policies
CREATE POLICY "Authenticated users can view students"
ON public.students FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create students"
ON public.students FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update students"
ON public.students FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete students"
ON public.students FOR DELETE
TO authenticated
USING (true);

-- Faculty table policies
CREATE POLICY "Authenticated users can view faculty"
ON public.faculty FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create faculty"
ON public.faculty FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update faculty"
ON public.faculty FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete faculty"
ON public.faculty FOR DELETE
TO authenticated
USING (true);

-- Rooms table policies (less sensitive, can be viewable by public)
CREATE POLICY "Rooms are viewable by everyone"
ON public.rooms FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create rooms"
ON public.rooms FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update rooms"
ON public.rooms FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete rooms"
ON public.rooms FOR DELETE
TO authenticated
USING (true);

-- Courses table policies (less sensitive, can be viewable by public)
CREATE POLICY "Courses are viewable by everyone"
ON public.courses FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create courses"
ON public.courses FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update courses"
ON public.courses FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete courses"
ON public.courses FOR DELETE
TO authenticated
USING (true);