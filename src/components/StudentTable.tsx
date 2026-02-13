import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Users } from "lucide-react";
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
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Student Name</TableHead>
            <TableHead>Email ID</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Parent Name</TableHead>
            <TableHead>Parent Phone</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="font-medium">{s.name}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{s.phone}</TableCell>
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
    </div>
  );
};

export default StudentTable;
