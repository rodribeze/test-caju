import { validateCpf } from "@/utils/validateCpf";
import * as z from 'zod';

export const userSchema = z.object({
    employeeName: z.string().refine((v) => new RegExp(/^[a-z]{1}.{0,}\s{1}.{1,}/gi).test(v), 'Preencha o nome completo'),
    email: z.string().email().min(1),
    cpf: z.string().min(1).refine((v) => validateCpf(v), 'Cpf inválido'),
    admissionDate: z.string().min(1),
})

export type UserSchema = z.infer<typeof userSchema>;