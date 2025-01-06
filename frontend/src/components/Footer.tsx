import { Phone, Mail, Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0F0B1B] text-white py-16">
      <div className="max-w-[2000px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* TechHaven Section */}
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              TechHaven
            </h1>
            <div className="space-y-2 text-gray-400">
              <p>FakeCompany</p>
              <p>Fake Random Street</p>
              <p>City 0000 Country</p>
              <p className="text-[#FF1B83]">info@techhaven.ee</p>
              <div className="flex justify-center mt-4">
                <img 
                  src="https://www.smiledental.co.nz/wp-content/uploads/2024/03/png-transparent-visa-mastercard-logo-visa-mastercard-computer-icons-visa-text-payment-logo.png" 
                  alt="Visa and Mastercard" 
                  className="h-8" 
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="md:ml-auto">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone className="text-gray-400" size={20} />
                <span className="text-gray-400 text-sm">(+999) 999 9999</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="text-gray-400" size={20} />
                <span className="text-gray-400 text-sm">info@techhaven.ee</span>
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-[#FF1B83] hover:text-pink-400">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-[#FF1B83] hover:text-pink-400">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Sales Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sales information</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms and conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Warranty terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Delivery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Partpayment</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">14-day returns</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Stores</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Business client</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Warranty and repairs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Order tracking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">User manuals</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Copyright © 2025 TechHaven OÜ, Estonia. All rights reserved.
            </p>
            <button className="text-gray-400 hover:text-white text-sm">
              Manage cookie preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
