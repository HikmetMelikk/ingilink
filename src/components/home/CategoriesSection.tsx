import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Volume2, Mic, PenTool, Eye, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    id: 'grammar',
    name: 'Grammar',
    description: 'Dilbilgisi kuralları ve uygulamaları',
    icon: BookOpen,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    count: 245,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    description: 'Kelime hazinesi ve kullanımları',
    icon: MessageCircle,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    count: 189,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'listening',
    name: 'Listening',
    description: 'Dinleme becerileri ve pratikleri',
    icon: Volume2,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    count: 156,
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'speaking',
    name: 'Speaking',
    description: 'Konuşma pratiği ve telaffuz',
    icon: Mic,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    count: 134,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'writing',
    name: 'Writing',
    description: 'Yazma becerileri ve teknikleri',
    icon: PenTool,
    color: 'bg-pink-500',
    lightColor: 'bg-pink-50',
    count: 98,
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'reading',
    name: 'Reading',
    description: 'Okuma anlama ve hız teknikleri',
    icon: Eye,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    count: 167,
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
]

export function CategoriesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kategoriler
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            İhtiyacınıza uygun kategoriyi seçin ve İngilizce öğrenme yolculuğunuza başlayın
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className={`absolute top-4 left-4 w-12 h-12 ${category.lightColor} rounded-full flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 text-gray-700`} />
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category.count} kaynak
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  <Button asChild variant="outline" className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200">
                    <Link href={`/resources?category=${category.id}`}>
                      Kaynakları Görüntüle
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/resources">
              Tüm Kategorileri Keşfet
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}