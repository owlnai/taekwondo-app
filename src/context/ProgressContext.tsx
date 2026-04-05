import { tuls } from '@/consts/tuls';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export type TulStatus = 'not_started' | 'in_progress' | 'completed';

type TulProgress = Record<string, TulStatus>;

type ProgressContextType = {
  currentExam: string;
  setCurrentExam: (belt: string) => void;
  tulProgress: TulProgress;
  setTulStatus: (tulId: string, status: TulStatus) => void;
  getTulStatus: (tulId: string) => TulStatus;
  getProgressPercentage: () => number;
  getCompletedCount: () => number;
  getInProgressCount: () => number;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

type ProgressProviderProps = {
  children: ReactNode;
};

export const ProgressProvider = ({ children }: ProgressProviderProps) => {
  const [currentExam, setCurrentExam] = useState<string>(() => {
    const saved = localStorage.getItem('currentBelt');
    return saved || 'gup-9';
  });

  const [tulProgress, setTulProgress] = useState<TulProgress>(() => {
    const saved = localStorage.getItem('tulProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('currentBelt', currentExam);
  }, [currentExam]);

  useEffect(() => {
    localStorage.setItem('tulProgress', JSON.stringify(tulProgress));
  }, [tulProgress]);

  const setTulStatus = (tulId: string, status: TulStatus) => {
    setTulProgress((prev) => ({
      ...prev,
      [tulId]: status,
    }));
  };

  const getTulStatus = (tulId: string): TulStatus => {
    return tulProgress[tulId] || 'not_started';
  };

  const getProgressPercentage = () => {
    const totalTuls = Object.keys(tulProgress).length;
    if (totalTuls === 0) return 0;
    const completed = Object.values(tulProgress).filter(
      (s) => s === 'completed'
    ).length;
    return Math.round((completed / tuls.length) * 100);
  };

  const getCompletedCount = () => {
    return Object.values(tulProgress).filter((s) => s === 'completed').length;
  };

  const getInProgressCount = () => {
    return Object.values(tulProgress).filter((s) => s === 'in_progress').length;
  };

  return (
    <ProgressContext.Provider
      value={{
        currentExam,
        setCurrentExam,
        tulProgress,
        setTulStatus,
        getTulStatus,
        getProgressPercentage,
        getCompletedCount,
        getInProgressCount,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
