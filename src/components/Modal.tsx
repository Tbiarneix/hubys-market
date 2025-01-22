"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      toast.success("Super ! Tu fais maintenant partie de la liste d'attente.", {
        description: "On te tient au courant dès que l'application est disponible !",
        duration: 5000,
      });

      setEmail("");
      onClose();
    } catch (error) {
      toast.error("Oups ! Une erreur est survenue.", {
        description: "Merci de réessayer plus tard ou de nous contacter directement.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700 rounded-full"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Découvrir Hubys</h2>
        
        <p className="text-gray-600 mb-8">
          Nous avons autant envie de te faire découvir Hubys que toi d'y accéder.
          Mais un peu de patience, l'application arrive bientôt ! Si tu veux faire
          partie des premiers à la tester et rejoindre notre communauté de beta
          testeur, laisse nous ton mail (promis pas de pub ou de revente de
          données) ça servira juste à t'informer que l'application est accessible
          avec un code pour venir voir à quoi ça ressemble.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ton adresse email"
              required
              disabled={isSubmitting}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc49d]"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#ffc49d] hover:bg-[#ffb784] text-gray-900 font-medium py-3 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Inscription en cours..." : "Rejoindre la liste d'attente"}
          </button>
        </form>
      </div>
    </div>
  );
}
