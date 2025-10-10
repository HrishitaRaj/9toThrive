import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Download } from "lucide-react";
import { toast } from "sonner";

interface Student {
  name: string;
  email: string;
  reg_no: string;
  branch: string;
  skills: string[];
}

interface BulkUploadDialogProps {
  onStudentsUploaded: (students: any[]) => void;
}

export function BulkUploadDialog({ onStudentsUploaded }: BulkUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["text/csv", "application/vnd.ms-excel"];
      if (!validTypes.includes(file.type) && !file.name.endsWith('.csv')) {
        toast.error("Please upload a CSV file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const parseCSV = (text: string): Student[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const student: any = {};
      
      headers.forEach((header, index) => {
        if (header === 'skills') {
          student[header] = values[index].split(/[;|]/).map(s => s.trim()).filter(Boolean);
        } else {
          student[header] = values[index];
        }
      });
      
      return student as Student;
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const text = await selectedFile.text();
      const students = parseCSV(text);

      clearInterval(interval);
      setProgress(100);

      onStudentsUploaded(students);

      toast.success(`Successfully uploaded ${students.length} students!`);
      setOpen(false);
      setSelectedFile(null);
      setProgress(0);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Failed to parse file. Please check the format.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Bulk Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk Upload Students</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href="/sample-students.csv" download>
                <Download className="w-4 h-4 mr-2" />
                Download Sample CSV
              </a>
            </Button>
          </div>
          
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              CSV files only (Max 10MB)
            </p>
          </div>

          {selectedFile && (
            <div className="text-sm text-mint-cream">
              Selected: {selectedFile.name}
            </div>
          )}

          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-sm text-center text-muted-foreground">
                Uploading: {progress}%
              </p>
            </div>
          )}

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">CSV Format:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Headers: name,email,reg_no,branch,skills</li>
              <li>• Skills: Use quotes and separate with commas</li>
              <li>• Example: "React,Python,Java"</li>
              <li>• Download sample file for reference</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
