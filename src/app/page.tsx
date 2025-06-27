import { ArrowRight, Calendar, CheckCircle, FileText, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import Header from "./components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Sistema de Gestão para <span className="text-primary">Clínicas Veterinárias</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Gerencie consultas, pacientes e faturamento de forma simples e eficiente. Desenvolvido para facilitar o
              dia a dia dos profissionais veterinários.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/authentication">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-primary text-primary-foreground"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://github.com/michelenink/pet-clinic" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
                  Conhecer Recursos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="recursos" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Funcionalidades Completas</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sistema completo com todas as ferramentas necessárias para sua clínica
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 mx-auto bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Dashboard Analítico</CardTitle>
                <CardDescription>
                  Métricas em tempo real com gráficos de receita, agendamentos e top médicos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 mx-auto bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Gestão de Pacientes</CardTitle>
                <CardDescription>
                  Cadastro completo de proprietários com histórico de pets e informações de contato
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 mx-auto bg-primary/10">
                  <Image
                    src="/Logo.svg"
                    alt="PetClinic Logo"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
                <CardTitle>Gestão de Pets</CardTitle>
                <CardDescription>
                  Cadastro detalhado com espécie, raça, idade, sexo e histórico médico completo
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 mx-auto bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Gestão de Veterinários</CardTitle>
                <CardDescription>
                  Cadastro de profissionais com especialidades, horários e preços de consulta
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 mx-auto bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Sistema de Agendamentos</CardTitle>
                <CardDescription>
                  Agenda dinâmica por veterinário com verificação de disponibilidade em tempo real
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 mx-auto bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Sistema de Pagamentos</CardTitle>
                <CardDescription>
                  Integração completa com Stripe, planos de assinatura e histórico de transações
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="precos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Planos Simples</h2>
            <p className="text-xl text-gray-600">Escolha a opção que melhor se adapta à sua clínica</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Plano Anual</CardTitle>
                <CardDescription>Economize com o pagamento anual</CardDescription>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-gray-400 line-through">R$ 708</span>
                    <span className="text-4xl font-bold text-primary">
                      R$ 566
                    </span>
                  </div>
                  <span className="text-gray-600">/ano</span>
                  <div className="mt-2">
                    <span className="px-3 py-1 rounded-full text-sm font-medium text-primary-foreground bg-primary">
                      Economize 20%
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Todos os recursos inclusos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Usuários ilimitados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Suporte prioritário</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Migração gratuita</span>
                  </li>
                </ul>
                <Link href="/authentication">
                  <Button className="w-full bg-transparent" variant="outline">
                    Escolher Plano
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Plano Mensal</CardTitle>
                <CardDescription>Flexibilidade total, sem compromisso</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">
                    R$ 59
                  </span>
                  <span className="text-gray-600">/mês</span>
                  <div className="mt-2">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      Mais Flexível
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Todos os recursos inclusos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Usuários ilimitados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Cancele quando quiser</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Teste grátis de 30 dias</span>
                  </li>
                </ul>
                <Link href="/authentication">
                  <Button className="w-full bg-primary text-primary-foreground">
                    Começar Teste Grátis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="sobre" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sobre o Projeto</h2>
            <p className="text-lg text-gray-600">
              Sistema completo de gestão para clínicas veterinárias, desenvolvido com Next.js 15, TypeScript e
              PostgreSQL. Oferece interface moderna para gerenciar pacientes, pets, veterinários, agendamentos e
              pagamentos com integração Stripe.
            </p>
            <div className="grid gap-6 sm:grid-cols-3 mt-12">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-primary/10">
                  <span className="text-2xl font-bold text-primary">
                    React
                  </span>
                </div>
                <h3 className="font-semibold">Frontend Moderno</h3>
                <p className="text-sm text-gray-600">Next.js 15, TypeScript, PostgreSQL</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-primary/10">
                  <span className="text-2xl font-bold text-primary">
                    UX
                  </span>
                </div>
                <h3 className="font-semibold">Design Responsivo</h3>
                <p className="text-sm text-gray-600">Interface otimizada para todos os dispositivos</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-primary/10">
                  <span className="text-2xl font-bold text-primary">
                    API
                  </span>
                </div>
                <h3 className="font-semibold">Backend Robusto</h3>
                <p className="text-sm text-gray-600">Drizzle ORM, Better Auth, Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Entre em Contato</h2>
            <p className="text-lg text-gray-600">Interessado no projeto ou quer saber mais sobre o desenvolvimento?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://www.linkedin.com/in/michelenink/" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-primary text-primary-foreground"
                >
                  Ver no LinkedIn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image
                src="/Logo.svg"
                alt="PetClinic Logo"
                width={24}
                height={24}
                className="h-24 w-24"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">Projeto de demonstração • Desenvolvido para portfólio</p>
              <p className="text-gray-500 text-xs mt-1">&copy; 2025 - Todos os direitos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
