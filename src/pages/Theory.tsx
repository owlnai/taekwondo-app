import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Play } from 'lucide-react';
import {
  vocabulary,
  categoryLabels,
  categoryIcons,
  type VocabularyCategory,
} from '@/consts/vocabulary';
import { Quiz } from '@/components/Quiz';
import { theoryBlocks } from '@/consts/theoryContent';
import KoreanBlock from '@/assets/korean-block.svg?react';
import { belts } from '@/consts/belts';

type ViewMode = 'categories' | 'study' | 'quiz';

const categories = Array.from(
  new Set(vocabulary.map((v) => v.category))
) as VocabularyCategory[];

export const Theory = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-x-2 gap-y-6">
        {/* Modos de estudio */}
        {theoryBlocks.map((block, i) => {
          const belt = belts.find((b) => b.id === block.beltRange);
          return (
            <Link
              key={block.id}
              to="/theory/block/$id"
              params={{ id: block.id }}
              className="relative overflow-hidden flex flex-col justify-end gap-2 p-4 bg-white rounded-lg shadow-[0_4px_2px_1px_#cecaca4d] min-h-48"
            >
              {belt && (
                <span
                  className="absolute -top-1 inset-x-0 flex justify-end px-2 gap-1"
                  style={
                    {
                      '--belt': belt.color,
                      '--buckle': belt.buckle ?? 'transparent',
                    } as React.CSSProperties
                  }
                >
                  <span className="bg-(--belt) w-5 h-14 block rounded-sm border border-primary-500" />
                  <span className="bg-(--belt) w-5 h-14 block rounded-sm border border-primary-500 relative overflow-hidden after:absolute after:bottom-0 after:inset-x-0 after:w-6 after:h-4 after:bg-(--buckle)" />
                </span>
              )}
              <span className="text-xs text-balance">{block.title}</span>
              <span className="font-semibold text-xl">Bloque {i + 1}</span>
              <span className="flex items-center justify-between text-sm">
                Lectura
                <ArrowRight size={20} />
              </span>
            </Link>
          );
        })}

        <Link
          to="/theory/learn-korean"
          className="relative overflow-hidden flex flex-col p-4 bg-primary-500 text-white rounded-lg shadow-[0_4px_2px_1px_#cecaca4d] min-h-48"
        >
          <span className="absolute right-0 inset-y-0 flex items-center">
            <KoreanBlock />
          </span>
          <span className="flex-1 flex flex-col justify-end gap-2">
            <span className="flex-1 text-sm">Aprendizaje Libre</span>
            <span className="text-sm">Coreano</span>
            <span className="font-semibold text-2xl">Idioma</span>
          </span>
          <span className="flex justify-end">
            <ArrowRight size={20} />
          </span>
        </Link>
      </div>
    </section>
  );
};

export const TheoryLearnKorean = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [selectedCategory, setSelectedCategory] =
    useState<VocabularyCategory | null>(null);

  const handleCategorySelect = (category: VocabularyCategory) => {
    setSelectedCategory(category);
    setViewMode('study');
  };

  const handleStartQuiz = () => {
    setViewMode('quiz');
  };

  if (viewMode === 'quiz') {
    return (
      <Quiz
        items={
          selectedCategory
            ? vocabulary.filter((v) => v.category === selectedCategory)
            : vocabulary
        }
        onBack={() => setViewMode('categories')}
      />
    );
  }

  if (viewMode === 'study' && selectedCategory) {
    const categoryItems = vocabulary.filter(
      (v) => v.category === selectedCategory
    );

    return (
      <section className="flex flex-col gap-4 pt-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setViewMode('categories')}
            className="text-primary-500 hover:underline"
          >
            ← Volver a categorías
          </button>
          <button
            type="button"
            onClick={handleStartQuiz}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary-500 hover:bg-phover-500"
          >
            <Play className="size-4" />
            Hacer quiz
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-3xl">{categoryIcons[selectedCategory]}</span>
          <h1 className="text-2xl font-bold">
            {categoryLabels[selectedCategory]}
          </h1>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {categoryItems.map((item, index) => (
            <VocabularyCard key={index} item={item} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Aprende coreano</h2>
      <p className="text-gray-600">Haz concursos para aprender coreano</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const categoryItems = vocabulary.filter(
            (v) => v.category === category
          );
          return (
            <button
              type="button"
              key={category}
              onClick={() => handleCategorySelect(category)}
              className="flex items-center gap-3 p-4 text-left transition-all bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md"
            >
              <span className="text-2xl">{categoryIcons[category]}</span>
              <div className="flex-1">
                <h3 className="font-semibold">{categoryLabels[category]}</h3>
                <p className="text-sm text-gray-500">
                  {categoryItems.length} palabras
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

const VocabularyCard = ({ item }: { item: (typeof vocabulary)[0] }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-800">{item.korean}</p>
          <p className="text-sm italic text-gray-500">{item.pronunciation}</p>
          <p className="mt-1 font-medium text-primary-500">{item.spanish}</p>
        </div>
      </div>
    </div>
  );
};
