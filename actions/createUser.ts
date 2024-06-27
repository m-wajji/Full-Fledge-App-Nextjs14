"use server";

import db from "@/lib/db";
import { UserSchema } from "@/schemas/userSchema";
import { z } from "zod";

export const createUser = async (values: z.infer<typeof UserSchema>) => {
  const validatedValues = UserSchema.safeParse(values);

  if (!validatedValues.success) {
    return { err: "Invalid values" };
  }

  const user = await db.user.create({
    data: {
      name: validatedValues.data?.name,
      age: validatedValues.data?.age,
      semester: validatedValues.data?.semester,
      info: validatedValues.data?.info,
      like: false,
    },
  });

  console.log(user);
};
