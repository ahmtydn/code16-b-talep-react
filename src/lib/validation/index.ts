import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakterden oluşmalıdır." }),
  username: z.string().min(2, { message: "İsim en az 2 karakterden oluşmalıdır." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Şifre en az 8 karakterden oluşmalıdır." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "İsim en az 2 karakterden oluşmalıdır." }),
  username: z.string().min(2, { message: "İsim en az 2 karakterden oluşmalıdır." }),
  email: z.string().email(),
  bio: z.string(),
});


export const PostValidation = z.object({
  caption: z.string().min(5, { message: "En az 5 karakter." }).max(2200, { message: "En fazla 2.200 karakter" }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "Bu alan zorunludur" }).max(1000, { message: "En fazla 1000 karakter." }),
  tags: z.string(),
});
