"use client";

import { Menu, PawPrint, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <PawPrint className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">PetClinic</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <button
            onClick={() => scrollToSection("recursos")}
            className="cursor-pointer text-sm font-medium transition-colors hover:text-blue-600"
          >
            Recursos
          </button>
          <button
            onClick={() => scrollToSection("precos")}
            className="cursor-pointer text-sm font-medium transition-colors hover:text-blue-600"
          >
            Preços
          </button>
          <button
            onClick={() => scrollToSection("sobre")}
            className="cursor-pointer text-sm font-medium transition-colors hover:text-blue-600"
          >
            Sobre
          </button>
          <button
            onClick={() => scrollToSection("contato")}
            className="cursor-pointer text-sm font-medium transition-colors hover:text-blue-600"
          >
            Contato
          </button>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="outline" asChild>
            <Link href="/authentication">Login</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center justify-center md:hidden"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col bg-white p-6 md:hidden">
          <nav className="mb-8 flex flex-col gap-6">
            <button
              onClick={() => scrollToSection("recursos")}
              className="text-left text-lg font-medium transition-colors hover:text-blue-600"
            >
              Recursos
            </button>
            <button
              onClick={() => scrollToSection("precos")}
              className="text-left text-lg font-medium transition-colors hover:text-blue-600"
            >
              Preços
            </button>
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-left text-lg font-medium transition-colors hover:text-blue-600"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-left text-lg font-medium transition-colors hover:text-blue-600"
            >
              Contato
            </button>
          </nav>

          <div className="flex flex-col gap-4">
            <Button variant="outline" className="w-full" asChild>
              <Link
                href="/authentication"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link
                href="/authentication"
                onClick={() => setMobileMenuOpen(false)}
              >
                Começar agora
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
