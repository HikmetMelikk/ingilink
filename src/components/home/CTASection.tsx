import { Button } from '@/components/ui/button'
import { Upload, Users, Star } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Topluluğa Katıl ve Katkıda Bulun
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Binlerce öğrenci ile birlikte İngilizce öğrenme yolculuğunda ilerleyin. 
            Kendi kaynaklarınızı paylaşın ve topluluktan geri bildirim alın.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kaynak Paylaş</h3>
              <p className="opacity-90">Kendi materyallerinizi yükleyin ve toplulukla paylaşın</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Topluluk</h3>
              <p className="opacity-90">Diğer öğrencilerle etkileşime geçin ve deneyim paylaşın</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Değerlendir</h3>
              <p className="opacity-90">Kaynakları değerlendirin ve kaliteli içeriği destekleyin</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/register">
                Ücretsiz Kayıt Ol
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/upload">
                İlk Kaynağını Yükle
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}