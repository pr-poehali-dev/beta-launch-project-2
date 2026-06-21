import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import DiscordSidebar from "@/components/DiscordSidebar";
import ChatArea from "@/components/ChatArea";
import ContactModal from "@/components/ContactModal";
import SettingsModal from "@/components/SettingsModal";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "" });
  const [checkResult, setCheckResult] = useState<null | { found: boolean; name?: string }>(null);
  const [checking, setChecking] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("krosno-light", theme === "light");
  }, [theme]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setAdded(false);
    setCheckResult(null);
    setForm({ name: "", contact: "" });
  };

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${
        theme === "light"
          ? "bg-[#ffffff] text-[#2e3338]"
          : "bg-[#36393f] text-white"
      }`}
    >
      {modalOpen && (
        <ContactModal
          form={form}
          setForm={setForm}
          checkResult={checkResult}
          setCheckResult={setCheckResult}
          checking={checking}
          setChecking={setChecking}
          adding={adding}
          setAdding={setAdding}
          added={added}
          setAdded={setAdded}
          onClose={closeModal}
        />
      )}

      {settingsOpen && (
        <SettingsModal
          theme={theme}
          onThemeChange={setTheme}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenModal={openModal}
        theme={theme}
      />

      <div className="flex min-h-screen">
        <DiscordSidebar
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          onOpenSettings={() => setSettingsOpen(true)}
          theme={theme}
        />

        <ChatArea
          onOpenModal={openModal}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default Index;
