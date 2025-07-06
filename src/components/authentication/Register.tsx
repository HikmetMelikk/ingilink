"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	type RegisterFormData,
	calculatePasswordStrength,
	registerSchema,
} from "@/utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Github, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [generalError, setGeneralError] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		clearErrors,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			agreeToTerms: false,
		},
	});

	const password = watch("password");
	const passwordStrength = calculatePasswordStrength(password);

	const onSubmit = async (data: RegisterFormData) => {
		setGeneralError("");

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Here you would typically make an API call to register the user
			console.log("Registration attempt:", data);

			// Redirect to verification page or login page on success
			// router.push('/verify-email')
		} catch (error) {
			console.error("Registration error:", error);
			setGeneralError("Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.");
		}
	};

	const handleSocialRegister = (provider: string) => {
		console.log(`${provider} ile kayıt olunuyor...`);
		// Implement social registration logic here
	};

	const handleInputChange = (fieldName: keyof RegisterFormData) => {
		// Clear general error when user starts typing
		if (generalError) {
			setGeneralError("");
		}
		// Clear field-specific error
		if (errors[fieldName]) {
			clearErrors(fieldName);
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex flex-1 justify-center items-center bg-gray-50 px-4 py-12">
				<div className="w-full max-w-md">
					<Card className="shadow-lg border-0">
						<CardHeader className="pb-8 text-center">
							<CardTitle className="font-bold text-gray-900 text-2xl">
								Hesap Oluştur
							</CardTitle>
							<CardDescription className="text-gray-600">
								İngilizce öğrenme yolculuğunuza başlamak için kayıt olun
							</CardDescription>
						</CardHeader>

						<CardContent className="space-y-6">
							{/* Social Registration Buttons */}
							<div className="space-y-3">
								<Button
									variant="outline"
									className="w-full h-11"
									onClick={() => handleSocialRegister("google")}
								>
									<svg
										className="mr-2 w-5 h-5"
										viewBox="0 0 24 24"
										aria-label="Google logo"
									>
										<title>Google</title>
										<path
											fill="#4285F4"
											d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										/>
										<path
											fill="#34A853"
											d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										/>
										<path
											fill="#FBBC05"
											d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										/>
										<path
											fill="#EA4335"
											d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										/>
									</svg>
									Google ile Kayıt Ol
								</Button>

								<Button
									variant="outline"
									className="w-full h-11"
									onClick={() => handleSocialRegister("github")}
								>
									<Github className="mr-2 w-5 h-5" />
									GitHub ile Kayıt Ol
								</Button>
							</div>

							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="border-t w-full" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-white px-2 text-gray-500">veya</span>
								</div>
							</div>

							{/* Registration Form */}
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
								{generalError && (
									<div className="bg-red-50 px-4 py-3 border border-red-200 rounded-md text-red-600 text-sm">
										{generalError}
									</div>
								)}

								{/* Name Fields */}
								<div className="gap-4 grid grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="firstName">Ad</Label>
										<Input
											id="firstName"
											type="text"
											placeholder="Adınız"
											{...register("firstName", {
												onChange: () => handleInputChange("firstName"),
											})}
											className={errors.firstName ? "border-red-500" : ""}
											disabled={isSubmitting}
										/>
										{errors.firstName && (
											<p className="text-red-500 text-xs">
												{errors.firstName.message}
											</p>
										)}
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Soyad</Label>
										<Input
											id="lastName"
											type="text"
											placeholder="Soyadınız"
											{...register("lastName", {
												onChange: () => handleInputChange("lastName"),
											})}
											className={errors.lastName ? "border-red-500" : ""}
											disabled={isSubmitting}
										/>
										{errors.lastName && (
											<p className="text-red-500 text-xs">
												{errors.lastName.message}
											</p>
										)}
									</div>
								</div>

								{/* Username */}
								<div className="space-y-2">
									<Label htmlFor="username">Kullanıcı Adı</Label>
									<div className="relative">
										<User className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
										<Input
											id="username"
											type="text"
											placeholder="kullaniciadi"
											{...register("username", {
												onChange: () => handleInputChange("username"),
											})}
											className={`pl-10 ${errors.username ? "border-red-500" : ""}`}
											disabled={isSubmitting}
										/>
									</div>
									{errors.username && (
										<p className="text-red-500 text-sm">
											{errors.username.message}
										</p>
									)}
								</div>

								{/* Email */}
								<div className="space-y-2">
									<Label htmlFor="email">E-posta Adresi</Label>
									<div className="relative">
										<Mail className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
										<Input
											id="email"
											type="email"
											placeholder="ornek@email.com"
											{...register("email", {
												onChange: () => handleInputChange("email"),
											})}
											className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
											disabled={isSubmitting}
										/>
									</div>
									{errors.email && (
										<p className="text-red-500 text-sm">
											{errors.email.message}
										</p>
									)}
								</div>

								{/* Password */}
								<div className="space-y-2">
									<Label htmlFor="password">Şifre</Label>
									<div className="relative">
										<Lock className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Güçlü bir şifre oluşturun"
											{...register("password", {
												onChange: () => handleInputChange("password"),
											})}
											className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
											disabled={isSubmitting}
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2 transform"
										>
											{showPassword ? (
												<EyeOff className="w-4 h-4" />
											) : (
												<Eye className="w-4 h-4" />
											)}
										</button>
									</div>
									{password && (
										<div className="space-y-2">
											<div className="flex items-center space-x-2">
												<div className="flex-1 bg-gray-200 rounded-full h-2">
													<div
														className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
														style={{
															width: `${(passwordStrength.strength / 5) * 100}%`,
														}}
													/>
												</div>
												<span className="text-gray-600 text-xs">
													{passwordStrength.text}
												</span>
											</div>
										</div>
									)}
									{errors.password && (
										<p className="text-red-500 text-sm">
											{errors.password.message}
										</p>
									)}
								</div>

								{/* Confirm Password */}
								<div className="space-y-2">
									<Label htmlFor="confirmPassword">Şifre Tekrarı</Label>
									<div className="relative">
										<Lock className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
										<Input
											id="confirmPassword"
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Şifrenizi tekrar giriniz"
											{...register("confirmPassword", {
												onChange: () => handleInputChange("confirmPassword"),
											})}
											className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
											disabled={isSubmitting}
										/>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
											className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2 transform"
										>
											{showConfirmPassword ? (
												<EyeOff className="w-4 h-4" />
											) : (
												<Eye className="w-4 h-4" />
											)}
										</button>
									</div>
									{errors.confirmPassword && (
										<p className="text-red-500 text-sm">
											{errors.confirmPassword.message}
										</p>
									)}
								</div>

								{/* Terms Agreement */}
								<div className="space-y-2">
									<div className="flex items-start space-x-2">
										<div className="relative">
											<input
												id="agreeToTerms"
												type="checkbox"
												{...register("agreeToTerms", {
													onChange: () => handleInputChange("agreeToTerms"),
												})}
												className="border-gray-300 rounded focus:ring-blue-500 w-4 h-4 text-blue-600"
											/>
										</div>
										<Label
											htmlFor="agreeToTerms"
											className="text-gray-600 text-sm leading-relaxed"
										>
											<Link
												href="/terms"
												className="text-blue-600 hover:text-blue-500"
											>
												Kullanım Şartları
											</Link>{" "}
											ve{" "}
											<Link
												href="/privacy"
												className="text-blue-600 hover:text-blue-500"
											>
												Gizlilik Politikası
											</Link>
											'nı okudum ve kabul ediyorum.
										</Label>
									</div>
									{errors.agreeToTerms && (
										<p className="text-red-500 text-sm">
											{errors.agreeToTerms.message}
										</p>
									)}
								</div>

								<Button
									type="submit"
									className="bg-blue-600 hover:bg-blue-700 w-full h-11"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
								</Button>
							</form>

							<div className="text-center">
								<p className="text-gray-600 text-sm">
									Zaten hesabınız var mı?{" "}
									<Link
										href="/login"
										className="font-medium text-blue-600 hover:text-blue-500"
									>
										Giriş yapın
									</Link>
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
			<Footer />
		</div>
	);
}
