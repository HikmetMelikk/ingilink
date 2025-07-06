import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedResources } from '@/components/home/FeaturedResources'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { CTASection } from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedResources />
        <CategoriesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}