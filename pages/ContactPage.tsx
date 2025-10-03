import React, { useState } from 'react';
import { HomeHeader } from '../components/HomeHeader';
import { Footer } from '../components/Footer';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '../components/Icons';

const contactDetails = [
    {
        icon: MapPinIcon,
        title: 'Address',
        lines: ['New Baneshwor, Kathmandu', 'Nepal 44600'],
    },
    {
        icon: PhoneIcon,
        title: 'Phone',
        lines: ['+977 9813478706'],
    },
    {
        icon: EnvelopeIcon,
        title: 'Email',
        lines: ['info@babaltools.com'],
    },
    {
        icon: ClockIcon,
        title: 'Business Hours',
        lines: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'],
    }
];

const faqs = [
    {
        question: 'Are your tools really free?',
        answer: 'Yes! All our tools are completely free to use with no hidden costs, subscriptions, or limitations. We believe in making productivity tools accessible to everyone.',
    },
    {
        question: 'Do you store my data?',
        answer: 'No, we don\'t store any of your data. All processing happens locally in your browser, ensuring complete privacy and security.',
    },
    {
        question: 'Can I use these tools on mobile?',
        answer: 'Absolutely! All our tools are fully responsive and work perfectly on desktop, tablet, and mobile devices.',
    },
    {
        question: 'How can I suggest a new tool?',
        answer: 'We\'d love to hear your ideas! Use the contact form above or email us directly at info@babaltools.com with your suggestions.',
    },
    {
        question: 'Do you offer API access?',
        answer: 'API access is currently in development. We\'ll announce it on our blog and newsletter when it becomes available.',
    },
    {
        question: 'Can I integrate these tools into my website?',
        answer: 'Yes! You can embed our tools into your website using iframes or by linking to our individual tool pages.',
    },
];

export const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic, e.g., send data to an API
        console.log('Form submitted:', formState);
        alert('Message sent! (Simulation)');
    };

    return (
        <div className="bg-light dark:bg-slate-900 text-gray-800 dark:text-gray-900">
            <HomeHeader />

            {/* Hero Section */}
            <section className="bg-primary pt-24 pb-16">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-indigo-200 mb-2">Home / Contact Us</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
                        Get in touch with us for support, feedback, or collaboration
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Get in Touch */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Get in Touch</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                We'd love to hear from you! Whether you have questions about our tools, need technical support, or want to suggest new features, we're here to help.
                            </p>
                            <div className="space-y-6">
                                {contactDetails.map((item, index) => (
                                    <div key={index} className="flex items-start p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                                            <item.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                                            {item.lines.map((line, lineIndex) => (
                                                <p key={lineIndex} className="text-gray-600 dark:text-gray-400">{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Send us a Message */}
                        <div>
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                                            <input type="text" name="firstName" id="firstName" value={formState.firstName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-slate-700 text-gray-800 dark:text-white" required />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                                            <input type="text" name="lastName" id="lastName" value={formState.lastName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-slate-700 text-gray-800 dark:text-white" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                        <input type="email" name="email" id="email" value={formState.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-slate-700 text-gray-800 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                                        <select name="subject" id="subject" value={formState.subject} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-slate-700 text-gray-800 dark:text-white" required>
                                            <option value="">Select a subject</option>
                                            <option value="support">Technical Support</option>
                                            <option value="feedback">Feedback & Suggestions</option>
                                            <option value="collaboration">Collaboration</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                        <textarea name="message" id="message" rows={5} value={formState.message} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-slate-700 text-gray-800 dark:text-white" placeholder="Tell us how we can help you..." required></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full py-3 px-6 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors duration-300">
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="bg-slate-100 dark:bg-black/20 py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{faq.question}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};