"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-[#0a0a0f] border-t border-cyan-500/20 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-gray-400">
          © 2025{" "}
          <span className="text-cyan-400 font-semibold tracking-wide">
            Gestora X
          </span>{" "}
          — Tecnología y Gestión Inteligente.{" "}
          <span className="text-purple-400 font-semibold">ORUS</span>.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          versión <span className="text-cyan-400">0.1</span> — Noviembre 01 de 2025
        </p>
      </div>
    </footer>
  );
}
