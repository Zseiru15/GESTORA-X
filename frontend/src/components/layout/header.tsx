"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Home, SlidersVertical, LogOut, Bell, Search, User, Sidebar } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

export default function header() {
  const [active, setActive] = useState("Inicio");

  const menuItems = [
    { name: "Inicio", icon: <Home size={18} /> },
    { name: "Parametros", icon: <SlidersVertical size={18} /> },
    { name: "Salir", icon: <LogOut size={18} /> },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-cyan-500/20 shadow-lg"
    >
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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent tracking-wider"
        >
          Gestora X<p className="text-gray-400 text-sm">Nombre del negocio</p>
        </motion.h1>

        {/* Search Bar */}
        {/* <div className="hidden md:flex items-center w-1/3 relative">
          <Search className="absolute left-3 text-cyan-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-10 bg-[#0f0f18] border border-cyan-500/30 focus:border-cyan-400 text-gray-200 placeholder:text-gray-500 rounded-lg"
          />
        </div> */}

        {/* Actions */}
        <div className="flex items-center space-x-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative text-gray-300 hover:text-cyan-400 transition-colors"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block w-2 h-2 bg-cyan-400 rounded-full" />
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-2 bg-[#1a1a24] border border-cyan-500/30 px-3 py-1.5 rounded-lg cursor-pointer hover:border-cyan-400 transition-all"
          >
            <User className="h-5 w-5 text-cyan-400" />
            <span className="text-sm text-gray-300 font-medium hidden sm:inline">
              Usuario
            </span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
