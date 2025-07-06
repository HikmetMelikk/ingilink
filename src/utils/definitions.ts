import { z } from "zod";

// Login form validation schema
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "E-posta adresi gereklidir")
		.email("Geçerli bir e-posta adresi giriniz"),
	password: z
		.string()
		.min(1, "Şifre gereklidir")
		.min(6, "Şifre en az 6 karakter olmalıdır"),
	remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register form validation schema
export const registerSchema = z
	.object({
		firstName: z
			.string()
			.min(1, "Ad gereklidir")
			.min(2, "Ad en az 2 karakter olmalıdır")
			.regex(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/, "Ad sadece harf içerebilir"),
		lastName: z
			.string()
			.min(1, "Soyad gereklidir")
			.min(2, "Soyad en az 2 karakter olmalıdır")
			.regex(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/, "Soyad sadece harf içerebilir"),
		username: z
			.string()
			.min(1, "Kullanıcı adı gereklidir")
			.min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
			.regex(
				/^[a-zA-Z0-9_]+$/,
				"Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir",
			),
		email: z
			.string()
			.min(1, "E-posta adresi gereklidir")
			.email("Geçerli bir e-posta adresi giriniz"),
		password: z
			.string()
			.min(1, "Şifre gereklidir")
			.min(8, "Şifre en az 8 karakter olmalıdır")
			.regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
			.regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
			.regex(/[0-9]/, "Şifre en az bir rakam içermelidir"),
		confirmPassword: z.string().min(1, "Şifre tekrarı gereklidir"),
		agreeToTerms: z.boolean().refine((val) => val === true, {
			message: "Kullanım şartlarını kabul etmelisiniz",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Şifreler eşleşmiyor",
		path: ["confirmPassword"],
	});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Password strength calculator
export const calculatePasswordStrength = (password: string) => {
	if (!password) return { strength: 0, text: "", color: "" };

	let strength = 0;
	if (password.length >= 8) strength++;
	if (/[a-z]/.test(password)) strength++;
	if (/[A-Z]/.test(password)) strength++;
	if (/\d/.test(password)) strength++;
	if (/[^a-zA-Z\d]/.test(password)) strength++;

	const strengthMap = {
		0: { text: "", color: "" },
		1: { text: "Çok Zayıf", color: "bg-red-500" },
		2: { text: "Zayıf", color: "bg-orange-500" },
		3: { text: "Orta", color: "bg-yellow-500" },
		4: { text: "Güçlü", color: "bg-green-500" },
		5: { text: "Çok Güçlü", color: "bg-green-600" },
	};

	return { strength, ...strengthMap[strength as keyof typeof strengthMap] };
};
