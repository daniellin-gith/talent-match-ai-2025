
import React, { useState } from 'react';
import Header from '@/components/Header';
import JobDescriptionPanel from '@/components/JobDescriptionPanel';
import CandidateScoreboard from '@/components/CandidateScoreboard';
import { useToast } from '@/hooks/use-toast';

interface Candidate {
  id: string;
  name: string;
  score: number;
  position: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
  education: string;
  fileName: string;
}

const Index = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // For now, we'll simulate text extraction
        // In a real implementation, you'd use libraries like pdf-parse or mammoth for proper extraction
        const text = e.target?.result as string;
        resolve(text || `Resume content from ${file.name}`);
      };
      
      if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        // For PDF/DOC files, we'll simulate extraction
        resolve(`Extracted text content from ${file.name} - This would contain the actual resume text in a real implementation with proper PDF/DOC parsing.`);
      }
    });
  };

  const analyzeResumeWithAI = async (resumeText: string, jobDescription: string, fileName: string): Promise<Candidate> => {
    // Simulate AI analysis - in a real implementation, you'd call an AI API
    const mockAnalysis = {
      name: fileName.replace(/\.(pdf|doc|docx|txt)$/i, '').replace(/[-_]/g, ' '),
      score: Math.floor(Math.random() * 5) + 6, // Random score between 6-10 for demo
      position: 'Candidate',
      email: `${fileName.toLowerCase().replace(/\.(pdf|doc|docx|txt)$/i, '').replace(/\s+/g, '.')}@email.com`,
      phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      skills: ['JavaScript', 'React', 'Python', 'Communication', 'Problem Solving'].slice(0, Math.floor(Math.random() * 3) + 3),
      experience: `Professional experience extracted from ${fileName}. This candidate shows relevant background for the position.`,
      education: `Educational background from ${fileName}. Relevant qualifications identified.`,
      fileName: fileName
    };

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...mockAnalysis
    };
  };

  const handleAnalyze = async (jobDescription: string, resumes: File[]) => {
    setIsAnalyzing(true);
    setCandidates([]);
    
    toast({
      title: "Analysis Started",
      description: `Processing job description and ${resumes.length} resume(s)...`,
    });

    try {
      const analyzedCandidates: Candidate[] = [];
      
      for (const resume of resumes) {
        console.log(`Processing resume: ${resume.name}`);
        
        // Extract text from resume
        const resumeText = await extractTextFromFile(resume);
        
        // Analyze with AI
        const candidate = await analyzeResumeWithAI(resumeText, jobDescription, resume.name);
        analyzedCandidates.push(candidate);
      }
      
      // Sort by score (highest first)
      analyzedCandidates.sort((a, b) => b.score - a.score);
      
      setCandidates(analyzedCandidates);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Ranked ${analyzedCandidates.length} resume(s) based on job requirements.`,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: "There was an error processing the resumes. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
          <div className="lg:col-span-1">
            <JobDescriptionPanel onAnalyze={handleAnalyze} />
          </div>
          
          <div className="lg:col-span-2">
            <CandidateScoreboard 
              candidates={candidates} 
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
