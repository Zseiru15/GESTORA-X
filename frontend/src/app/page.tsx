"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | undefined>(null);
  const [formData, setFormData] = useState({ correo: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Error en inicio de sesión");
      } else {
        toast.success(`¡Bienvenido ${data.usuario.nombre} (${data.usuario.rol})!`);
      }
    } catch (err) {
      console.error(err);
      toast.error("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center p-4">
      <Toaster position="top-right" />

      {/* 🔷 Fondos animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />
      </div>

      {/* 🔸 Contenedor principal */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            Gestora<span className="text-cyan-400">X</span>
          </h1>
        </div>

        {/* Tarjeta de login */}
        <div className="relative">
          {/* Efecto neón */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-2xl blur opacity-30" />
          <div className="relative bg-[#1a1a24] border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-center mb-8 text-xl bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              Iniciar Sesión
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Correo */}
              <div className="space-y-2">
                <Label htmlFor="correo" className="text-gray-300">
                  Correo electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400" />
                  <Input
                    id="correo"
                    type="text"
                    placeholder="tu@email.com"
                    value={formData.correo}
                    onChange={handleChange}
                    className="pl-11 bg-[#0f0f18] border-cyan-500/30 focus:border-cyan-400 text-white placeholder:text-gray-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-11 bg-[#0f0f18] border-purple-500/30 focus:border-purple-400 text-white placeholder:text-gray-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  />
                </div>
              </div>

              {/* Botón */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-green-400 hover:from-blue-600 hover:via-cyan-600 hover:to-green-500 text-white shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 border-0"
              >
                {loading ? "Iniciando..." : "Iniciar sesión"}
              </Button>

              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-cyan-400/70 hover:text-cyan-300 transition-colors duration-200"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
