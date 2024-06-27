"use server";

import db from "@/lib/db";

export const deleteUser = async (userId: string) => {
  // Check if the user exists
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  // If the user does not exist, return an error or handle it as needed
  if (!user) {
    throw new Error("User not found");
  }

  // If the user exists, proceed to delete the user
  await db.user.delete({
    where: {
      id: userId,
    },
  });
};
