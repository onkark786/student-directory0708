import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Users } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Student } from "./StudentForm";

interface StudentTableProps {
  students: Student[];
  onDelete: (id: string) => void;
}

const StudentTable = ({ students, onDelete }: StudentTableProps) => {
  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Users className="h-12 w-12 mb-3 opacity-40" />
        <p className="text-lg font-medium">No students yet</p>
        <p className="text-sm">Add a student using the form above.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card shadow-lg overflow-hidden">
      <ScrollArea className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Parent Phone</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono text-xs">{s.studentId}</TableCell>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.phone}</TableCell>
                <TableCell>{s.dateOfBirth}</TableCell>
                <TableCell>{s.gender}</TableCell>
                <TableCell>{s.course}</TableCell>
                <TableCell>{s.parentName}</TableCell>
                <TableCell>{s.parentPhone}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(s.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default StudentTable;
