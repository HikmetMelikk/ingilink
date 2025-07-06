import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Target, Heart, Award, Globe, BookOpen } from 'lucide-react'
import Link from 'next/link'

const teamMembers = [
  {
    name: "Ahmet Yılmaz",
    role: "Kurucu & CEO",
    bio: "10 yıllık eğitim teknolojileri deneyimi ile İngilizce öğrenmeyi demokratikleştirmeyi hedefliyor.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    linkedin: "#"
  },
  {
    name: "Elif Kaya",
    role: "Eğitim Direktörü",
    bio: "Cambridge sertifikalı İngilizce öğretmeni. 15 yıllık öğretmenlik deneyimi.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300",
    linkedin: "#"
  },
  {
    name: "Mehmet Demir",
    role: "Teknoloji Direktörü",
    bio: "Full-stack geliştirici ve eğitim teknolojileri uzmanı. Modern öğrenme platformları geliştiriyor.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
    linkedin: "#"
  },
  {
    name: "Zeynep Özkan",
    role: "Topluluk Yöneticisi",
    bio: "Sosyal medya ve topluluk yönetimi uzmanı. Kullanıcı deneyimini sürekli iyileştiriyor.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300",
    linkedin: "#"
  }
]

const values = [
  {
    icon: BookOpen,
    title: "Kaliteli Eğitim",
    description: "Her seviyeden öğrenci için en kaliteli ve güncel İngilizce öğrenme kaynaklarını sunuyoruz."
  },
  {
    icon: Users,
    title: "Topluluk Odaklı",
    description: "Öğrenmenin sosyal bir süreç olduğuna inanıyor, güçlü bir topluluk oluşturuyoruz."
  },
  {
    icon: Globe,
    title: "Erişilebilirlik",
    description: "İngilizce öğrenmeyi herkese açık ve erişilebilir hale getirmeyi hedefliyoruz."
  },
  {
    icon: Heart,
    title: "Tutkulu Yaklaşım",
    description: "Eğitime olan tutkumuzla her gün daha iyi bir platform oluşturmaya çalışıyoruz."
  }
]

const stats = [
  { number: "10,000+", label: "Aktif Kullanıcı" },
  { number: "2,500+", label: "Paylaşılan Kaynak" },
  { number: "50,000+", label: "İndirme" },
  { number: "98%", label: "Kullanıcı Memnuniyeti" }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                İngilizce Öğrenmeyi
                <span className="text-blue-600 block">Herkes İçin Erişilebilir</span>
                Hale Getiriyoruz
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                ingilink, İngilizce öğrenmek isteyen herkesin kaliteli kaynaklara erişebileceği, 
                kendi deneyimlerini paylaşabileceği ve birlikte öğrenebileceği bir platform oluşturmak 
                amacıyla kurulmuştur.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-12">
                  <div className="flex items-center mb-4">
                    <Target className="w-8 h-8 text-blue-600 mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900">Misyonumuz</h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    İngilizce öğrenme sürecini kolaylaştırmak, kaliteli kaynakları bir araya getirmek 
                    ve öğrencilerin birbirlerinden öğrenebileceği bir topluluk oluşturmak. Herkesin 
                    kendi hızında ve kendi yöntemiyle İngilizce öğrenebileceği bir ortam sağlamak.
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <Award className="w-8 h-8 text-green-600 mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900">Vizyonumuz</h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Türkiye'nin en büyük İngilizce öğrenme kaynakları platformu olmak ve dünya çapında 
                    tanınan bir eğitim teknolojisi markası haline gelmek. İngilizce öğrenmeyi 
                    demokratikleştirerek dil bariyerlerini ortadan kaldırmak.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="İngilizce öğrenme"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold">2023</div>
                  <div className="text-sm">Kuruluş Yılı</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Değerlerimiz
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                ingilink'i oluştururken rehber aldığımız temel değerler
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Rakamlarla ingilink
              </h2>
              <p className="text-xl text-blue-100">
                Topluluğumuzun büyüklüğü ve etkisi
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ekibimiz
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                ingilink'i hayata geçiren tutkulu ve deneyimli ekibimizle tanışın
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Bizimle İngilizce Öğrenme Yolculuğuna Başla
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Binlerce kaliteli kaynak, destekleyici topluluk ve sürekli gelişen platform ile 
                İngilizce hedeflerine ulaş.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/register">
                    Ücretsiz Kayıt Ol
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/resources">
                    Kaynakları Keşfet
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}