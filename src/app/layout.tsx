import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "ingilink - İngilizce Öğrenme Kaynaklarını Keşfet ve Paylaş",
	description:
		"İngilizce öğrenme kaynaklarını paylaş, keşfet ve topluluğa katıl. Makaleler, videolar, ses dosyaları ve daha fazlası.",
	keywords: "İngilizce öğrenme, kaynak paylaşımı, eğitim, dil öğrenme",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="tr" className="scroll-smooth">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
