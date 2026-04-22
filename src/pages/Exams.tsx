import { Link } from '@tanstack/react-router';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { type Exam, exams } from '@/consts/exams';
import { belts } from '@/consts/belts';
import { BeltIcon } from '@/components/BeltIcon';
import { useProgress } from '@/context/ProgressContext';
import { cn } from '@/utils/cn';
import ExamLine from '@/assets/exam-line.svg?react';

const PERIOD = 4;
const AMPLITUDE = 2;

export function Exams() {
  const { currentExam } = useProgress();
  const examIndex = exams.findIndex((exam) => exam.id === currentExam);
  const offset = examIndex == 0 ? 0 : examIndex == 1 ? 3 : 2;
  const examSlice = Math.max(0, examIndex - 2);

  return (
    <section className="flex flex-col gap-4 relative">
      <CurrentExam />
      <div className="relative">
        <div className="absolute left-0 top-8 bottom-8 ms-6 overflow-hidden">
          <ExamLine
            className={
              examIndex == 0 ? '-mt-58' : examIndex == 1 ? '-mt-30' : ''
            }
          />
        </div>
        <div className="space-y-6 relative">
          {exams.slice(examSlice).map((exam, i) => {
            const phase = (i + offset) % PERIOD;
            const margin = AMPLITUDE - Math.abs(phase - AMPLITUDE);
            return (
              <ExamCard
                key={exam.id}
                exam={exam}
                style={{ marginInlineStart: `${margin * 50}px` }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CurrentExam() {
  const { currentExam } = useProgress();
  const exam = exams.find((exam) => exam.id === currentExam);
  const belt = belts.find((belt) => belt.id === exam?.belt);

  return (
    <Link
      to="/exams/$examId"
      params={{ examId: exam?.id ?? '' }}
      className="bg-[#2D2D2D] text-white flex rounded-xl shadow-[0_6px_0_#000] h-20"
    >
      <div className="flex flex-col justify-center px-4 flex-1">
        <small>Continuar con</small>
        <strong>Examen Cinturón {belt?.label}</strong>
      </div>
      <div className="border-l-2 border-black flex items-center px-4">
        <GraduationCap />
      </div>
    </Link>
  );
}

function ExamCard({
  exam,
  className: _className,
  ...props
}: React.ComponentProps<'a'> & { exam: Exam }) {
  const { currentExam } = useProgress();
  const belt = belts.find((belt) => belt.id === exam.belt);
  const isActive = exam.id === currentExam;

  return (
    <Link
      to="/exams/$examId"
      params={{ examId: exam.id }}
      className={cn(
        'flex items-center gap-3 py-3',
        isActive && 'bg-white rounded-full shadow-[0_4px_0_#cdc9c9] px-5'
      )}
      {...props}
    >
      <div className="shrink-0 flex items-center justify-center size-16 border-2 border-primary-500 bg-white rounded-full shadow-[0_4px_0_var(--color-primary-500)]">
        {belt && <BeltIcon belt={belt} width={50} />}
      </div>
      <div className="flex-1 flex flex-col items-start">
        {isActive && (
          <div className="text-xs px-2 py-0.5 bg-primary-500/10 text-primary-500 rounded-full font-medium mb-1">
            Actual
          </div>
        )}
        <span className="font-medium text-sm text-gray-700">
          Nivel {exam.range}
        </span>
        <h2 className="font-manrope font-black">Cinturón {belt?.label}</h2>
      </div>
      {isActive && <ChevronRight color="#191919" size={28} />}
    </Link>
  );
}
