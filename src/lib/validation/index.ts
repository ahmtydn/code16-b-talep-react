import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalı." }),
  username: z.string().min(2, { message: "İsim en az 2 karakter olmalı." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalı." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalı." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalı." }),
  username: z.string().min(2, { message: "İsim en az 2 karakter olmalı." }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 karakter." }).max(2200, { message: "Maximum 2,200 karakter" }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "Gerekli" }).max(1000, { message: "Maximum 1000 karakter." }),
  tags: z.string(),
});
