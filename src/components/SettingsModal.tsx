import { useState } from "react";
import { X, User, Sun, Moon, Trash2, Mail, ChevronRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsModalProps {
  theme: "dark" | "light";
  onThemeChange: (theme: "dark" | "light") => void;
  onClose: () => void;
}

type Section = "main" | "nickname" | "delete";

const SettingsModal = ({ theme, onThemeChange, onClose }: SettingsModalProps) => {
  const [section, setSection] = useState<Section>("main");
  const [nickname, setNickname] = useState("Алексей");
  const [nickInput, setNickInput] = useState("");
  const [nickSaved, setNickSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const handleSaveNick = () => {
    if (!nickInput.trim()) return;
    setNickname(nickInput.trim());
    setNickInput("");
    setNickSaved(true);
    setTimeout(() => setNickSaved(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#36393f] rounded-xl w-full max-w-md shadow-2xl border border-[#202225]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#202225]">
          <div className="flex items-center gap-3">
            {section !== "main" && (
              <button
                onClick={() => setSection("main")}
                className="text-[#b9bbbe] hover:text-white transition-colors mr-1"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            )}
            <h2 className="text-white font-bold text-lg leading-none">
              {section === "main" && "Настройки"}
              {section === "nickname" && "Сменить имя"}
              {section === "delete" && "Удаление аккаунта"}
            </h2>
          </div>
          <button onClick={onClose} className="text-[#b9bbbe] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Контент */}
        <div className="px-6 py-5">

          {/* Главное меню */}
          {section === "main" && (
            <div className="space-y-2">
              {/* Текущий профиль */}
              <div className="flex items-center gap-3 p-3 bg-[#2f3136] rounded-lg mb-4">
                <div className="w-10 h-10 bg-[#5865f2] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{nickname[0]}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{nickname}</div>
                  <div className="text-[#b9bbbe] text-xs">в сети</div>
                </div>
              </div>

              {/* Сменить имя */}
              <button
                onClick={() => setSection("nickname")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#40444b] transition-colors group"
              >
                <div className="w-8 h-8 bg-[#5865f2]/20 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-[#5865f2]" />
                </div>
                <span className="flex-1 text-left text-[#dcddde] text-sm">Сменить имя / никнейм</span>
                <ChevronRight className="w-4 h-4 text-[#8e9297] group-hover:text-[#dcddde] transition-colors" />
              </button>

              {/* Тема */}
              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2f3136]">
                <div className="w-8 h-8 bg-[#faa61a]/20 rounded-lg flex items-center justify-center">
                  {theme === "dark" ? (
                    <Moon className="w-4 h-4 text-[#faa61a]" />
                  ) : (
                    <Sun className="w-4 h-4 text-[#faa61a]" />
                  )}
                </div>
                <span className="flex-1 text-left text-[#dcddde] text-sm">Тема оформления</span>
                <div className="flex items-center gap-1 bg-[#202225] rounded-lg p-1">
                  <button
                    onClick={() => onThemeChange("dark")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      theme === "dark"
                        ? "bg-[#5865f2] text-white"
                        : "text-[#8e9297] hover:text-[#dcddde]"
                    }`}
                  >
                    <Moon className="w-3 h-3" />
                    Тёмная
                  </button>
                  <button
                    onClick={() => onThemeChange("light")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      theme === "light"
                        ? "bg-[#5865f2] text-white"
                        : "text-[#8e9297] hover:text-[#dcddde]"
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    Белая
                  </button>
                </div>
              </div>

              {/* Поддержка */}
              <a
                href="mailto:krosnoapp@gmail.com"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#40444b] transition-colors group"
              >
                <div className="w-8 h-8 bg-[#3ba55c]/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#3ba55c]" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[#dcddde] text-sm">Поддержка</div>
                  <div className="text-[#8e9297] text-xs">krosnoapp@gmail.com</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8e9297] group-hover:text-[#dcddde] transition-colors" />
              </a>

              {/* Удалить аккаунт */}
              <button
                onClick={() => setSection("delete")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#ed4245]/10 transition-colors group"
              >
                <div className="w-8 h-8 bg-[#ed4245]/20 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-4 h-4 text-[#ed4245]" />
                </div>
                <span className="flex-1 text-left text-[#ed4245] text-sm">Удалить аккаунт</span>
                <ChevronRight className="w-4 h-4 text-[#ed4245]/50 group-hover:text-[#ed4245] transition-colors" />
              </button>
            </div>
          )}

          {/* Смена имени */}
          {section === "nickname" && (
            <div className="space-y-4">
              <p className="text-[#b9bbbe] text-sm">Текущее имя: <span className="text-white font-medium">{nickname}</span></p>
              <div>
                <label className="block text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide mb-1.5">
                  Новое имя или никнейм
                </label>
                <input
                  type="text"
                  placeholder="Введите новое имя..."
                  value={nickInput}
                  onChange={(e) => { setNickInput(e.target.value); setNickSaved(false); }}
                  className="w-full bg-[#202225] text-white placeholder-[#72767d] rounded-md px-3 py-2.5 text-sm border border-[#40444b] focus:outline-none focus:border-[#5865f2] transition-colors"
                />
              </div>
              {nickSaved && (
                <div className="flex items-center gap-2 bg-[#3ba55c]/10 border border-[#3ba55c]/30 rounded-md px-3 py-2">
                  <div className="w-2 h-2 bg-[#3ba55c] rounded-full"></div>
                  <span className="text-[#3ba55c] text-xs">Имя успешно изменено!</span>
                </div>
              )}
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setSection("main")}
                  className="flex-1 text-[#b9bbbe] hover:text-white hover:bg-[#40444b] border border-[#40444b]"
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleSaveNick}
                  disabled={!nickInput.trim()}
                  className="flex-1 bg-[#5865f2] hover:bg-[#4752c4] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Сохранить
                </Button>
              </div>
            </div>
          )}

          {/* Удаление аккаунта */}
          {section === "delete" && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-[#ed4245]/10 border border-[#ed4245]/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-[#ed4245] flex-shrink-0 mt-0.5" />
                <p className="text-[#dcddde] text-sm">
                  Это действие <strong className="text-[#ed4245]">необратимо</strong>. Все ваши данные, чаты и контакты будут удалены навсегда.
                </p>
              </div>
              <div>
                <label className="block text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide mb-1.5">
                  Введите «УДАЛИТЬ» для подтверждения
                </label>
                <input
                  type="text"
                  placeholder="УДАЛИТЬ"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  className="w-full bg-[#202225] text-white placeholder-[#72767d] rounded-md px-3 py-2.5 text-sm border border-[#40444b] focus:outline-none focus:border-[#ed4245] transition-colors"
                />
              </div>
              <p className="text-[#8e9297] text-xs">
                Если у вас есть вопросы — напишите в поддержку:{" "}
                <a href="mailto:krosnoapp@gmail.com" className="text-[#5865f2] hover:underline">
                  krosnoapp@gmail.com
                </a>
              </p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setSection("main")}
                  className="flex-1 text-[#b9bbbe] hover:text-white hover:bg-[#40444b] border border-[#40444b]"
                >
                  Отмена
                </Button>
                <Button
                  disabled={deleteConfirm !== "УДАЛИТЬ"}
                  className="flex-1 bg-[#ed4245] hover:bg-[#c03537] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Удалить аккаунт
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
