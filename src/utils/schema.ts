import { z } from "zod";

export const usernameSchema = z
    .string()
    .min(1, '用户名不能为空')
    .max(64, '用户名长度不能超过64个字符');
export const passwordSchema = z
    .string()
    .min(8, '密码长度必须在8到64个字符之间')
    .max(64, '密码长度必须在8到64个字符之间');
export const authSchema = z.object({
    uid: z.number()
});
export type AuthSchema = z.infer<typeof authSchema>;