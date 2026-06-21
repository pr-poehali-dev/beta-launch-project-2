import { MessageCircle, ArrowRight, Hash, Phone, Mail, Bell, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiscordSidebarProps {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  onOpenSettings: () => void;
  theme: "dark" | "light";
}

const DiscordSidebar = ({ mobileSidebarOpen, setMobileSidebarOpen, onOpenSettings, theme }: DiscordSidebarProps) => {
  const bg = theme === "light" ? "bg-[#f2f3f5]" : "bg-[#2f3136]";
  const bgDeep = theme === "light" ? "bg-[#e3e5e8]" : "bg-[#202225]";
  const bgUser = theme === "light" ? "bg-[#ebedef]" : "bg-[#292b2f]";
  const border = theme === "light" ? "border-[#e3e5e8]" : "border-[#202225]";
  const textMain = theme === "light" ? "text-[#2e3338]" : "text-white";
  const textMuted = theme === "light" ? "text-[#4f5660]" : "text-[#8e9297]";
  const textSub = theme === "light" ? "text-[#747f8d]" : "text-[#b9bbbe]";
  const hover = theme === "light" ? "hover:bg-[#d4d7dc] hover:text-[#2e3338]" : "hover:text-[#dcddde] hover:bg-[#393c43]";

  return (
    <>
      {/* Боковая панель серверов */}
      <div className={`hidden lg:flex w-[72px] ${bgDeep} flex-col items-center py-3 gap-2`}>
        <div className="w-12 h-12 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div className={`w-8 h-[2px] ${theme === "light" ? "bg-[#f2f3f5]" : "bg-[#36393f]"} rounded-full`}></div>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-12 h-12 ${theme === "light" ? "bg-[#f2f3f5]" : "bg-[#36393f]"} rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:bg-[#5865f2]`}
          >
            <span className={`${textMuted} text-sm font-medium`}>{i}</span>
          </div>
        ))}
      </div>

      {/* Боковая панель каналов */}
      <div className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-60 ${bg} flex flex-col`}>
        <div className={`p-4 border-b ${border} flex items-center justify-between`}>
          <h2 className={`${textMain} font-semibold text-base`}>Krosno Messenger</h2>
          <Button
            variant="ghost"
            className={`lg:hidden ${textSub} hover:${textMain} hover:bg-[#40444b] p-1`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 p-2">
          <div className="mb-4">
            <div className={`flex items-center gap-1 px-2 py-1 ${textMuted} text-xs font-semibold uppercase tracking-wide`}>
              <ArrowRight className="w-3 h-3" />
              <span>Чаты</span>
            </div>
            <div className="mt-1 space-y-0.5">
              {["избранное", "общий", "новости", "поддержка"].map((channel) => (
                <div
                  key={channel}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded ${textMuted} ${hover} cursor-pointer`}
                >
                  <Hash className="w-4 h-4" />
                  <span className="text-sm">{channel}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className={`flex items-center gap-1 px-2 py-1 ${textMuted} text-xs font-semibold uppercase tracking-wide`}>
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
                  className={`flex items-center gap-1.5 px-2 py-1 rounded ${textMuted} ${hover} cursor-pointer`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Область пользователя */}
        <div className={`p-2 ${bgUser} flex items-center gap-2`}>
          <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">А</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className={`${textMain} text-sm font-medium truncate`}>Алексей</div>
            <div className={`${textSub} text-xs truncate`}>в сети</div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]">
              <Bell className={`w-4 h-4 ${textSub}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 hover:bg-[#40444b]"
              onClick={onOpenSettings}
            >
              <Settings className={`w-4 h-4 ${textSub}`} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscordSidebar;
