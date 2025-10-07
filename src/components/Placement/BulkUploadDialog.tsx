import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { parsePDF } from "@/utils/pdfParser";

interface Student {
  id: string;
  name: string;
  branch: string;
  skills: string[];
  verificationStatus: "verified" | "unverified" | "pending";
  email?: string;
  rollNo?: string;
}

interface BulkUploadDialogProps {
  onStudentsUploaded: (students: Student[]) => void;
}

export function BulkUploadDialog({ onStudentsUploaded }: BulkUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // Parse PDF
      const parsedData = await parsePDF(selectedFile);
      
      clearInterval(progressInterval);
      setProgress(100);

      if (parsedData.length === 0) {
        toast.error('No student data found in the PDF');
        setUploading(false);
        return;
      }

      // Convert to Student format
      const newStudents: Student[] = parsedData.map((data, index) => ({
        id: `upload-${Date.now()}-${index}`,
        name: data.name,
        branch: data.branch,
        skills: data.skills || [],
        verificationStatus: 'pending' as const,
        email: data.email,
        rollNo: data.rollNo,
      }));

      // Call parent callback
      onStudentsUploaded(newStudents);

      toast.success(`Successfully uploaded ${newStudents.length} student(s)!`);
      
      // Reset and close
      setTimeout(() => {
        setOpen(false);
        setSelectedFile(null);
        setProgress(0);
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 1000);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to parse PDF. Please check the file format.');
      setUploading(false);
      setProgress(0);
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
          <DialogTitle className="text-foreground">Bulk Upload Students</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Upload a PDF file containing student details (Name, Email, Branch, Roll No, Skills)
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* File Input */}
          <div className="flex flex-col gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col items-center gap-2">
                <FileText className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {selectedFile ? selectedFile.name : 'Click to select PDF file'}
                </span>
              </div>
            </label>
          </div>

          {/* File Info */}
          {selectedFile && !uploading && (
            <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <div className="flex-1 text-sm text-mint-cream">
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}

          {/* Progress */}
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                Uploading... {progress}%
              </p>
            </div>
          )}

          {/* Format Info */}
          <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-mint-cream mb-1">Expected PDF Format:</p>
              <p>Name | Email | Branch | Roll No | Skills (comma-separated)</p>
              <p className="mt-1">Example: John Doe | john@email.com | CS | R001 | React, Node.js</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
