import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { 
  Home, 
  Search, 
  BookOpen, 
  ArrowLeft,
  MapPin,
  Compass
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı - 404 | ingilink",
  description: "Aradığınız sayfa bulunamadı. ingilink'te İngilizce öğrenme kaynaklarını keşfetmeye devam edin.",
  robots: "noindex, nofollow",
};

const quickLinks = [
  {
    title: "Ana Sayfa",
    description: "ingilink'in ana sayfasına dönün",
    href: "/",
    icon: Home,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Kaynakları Keşfet",
    description: "İngilizce öğrenme kaynaklarına göz atın",
    href: "/resources",
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Kaynak Ara",
    description: "Aradığınız içeriği bulun",
    href: "/search",
    icon: Search,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Hakkımızda",
    description: "ingilink hakkında daha fazla bilgi edinin",
    href: "/about",
    icon: Compass,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="mx-auto px-4 py-20 container">
          <div className="mx-auto max-w-4xl text-center">
            {/* 404 Illustration */}
            <div className="relative mb-12">
              <div className="flex justify-center items-center mx-auto mb-8 w-64 h-64">
                {/* Animated 404 with floating elements */}
                <div className="relative">
                  <div className="font-bold text-8xl md:text-9xl text-gray-200 select-none">
                    404
                  </div>
                  
                  {/* Floating elements */}
                  <div className="top-4 -left-8 absolute bg-blue-100 rounded-full w-12 h-12 animate-bounce delay-100">
                    <div className="flex justify-center items-center w-full h-full">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="top-8 -right-6 absolute bg-green-100 rounded-full w-10 h-10 animate-bounce delay-300">
                    <div className="flex justify-center items-center w-full h-full">
                      <Search className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="bottom-6 -left-4 absolute bg-orange-100 rounded-full w-8 h-8 animate-bounce delay-500">
                    <div className="flex justify-center items-center w-full h-full">
                      <MapPin className="w-4 h-4 text-orange-600" />
                    </div>
                  </div>
                  
                  <div className="bottom-12 -right-8 absolute bg-purple-100 rounded-full w-14 h-14 animate-bounce delay-700">
                    <div className="flex justify-center items-center w-full h-full">
                      <Compass className="w-7 h-7 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-12">
              <h1 className="mb-4 font-bold text-gray-900 text-4xl md:text-5xl">
                Sayfa Bulunamadı
              </h1>
              <p className="mx-auto mb-6 max-w-2xl text-gray-600 text-xl leading-relaxed">
                Üzgünüz, aradığınız sayfa mevcut değil. Sayfa taşınmış, silinmiş 
                veya geçici olarak kullanılamıyor olabilir.
              </p>
              <p className="text-gray-500 text-lg">
                Endişelenmeyin! Size yardımcı olacak birkaç seçenek hazırladık.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mb-12">
              <div className="flex sm:flex-row flex-col justify-center gap-4 mb-8">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/">
                    <Home className="mr-2 w-5 h-5" />
                    Ana Sayfaya Dön
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-2"
                  onClick={() => window.history.back()}
                >
                  <button type="button">
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Geri Git
                  </button>
                </Button>
              </div>
            </div>

            {/* Quick Links Grid */}
            <div className="mb-12">
              <h2 className="mb-8 font-semibold text-gray-900 text-2xl">
                Popüler Sayfalar
              </h2>
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {quickLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Card 
                      key={link.href}
                      className="group shadow-md hover:shadow-xl border-0 transition-all duration-300 cursor-pointer"
                    >
                      <Link href={link.href}>
                        <CardContent className="p-6 text-center">
                          <div className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {link.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {link.description}
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Search Suggestion */}
            <Card className="mx-auto max-w-md border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-gray-900 text-lg">
                  Aradığınızı Bulamadınız mı?
                </h3>
                <p className="mb-4 text-gray-600 text-sm">
                  İhtiyacınız olan İngilizce öğrenme kaynağını aramayı deneyin
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700 w-full">
                  <Link href="/resources">
                    <Search className="mr-2 w-4 h-4" />
                    Kaynakları Ara
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Help Text */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                Hala sorun yaşıyorsanız,{" "}
                <Link 
                  href="/contact" 
                  className="font-medium text-blue-600 hover:text-blue-500 underline"
                >
                  bizimle iletişime geçin
                </Link>
                {" "}veya{" "}
                <Link 
                  href="/help" 
                  className="font-medium text-blue-600 hover:text-blue-500 underline"
                >
                  yardım merkezini
                </Link>
                {" "}ziyaret edin.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}