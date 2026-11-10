import React, { useState } from 'react';
import { StageData, evaluateQuizAnswer } from '../game/riverLogic';
import { soundEngine } from '../utils/audio';
import { BookOpen, CheckCircle2, HelpCircle, Award, ArrowRight, X } from 'lucide-react';

interface StoryModalProps {
  stage: StageData;
  isCompleted: boolean;
  onCompleteAndContinue: (stageId: number, badgeId: string) => void;
  onCloseOnly: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  stage,
  isCompleted,
  onCompleteAndContinue,
  onCloseOnly,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<'unanswered' | 'correct' | 'wrong'>(
    isCompleted ? 'correct' : 'unanswered'
  );
  const [hintMessage, setHintMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'story' | 'quiz' | 'meaning'>('story');

  const handleSelectOption = (idx: number) => {
    if (quizState === 'correct') return;
    setSelectedOption(idx);
    const result = evaluateQuizAnswer(stage, idx);

    if (result.isCorrect) {
      setQuizState('correct');
      setHintMessage(result.explanation);
      soundEngine.playCorrectSound();
    } else {
      setQuizState('wrong');
      setHintMessage(result.hint);
      soundEngine.playWrongSound();
    }
  };

  const handleFinish = () => {
    onCompleteAndContinue(stage.id, stage.badge.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Ancient History Book / Scroll Container */}
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#FFFDF5] text-slate-900 border-4 border-amber-700/80 shadow-[0_0_50px_rgba(217,119,6,0.5)] overflow-hidden font-serif-vintage">
        {/* Ancient book header banner */}
        <div className="bg-gradient-to-r from-amber-900 via-yellow-950 to-amber-900 text-amber-100 p-4 md:px-8 border-b-2 border-amber-600 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800/80 border border-amber-400 flex items-center justify-center shadow-inner">
              <BookOpen className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-amber-300 font-bold block font-sans">
                Trang Sử Số {stage.id} • {stage.period}
              </span>
              <h2 className="text-base md:text-xl font-bold text-amber-50">
                {stage.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isCompleted && (
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-900/80 text-emerald-300 border border-emerald-400 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Đã hoàn thành
              </span>
            )}
            <button
              onClick={onCloseOnly}
              className="p-1.5 rounded-full hover:bg-amber-800 text-amber-300 transition-colors cursor-pointer"
              title="Đóng trang sách"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation for Story, Historical Meaning, and Quiz */}
        <div className="flex border-b border-amber-200 bg-amber-50/80 px-4 md:px-8 font-sans text-xs md:text-sm font-bold">
          {([
            { id: 'story', label: '📜 Câu Chuyện Lịch Sử' },
            { id: 'meaning', label: '🏛️ Ý Nghĩa Thời Đại' },
            { id: 'quiz', label: 'Thử Thách Lịch Sử' },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-amber-700 text-amber-900 bg-amber-100/60'
                  : 'border-transparent text-slate-600 hover:text-amber-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.id === 'quiz' && (
                quizState === 'correct' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                )
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 md:p-8 overflow-y-auto space-y-6 flex-1 bg-[radial-gradient(#F5E6CA_1px,transparent_1px)] [background-size:16px_16px]">
          {/* TAB 1: STORY */}
          {activeTab === 'story' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Headline */}
              <div className="border-l-4 border-amber-600 pl-4 py-1">
                <h3 className="text-lg md:text-xl font-bold text-amber-950">
                  {stage.story.headline}
                </h3>
                <span className="text-xs text-amber-800 font-sans font-semibold">
                  Mốc son: {stage.story.timeframe}
                </span>
              </div>

              {/* Historical Artwork Painting */}
              {stage.imageUrl && (
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/80 shadow-md group">
                  <img
                    src={stage.imageUrl}
                    alt={stage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-44 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-amber-200 font-sans drop-shadow-md">
                    <span className="font-bold flex items-center gap-1.5">
                      <span>🎨</span>
                      <span>Khung cảnh lịch sử: {stage.title}</span>
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-amber-300/40 text-amber-300 font-semibold">
                      {stage.period}
                    </span>
                  </div>
                </div>
              )}

              {/* Story Narrative Paragraphs */}
              <div className="space-y-3.5 text-base md:text-lg leading-relaxed text-slate-800 text-justify">
                {stage.story.paragraphs.map((p, i) => (
                  <p key={i} className="indent-6">
                    {p}
                  </p>
                ))}
              </div>

              {/* Poetic Quote Box */}
              <div className="p-4 rounded-2xl bg-amber-100/80 border border-amber-300 text-center italic text-amber-950 font-serif text-sm md:text-base shadow-inner">
                {stage.story.quote}
              </div>

              {/* Specialized Văn Lang Architecture Showcase */}
              {stage.id === 1 && (
                <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-44 h-36 rounded-xl overflow-hidden border border-amber-400 bg-amber-100 shrink-0 shadow-inner">
                    <img
                      src="/assets/aistudio/image_a98acd75.png"
                      alt="Kiến trúc Văn Lang: Nhà Nọc & Nhà Mái Vồng"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="space-y-1 text-slate-800 text-left">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-800">
                      Di sản kiến trúc Lạc Việt
                    </span>
                    <h4 className="text-base font-bold text-amber-950 font-serif-vintage">
                      Nhà Nọc & Nhà Mái Vồng Thời Đại Hùng Vương
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      Kiến trúc nhà sàn đặc trưng của cư dân Văn Lang được khắc họa chân thực trên trống đồng Đông Sơn: sàn cao chống ẩm thú dữ, mái dốc hình nọc hoặc uốn cong hình thuyền vượt sóng ven sông Hồng.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-sans text-xs md:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Chuyển sang Câu hỏi Thử thách</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: HISTORICAL MEANING */}
          {activeTab === 'meaning' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm space-y-3">
                <h4 className="text-base font-bold text-amber-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  Ý Nghĩa Lịch Sử Sâu Sắc
                </h4>
                <p className="text-base md:text-lg leading-relaxed text-slate-800 text-justify">
                  {stage.story.historicalMeaning}
                </p>
              </div>

              {/* Commemorative Badge Showcase */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-900 to-amber-950 text-amber-100 border-2 border-amber-400 shadow-xl flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-700/80 border-2 border-amber-300 flex items-center justify-center shrink-0 shadow-lg">
                  <Award className="w-9 h-9 text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase font-bold tracking-wider text-amber-300">
                    Huy hiệu vinh danh thời đại
                  </span>
                  <h5 className="text-lg font-bold text-white">
                    {stage.badge.name}
                  </h5>
                  <p className="text-xs text-amber-200/90 font-sans mt-0.5">
                    {stage.badge.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveTab('story')}
                  className="px-4 py-2 rounded-xl text-amber-900 font-sans text-xs md:text-sm font-semibold hover:bg-amber-100 cursor-pointer"
                >
                  ← Đọc lại câu chuyện
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-sans text-xs md:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Làm câu hỏi lịch sử</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: QUIZ (THỬ THÁCH LỊCH SỬ) */}
          {activeTab === 'quiz' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-sans text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Câu hỏi kiểm tra kiến thức</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                  {stage.quiz.question}
                </h3>
              </div>

              {/* Question Visual Scene Artwork */}
              {stage.imageUrl && (
                <div className="relative h-28 sm:h-36 rounded-2xl overflow-hidden border border-amber-300 shadow-sm flex bg-slate-900">
                  <div className="flex-1 relative h-full">
                    <img
                      src={stage.imageUrl}
                      alt={stage.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-3 text-xs text-amber-200 font-sans font-bold flex items-center gap-1.5">
                      <span>💡 Khung cảnh: {stage.title}</span>
                    </div>
                  </div>
                  {stage.id === 1 && (
                    <div className="relative w-32 sm:w-44 h-full border-l border-amber-300/80 bg-amber-50">
                      <img
                        src="/assets/aistudio/image_a98acd75.png"
                        alt="Nhà Nọc Văn Lang"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                      <span className="absolute bottom-1.5 right-1.5 text-[9px] font-bold text-amber-100 bg-black/75 px-1.5 py-0.5 rounded backdrop-blur-xs">
                        Nhà Nọc Văn Lang
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* 4 Interactive Choice Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                {stage.quiz.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isThisCorrect = idx === stage.quiz.correctIndex;

                  let btnStyle = 'border-amber-200 bg-white/90 hover:bg-amber-50 hover:border-amber-400 text-slate-800';

                  if (quizState === 'correct') {
                    if (isThisCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500 font-bold';
                    } else {
                      btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  } else if (quizState === 'wrong' && isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 ring-2 ring-rose-400';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={quizState === 'correct'}
                      className={`p-4 rounded-2xl border-2 text-left font-medium transition-all shadow-sm flex items-start gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-xs font-bold text-amber-900 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm md:text-base pt-0.5 leading-snug">
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quiz Feedback Message Box */}
              {quizState !== 'unanswered' && (
                <div
                  className={`p-4 rounded-2xl border-2 font-sans text-sm animate-fadeIn ${
                    quizState === 'correct'
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {quizState === 'correct' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Chính xác tuyệt vời! Bạn đã mở khóa huy hiệu thời đại.</span>
                      </>
                    ) : (
                      <>
                        <span>💡 Gợi ý cho bạn:</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed">{hintMessage}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer: Action to Continue the Journey */}
        <div className="bg-amber-100/90 border-t border-amber-300 p-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 font-sans">
          <div className="text-xs text-amber-900">
            {quizState === 'correct' ? (
              <span className="font-bold text-emerald-800 flex items-center gap-1">
                ✓ Đã hoàn thành chặng {stage.id}! Bạn có thể tiếp tục chèo thuyền.
              </span>
            ) : (
              <span className="text-slate-600">
                Hãy trả lời đúng câu hỏi thử thách để tiếp tục hải trình.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {quizState === 'correct' ? (
              <button
                onClick={handleFinish}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>TIẾP TỤC HÀNH TRÌNH</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wide cursor-pointer"
              >
                Vào phần trả lời câu hỏi ✍️
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
