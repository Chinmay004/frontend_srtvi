'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface InquiryProps {
    onClose?: () => void;
}

export default function Inquiry({ onClose }: InquiryProps) {
    const [name, setName] = useState("");
    const [preferredPropertyType, setPreferredPropertyType] = useState("");
    const [otherPropertyType, setOtherPropertyType] = useState("");
    const [budget, setBudget] = useState("");
    const [otherBudget, setOtherBudget] = useState("");
    const [purchaseTimeline, setPurchaseTimeline] = useState("");
    const [phone, setPhone] = useState("");
    const [preferredArea, setPreferredArea] = useState("");
    const [email, setEmail] = useState("");

    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [modalError, setModalError] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    interface ExtraData {
        question: string;
    }

    interface Payload {
        formId: string;
        name: string;
        phone: string;
        email: string;
        extraData: ExtraData;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate phone number is required
        if (!phone.trim()) {
            setModalMessage("Phone number is required. Please enter your phone number.");
            setModalError(true);
            return;
        }

        setIsSubmitting(true);

        // Use the "Other" text input values if "Other" is selected
        const finalPropertyType = preferredPropertyType === "Other" ? otherPropertyType : preferredPropertyType;
        const finalBudget = budget === "Other" ? otherBudget : budget;

        const payload: Payload = {
            formId: "82979d81-f15e-4471-849a-ecb0ff41945e",
            name,
            phone,
            email,
            extraData: {
                question: `${name} with phone No. ${phone} and email ${email} is interested in ${finalPropertyType} property with budget ${finalBudget}, planning to purchase ${purchaseTimeline} in ${preferredArea}`,
            },
        };

        try {
            const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/webhook/v1/form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-PIXXI-TOKEN": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Server error');

            setModalMessage("Your inquiry has been sent successfully! We'll get back to you soon.");
            setModalError(false);

            // Reset form
            setName("");
            setPreferredPropertyType("");
            setOtherPropertyType("");
            setBudget("");
            setOtherBudget("");
            setPurchaseTimeline("");
            setPhone("");
            setPreferredArea("");
            setEmail("");
        } catch (err) {
            console.error("Error submitting form:", err);
            setModalMessage("Oops! Something went wrong. Please try again later.");
            setModalError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="bg-opacity-80 p-8 rounded-md w-full max-w-xl bg-[#111111] shadow-lg border border-[#222] relative">
                {/* Close button for popup mode */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-10"
                    >
                        ✕
                    </button>
                )}

                <h2 className="text-center text-3xl font-bold mb-6 text-white">Property Inquiry</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Full Name"
                        className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="space-y-2">
                        <select
                            className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
                            value={preferredPropertyType}
                            onChange={(e) => setPreferredPropertyType(e.target.value)}
                        >
                            <option value="">Preferred Property Type</option>
                            <option value="1 Bedroom">1 Bedroom</option>
                            <option value="2 Bedrooms">2 Bedrooms</option>
                            <option value="3 Bedrooms">3 Bedrooms</option>
                            <option value="Other">Other</option>
                        </select>

                        {preferredPropertyType === "Other" && (
                            <input
                                type="text"
                                placeholder="Please specify your preferred property type"
                                className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
                                value={otherPropertyType}
                                onChange={(e) => setOtherPropertyType(e.target.value)}
                                required={preferredPropertyType === "Other"}
                            />
                        )}
                    </div>

                    <div className="space-y-2">
                        <select
                            className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        >
                            <option value="">Budget</option>
                            <option value="AED 1M – 1.5M">AED 1M – 1.5M</option>
                            <option value="AED 1.5M – 2M">AED 1.5M – 2M</option>
                            <option value="AED 2.5M+">AED 2.5M+</option>
                            <option value="Other">Other</option>
                        </select>

                        {budget === "Other" && (
                            <input
                                type="text"
                                placeholder="Please specify your budget"
                                className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
                                value={otherBudget}
                                onChange={(e) => setOtherBudget(e.target.value)}
                                required={budget === "Other"}
                            />
                        )}
                    </div>

                    <select
                        className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
                        value={purchaseTimeline}
                        onChange={(e) => setPurchaseTimeline(e.target.value)}
                    >
                        <option value="">Purchase Timeline</option>
                        <option value="Immediately">Immediately</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="Just searching">Just searching</option>
                    </select>

                    <input
                        type="tel"
                        placeholder="Enter Phone Number *"
                        className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Preferred Area"
                        className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
                        value={preferredArea}
                        onChange={(e) => setPreferredArea(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-200 transition disabled:opacity-50"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                    </button>
                </form>
            </div>

            <AnimatePresence>
                {modalMessage && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={`pointer-events-auto max-w-sm w-full mx-4 rounded-lg p-6 shadow-xl text-center backdrop-blur-md bg-white/30 border border-white/20 ${modalError ? 'border-red-400' : 'border-green-400'
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
        </div>
    );
} 