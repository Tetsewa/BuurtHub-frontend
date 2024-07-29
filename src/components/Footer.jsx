import React from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
    return (
        <footer className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-firstcolor p-6 md:p-8 lg:p-10 text-white font-body">
            
            <div className="p-3">
                <div className="text-mini">
                    <p className="font-bold mb-3 flex items-center">
                        <span className="mr-2 w-5 h-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 text-white"
                            >
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </span>
                        Address
                    </p>
                    <p className="mb-1 text-left">AB Lincolnstraat 4</p>
                    <p className="mb-1 text-left">6852 AB, Amsterdam</p>
                    
                </div>
            </div>

            <div className="p-3">
                <h3 className="font-bold -mt-3 mb-3 text-left">Contact Us</h3>
                <div className="flex mb-3 items-center">
                    <span className="inline-block mr-2 w-5 h-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-white"
                        >
                            <path d="M6.62 10.79a15.49 15.49 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.27 1.12.28 2.33.43 3.57.43.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.15 2.45.43 3.57.09.35 0 .74-.27 1.01l-2.2 2.2z" />
                        </svg>
                    </span>
                    <span>+31 2564 8550 62</span>
                </div>
                <div className="flex mb-3 items-center">
                    <span className="inline-block mr-2 w-5 h-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-white"
                        >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </span>
                    <span>info.buurthub@gmail.com</span>
                </div>
                <div className="mt- flex items-center space-x-3">
                    <SocialIcon url="https://x.com" target="_blank" rel="noopener noreferrer" fgColor="#ffffff" />
                    <SocialIcon url="https://facebook.com" target="_blank" rel="noopener noreferrer" fgColor="#ffffff" />
                    <SocialIcon url="https://instagram.com" target="_blank" rel="noopener noreferrer" fgColor="#ffffff" />
                    <SocialIcon url="https://youtube.com" target="_blank" rel="noopener noreferrer" fgColor="#ffffff" />
                    <SocialIcon url="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" fgColor="#ffffff" />
                </div>
            </div>

            <div className="md:col-span-2 lg:col-span-1 flex flex-col space-y-2">
                <h3 className="font-bold mb-3 text-left">Useful Links</h3>
                <ul className="list-none space-y-2 text-left">
                    <li><Link to="/about" className="text-white hover:text-indigo-400">About Us</Link></li>
                    <li><Link to="/signup" className="text-white hover:text-indigo-400">Sign Up</Link></li>
                    <li><Link to="/login" className="text-white hover:text-indigo-400">Log In</Link></li>
                </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-1 flex flex-col space-y-2">
                <h3 className="font-bold mb-3 text-left">Legal</h3>
                <ul className="list-none space-y-2 text-left">
                    <li><Link to="/terms-of-service" className="text-white hover:text-indigo-400">Terms of Service</Link></li>
                    <li><Link to="/FAQ" className="text-white hover:text-indigo-400">FAQ</Link></li>
                    <li><Link to="/privacy-policy" className="text-white hover:text-indigo-400">Privacy Policy</Link></li>
                </ul>
            </div>
        </footer>
    );
}
