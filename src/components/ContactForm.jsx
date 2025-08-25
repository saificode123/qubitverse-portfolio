import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiPhone, FiUser, FiSend, FiCheckCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

const ContactForm = ({ isOpen, onClose }) => {
    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSending(true); // Start sending process

        try {
            await emailjs.sendForm('service_q4fpt88', 'template_gmw9vyq', form.current, {
                publicKey: 'zDJ-_k92h1yem_ZLt',
            });
            console.log('SUCCESS!');
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
            }, 3000); // Close modal after 3 seconds
        } catch (error) {
            console.log('FAILED...', error.text);
            setIsSuccess(false);
            alert('Failed to send message. Please try again.');
        } finally {
            setIsSending(false); // End sending process
        }
    };
    
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, rotateX: -15 }}
                        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                        exit={{ scale: 0.8, opacity: 0, rotateX: 10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md border border-white/20 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative p-6 pb-4 bg-gradient-to-r from-violet-600/10 to-purple-600/10">
                            <motion.button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-white/20 transition-colors duration-300"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiX className="w-5 h-5" />
                            </motion.button>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2"
                            >
                                Let's Connect
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-gray-600 dark:text-gray-400"
                            >
                                Ready to bring your ideas to life?
                            </motion.p>
                        </div>
                        <form ref={form} onSubmit={sendEmail} className="p-6 space-y-5">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <FiCheckCircle className="w-16 h-16 text-green-500 mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Message Sent!</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                                        Thank you for contacting us. We will get back to you shortly.
                                    </p>
                                </motion.div>
                            ) : (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="relative"
                                    >
                                        <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Name
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-800 dark:text-white transition-all duration-300 hover:border-violet-400"
                                                placeholder="Your Name"
                                                required
                                            />
                                            <FiUser className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="relative"
                                    >
                                        <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-800 dark:text-white transition-all duration-300 hover:border-violet-400"
                                                placeholder="your@email.com"
                                                required
                                            />
                                            <FiMail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </motion.div>
                                    {/* New input for 'title' */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="relative"
                                    >
                                        <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Subject
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="title"
                                                name="title" // This name matches {{title}} in your template
                                                className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-800 dark:text-white transition-all duration-300 hover:border-violet-400"
                                                placeholder="Subject of your message"
                                                required
                                            />
                                            <FiUser className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="relative"
                                    >
                                        <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-800 dark:text-white transition-all duration-300 hover:border-violet-400"
                                                placeholder="+92 300-1234567"
                                            />
                                            <FiPhone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Message
                                        </div>
                                        <div className="relative">
                                            <textarea
                                                rows="4"
                                                id="message"
                                                name="message"
                                                className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-800 dark:text-white transition-all duration-300 hover:border-violet-400"
                                                placeholder="How can we help you?"
                                                required
                                            />
                                            <FiSend className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 rotate-45 transform" />
                                        </div>
                                    </motion.div>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        onSubmit={sendEmail}
                                        disabled={isSending}
                                        className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-violet-600/50 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSending ? (
                                            <>
                                                <span>Sending...</span>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <FiSend className="w-5 h-5" />
                                            </>
                                        )}
                                    </motion.button>
                                </>
                            )}
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContactForm;