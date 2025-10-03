import React from 'react';
import { 
    RocketLaunchIcon,
    ShieldCheckIcon,
    DevicePhoneMobileIcon,
    HeartIcon,
    LightBulbIcon,
    UsersIcon,
    TrophyIcon
} from '../components/Icons';

const features = [
    {
        icon: RocketLaunchIcon,
        title: 'Fast & Efficient',
        description: 'Our tools are optimized for speed and performance, delivering instant results without compromising quality.',
    },
    {
        icon: ShieldCheckIcon,
        title: 'Secure & Private',
        description: 'All data processing happens locally in your browser. We don\'t store or track your personal information.',
    },
    {
        icon: DevicePhoneMobileIcon,
        title: 'Mobile Friendly',
        description: 'Our tools work seamlessly across all devices - desktop, tablet, and mobile - with responsive design.',
    },
    {
        icon: HeartIcon,
        title: 'Free Forever',
        description: 'All our tools are completely free to use with no hidden costs, subscriptions, or limitations.',
    }
];

const teamValues = [
    {
        icon: LightBulbIcon,
        title: 'Innovation',
        description: 'We constantly explore new technologies and methodologies to improve our tools.',
    },
    {
        icon: UsersIcon,
        title: 'User-Centric',
        description: 'Every decision we make is guided by what\'s best for our users.',
    },
    {
        icon: TrophyIcon,
        title: 'Quality',
        description: 'We maintain the highest standards in everything we build and deliver.',
    }
];

export default function AboutPage() {
    return (
        <div className="bg-light dark:bg-slate-900 text-gray-800 dark:text-gray-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 pt-32 pb-16">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-indigo-200 mb-2">Home / About Us</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Babal Tools</h1>
                    <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
                        Empowering productivity through innovative digital tools
                    </p>
                </div>
            </section>

            {/* Main Content Sections */}
            <div className="py-20">
                <div className="container mx-auto px-6 space-y-20">

                    {/* Our Mission */}
                    <section className="text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            At Babal Tools, we believe that technology should simplify life, not complicate it. Our mission is to provide powerful, easy-to-use digital tools that enhance productivity and efficiency for individuals and businesses worldwide.
                        </p>
                    </section>

                    {/* What We Do */}
                    <section>
                        <div className="text-center max-w-4xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">What We Do</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                We develop and maintain a comprehensive suite of digital tools designed to solve real-world problems. From text conversion and QR code generation to invoice creation and time management, our tools are built with the user in mind.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center">
                                    <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                                        <feature.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Our Impact */}
                    <section className="text-center">
                         <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12">Our Impact</h2>
                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                                <p className="text-5xl font-extrabold text-primary mb-2">17+</p>
                                <p className="text-lg text-gray-600 dark:text-gray-400">Powerful Tools</p>
                            </div>
                             <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                                <p className="text-5xl font-extrabold text-primary mb-2">50K+</p>
                                <p className="text-lg text-gray-600 dark:text-gray-400">Users Worldwide</p>
                            </div>
                             <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                                <p className="text-5xl font-extrabold text-primary mb-2">1M+</p>
                                <p className="text-lg text-gray-600 dark:text-gray-400">Tasks Completed</p>
                            </div>
                             <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                                <p className="text-5xl font-extrabold text-primary mb-2">99.9%</p>
                                <p className="text-lg text-gray-600 dark:text-gray-400">Uptime</p>
                            </div>
                         </div>
                    </section>

                    {/* Our Team */}
                    <section>
                         <div className="text-center max-w-4xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Our Team</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                We're a passionate team of developers, designers, and product managers who are dedicated to creating tools that make a difference. Our diverse backgrounds and expertise allow us to build solutions that work for everyone.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {teamValues.map((value, index) => (
                                 <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full mr-4">
                                            <value.icon className="w-6 h-6 text-primary"/>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{value.title}</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Our Tool Categories */}
                    <section>
                        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Our Tool Categories</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 dark:text-white">Text & Language Tools</h3>
                                <p className="text-gray-600 dark:text-gray-400">Text case conversion, Preeti to Unicode, Roman to Unicode, and Nepali typing tools.</p>
                            </div>
                             <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 dark:text-white">Business & Finance</h3>
                                <p className="text-gray-600 dark:text-gray-400">Invoice generation, EMI calculation, currency conversion, and domain tools.</p>
                            </div>
                             <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 dark:text-white">Time & Productivity</h3>
                                <p className="text-gray-600 dark:text-gray-400">Stopwatch, timer, age calculator, and time management tools.</p>
                            </div>
                             <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 dark:text-white">Technical Tools</h3>
                                <p className="text-gray-600 dark:text-gray-400">QR code generation, barcode scanning, date conversion, and postal code lookup.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md lg:col-start-2">
                                <h3 className="text-xl font-semibold mb-2 dark:text-white">Academic Tools</h3>
                                <p className="text-gray-600 dark:text-gray-400">GPA calculator, grade point calculation, and educational utilities.</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            {/* Looking Forward Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="bg-primary text-white text-center p-12 rounded-2xl max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-4">Looking Forward</h2>
                        <p className="text-lg text-indigo-200 mb-6">
                            We're constantly working on new tools and features to expand our platform. Our roadmap includes advanced analytics, team collaboration features, API access, and many more exciting developments.
                        </p>
                        <p className="text-lg font-semibold">
                            Join us on this journey as we continue to build the future of digital productivity tools.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};
