'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalError, setModalError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  interface Payload {
    formId: string;
    name: string;
    phone: string;
    email: string;
    extraData: { question: string };
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: Payload = {
      formId: "82979d81-f15e-4471-849a-ecb0ff41945e",
      name,
      phone,
      email: "",
      extraData: {
        question: `${name} with phone No. ${phone} has requested a call back.`,
      },
    };

    try {
      console.log("Submitting payload:", payload);
      const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/webhook/v1/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-PIXXI-TOKEN": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Server error');

      const data = await res.json();
      console.log("Server response:", data);

      setModalMessage("Your request has been sent successfully! Our team will contact you soon.");
      setModalError(false);

      // Clear form
      setName("");
      setPhone("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setModalMessage("Oops! Something went wrong. Please try again later.");
      setModalError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f0f11] p-8 rounded-lg max-w-md w-full mx-4 flex flex-col justify-between border border-white/20 text-white relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex flex-col gap-3">
                <h4 className="text-sm text-gray-400 mb-2 font-semibold">CONTACT US</h4>
                <h2 className="text-2xl font-light leading-snug mb-6">
                  Seeking personalized support? <br />
                  <span className="font-semibold">Request a call from our team</span>
                </h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="YOUR NAME"
                    className="bg-transparent border font-sans border-gray-700 rounded px-3 py-2 text-sm focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="PHONE NUMBER"
                    className="bg-transparent border font-sans border-gray-700 rounded px-3 py-2 text-sm focus:outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#192ff8] font-sans w-1/2 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send a request"}
                  </button>
                </form>
              </div>
              <p className="text-xs text-gray-500 mt-6">Privacy</p>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success / Error Message Modal */}
      <AnimatePresence>
        {modalMessage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`pointer-events-auto max-w-sm w-full mx-4 rounded-lg p-6 shadow-xl text-center backdrop-blur-md bg-white/30 border border-white/20 ${
                modalError ? 'border-red-400' : 'border-green-400'
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-lg font-bold mb-2 text-white">
                {modalError ? "Error" : "Success"}
              </h3>
              <p className="text-sm text-white">{modalMessage}</p>
              <button
                onClick={() => setModalMessage(null)}
                className="mt-4 bg-black/30 px-4 py-2 rounded hover:bg-black/40 transition text-sm text-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
