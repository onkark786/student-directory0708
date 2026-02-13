import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    parentName: "",
    parentPhone: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.parentName || !form.parentPhone) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    onAdd({ ...form, id: crypto.randomUUID() });
    setForm({ name: "", email: "", phone: "", parentName: "", parentPhone: "" });
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
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Student Name</Label>
            <Input id="name" placeholder="John Doe" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email ID</Label>
            <Input id="email" type="email" placeholder="john@school.edu" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Student Phone</Label>
            <Input id="phone" type="tel" placeholder="+1 234 567 890" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parentName">Parent Name</Label>
            <Input id="parentName" placeholder="Jane Doe" value={form.parentName} onChange={(e) => handleChange("parentName", e.target.value)} />
          </div>
          <div className="space-y-2 sm:col-span-2 sm:w-1/2">
            <Label htmlFor="parentPhone">Parent Phone</Label>
            <Input id="parentPhone" type="tel" placeholder="+1 234 567 891" value={form.parentPhone} onChange={(e) => handleChange("parentPhone", e.target.value)} />
          </div>
          <div className="sm:col-span-2 pt-2">
            <Button type="submit" className="w-full sm:w-auto">
              <UserPlus className="mr-2 h-4 w-4" /> Add Student
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
