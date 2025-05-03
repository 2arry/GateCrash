import { Link } from "react-router-dom";
import { ConnectButton } from "@mysten/dapp-kit";
import { cn } from "../../utils/helpers/helpers";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  className?: string;
};

const Navbar = ({ className }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className={cn("border-b", className)}>
      <div className="container flex h-24 items-center justify-between py-4 relative">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-ticket to-ticket-secondary bg-clip-text text-transparent">
              <img
                src="/logo.png"
                alt="GateCrash Logo"
                width={100}
                height={100}
              />
            </span>
          </Link>

          <nav className="hidden md:flex gap-6 mt-[21px]">
            <Link
              to="/marketplace"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Marketplace
            </Link>
            <Link
              to="/my-tickets"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              My Tickets
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Organizer
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ConnectButton />
        </div>

        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {menuOpen && (
          <nav className="absolute top-full left-0 w-full bg-white shadow-md border-t z-50 flex flex-col items-start px-6 py-4 md:hidden">
            <Link
              to="/marketplace"
              onClick={toggleMenu}
              className="py-2 text-sm font-medium w-full hover:text-primary"
            >
              Marketplace
            </Link>
            <Link
              to="/my-tickets"
              onClick={toggleMenu}
              className="py-2 text-sm font-medium w-full hover:text-primary"
            >
              My Tickets
            </Link>
            <Link
              to="/dashboard"
              onClick={toggleMenu}
              className="py-2 text-sm font-medium w-full hover:text-primary"
            >
              Organizer
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
