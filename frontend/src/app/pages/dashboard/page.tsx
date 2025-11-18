"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Home, SlidersVertical, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Dashboard() {
  const [active, setActive] = useState("Inicio");

  const menuItems = [
    { name: "Inicio", icon: <Home size={18} /> },
    { name: "Parametros", icon: <SlidersVertical size={18} /> },
    { name: "Salir", icon: <LogOut size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-gray-200 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />
      </div>
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#11111a]/80 backdrop-blur-xl border-r border-cyan-500/20 p-6 relative z-10">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            Gestora<span className="text-cyan-400">X</span>
          </h1>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={`w-full justify-start gap-3 transition-all ${
                active === item.name
                  ? "bg-gradient-to-r from-blue-600/40 to-cyan-600/20 text-cyan-300 border border-cyan-500/40"
                  : "hover:bg-[#1a1a24]/80 hover:text-cyan-300"
              }`}
              onClick={() => setActive(item.name)}
            >
              {item.icon}
              {item.name}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 relative z-10">
        <header>
          {/* Header */}
          <Header />;
        </header>
        <br />
        <motion.h1
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          {active}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <div
              key={card}
              className="bg-[#1a1a24]/80 border border-cyan-500/20 rounded-xl p-6 shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all"
            >
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                Tarjeta {card}
              </h3>
              <p className="text-gray-400 text-sm">
                Contenido informativo o gráfico aquí...
              </p>
            </div>
          ))}
        </motion.div>
        <br />
        <footer>
          {/* Footer */}
          <Footer />
        </footer>
      </main>
    </div>
  );
}
