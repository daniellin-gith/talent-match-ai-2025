
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
}

const Index = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Mock candidates data for demonstration
  const mockCandidates: Candidate[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      score: 9,
      position: 'Senior Software Engineer',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Team Leadership'],
      experience: 'Senior Software Engineer with 8+ years of experience leading development teams and architecting scalable web applications. Proven track record of delivering high-quality solutions using modern tech stacks.',
      education: 'M.S. Computer Science, Stanford University (2015)\nB.S. Software Engineering, UC Berkeley (2013)'
    },
    {
      id: '2',
      name: 'Michael Chen',
      score: 8,
      position: 'Full Stack Developer',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      skills: ['JavaScript', 'React', 'Vue.js', 'MongoDB', 'Express', 'Docker'],
      experience: 'Full Stack Developer with 5+ years of experience building responsive web applications and RESTful APIs. Strong background in both frontend and backend technologies.',
      education: 'B.S. Computer Science, MIT (2018)\nBootcamp Graduate, Lambda School (2019)'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      score: 7,
      position: 'Frontend Developer',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'SASS', 'Figma'],
      experience: 'Creative Frontend Developer with 4+ years specializing in user interface design and development. Experience creating pixel-perfect, responsive designs.',
      education: 'B.A. Web Design, Art Institute (2019)\nCertified UX Designer, Google (2020)'
    },
    {
      id: '4',
      name: 'David Kim',
      score: 6,
      position: 'Junior Developer',
      email: 'david.kim@email.com',
      phone: '+1 (555) 456-7890',
      skills: ['HTML', 'CSS', 'JavaScript', 'Git', 'Basic React'],
      experience: 'Recent computer science graduate with internship experience and strong foundation in web development fundamentals. Eager to learn and grow in a collaborative environment.',
      education: 'B.S. Computer Science, UCLA (2023)\nInternship at Tech Startup (Summer 2022)'
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      score: 5,
      position: 'Marketing Coordinator',
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 567-8901',
      skills: ['Marketing', 'Social Media', 'Content Creation', 'Basic HTML'],
      experience: 'Marketing professional with 3+ years in digital marketing and content creation. Some basic web development knowledge through self-study.',
      education: 'B.A. Marketing, University of Texas (2020)\nDigital Marketing Certificate, HubSpot (2021)'
    }
  ];

  const handleAnalyze = async (jobDescription: string, resumes: File[]) => {
    setIsAnalyzing(true);
    
    toast({
      title: "Analysis Started",
      description: `Processing job description and ${resumes.length} resume(s)...`,
    });

    // Simulate AI processing time
    setTimeout(() => {
      setCandidates(mockCandidates);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Found ${mockCandidates.length} candidates. Results ranked by AI match score.`,
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Panel - Job Description Input */}
          <div className="space-y-6">
            <JobDescriptionPanel onAnalyze={handleAnalyze} />
          </div>
          
          {/* Right Panel - Candidate Scoreboard */}
          <div className="space-y-6">
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
