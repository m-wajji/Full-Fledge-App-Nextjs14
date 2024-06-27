import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  age: z.string().min(2, {
    message: "Age must be at least 2 characters.",
  }),
  semester: z.string().max(1, {
    message: "Semester must be at most 1 characters.",
  }),
  info: z.string().min(10, {
    message: "Information must be at least 10 characters.",
  }),
});
