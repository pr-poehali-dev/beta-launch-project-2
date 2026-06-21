import { useState } from "react";
import {
  Download,
  Shield,
  Zap,
  Eye,
  Send,
  ArrowRight,
  Hash,
  Users,
  Phone,
  Mail,
  UserPlus,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  MessageCircle,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CHECK_USER_URL = "https://functions.poehali.dev/1dbea0a4-3bfb-4179-b168-ca605f416918";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "" });
  const [checkResult, setCheckResult] = useState<null | { found: boolean; name?: string }>(null);
  const [checking, setChecking] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

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
    <div className="min-h-screen bg-[#36393f] text-white overflow-x-hidden">

      {/* Модальное окно "Начать общение" */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => { setModalOpen(false); setAdded(false); setCheckResult(null); setForm({ name: "", contact: "" }); }}>
          <div className="bg-[#36393f] rounded-xl w-full max-w-md shadow-2xl border border-[#202225]" onClick={(e) => e.stopPropagation()}>
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
              <button onClick={() => { setModalOpen(false); setAdded(false); setCheckResult(null); setForm({ name: "", contact: "" }); }} className="text-[#b9bbbe] hover:text-white transition-colors">
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
                  <Button className="mt-2 bg-[#5865f2] hover:bg-[#4752c4] text-white px-8" onClick={() => { setAdded(false); setForm({ name: "", contact: "" }); setCheckResult(null); }}>
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
      )}
      {/* Навигация в стиле Discord */}
      <nav className="bg-[#2f3136] border-b border-[#202225] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">Krosno Messenger</h1>
              <p className="text-xs text-[#b9bbbe] hidden sm:block">Общение по телефону и email</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b]">
              <UserPlus className="w-4 h-4 mr-2" />
              Возможности
            </Button>
            <Button onClick={() => setModalOpen(true)} className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-medium">
              Начать общение
            </Button>
          </div>
          <Button
            variant="ghost"
            className="sm:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-[#202225]">
            <div className="flex flex-col gap-3">
              <Button variant="ghost" className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b] justify-start">
                <UserPlus className="w-4 h-4 mr-2" />
                Возможности
              </Button>
              <Button onClick={() => setModalOpen(true)} className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-medium">
                Начать общение
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Макет в стиле Discord */}
      <div className="flex min-h-screen">
        {/* Боковая панель серверов - скрыта на мобильных */}
        <div className="hidden lg:flex w-[72px] bg-[#202225] flex-col items-center py-3 gap-2">
          <div className="w-12 h-12 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-[2px] bg-[#36393f] rounded-full"></div>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-12 h-12 bg-[#36393f] rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:bg-[#5865f2]"
            >
              <span className="text-[#dcddde] text-sm font-medium">{i}</span>
            </div>
          ))}
        </div>

        {/* Основной контент */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Боковая панель каналов */}
          <div
            className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-60 bg-[#2f3136] flex flex-col`}
          >
            <div className="p-4 border-b border-[#202225] flex items-center justify-between">
              <h2 className="text-white font-semibold text-base">Krosno Messenger</h2>
              <Button
                variant="ghost"
                className="lg:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-1"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 p-2">
              <div className="mb-4">
                <div className="flex items-center gap-1 px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
                  <ArrowRight className="w-3 h-3" />
                  <span>Чаты</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {["избранное", "общий", "новости", "поддержка"].map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center gap-1.5 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer"
                    >
                      <Hash className="w-4 h-4" />
                      <span className="text-sm">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
                  <ArrowRight className="w-3 h-3" />
                  <span>Добавить контакт</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {[
                    { label: "По номеру телефона", icon: Phone },
                    { label: "По email", icon: Mail },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-1.5 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Область пользователя */}
            <div className="p-2 bg-[#292b2f] flex items-center gap-2">
              <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">А</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">Алексей</div>
                <div className="text-[#b9bbbe] text-xs truncate">в сети</div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]">
                  <Bell className="w-4 h-4 text-[#b9bbbe]" />
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]">
                  <Settings className="w-4 h-4 text-[#b9bbbe]" />
                </Button>
              </div>
            </div>
          </div>

          {/* Область чата */}
          <div className="flex-1 flex flex-col">
            {/* Заголовок чата */}
            <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2">
              <Button
                variant="ghost"
                className="lg:hidden text-[#8e9297] hover:text-[#dcddde] hover:bg-[#40444b] p-1 mr-2"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Hash className="w-5 h-5 text-[#8e9297]" />
              <span className="text-white font-semibold">общий</span>
              <div className="w-px h-6 bg-[#40444b] mx-2 hidden sm:block"></div>
              <span className="text-[#8e9297] text-sm hidden sm:block">Общайся с друзьями в Krosno Messenger</span>
              <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
              </div>
            </div>

            {/* Сообщения чата */}
            <div className="flex-1 p-2 sm:p-4 space-y-4 sm:space-y-6 overflow-y-auto">
              {/* Приветственное сообщение */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-medium text-sm sm:text-base">Krosno Bot</span>
                    <span className="bg-[#5865f2] text-white text-xs px-1 rounded">БОТ</span>
                    <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 12:00</span>
                  </div>
                  <div className="text-[#dcddde] text-sm sm:text-base">
                    <p className="mb-3 sm:mb-4">
                      <strong>Добро пожаловать в Krosno Messenger!</strong> Общайся с близкими где угодно — прямо в браузере.
                    </p>
                    <div className="bg-[#2f3136] border-l-4 border-[#5865f2] p-3 sm:p-4 rounded">
                      <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Что умеет Krosno:</h3>
                      <ul className="space-y-1 text-xs sm:text-sm text-[#b9bbbe]">
                        <li>Добавляй друзей по номеру телефона или email</li>
                        <li>Мгновенные сообщения в реальном времени</li>
                        <li>Работает в любом браузере — без установки</li>
                        <li>Видишь, кто сейчас в сети</li>
                        <li>Надёжное шифрование переписки</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Сообщение пользователя с Rich Presence */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-medium">М</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-medium text-sm sm:text-base">Мария</span>
                    <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 12:05</span>
                  </div>
                  <div className="text-[#dcddde] mb-3 text-sm sm:text-base">
                    Только что добавила друга по номеру телефона — так удобно!
                  </div>

                  {/* Демо Rich Presence */}
                  <div className="bg-[#2f3136] border border-[#202225] rounded-lg overflow-hidden w-full max-w-sm">
                    {/* Заголовок профиля */}
                    <div className="h-16 sm:h-20 bg-gradient-to-r from-[#5865f2] to-[#7c3aed] relative">
                      <div className="absolute -bottom-3 sm:-bottom-4 left-3 sm:left-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#2f3136] bg-[#36393f] overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#2f3136] rounded-full flex items-center justify-center">
                              <span className="text-lg sm:text-2xl">M</span>
                            </div>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#3ba55c] border-4 border-[#2f3136] rounded-full"></div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-[#4f545c] hover:bg-[#5d6269] text-white text-xs px-2 sm:px-3 py-1 rounded"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">Профиль</span>
                      </Button>
                    </div>

                    {/* Информация профиля */}
                    <div className="pt-4 sm:pt-6 px-3 sm:px-4 pb-3 sm:pb-4">
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-white text-lg sm:text-xl font-bold mb-1">Мария</h3>
                        <div className="flex items-center gap-2 text-[#b9bbbe] text-xs sm:text-sm">
                          <span>+7 999 123-45-67</span>
                          <span>-</span>
                          <span>Она</span>
                          <div className="flex gap-1 ml-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#5865f2] rounded-sm"></div>
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#3ba55c] rounded-sm"></div>
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#faa61a] rounded-sm"></div>
                          </div>
                        </div>
                      </div>

                      {/* Статусное сообщение */}
                      <div className="mb-3 sm:mb-4">
                        <div className="bg-[#36393f] rounded-lg p-2 sm:p-3 relative">
                          <div className="absolute -top-2 left-3 sm:left-4 w-4 h-4 bg-[#36393f] rotate-45"></div>
                          <div className="flex items-center gap-2 text-[#dcddde] text-xs sm:text-sm">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#5865f2] rounded-full flex items-center justify-center">
                              <span className="text-xs">*</span>
                            </div>
                            <span>Доступна для общения</span>
                          </div>
                        </div>
                      </div>

                      {/* Вкладки */}
                      <div className="flex border-b border-[#40444b] mb-3 sm:mb-4">
                        <button className="px-3 sm:px-4 py-2 text-[#8e9297] text-xs sm:text-sm font-medium hover:text-[#dcddde]">
                          Обо мне
                        </button>
                        <button className="px-3 sm:px-4 py-2 text-white text-xs sm:text-sm font-medium border-b-2 border-[#5865f2]">
                          Контакты
                        </button>
                      </div>

                      {/* Контактные данные */}
                      <div>
                        <div className="flex items-center gap-2 text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2 sm:mb-3">
                          <span>Способы связи</span>
                        </div>

                        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-[#36393f] rounded-lg">
                          {/* Иконка контакта */}
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5865f2] to-[#7c3aed] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>

                          {/* Детали контакта */}
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-semibold text-xs sm:text-sm mb-1">Krosno Messenger</div>
                            <div className="text-[#dcddde] text-xs sm:text-sm mb-1">maria@krosno.app</div>
                            <div className="text-[#b9bbbe] text-xs sm:text-sm mb-2">+7 999 123-45-67</div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#3ba55c] rounded-full animate-pulse"></div>
                              <span className="text-[#3ba55c] text-xs font-medium">В сети сейчас</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Еще одно сообщение пользователя */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-medium">И</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-medium text-sm sm:text-base">Иван</span>
                    <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 12:08</span>
                  </div>
                  <div className="text-[#dcddde] text-sm sm:text-base">
                    Krosno делает общение таким простым — нашёл всех друзей по email!
                  </div>
                </div>
              </div>

              {/* Секция "Начало работы" */}
              <div className="bg-[#2f3136] border border-[#202225] rounded-lg p-4 sm:p-6 mt-6 sm:mt-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 text-[#5865f2]" />
                  Начни общаться в Krosno
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-sm sm:text-base">1</span>
                    </div>
                    <h3 className="text-white font-medium mb-2 text-sm sm:text-base">Зарегистрируйся</h3>
                    <p className="text-[#b9bbbe] text-xs sm:text-sm">Создай аккаунт по номеру телефона или email</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-sm sm:text-base">2</span>
                    </div>
                    <h3 className="text-white font-medium mb-2 text-sm sm:text-base">Добавь друзей</h3>
                    <p className="text-[#b9bbbe] text-xs sm:text-sm">Найди контакты по номеру телефона или email</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-sm sm:text-base">3</span>
                    </div>
                    <h3 className="text-white font-medium mb-2 text-sm sm:text-base">Общайся</h3>
                    <p className="text-[#b9bbbe] text-xs sm:text-sm">Пиши сообщения в реальном времени прямо в браузере</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => setModalOpen(true)} className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 sm:px-8 py-2 sm:py-3 rounded text-sm font-medium">
                    <Send className="w-4 h-4 mr-2" />
                    Начать общение
                  </Button>
                  <Button
                    onClick={() => setModalOpen(true)}
                    variant="outline"
                    className="border-[#4f545c] text-[#b9bbbe] hover:bg-[#40444b] hover:border-[#6d6f78] px-6 sm:px-8 py-2 sm:py-3 rounded text-sm font-medium bg-transparent"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Добавить контакт
                  </Button>
                </div>
              </div>

              {/* Преимущества */}
              <div className="bg-[#2f3136] border border-[#202225] rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Почему Krosno Messenger?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    {
                      icon: <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Лёгкое добавление",
                      desc: "По номеру телефона или email",
                    },
                    {
                      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Мгновенные сообщения",
                      desc: "Доставка в реальном времени",
                    },
                    {
                      icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Прямо в браузере",
                      desc: "Работает без установки приложений",
                    },
                    {
                      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Безопасность переписки",
                      desc: "Надёжное шифрование сообщений",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded hover:bg-[#36393f] transition-colors"
                    >
                      <div className="text-[#5865f2] mt-0.5">{feature.icon}</div>
                      <div>
                        <div className="text-white font-medium text-xs sm:text-sm">{feature.title}</div>
                        <div className="text-[#b9bbbe] text-xs sm:text-sm">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Поле ввода сообщения */}
            <div className="p-2 sm:p-4">
              <div className="bg-[#40444b] rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                <div className="text-[#72767d] text-xs sm:text-sm">Написать в #общий</div>
              </div>
            </div>
          </div>

          {/* Боковая панель участников - скрыта на мобильных/планшетах */}
          <div className="hidden xl:block w-60 bg-[#2f3136] p-4">
            <div className="mb-4">
              <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2">В сети - 3</h3>
              <div className="space-y-2">
                {[
                  {
                    name: "Мария",
                    status: "Доступна для общения",
                    avatar: "М",
                    color: "from-purple-500 to-pink-500",
                  },
                  { name: "Иван", status: "В сети", avatar: "И", color: "from-green-500 to-blue-500" },
                  { name: "Алексей", status: "Печатает...", avatar: "А", color: "from-blue-500 to-purple-500" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-[#36393f] cursor-pointer">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center relative`}
                    >
                      <span className="text-white text-sm font-medium">{user.avatar}</span>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ba55c] border-2 border-[#2f3136] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{user.name}</div>
                      <div className="text-[#b9bbbe] text-xs truncate">{user.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;