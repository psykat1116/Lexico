import { auth } from "@clerk/nextjs/server";

export const isAdmin = async () => {
  const { userId } = await auth();
  return userId === process.env.ADMIN_CLERK_ID;
};
