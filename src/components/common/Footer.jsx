import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import useStore from "../../store/useStore";

export default function Footer() {
  const year = new Date().getFullYear();
  const theme = useStore((s) => s.theme);

  return (
    <footer className="bg-brand dark:bg-gray-900 text-white mt-20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="h-16 mb-5 flex items-center">
              <img
                src="/assets/IMG_1105.PNG"
                alt="BMAN"
                className="h-full w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium garments crafted for the modern man. Quality fabric,
              timeless style.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-5 text-gray-300">
              Information & Services
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", to: "/about" },
                { label: "Size Guide", to: "/size-guide" },
                { label: "Blog", to: "/blog" },
                { label: "Contact", to: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-accent text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-5 text-gray-300">
              My Account & Payments
            </h3>
            <ul className="space-y-3">
              {[
                { label: "My Account", to: "/account" },
                { label: "Track Order", to: "/account" },
                { label: "Returns & Exchange", to: "/returns" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms & Conditions", to: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-accent text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-5 text-gray-300">
              Sign Up For Newsletter
            </h3>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-0 mb-6"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-gray-800 dark:bg-gray-700 text-white text-sm px-4 py-3 focus:outline-none placeholder:text-gray-500 border border-gray-700 dark:border-gray-600"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-dark text-white px-4 py-3 text-sm font-medium transition-colors"
              >
                →
              </button>
            </form>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>+8801336619767</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>hello@bman.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Cumilla, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-2 text-gray-500 text-xs">
          <p>© {year} BMAN. All Rights Reserved.</p>
          <p>Designed & Built with ♥</p>
        </div>
      </div>
    </footer>
  );
}
