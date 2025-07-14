// "use client"; // only for App Router projects

// import { useState } from "react";

// export default function ContactForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [lookingFor, setLookingFor] = useState("");
//   const [area, setArea] = useState("");
//   const [comments, setComments] = useState("");

// interface ExtraData {
//     question: string;
// }

// interface Payload {
//     formId: string;
//     name: string;
//     phone: string;
//     email: string;
//     extraData: ExtraData;
// }

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const payload: Payload = {
//         formId: "82979d81-f15e-4471-849a-ecb0ff41945e",
//         name,
//         phone,
//         email,
//         extraData: {
//         question: `${name} with phone ${phone} and email ${email} is interested in ${lookingFor} in ${area} and says: ${comments}`,        },
//     };

//     try {
//         const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/webhook/v1/form", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-PIXXI-TOKEN": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
//             },
//             body: JSON.stringify(payload),
//         });

//         const data = await res.json();
//         console.log("Response:", data);
//         alert("Form submitted successfully!");
//     } catch (err) {
//         console.error("Error submitting form:", err);
//         alert("Failed to submit form.");
//     }
// };

//   return (
//     <div className="bg-opacity-80 p-8 rounded-md w-full max-w-xl">
//       <h2 className="text-center text-3xl mb-6">Contact Us</h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter Full Name"
//           className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#606060]"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Enter Email Address"
//           className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#606060]"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="tel"
//           placeholder="Enter Phone Number"
//           className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#606060]"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <select
//           className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#606060]"
//           value={lookingFor}
//           onChange={(e) => setLookingFor(e.target.value)}
//           required
//         >
//           <option value="">What are you Looking for</option>
//           <option value="Buy">Buy</option>
//           <option value="Rent">Rent</option>
//         </select>
//         <select
//           className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#606060]"
//           value={area}
//           onChange={(e) => setArea(e.target.value)}
//           required
//         >
//           <option value="">Which Area are you Looking for</option>
//           <option>Palm Jumeriah</option>
//           <option>Arabian Ranches</option>
//           <option>Business Bay</option>
//           <option>Al Barsha</option>
//           <option>Al Barari</option>
//           <option>Dubai Marina</option>
//           <option>Jumeirah Village Circle (JVC)</option>
//           <option>Al Furjan</option>
//           <option>Downtown Dubai</option>
//           <option>Al Maktoum International Airport</option>
//           <option>Emaar South</option>
//           <option>Al Jaddaf</option>
//           <option>Deira</option>
//           <option>Al Wasl</option>
//           <option>Bluewaters Island</option>
//         </select>
//         <textarea
//           placeholder="Any Other Comments"
//           className="w-full bg-[#262626] text-[#606060] border border-[#262626] h-22 rounded px-4 py-2 text-sm"
//           value={comments}
//           onChange={(e) => setComments(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="w-full bg-white text-black py-2 rounded font-semibold"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [area, setArea] = useState("");
  const [comments, setComments] = useState("");

  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalError, setModalError] = useState<boolean>(false);

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

    const payload: Payload = {
      formId: "82979d81-f15e-4471-849a-ecb0ff41945e",
      name,
      phone,
      email,
      extraData: {
        question: `${name} with phone No. ${phone} and email ${email} is interested in ${lookingFor} in ${area} and says: ${comments}`,
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

      setModalMessage("Your message has been sent successfully! We'll get back to you soon.");
      setModalError(false);

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setLookingFor("");
      setArea("");
      setComments("");
    } catch (err) {
      console.error("Error submitting form:", err);
      setModalMessage("Oops! Something went wrong. Please try again later.");
      setModalError(true);
    }
  };

  return (
    <div className="relative z-10 flex items-center justify-center h-full px-4">
      <div className="bg-opacity-80 p-8 rounded-md w-full max-w-xl bg-[#111111] shadow-lg border border-[#222]">
        <h2 className="text-center text-3xl font-bold mb-6 text-white">Contact Us</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Full Name"
            className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter Email Address"
            className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Enter Phone Number"
            className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <select
            className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            required
          >
            <option value="">What are you Looking for</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
          <select
            className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#d0d0d0] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#444]"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          >
            <option value="">Which Area are you Looking for</option>
            <option>Palm Jumeirah</option>
            <option>Arabian Ranches</option>
            <option>Business Bay</option>
            <option>Al Barsha</option>
            <option>Al Barari</option>
            <option>Dubai Marina</option>
            <option>Jumeirah Village Circle (JVC)</option>
            <option>Al Furjan</option>
            <option>Downtown Dubai</option>
            <option>Al Maktoum International Airport</option>
            <option>Emaar South</option>
            <option>Al Jaddaf</option>
            <option>Deira</option>
            <option>Al Wasl</option>
            <option>Bluewaters Island</option>
          </select>
          <textarea
            placeholder="Any Other Comments"
            className="w-full bg-[#262626] text-[#d0d0d0] border border-[#262626] h-22 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#444]"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-200 transition"
          >
            Submit
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

    </div>
  );
}
