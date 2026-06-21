import { useState } from "react";
import Navbar from "@/components/Navbar";
import DiscordSidebar from "@/components/DiscordSidebar";
import ChatArea from "@/components/ChatArea";
import ContactModal from "@/components/ContactModal";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "" });
  const [checkResult, setCheckResult] = useState<null | { found: boolean; name?: string }>(null);
  const [checking, setChecking] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setAdded(false);
    setCheckResult(null);
    setForm({ name: "", contact: "" });
  };

  return (
    <div className="min-h-screen bg-[#36393f] text-white overflow-x-hidden">
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

      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenModal={openModal}
      />

      <div className="flex min-h-screen">
        <DiscordSidebar
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        <ChatArea
          onOpenModal={openModal}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
        />
      </div>
    </div>
  );
};

export default Index;
