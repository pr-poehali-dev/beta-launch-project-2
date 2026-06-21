import { MessageCircle, ArrowRight, Hash, Phone, Mail, Bell, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiscordSidebarProps {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
}

const DiscordSidebar = ({ mobileSidebarOpen, setMobileSidebarOpen }: DiscordSidebarProps) => {
  return (
    <>
      {/* Боковая панель серверов */}
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
    </>
  );
};

export default DiscordSidebar;
