import { Plus } from "lucide-react";
import { useState } from "react";
import CreateModal from "../components/layouts/CreateModal/CreateModal"; import { AnimatePresence } from "framer-motion";


export function Home() {

  const [showCreateModal, setShowCreateModal] = useState(false)

  function handleCreateButton() {
    setShowCreateModal(true)
  }

  return (
    <div className="w-full h-[calc(100vh-40px)] bg-black flex items-center justify-center px-2 sm:px-6">
      <div className=":max-w-2xl w-full text-center">

        <div className="inline-flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded-sm border border-zinc-800 bg-zinc-950 text-zinc-400 text-sm mb-6">
          🚀 Link Management Dashboard
        </div>


        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Create, Track & Manage
          <span className="block text-zinc-400">
            Smart Links Effortlessly
          </span>
        </h1>


        <p className="text-zinc-500 text-[11px] sm:text-[15px] md:text-lg mt-5 max-w-xl mx-auto">
          Shorten URLs, generate QR codes, monitor analytics,
          create expiring links and manage everything from one place.
        </p>


        <div className="mt-10 flex justify-center">
          <button
            onClick={handleCreateButton}
            className="group cursor-pointer flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg md:rounded-2xl bg-white text-black font-semibold text-[12px] sm:text-[15px] md:text-lg transition-all duration-300 hover:scale-90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <Plus size={22} />
            Create New Link
          </button>
        </div>

        <AnimatePresence>
          {showCreateModal && <CreateModal setShowCreateModal={setShowCreateModal} />}
        </AnimatePresence>


        <div className="grid grid-cols-3 justify-self-center gap-4 mt-14">
          <div className="rounded-lg sm:rounded-2xl w-[70px] xss:w-[90px] sm:w-[140px] border border-zinc-900 bg-zinc-950 p-3 sm:p-5">
            <p className="text-zinc-500 text-[12px] sm:text-sm">Links</p>
            <h3 className="text-lg sm:text-2xl font-bold text-white mt-1 sm:mt-2">0</h3>
          </div>
          <div className="rounded-lg sm:rounded-2xl w-[70px] xss:w-[90px] sm:w-[140px]  border border-zinc-900 bg-zinc-950 p-3 sm:p-5">
            <p className="text-zinc-500 text-[12px] sm:text-sm">Pages</p>
            <h3 className="text-lg sm:text-2xl font-bold text-white mt-1 sm:mt-2">0</h3>
          </div>
          <div className="rounded-lg sm:rounded-2xl w-[70px] xss:w-[90px]  sm:w-[140px]  border border-zinc-900 bg-zinc-950 p-3 sm:p-5">
            <p className="text-zinc-500 text-[12px] sm:text-sm">Codes</p>
            <h3 className="text-lg sm:text-2xl font-bold text-white mt-1 sm:mt-2">0</h3>
          </div>
        </div>
      </div>
    </div>
  );
}