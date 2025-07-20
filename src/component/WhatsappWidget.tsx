

// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// const WhatsAppWidget = () => {
//     const [showMessage, setShowMessage] = useState(false);

//     useEffect(() => {
//         // Show the message bubble for 5 seconds on first render
//         setShowMessage(true);
//         const timer = setTimeout(() => setShowMessage(false), 5000);
//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2 group">
//             {/* Message bubble animation */}
//             {showMessage && (
//                 <div className="animate-fade-in bg-white text-black text-sm px-4 py-2 rounded-lg shadow-md max-w-[200px] transition-opacity duration-500">
//                     👋 Chat with us on WhatsApp!
//                 </div>
//             )}

//             {/* WhatsApp Floating Button */}
//             <a
//                 href="https://wa.me/971529323341"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
//                 title="Chat with us on WhatsApp"
//             >
//                 <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={28} height={28} />
//             </a>
//         </div>
//     );
// };

// export default WhatsAppWidget;

//version2
// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import Image from 'next/image';

// const WhatsAppWidget = () => {
//     const [showMessage, setShowMessage] = useState(false);
//     const [permanentlyClosed, setPermanentlyClosed] = useState(false);
//     const intervalRef = useRef<NodeJS.Timeout | null>(null);

//     useEffect(() => {
//         if (permanentlyClosed) return;

//         const showPopup = () => {
//             setShowMessage(true);
//             setTimeout(() => {
//                 setShowMessage(false);
//             }, 200000);
//         };

//         // Show the first popup immediately
//         showPopup();

//         // Then continue every 10 seconds
//         intervalRef.current = setInterval(() => {
//             showPopup();
//         }, 10000);

//         return () => {
//             if (intervalRef.current) clearInterval(intervalRef.current);
//         };
//     }, [permanentlyClosed]);

//     const handleClose = () => {
//         setShowMessage(false);
//         setPermanentlyClosed(true); // stop future popups
//     };

//     return (
//         <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
//             {/* Popup Message */}
//             {showMessage && !permanentlyClosed && (
//                 <div className="relative flex gap-10 animate-fade-in bg-white text-black text-sm px-4 py-3 rounded-lg shadow-md max-w-[220px] transition-opacity duration-500">
//                     <div className=''>    👋 Chat with us on WhatsApp!</div>
//                     <button
//                         className="  text-gray-500 hover:text-red-500 text-sm"
//                         onClick={handleClose}
//                         title="Close"
//                     >
//                         ✕
//                     </button>

//                 </div>
//             )}

//             {/* WhatsApp Floating Button */}
//             <a
//                 href="https://wa.me/971529323341"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
//                 title="Chat with us on WhatsApp"
//             >
//                 <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={28} height={28} />
//             </a>
//         </div>
//     );
// };

// export default WhatsAppWidget;

//version 2
// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import Image from 'next/image';

// const WhatsAppWidget = () => {
//     const [showMessage, setShowMessage] = useState(false);
//     const [autoTriggerDisabled, setAutoTriggerDisabled] = useState(false);
//     const intervalRef = useRef<NodeJS.Timeout | null>(null);
//     const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//     // Show popup temporarily
//     const showPopup = () => {
//         setShowMessage(true);
//         clearTimeout(timeoutRef.current!);
//         timeoutRef.current = setTimeout(() => {
//             setShowMessage(false);
//         }, 3000);
//     };

//     useEffect(() => {
//         if (autoTriggerDisabled) return;

//         showPopup(); // Show initially

//         intervalRef.current = setInterval(() => {
//             showPopup();
//         }, 10000);

//         return () => {
//             clearInterval(intervalRef.current!);
//             clearTimeout(timeoutRef.current!);
//         };
//     }, [autoTriggerDisabled]);

//     const handleClose = () => {
//         setShowMessage(false);
//         setAutoTriggerDisabled(true); // stop only the interval, allow hover
//     };

//     const handleHover = () => {
//         showPopup(); // allow hover to always show
//     };

//     return (
//         <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
//             {/* Popup Message */}
//             {showMessage && (
//                 // <div className="relative flex gap-10 animate-fade-in bg-white text-black text-sm px-4 py-3 rounded-lg shadow-md max-w-[220px] transition-opacity duration-500">
//                 //     <div>👋 Chat with us on WhatsApp!</div>
//                 //     <button
//                 //         className="text-gray-500 hover:text-red-500 text-sm"
//                 //         onClick={handleClose}
//                 //         title="Close"
//                 //     >
//                 //         ✕
//                 //     </button>
//                 // </div>

//                 //version 2
//                 // <div className="relative w-80 animate-fade-in bg-white text-black rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-opacity duration-500">
//                 //     {/* Header */}
//                 //     <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//                 //         <div className="flex items-center space-x-2">
//                 //             <Image
//                 //                 src="/whatsapp-icon.svg"
//                 //                 alt="WhatsApp"
//                 //                 width={24}
//                 //                 height={24}
//                 //                 className="min-w-[24px]"
//                 //             />
//                 //             <div>
//                 //                 <p className="text-sm font-semibold text-gray-900">Sartawi Group</p>
//                 //                 <p className="text-xs text-gray-500">Customer Support</p>
//                 //             </div>
//                 //         </div>
//                 //         <button
//                 //             onClick={handleClose}
//                 //             className="text-gray-400 hover:text-red-500 text-xl leading-none"
//                 //             title="Close"
//                 //         >
//                 //             ✕
//                 //         </button>
//                 //     </div>

//                 //     {/* Message Body */}
//                 //     <div className="px-4 py-3 text-sm text-gray-800">
//                 //         <p>👋 Hi, Welcome to Sartawi Group</p>
//                 //         <p>How can we help you?</p>
//                 //     </div>

//                 //     {/* Send Message Button */}
//                 //     <div className="px-4 pb-4 pt-2">
//                 //         <a
//                 //             href="https://wa.me/971529323341"
//                 //             target="_blank"
//                 //             rel="noopener noreferrer"
//                 //             className="block w-full text-center bg-green-500 hover:bg-green-600 text-white text-sm py-2.5 rounded-md font-medium transition-all duration-300"
//                 //         >
//                 //             Send A Message
//                 //         </a>
//                 //     </div>
//                 // </div>
//                 <div className="relative w-72 sm:w-80 animate-fade-in bg-white text-black rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-opacity duration-500">
//                     {/* Header */}
//                     <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
//                         <div className="flex items-center space-x-2">
//                             <Image
//                                 src="/whatsapp-icon.svg"
//                                 alt="WhatsApp"
//                                 width={20}
//                                 height={20}
//                                 className="min-w-[20px]"
//                             />
//                             <div>
//                                 <p className="text-sm font-semibold text-gray-900 leading-tight">Sartawi Group</p>
//                                 <p className="text-xs text-gray-500 leading-none">Customer Support</p>
//                             </div>
//                         </div>
//                         <button
//                             onClick={handleClose}
//                             className="text-gray-400 hover:text-red-500 text-lg leading-none"
//                             title="Close"
//                         >
//                             ✕
//                         </button>
//                     </div>

//                     {/* Message Body */}
//                     <div className="px-3 py-2 text-sm text-gray-800 leading-snug">
//                         <p>👋 Welcome! How can we help you?</p>
//                     </div>

//                     {/* Send Message Button */}
//                     <div className="px-3 pb-3 pt-1">
//                         <a
//                             href="https://wa.me/971529323341"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="block w-full text-center bg-green-500 hover:bg-green-600 text-white text-[13px] py-2 rounded-md font-medium transition-all duration-300"
//                         >
//                             Send A Message
//                         </a>
//                     </div>
//                 </div>


//             )}

//             {/* WhatsApp Button */}
//             <a
//                 href="https://wa.me/971529323341"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onMouseEnter={handleHover}
//                 className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
//                 title="Chat with us on WhatsApp"
//             >
//                 <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={28} height={28} />
//             </a>
//         </div>
//     );
// };

// export default WhatsAppWidget;


//version 3
// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import Image from 'next/image';

// const WhatsAppWidget = () => {
//     const [showMessage, setShowMessage] = useState(false);
//     const [hasShownInitially, setHasShownInitially] = useState(false);
//     const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//     // Show the popup for 3 seconds on first load
//     useEffect(() => {
//         if (!hasShownInitially) {
//             setShowMessage(true);
//             timeoutRef.current = setTimeout(() => {
//                 setShowMessage(false);
//             }, 3000);
//             setHasShownInitially(true);
//         }

//         return () => {
//             clearTimeout(timeoutRef.current!);
//         };
//     }, [hasShownInitially]);

//     const handleClose = () => {
//         setShowMessage(false);
//     };

//     const handleMouseEnter = () => {
//         setShowMessage(true);
//     };

//     const handleMouseLeave = () => {
//         setShowMessage(false);
//     };

//     return (
//         <div
//             className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//         >
//             {/* Popup Message */}
//             {showMessage && (
//                 <div className="relative w-72 sm:w-80 animate-fade-in bg-white text-black rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-opacity duration-500">
//                     {/* Header */}
//                     <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
//                         <div className="flex items-center space-x-2">
//                             <Image
//                                 src="/whatsapp-icon.svg"
//                                 alt="WhatsApp"
//                                 width={20}
//                                 height={20}
//                                 className="min-w-[20px]"
//                             />
//                             <div>
//                                 <p className="text-sm font-semibold text-gray-900 leading-tight">Sartawi Group</p>
//                                 <p className="text-xs text-gray-500 leading-none">Customer Support</p>
//                             </div>
//                         </div>
//                         <button
//                             onClick={handleClose}
//                             className="text-gray-400 hover:text-red-500 text-lg leading-none"
//                             title="Close"
//                         >
//                             ✕
//                         </button>
//                     </div>

//                     {/* Message Body */}
//                     <div className="px-3 py-2 text-sm text-gray-800 leading-snug">
//                         <p>👋 Welcome! How can we help you?</p>
//                     </div>

//                     {/* Send Message Button */}
//                     <div className="px-3 pb-3 pt-1">
//                         <a
//                             href="https://wa.me/971529323341"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="block w-full text-center bg-green-500 hover:bg-green-600 text-white text-[13px] py-2 rounded-md font-medium transition-all duration-300"
//                         >
//                             Send A Message
//                         </a>
//                     </div>
//                 </div>
//             )}

//             {/* WhatsApp Button */}
//             <a
//                 href="https://wa.me/971529323341"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
//                 title="Chat with us on WhatsApp"
//             >
//                 <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={28} height={28} />
//             </a>
//         </div>
//     );
// };

// export default WhatsAppWidget;


//vesrion 4

'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const WhatsAppWidget = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [hasShownInitially, setHasShownInitially] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Auto show popup on load (for 3 seconds)
    useEffect(() => {
        if (!hasShownInitially) {
            setShowMessage(true);
            timeoutRef.current = setTimeout(() => {
                setShowMessage(false);
            }, 3000);
            setHasShownInitially(true);
        }

        return () => {
            clearTimeout(timeoutRef.current!);
        };
    }, [hasShownInitially]);

    const handleClose = () => {
        setShowMessage(false);
    };

    const handleMouseEnter = () => {
        setShowMessage(true);
    };

    const handleMouseLeave = () => {
        setShowMessage(false);
    };

    const handleIconClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent WhatsApp redirect
        setShowMessage(true);
    };

    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Popup Message */}
            {showMessage && (
                <div className="relative w-72 sm:w-80 animate-fade-in bg-white text-black rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-opacity duration-500">
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                            <Image
                                src="/whatsapp-icon.svg"
                                alt="WhatsApp"
                                width={20}
                                height={20}
                                className="min-w-[20px]"
                            />
                            <div>
                                <p className="text-sm font-semibold text-gray-900 leading-tight">Sartawi Group</p>
                                <p className="text-xs text-gray-500 leading-none">Customer Support</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-red-500 text-lg leading-none"
                            title="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Message Body */}
                    <div className="px-3 py-2 text-sm text-gray-800 leading-snug">
                        <p>👋 Welcome! How can we help you?</p>
                    </div>

                    {/* Send Message Button */}
                    <div className="px-3 pb-3 pt-1">
                        <a
                            href="https://wa.me/971529323341"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-green-500 hover:bg-green-600 text-white text-[13px] py-2 rounded-md font-medium transition-all duration-300"
                        >
                            Send A Message
                        </a>
                    </div>
                </div>
            )}

            {/* WhatsApp Button (click opens popup instead of redirecting) */}
            <button
                onClick={handleIconClick}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
                title="Chat with us on WhatsApp"
            >
                <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={28} height={28} />
            </button>
        </div>
    );
};

export default WhatsAppWidget;
