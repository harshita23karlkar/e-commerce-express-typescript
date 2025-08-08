import z from "zod";

export const userProfileSchema = z.object({
    name: z.string().nonempty({ message: "Required Name" }),
    address: z.string().nonempty({ message: "Required Address" }),
    phoneNumber: z.string().min(10).max(10).nonempty({ message: "Required Phone Number" })
})