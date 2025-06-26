import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Play } from 'lucide-react';

interface JobDescriptionPanelProps {
  onAnalyze: (jobDescription: string, resumes: File[]) => void;
}

const JobDescriptionPanel = ({ onAnalyze }: JobDescriptionPanelProps) => {
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedResumes, setUploadedResumes] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(file => 
        file.type === 'application/pdf' || 
        file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'text/plain'
      );
      setUploadedResumes(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleAnalyze = () => {
    if (jobDescription && uploadedResumes.length > 0) {
      onAnalyze(jobDescription, uploadedResumes);
    }
  };

  return (
    <div className="space-y-4 h-full">
      <Card className="h-fit">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-4 w-4 text-blue-600" />
            Job Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste your job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[120px] resize-none text-sm"
          />
        </CardContent>
      </Card>

      <Card className="h-fit">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="h-4 w-4 text-green-600" />
            Upload Resumes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm font-medium text-gray-700 mb-1">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-gray-500 mb-3">
              PDF, DOC, DOCX, TXT files
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload">
              <Button variant="outline" size="sm" className="cursor-pointer">
                Choose Files
              </Button>
            </label>
          </div>
          
          {uploadedResumes.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-700 mb-1">
                Uploaded Files ({uploadedResumes.length}):
              </p>
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {uploadedResumes.map((file, index) => (
                  <div key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        onClick={handleAnalyze}
        disabled={!jobDescription || uploadedResumes.length === 0}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 font-semibold"
      >
        <Play className="h-4 w-4 mr-2" />
        Run AI Analysis
      </Button>
    </div>
  );
};

export default JobDescriptionPanel;
