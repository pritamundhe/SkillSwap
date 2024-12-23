import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10">
      <div className="container mx-auto px-4">
        {/* Top section - Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-4">About SkillSwap</h4>
            <ul className="space-y-2">
              <li><a href="/AboutUs" className="hover:text-gray-200 transition">About Us</a></li>
              <li><a href="/team" className="hover:text-gray-200 transition">Our Team</a></li>
              <li><a href="/careers" className="hover:text-gray-200 transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/help" className="hover:text-gray-200 transition">Help Center</a></li>
              <li><a href="/blog" className="hover:text-gray-200 transition">Blog</a></li>
              <li><a href="/PrivacyPolicy" className="hover:text-gray-200 transition">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect with Us</h4>
            <ul className="space-y-2">
              <li><a href="https://x.com/skillswapco" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">Twitter</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61567116972209" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">Facebook</a></li>
              <li><a href="http://linkedin.com/in/skillswap-co-5b9763334" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/TermsOfUse" className="hover:text-gray-200 transition">Terms of Use</a></li>
              <li><a href="/disclaimer" className="hover:text-gray-200 transition">Disclaimer</a></li>
              <li><a href="/ContactUs" className="hover:text-gray-200 transition">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section - Copyright */}
        <div className="text-center mt-10">
          <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
