import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const studentSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be under 255 characters"),
  phone: z.string().trim().regex(phoneRegex, "Invalid phone number (e.g. +1234567890)"),
  parentName: z.string().trim().min(1, "Parent name is required").max(100, "Name must be under 100 characters"),
  parentPhone: z.string().trim().regex(phoneRegex, "Invalid phone number (e.g. +1234567890)"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
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
    defaultValues: { name: "", email: "", phone: "", parentName: "", parentPhone: "" },
  });

  const onSubmit = (values: StudentFormValues) => {
    onAdd({
      id: crypto.randomUUID(),
      name: values.name as string,
      email: values.email as string,
      phone: values.phone as string,
      parentName: values.parentName as string,
      parentPhone: values.parentPhone as string,
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
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
                <FormControl><Input type="tel" placeholder="+1234567890" maxLength={16} {...field} /></FormControl>
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
            <div className="sm:col-span-2 sm:w-1/2">
              <FormField control={form.control} name="parentPhone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Phone</FormLabel>
                  <FormControl><Input type="tel" placeholder="+1234567890" maxLength={16} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="sm:col-span-2 pt-2">
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
