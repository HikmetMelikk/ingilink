import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Globe, Heart, Target, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
	{
		name: "Ahmet Yılmaz",
		role: "Kurucu & CEO",
		bio: "10 yıllık eğitim teknolojileri deneyimi ile İngilizce öğrenmeyi demokratikleştirmeyi hedefliyor.",
		image:
			"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
		linkedin: "#",
	},
	{
		name: "Elif Kaya",
		role: "Eğitim Direktörü",
		bio: "Cambridge sertifikalı İngilizce öğretmeni. 15 yıllık öğretmenlik deneyimi.",
		image:
			"https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300",
		linkedin: "#",
	},
	{
		name: "Mehmet Demir",
		role: "Teknoloji Direktörü",
		bio: "Full-stack geliştirici ve eğitim teknolojileri uzmanı. Modern öğrenme platformları geliştiriyor.",
		image:
			"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
		linkedin: "#",
	},
	{
		name: "Zeynep Özkan",
		role: "Topluluk Yöneticisi",
		bio: "Sosyal medya ve topluluk yönetimi uzmanı. Kullanıcı deneyimini sürekli iyileştiriyor.",
		image:
			"https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300",
		linkedin: "#",
	},
];

const values = [
	{
		icon: BookOpen,
		title: "Kaliteli Eğitim",
		description:
			"Her seviyeden öğrenci için en kaliteli ve güncel İngilizce öğrenme kaynaklarını sunuyoruz.",
	},
	{
		icon: Users,
		title: "Topluluk Odaklı",
		description:
			"Öğrenmenin sosyal bir süreç olduğuna inanıyor, güçlü bir topluluk oluşturuyoruz.",
	},
	{
		icon: Globe,
		title: "Erişilebilirlik",
		description:
			"İngilizce öğrenmeyi herkese açık ve erişilebilir hale getirmeyi hedefliyoruz.",
	},
	{
		icon: Heart,
		title: "Tutkulu Yaklaşım",
		description:
			"Eğitime olan tutkumuzla her gün daha iyi bir platform oluşturmaya çalışıyoruz.",
	},
];

const stats = [
	{ number: "10,000+", label: "Aktif Kullanıcı" },
	{ number: "2,500+", label: "Paylaşılan Kaynak" },
	{ number: "50,000+", label: "İndirme" },
	{ number: "98%", label: "Kullanıcı Memnuniyeti" },
];

export default function AboutPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1">
				{/* Hero Section */}
				<section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
					<div className="mx-auto px-4 container">
						<div className="mx-auto max-w-4xl text-center">
							<h1 className="mb-6 font-bold text-gray-900 text-4xl md:text-5xl">
								İngilizce Öğrenmeyi
								<span className="block text-blue-600">
									Herkes İçin Erişilebilir
								</span>
								Hale Getiriyoruz
							</h1>
							<p className="text-gray-600 text-xl leading-relaxed">
								ingilink, İngilizce öğrenmek isteyen herkesin kaliteli
								kaynaklara erişebileceği, kendi deneyimlerini paylaşabileceği ve
								birlikte öğrenebileceği bir platform oluşturmak amacıyla
								kurulmuştur.
							</p>
						</div>
					</div>
				</section>

				{/* Mission & Vision */}
				<section className="bg-white py-20">
					<div className="mx-auto px-4 container">
						<div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
							<div>
								<div className="mb-12">
									<div className="flex items-center mb-4">
										<Target className="mr-3 w-8 h-8 text-blue-600" />
										<h2 className="font-bold text-gray-900 text-3xl">
											Misyonumuz
										</h2>
									</div>
									<p className="text-gray-600 text-lg leading-relaxed">
										İngilizce öğrenme sürecini kolaylaştırmak, kaliteli
										kaynakları bir araya getirmek ve öğrencilerin birbirlerinden
										öğrenebileceği bir topluluk oluşturmak. Herkesin kendi
										hızında ve kendi yöntemiyle İngilizce öğrenebileceği bir
										ortam sağlamak.
									</p>
								</div>
								<div>
									<div className="flex items-center mb-4">
										<Award className="mr-3 w-8 h-8 text-green-600" />
										<h2 className="font-bold text-gray-900 text-3xl">
											Vizyonumuz
										</h2>
									</div>
									<p className="text-gray-600 text-lg leading-relaxed">
										Türkiye'nin en büyük İngilizce öğrenme kaynakları platformu
										olmak ve dünya çapında tanınan bir eğitim teknolojisi
										markası haline gelmek. İngilizce öğrenmeyi
										demokratikleştirerek dil bariyerlerini ortadan kaldırmak.
									</p>
								</div>
							</div>
							<div className="relative">
								<Image
									src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
									alt="İngilizce öğrenme"
									width={1000}
									height={1000}
									quality={100}
									className="shadow-xl rounded-lg"
								/>
								<div className="-bottom-6 -left-6 absolute bg-blue-600 shadow-lg p-6 rounded-lg text-white">
									<div className="font-bold text-2xl">2023</div>
									<div className="text-sm">Kuruluş Yılı</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Values */}
				<section className="bg-gray-50 py-20">
					<div className="mx-auto px-4 container">
						<div className="mb-16 text-center">
							<h2 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
								Değerlerimiz
							</h2>
							<p className="mx-auto max-w-2xl text-gray-600 text-xl">
								ingilink'i oluştururken rehber aldığımız temel değerler
							</p>
						</div>

						<div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
							{values.map((value, index) => {
								const IconComponent = value.icon;
								return (
									<Card
										key={value.title}
										className="shadow-md hover:shadow-lg border-0 text-center transition-shadow"
									>
										<CardContent className="p-8">
											<div className="flex justify-center items-center bg-blue-100 mx-auto mb-6 rounded-full w-16 h-16">
												<IconComponent className="w-8 h-8 text-blue-600" />
											</div>
											<h3 className="mb-4 font-semibold text-gray-900 text-xl">
												{value.title}
											</h3>
											<p className="text-gray-600 leading-relaxed">
												{value.description}
											</p>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</div>
				</section>

				{/* Stats */}
				<section className="bg-blue-600 py-20">
					<div className="mx-auto px-4 container">
						<div className="mb-16 text-center">
							<h2 className="mb-4 font-bold text-white text-3xl md:text-4xl">
								Rakamlarla ingilink
							</h2>
							<p className="text-blue-100 text-xl">
								Topluluğumuzun büyüklüğü ve etkisi
							</p>
						</div>

						<div className="gap-8 grid grid-cols-2 lg:grid-cols-4">
							{stats.map((stat, index) => (
								<div key={stat.label} className="text-center">
									<div className="mb-2 font-bold text-white text-4xl md:text-5xl">
										{stat.number}
									</div>
									<div className="text-blue-100 text-lg">{stat.label}</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Team */}
				<section className="bg-white py-20">
					<div className="mx-auto px-4 container">
						<div className="mb-16 text-center">
							<h2 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
								Ekibimiz
							</h2>
							<p className="mx-auto max-w-2xl text-gray-600 text-xl">
								ingilink'i hayata geçiren tutkulu ve deneyimli ekibimizle
								tanışın
							</p>
						</div>

						<div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
							{teamMembers.map((member, index) => (
								<Card
									key={member.name}
									className="shadow-md hover:shadow-lg border-0 text-center transition-shadow"
								>
									<CardContent className="p-6">
										<Image
											src={member.image}
											alt={member.name}
											width={1000}
											height={1000}
											quality={100}
											className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
										/>
										<h3 className="mb-1 font-semibold text-gray-900 text-xl">
											{member.name}
										</h3>
										<p className="mb-3 font-medium text-blue-600">
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
				<section className="bg-gradient-to-r from-green-600 to-blue-600 py-20">
					<div className="mx-auto px-4 container">
						<div className="mx-auto max-w-3xl text-white text-center">
							<h2 className="mb-6 font-bold text-3xl md:text-4xl">
								Bizimle İngilizce Öğrenme Yolculuğuna Başla
							</h2>
							<p className="opacity-90 mb-8 text-xl">
								Binlerce kaliteli kaynak, destekleyici topluluk ve sürekli
								gelişen platform ile İngilizce hedeflerine ulaş.
							</p>
							<div className="flex sm:flex-row flex-col justify-center gap-4">
								<Button
									asChild
									size="lg"
									variant="secondary"
									className="bg-white hover:bg-gray-100 text-blue-600"
								>
									<Link href="/register">Ücretsiz Kayıt Ol</Link>
								</Button>
								<Button
									asChild
									size="lg"
									variant="outline"
									className="hover:bg-white border-white text-white hover:text-blue-600"
								>
									<Link href="/resources">Kaynakları Keşfet</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
