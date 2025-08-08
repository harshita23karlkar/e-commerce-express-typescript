import z, { email } from "zod";

export const userSignupSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.email().nonempty({ message: "Please enter the valid email" }),
    password: z.string().min(6, { message: "Password must of atleast 6 characters" }),

});

export const userLoginSchema = z.object({
    email: z.email().nonempty({ message: "Please enter the valid email" }),
    password: z.string().min(6, { message: "Password must of atleast 6 characters" }),
});