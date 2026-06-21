import { MessageCircle, X, CheckCircle, XCircle, Loader, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHECK_USER_URL = "https://functions.poehali.dev/1dbea0a4-3bfb-4179-b168-ca605f416918";

interface ContactModalProps {
  form: { name: string; contact: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; contact: string }>>;
  checkResult: null | { found: boolean; name?: string };
  setCheckResult: React.Dispatch<React.SetStateAction<null | { found: boolean; name?: string }>>;
  checking: boolean;
  setChecking: React.Dispatch<React.SetStateAction<boolean>>;
  adding: boolean;
  setAdding: React.Dispatch<React.SetStateAction<boolean>>;
  added: boolean;
  setAdded: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const ContactModal = ({
  form, setForm,
  checkResult, setCheckResult,
  checking, setChecking,
  adding, setAdding,
  added, setAdded,
  onClose,
}: ContactModalProps) => {
  const handleContactChange = async (value: string) => {
    setForm((f) => ({ ...f, contact: value }));
    setCheckResult(null);
    setAdded(false);
    if (value.length < 5) return;
    setChecking(true);
    try {
      const res = await fetch(`${CHECK_USER_URL}?query=${encodeURIComponent(value)}`);
      const data = await res.json();
      setCheckResult(data);
    } catch {
      setCheckResult(null);
    } finally {
      setChecking(false);
    }
  };

  const handleAdd = async () => {
    if (!form.name.trim() || !form.contact.trim()) return;
    setAdding(true);
    const isEmail = form.contact.includes("@");
    try {
      await fetch(CHECK_USER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: isEmail ? form.contact : undefined,
          phone: !isEmail ? form.contact : undefined,
        }),
      });
      setAdded(true);
      setForm({ name: "", contact: "" });
      setCheckResult(null);
    } finally {
      setAdding(false);
    }
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
            <div className="w-9 h-9 bg-[#5865f2] rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-none">Начать общение</h2>
              <p className="text-[#b9bbbe] text-xs mt-0.5">Krosno Messenger</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#b9bbbe] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Форма */}
        <div className="px-6 py-5 space-y-4">
          {added ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="w-14 h-14 bg-[#3ba55c]/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#3ba55c]" />
              </div>
              <p className="text-white font-semibold text-lg">Контакт добавлен!</p>
              <p className="text-[#b9bbbe] text-sm">Теперь вы можете начать переписку</p>
              <Button
                className="mt-2 bg-[#5865f2] hover:bg-[#4752c4] text-white px-8"
                onClick={() => { setAdded(false); setForm({ name: "", contact: "" }); setCheckResult(null); }}
              >
                Добавить ещё
              </Button>
            </div>
          ) : (
            <>
              {/* Поле Имя */}
              <div>
                <label className="block text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide mb-1.5">Имя контакта</label>
                <input
                  type="text"
                  placeholder="Например: Иван Иванов"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-[#202225] text-white placeholder-[#72767d] rounded-md px-3 py-2.5 text-sm border border-[#40444b] focus:outline-none focus:border-[#5865f2] transition-colors"
                />
              </div>

              {/* Поле Телефон / Email */}
              <div>
                <label className="block text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide mb-1.5">Номер телефона или Email</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="+7 999 123-45-67 или user@mail.ru"
                    value={form.contact}
                    onChange={(e) => handleContactChange(e.target.value)}
                    className={`w-full bg-[#202225] text-white placeholder-[#72767d] rounded-md px-3 py-2.5 text-sm border transition-colors pr-9 focus:outline-none ${
                      checkResult === null ? "border-[#40444b] focus:border-[#5865f2]"
                      : checkResult.found ? "border-[#3ba55c]"
                      : "border-[#ed4245]"
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {checking && <Loader className="w-4 h-4 text-[#b9bbbe] animate-spin" />}
                    {!checking && checkResult?.found && <CheckCircle className="w-4 h-4 text-[#3ba55c]" />}
                    {!checking && checkResult && !checkResult.found && <XCircle className="w-4 h-4 text-[#ed4245]" />}
                  </div>
                </div>

                {/* Статус */}
                {!checking && checkResult?.found && (
                  <div className="mt-2 flex items-center gap-2 bg-[#3ba55c]/10 border border-[#3ba55c]/30 rounded-md px-3 py-2">
                    <div className="w-2 h-2 bg-[#3ba55c] rounded-full flex-shrink-0"></div>
                    <span className="text-[#3ba55c] text-xs font-medium">
                      <strong>{checkResult.name}</strong> уже есть в Krosno Messenger
                    </span>
                  </div>
                )}
                {!checking && checkResult && !checkResult.found && (
                  <div className="mt-2 flex items-center gap-2 bg-[#ed4245]/10 border border-[#ed4245]/30 rounded-md px-3 py-2">
                    <div className="w-2 h-2 bg-[#ed4245] rounded-full flex-shrink-0"></div>
                    <span className="text-[#ed4245] text-xs">Пользователь не найден в мессенджере</span>
                  </div>
                )}
              </div>

              {/* Кнопка */}
              <Button
                onClick={handleAdd}
                disabled={adding || !form.name.trim() || !form.contact.trim()}
                className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white py-2.5 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {adding ? <Loader className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                {adding ? "Добавляем..." : "Добавить контакт"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
