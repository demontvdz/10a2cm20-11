import React, { useState } from 'react';
import { StageData } from '../game/riverLogic';
import { Award, Heart, Sparkles, Copy, Check, RotateCcw, X, MailOpen, Printer } from 'lucide-react';

interface LetterModalProps {
  stages: StageData[];
  badges: string[];
  onRestart: () => void;
  onClose: () => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({
  stages,
  onRestart,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [teacherName, setTeacherName] = useState('Cô Chu Ngọc Quỳnh');
  const [isCardOpened, setIsCardOpened] = useState(true);

  const greetingTitle = `Kính gửi ${teacherName} thân yêu!`;

  const letterText = `GỬI NGƯỜI LÁI ĐÒ TRÊN DÒNG SÔNG LỊCH SỬ

${greetingTitle}

Có những dòng sông đưa con người đến những vùng đất mới, và cũng có những người đưa chúng em ngược dòng thời gian để khám phá những trang sử hào hùng của dân tộc.

Cảm ơn cô đã đưa chúng em qua từng thời kỳ lịch sử, giúp những câu chuyện của quá khứ trở nên sống động và gần gũi.

Cảm ơn cô vì sự tận tâm, kiên nhẫn và tình yêu dành cho từng bài giảng.

Nếu lịch sử là một dòng sông dài bất tận, thì cô chính là người lái đò đã đưa chúng em đi qua dòng sông ấy, để chúng em hiểu hơn về cội nguồn, biết trân trọng hiện tại và có thêm niềm tin vào tương lai.

Nhân ngày Nhà giáo Việt Nam 20/11, kính chúc cô luôn mạnh khỏe, hạnh phúc, giữ mãi ngọn lửa nhiệt huyết và tiếp tục truyền cảm hứng cho thật nhiều thế hệ học trò.

Chúng em xin chân thành cảm ơn cô!

TẬP THỂ LỚP 10A2
TRƯỜNG THCS VÀ THPT SƯ PHẠM

CHÚC MỪNG NGÀY NHÀ GIÁO VIỆT NAM 20/11!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Floating Sparkles & Fireworks effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-300 animate-ping"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 96}%`,
              width: `${4 + (i % 4) * 3}px`,
              height: `${4 + (i % 4) * 3}px`,
              animationDuration: `${1.1 + (i % 3) * 0.7}s`,
              animationDelay: `${(i % 6) * 0.25}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Flower Petals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-80 animate-bounce"
            style={{
              top: `${10 + (i * 7) % 80}%`,
              left: `${5 + (i * 8) % 90}%`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M12,2 C14,6 18,8 22,12 C18,16 14,18 12,22 C10,18 6,16 2,12 C6,8 10,6 12,2 Z"
                fill="#F43F5E"
                opacity="0.85"
              />
              <circle cx="12" cy="12" r="3" fill="#FDE047" />
            </svg>
          </div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* THIỆP CHÚC MỪNG 20/11 - THE GRAND GREETING CARD */}
      {/* ======================================================== */}
      <div className="relative w-full max-w-3xl my-auto rounded-3xl bg-gradient-to-b from-[#FFFDF5] via-[#FFFBF0] to-[#FFF6E5] text-slate-900 border-4 border-amber-500/90 shadow-[0_0_80px_rgba(245,158,11,0.7)] overflow-hidden font-serif-vintage animate-scaleUp">
        {/* Ceremonial Gold & Velvet Red Card Cover / Header */}
        <div className="bg-gradient-to-r from-red-900 via-rose-900 to-red-900 text-amber-100 p-5 md:px-8 border-b-4 border-amber-400 text-center relative shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-800 text-amber-200 transition-colors cursor-pointer"
            title="Đóng để ngắm cảnh sông hoàng hôn"
            aria-label="Đóng thiệp"
          >
            <X className="w-5 h-5" />
          </button>

          {/* School & Class Badge Header Ribbon */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-300 text-amber-200 text-xs font-bold uppercase tracking-wider font-sans mb-2 shadow-inner">
            <img
              src="/assets/aistudio/870868051_1848974316550554_7680551077917192291_n_1cdd2ada.jfif"
              alt="Logo trường"
              className="w-5 h-5 rounded-full bg-white object-contain"
            />
            <span>TRƯỜNG THCS VÀ THPT SƯ PHẠM • LỚP 10A2</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>

          <h1 className="text-xl md:text-3xl font-black text-amber-100 uppercase tracking-wide drop-shadow-md">
            GỬI NGƯỜI LÁI ĐÒ TRÊN DÒNG SÔNG LỊCH SỬ
          </h1>
          <p className="text-xs md:text-sm text-amber-200/90 font-sans italic mt-1 max-w-xl mx-auto">
            "Chúng ta không chỉ đi qua lịch sử để hiểu về quá khứ, mà còn để biết trân trọng những người đã giúp chúng ta hiểu về lịch sử."
          </p>
        </div>

        {/* Greeting Card Content */}
        <div className="p-5 md:p-8 space-y-6 text-slate-800 leading-relaxed text-base md:text-lg">
          {/* TEACHER PORTRAIT PHOTO & HONORED CARD HEADER */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 md:p-5 rounded-3xl bg-gradient-to-r from-amber-100/90 via-amber-50/90 to-rose-50/90 border-2 border-amber-300 shadow-md">
            {/* Framed Teacher Photo */}
            <div className="relative group shrink-0">
              <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden border-3 border-amber-400 shadow-xl relative bg-amber-200">
                <img
                  src="/assets/aistudio/1794314227859_8548048786170424454_g7351673890003982880_b3ac1e514dd54963267662316a30f1b1_58b962bd.jpg"
                  alt="Cô giáo Chu Ngọc Quỳnh"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-rose-600 text-white rounded-full flex items-center justify-center text-xs shadow-md border-2 border-white">
                ❤️
              </div>
            </div>

            {/* Teacher Details & Salutation */}
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/15 text-rose-800 text-xs font-bold font-sans uppercase tracking-wider mb-1.5 border border-rose-300/70">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Cô giáo Lịch sử kính yêu</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-serif-vintage tracking-wide">
                Cô Chu Ngọc Quỳnh
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 font-sans italic mt-1 leading-relaxed">
                "Người lái đò thầm lặng đưa bao thế hệ học trò ngược dòng thời gian qua những trang sử hào hùng của dân tộc."
              </p>

              {/* Editable Name Input Toggle */}
              <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 font-sans text-xs text-slate-600">
                <MailOpen className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Tên trên thiệp:</span>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="Ví dụ: Cô Chu Ngọc Quỳnh"
                  className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 w-44"
                  aria-label="Tên cô giáo"
                />
              </div>
            </div>
          </div>

          {/* Letter Greeting */}
          <p className="font-bold text-amber-950 text-xl md:text-2xl border-b-2 border-amber-200/80 pb-2 flex items-center gap-2">
            <span>Kính gửi {teacherName || 'Cô Chu Ngọc Quỳnh'} thân yêu!</span>
          </p>

          {/* Letter Body Text */}
          <div className="space-y-4 text-justify">
            {[
              'Có những dòng sông đưa con người đến những vùng đất mới, và cũng có những người đưa chúng em ngược dòng thời gian để khám phá những trang sử hào hùng của dân tộc.',
              'Cảm ơn cô đã đưa chúng em qua từng thời kỳ lịch sử, giúp những câu chuyện của quá khứ trở nên sống động và gần gũi.',
              'Cảm ơn cô vì sự tận tâm, kiên nhẫn và tình yêu dành cho từng bài giảng.',
              'Nếu lịch sử là một dòng sông dài bất tận, thì cô chính là người lái đò đã đưa chúng em đi qua dòng sông ấy, để chúng em hiểu hơn về cội nguồn, biết trân trọng hiện tại và có thêm niềm tin vào tương lai.',
              'Nhân ngày Nhà giáo Việt Nam 20/11, kính chúc cô luôn mạnh khỏe, hạnh phúc, giữ mãi ngọn lửa nhiệt huyết và tiếp tục truyền cảm hứng cho thật nhiều thế hệ học trò.',
            ].map((p, i) => (
              <p key={i} className="indent-8">
                {p}
              </p>
            ))}
            {/* Class 10A2 Ending Signature */}
            <div className="pt-3 flex flex-col items-end pr-2 md:pr-4">
              <p className="font-semibold text-rose-950 text-base md:text-lg">
                Chúng em xin chân thành cảm ơn cô!
              </p>
              <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-br from-amber-100/90 via-amber-50 to-rose-100/80 border-2 border-amber-300 shadow-sm flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shrink-0 shadow-xs">
                  <img
                    src="/assets/aistudio/870868051_1848974316550554_7680551077917192291_n_1cdd2ada.jfif"
                    alt="Logo Trường THCS và THPT Sư Phạm"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left font-sans">
                  <span className="block text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                    Kính tặng Cô từ
                  </span>
                  <span className="block text-lg md:text-xl font-black text-rose-700 tracking-wide font-serif-vintage">
                    TẬP THỂ LỚP 10A2
                  </span>
                  <span className="block text-[11px] text-slate-700 font-medium">
                    Trường THCS & THPT Sư Phạm
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grand Celebratory Banner with Flowers & 20/11 Calligraphy */}
          <div className="relative py-5 px-6 rounded-3xl bg-gradient-to-r from-red-700 via-rose-700 to-amber-700 text-white text-center shadow-xl border-2 border-amber-300 overflow-hidden">
            {/* Background shimmer */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(254,240,138,0.3),transparent_70%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Floral Bouquet SVG Illustration */}
              <div className="mb-2">
                <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
                  {/* Flower 1 */}
                  <circle cx="20" cy="20" r="10" fill="#FFE4E6" />
                  <circle cx="20" cy="20" r="6" fill="#F43F5E" />
                  {/* Flower 2 (Center Lotus) */}
                  <circle cx="32" cy="16" r="14" fill="#FEE2E2" />
                  <circle cx="32" cy="16" r="8" fill="#E11D48" />
                  <circle cx="32" cy="16" r="4" fill="#FDE047" />
                  {/* Flower 3 */}
                  <circle cx="44" cy="20" r="10" fill="#FFE4E6" />
                  <circle cx="44" cy="20" r="6" fill="#F43F5E" />
                  {/* Leaves */}
                  <path d="M10,28 Q18,22 24,32" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
                  <path d="M54,28 Q46,22 40,32" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>

              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-amber-200 drop-shadow-md">
                CHÚC MỪNG NGÀY NHÀ GIÁO VIỆT NAM 20/11
              </h2>
              <p className="text-xs md:text-sm text-amber-100 font-sans mt-1">
                Kính chúc Quý thầy cô luôn dồi dào sức khỏe, ngập tràn hạnh phúc và mãi giữ vững ngọn lửa nhiệt huyết!
              </p>
            </div>
          </div>

          {/* Collected Historical Badges Tray */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-3 font-sans text-xs font-bold uppercase tracking-wider text-amber-900">
              <Award className="w-4 h-4 text-amber-600" />
              <span>5 Huy Hiệu Lịch Sử Đồng Hành Cùng Chuyến Đò:</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-sans">
              {stages.map((stg) => (
                <div
                  key={stg.id}
                  className="p-3 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100/60 border-2 border-amber-300 text-center shadow-xs flex flex-col items-center justify-center transition-all hover:scale-105"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-1.5 shadow-sm">
                    ✓
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 line-clamp-1">
                    {stg.badge.name}
                  </span>
                  <span className="text-[9px] text-amber-800 font-semibold mt-0.5">
                    Chặng {stg.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="bg-amber-100/90 border-t border-amber-300 p-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-slate-800 font-bold text-xs border border-amber-300 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              title="Sao chép toàn bộ nội dung bức thư"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Đã chép thiệp!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-700" />
                  <span>Sao chép thiệp</span>
                </>
              )}
            </button>

            {/* Print / Save Card Button */}
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-slate-800 font-bold text-xs border border-amber-300 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              title="In hoặc lưu thiệp thành PDF"
            >
              <Printer className="w-4 h-4 text-slate-700" />
              <span>In thiệp</span>
            </button>

            {/* Restart Button */}
            <button
              onClick={onRestart}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs border border-amber-500/40 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              title="Bắt đầu lại chuyến đò lịch sử"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chèo lại từ đầu</span>
            </button>
          </div>

          {/* Close button to view river dock */}
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-red-200 fill-red-200" />
            <span>Ngắm Cảnh Bến Đỗ Hoàng Hôn</span>
          </button>
        </div>
      </div>
    </div>
  );
};
