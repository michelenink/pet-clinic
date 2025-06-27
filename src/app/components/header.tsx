"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/Logo.svg"
              alt="PetClinic Logo"
              width={32}
              height={32}
              className="h-24 w-24"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#recursos" className="text-gray-600 hover:text-gray-900 transition-colors">
              Recursos
            </Link>
            <Link href="#precos" className="text-gray-600 hover:text-gray-900 transition-colors">
              Preços
            </Link>
            <Link href="#sobre" className="text-gray-600 hover:text-gray-900 transition-colors">
              Sobre
            </Link>
            <Link href="#contato" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contato
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/authentication">
              <Button variant="outline">Fazer Login</Button>
            </Link>
            <Link href="/authentication">
              <Button className="bg-primary text-primary-foreground">
                Começar Agora
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className="block w-6 h-0.5 bg-gray-600"></span>
              <span className="block w-6 h-0.5 bg-gray-600"></span>
              <span className="block w-6 h-0.5 bg-gray-600"></span>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="#recursos" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Recursos
              </Link>
              <Link 
                href="#precos" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Preços
              </Link>
              <Link 
                href="#sobre" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                href="#contato" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Link href="/authentication">
                  <Button variant="outline" className="w-full">
                    Fazer Login
                  </Button>
                </Link>
                <Link href="/authentication">
                  <Button className="bg-primary text-primary-foreground w-full">
                    Começar Agora
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
