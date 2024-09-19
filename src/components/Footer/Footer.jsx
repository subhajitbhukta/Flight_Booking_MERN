import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-8 md:p-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">JetQuest</h3>
                        <p className="mb-4">Your trusted partner for booking flights worldwide. We offer the best deals and exceptional service.</p>
                        <p>&copy; {new Date().getFullYear()} JetQuest. All rights reserved.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="hover:underline">Home</a></li>
                            <li><a href="#flights" className="hover:underline">Flights</a></li>
                            <li><a href="#about" className="hover:underline">About Us</a></li>
                            <li><a href="#contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="mb-2">1234 JetQuest Lane</p>
                        <p className="mb-2">Flight City, FL 12345</p>
                        <p className="mb-2">Phone: (123) 456-7890</p>
                        <p className="mb-2">Email: support@jetquest.com</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
