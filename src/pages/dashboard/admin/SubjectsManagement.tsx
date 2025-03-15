import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SearchBar from '@/components/dashboard/SearchBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Subject {
  id: string;
  name: string;
  description: string;
}

interface SubjectsListProps {
  subjects: Subject[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SubjectsList: React.FC<SubjectsListProps> = ({ subjects, onEdit, onDelete }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell className="font-medium">{subject.name}</TableCell>
              <TableCell>{subject.description}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => onEdit(subject.id)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    onClick={() => onDelete(subject.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const SubjectsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Mathematics', description: 'The study of numbers, quantity, space, and change.' },
    { id: '2', name: 'Science', description: 'The pursuit and application of knowledge and understanding of the natural and social world.' },
    { id: '3', name: 'History', description: 'The study of past events, particularly in human affairs.' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectDescription, setNewSubjectDescription] = useState('');
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [editedSubjectName, setEditedSubjectName] = useState('');
  const [editedSubjectDescription, setEditedSubjectDescription] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddSubject = () => {
    setIsAdding(true);
  };

  const handleSaveNewSubject = () => {
    if (newSubjectName.trim() === '') {
      toast.error('Subject name cannot be empty.');
      return;
    }

    const newSubject: Subject = {
      id: String(Date.now()),
      name: newSubjectName,
      description: newSubjectDescription,
    };

    setSubjects([...subjects, newSubject]);
    setIsAdding(false);
    setNewSubjectName('');
    setNewSubjectDescription('');
    toast.success('Subject added successfully.');
  };

  const handleCancelNewSubject = () => {
    setIsAdding(false);
    setNewSubjectName('');
    setNewSubjectDescription('');
  };

  const handleEditSubject = (id: string) => {
    const subjectToEdit = subjects.find((subject) => subject.id === id);
    if (subjectToEdit) {
      setEditingSubjectId(id);
      setEditedSubjectName(subjectToEdit.name);
      setEditedSubjectDescription(subjectToEdit.description);
    }
  };

  const handleUpdateSubject = () => {
    if (editedSubjectName.trim() === '') {
      toast.error('Subject name cannot be empty.');
      return;
    }

    const updatedSubjects = subjects.map((subject) =>
      subject.id === editingSubjectId
        ? { ...subject, name: editedSubjectName, description: editedSubjectDescription }
        : subject
    );

    setSubjects(updatedSubjects);
    setEditingSubjectId(null);
    setEditedSubjectName('');
    setEditedSubjectDescription('');
    toast.success('Subject updated successfully.');
  };

  const handleCancelEdit = () => {
    setEditingSubjectId(null);
    setEditedSubjectName('');
    setEditedSubjectDescription('');
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
    toast.success('Subject deleted successfully.');
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="admin" pageTitle="Subjects Management">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Subjects Management</h1>
          <SearchBar onSearch={handleSearch} placeholder="Search subjects..." />
        </div>

        <div className="mb-4">
          <Button onClick={handleAddSubject} className="bg-green-500 hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            Add New Subject
          </Button>
        </div>

        {isAdding && (
          <div className="mb-4 p-4 border rounded-md">
            <h3 className="text-lg font-semibold mb-2">Add New Subject</h3>
            <div className="mb-2">
              <label htmlFor="newSubjectName" className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                type="text"
                id="newSubjectName"
                className="mt-1 block w-full"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="newSubjectDescription" className="block text-sm font-medium text-gray-700">Description</label>
              <Input
                type="text"
                id="newSubjectDescription"
                className="mt-1 block w-full"
                value={newSubjectDescription}
                onChange={(e) => setNewSubjectDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelNewSubject}>Cancel</Button>
              <Button onClick={handleSaveNewSubject}>Save</Button>
            </div>
          </div>
        )}

        {editingSubjectId && (
          <div className="mb-4 p-4 border rounded-md">
            <h3 className="text-lg font-semibold mb-2">Edit Subject</h3>
            <div className="mb-2">
              <label htmlFor="editedSubjectName" className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                type="text"
                id="editedSubjectName"
                className="mt-1 block w-full"
                value={editedSubjectName}
                onChange={(e) => setEditedSubjectName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="editedSubjectDescription" className="block text-sm font-medium text-gray-700">Description</label>
              <Input
                type="text"
                id="editedSubjectDescription"
                className="mt-1 block w-full"
                value={editedSubjectDescription}
                onChange={(e) => setEditedSubjectDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleUpdateSubject}>Update</Button>
            </div>
          </div>
        )}

        <SubjectsList
          subjects={filteredSubjects}
          onEdit={handleEditSubject}
          onDelete={handleDeleteSubject}
        />
      </div>
    </DashboardLayout>
  );
};

export default SubjectsManagement;
