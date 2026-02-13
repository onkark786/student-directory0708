import { useState } from "react";
import StudentForm, { type Student } from "@/components/StudentForm";
import StudentTable from "@/components/StudentTable";
import { GraduationCap } from "lucide-react";

const Index = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const handleAdd = (student: Student) => {
    setStudents((prev) => [student, ...prev]);
  };

  const handleDelete = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center gap-3 py-4">
          <GraduationCap className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Student Directory</h1>
          <span className="ml-auto text-sm text-muted-foreground">{students.length} student{students.length !== 1 ? "s" : ""}</span>
        </div>
      </header>
      <main className="container py-8 space-y-8">
        <StudentForm onAdd={handleAdd} />
        <StudentTable students={students} onDelete={handleDelete} />
      </main>
    </div>
  );
};

export default Index;
