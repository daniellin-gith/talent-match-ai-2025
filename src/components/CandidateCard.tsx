
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, ExternalLink, User } from 'lucide-react';

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

interface CandidateCardProps {
  candidate: Candidate;
  onClick: (candidate: Candidate) => void;
}

const CandidateCard = ({ candidate, onClick }: CandidateCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return 'bg-green-50 border-green-200';
    if (score >= 6) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${getScoreBgColor(candidate.score)}`}
      onClick={() => onClick(candidate)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
              <p className="text-sm text-gray-600">{candidate.position}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className={`w-8 h-8 rounded-full ${getScoreColor(candidate.score)} flex items-center justify-center text-white text-sm font-bold`}>
              {candidate.score}
            </div>
            <span className="text-xs text-gray-500 mt-1">Score</span>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            <span className="truncate">{candidate.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            <span>{candidate.phone}</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Top Skills:</p>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
