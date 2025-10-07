// src/hooks/useMatching.ts (UPDATED)

import { useState, useCallback } from 'react';
import {
  JobCriteria,
  MatchResponse,
  MatchStatus,
} from '@/pages/Recruitment/types/matching.types';
import { localMatchingService } from '@/pages/Recruitment/Services/localMatchingService';

export function useMatching() {
  const [status, setStatus] = useState<MatchStatus>({
    status: 'idle',
    progress: 0,
    message: 'Ready to calculate matches',
  });

  const [results, setResults] = useState<MatchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateMatches = useCallback(
    async (jobCriteria: JobCriteria, candidateIds?: string[]) => {
      setStatus({
        status: 'calculating',
        progress: 10,
        message: 'Preparing to analyze candidates...',
      });
      setError(null);

      try {
        setStatus({
          status: 'calculating',
          progress: 30,
          message: 'Loading candidate profiles...',
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        setStatus({
          status: 'calculating',
          progress: 50,
          message: 'Analyzing skills and experience with AI...',
        });

        const response = await localMatchingService.calculateMatches(jobCriteria);

        setStatus({
          status: 'calculating',
          progress: 90,
          message: 'Finalizing rankings...',
        });

        await new Promise(resolve => setTimeout(resolve, 300));

        setResults(response);

        setStatus({
          status: 'success',
          progress: 100,
          message: `Successfully matched ${response.results.length} candidates!`,
        });

        return response;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to calculate matches';
        setError(errorMessage);
        setStatus({
          status: 'error',
          progress: 0,
          message: errorMessage,
        });
        throw err;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setStatus({
      status: 'idle',
      progress: 0,
      message: 'Ready to calculate matches',
    });
    setResults(null);
    setError(null);
  }, []);

  return {
    status,
    results,
    error,
    calculateMatches,
    reset,
  };
}