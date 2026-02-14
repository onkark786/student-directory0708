import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const phoneRegex = /^\d{10}$/;
const studentIdRegex = /^[A-Z0-9]{4,12}$/;

const COURSES = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Business Administration",
  "Economics",
] as const;

const GENDERS = ["Male", "Female", "Other"] as const;

const studentSchema = z.object({
  studentId: z.string().trim().regex(studentIdRegex, "Student ID must be 4–12 uppercase letters/digits (e.g. CS2024001)"),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters").regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address (e.g. john@school.edu)").max(255, "Email must be under 255 characters"),
  phone: z.string().trim().regex(phoneRegex, "Phone must be exactly 10 digits (e.g. 9876543210)"),
  dateOfBirth: z.string().refine((val) => {
    if (!val) return false;
    const dob = new Date(val);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();
    return age >= 16 && age <= 30;
  }, "Student must be between 16 and 30 years old"),
  gender: z.enum(GENDERS, { required_error: "Please select a gender" }),
  course: z.enum(COURSES, { required_error: "Please select a course" }),
  address: z.string().trim().min(10, "Address must be at least 10 characters").max(300, "Address must be under 300 characters"),
  parentName: z.string().trim().min(2, "Parent name must be at least 2 characters").max(100, "Name must be under 100 characters").regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  parentPhone: z.string().trim().regex(phoneRegex, "Phone must be exactly 10 digits (e.g. 9876543210)"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  course: string;
  address: string;
  parentName: string;
  parentPhone: string;
}

interface StudentFormProps {
  onAdd: (student: Student) => void;
}

const StudentForm = ({ onAdd }: StudentFormProps) => {
  const { toast } = useToast();
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      studentId: "", name: "", email: "", phone: "",
      dateOfBirth: "", gender: undefined, course: undefined,
      address: "", parentName: "", parentPhone: "",
    },
  });

  const onSubmit = (values: StudentFormValues) => {
    onAdd({
      id: crypto.randomUUID(),
      studentId: values.studentId,
      name: values.name,
      email: values.email,
      phone: values.phone,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      course: values.course,
      address: values.address,
      parentName: values.parentName,
      parentPhone: values.parentPhone,
    });
    form.reset();
    toast({ title: "Student added successfully!" });
  };

  return (
    <Card className="shadow-lg border-0 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <UserPlus className="h-5 w-5 text-primary" />
          Add New Student
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField control={form.control} name="studentId" render={({ field }) => (
              <FormItem>
                <FormLabel>Student ID</FormLabel>
                <FormControl>
                  <Input placeholder="CS2024001" maxLength={12} {...field}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl><Input placeholder="John Doe" maxLength={100} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email ID</FormLabel>
                <FormControl><Input type="email" placeholder="john@school.edu" maxLength={255} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>Student Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="9876543210" maxLength={10} {...field}
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="gender" render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GENDERS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="course" render={({ field }) => (
              <FormItem>
                <FormLabel>Course / Department</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COURSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="parentName" render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Name</FormLabel>
                <FormControl><Input placeholder="Jane Doe" maxLength={100} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="parentPhone" render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="9876543210" maxLength={10} {...field}
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="sm:col-span-2 lg:col-span-3">
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl><Textarea placeholder="Full residential address" maxLength={300} rows={2} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="sm:col-span-2 lg:col-span-3 pt-2">
              <Button type="submit" className="w-full sm:w-auto">
                <UserPlus className="mr-2 h-4 w-4" /> Add Student
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
