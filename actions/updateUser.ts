"use server";

import db from "@/lib/db";

export const updateUser = async (userId: string, state: boolean) => {
  await db.user.update({
    where: { id: userId },
    data: { like: state },
  });
};
