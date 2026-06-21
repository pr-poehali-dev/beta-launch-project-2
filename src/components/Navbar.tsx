import { MessageCircle, UserPlus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenModal: () => void;
  theme: "dark" | "light";
}

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen, onOpenModal, theme }: NavbarProps) => {
  const bg = theme === "light" ? "bg-[#f2f3f5] border-[#e3e5e8]" : "bg-[#2f3136] border-[#202225]";
  const textMain = theme === "light" ? "text-[#2e3338]" : "text-white";
  const textSub = theme === "light" ? "text-[#747f8d]" : "text-[#b9bbbe]";
  const ghostCls = theme === "light"
    ? "text-[#4f5660] hover:text-[#2e3338] hover:bg-[#e3e5e8]"
    : "text-[#b9bbbe] hover:text-white hover:bg-[#40444b]";
  const borderMobile = theme === "light" ? "border-[#e3e5e8]" : "border-[#202225]";

  return (
    <nav className={`${bg} border-b px-4 sm:px-6 py-4`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-lg sm:text-xl font-bold ${textMain}`}>Krosno Messenger</h1>
            <p className={`text-xs ${textSub} hidden sm:block`}>Общение по телефону и email</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <Button variant="ghost" className={ghostCls}>
            <UserPlus className="w-4 h-4 mr-2" />
            Возможности
          </Button>
          <Button onClick={onOpenModal} className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-medium">
            Начать общение
          </Button>
        </div>
        <Button
          variant="ghost"
          className={`sm:hidden ${ghostCls} p-2`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className={`sm:hidden mt-4 pt-4 border-t ${borderMobile}`}>
          <div className="flex flex-col gap-3">
            <Button variant="ghost" className={`${ghostCls} justify-start`}>
              <UserPlus className="w-4 h-4 mr-2" />
              Возможности
            </Button>
            <Button onClick={onOpenModal} className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-medium">
              Начать общение
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
