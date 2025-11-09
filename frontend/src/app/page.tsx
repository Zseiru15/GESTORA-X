"use client";
import React, { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import { Toaster, toast } from 'react-hot-toast';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | undefined>(null);

  const handleLogin = async (formData: { correo: string; password: string }) => {
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
        setError(null);
      } else {
        toast.success(`¡Bienvenido ${data.usuario.nombre} (${data.usuario.rol})!`);
      }
    } catch (err) {
      console.error(err);
      toast.error("No se pudo conectar con el servidor");
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    </main>
  );
}
