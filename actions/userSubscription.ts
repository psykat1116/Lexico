"use server";
import { auth, currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";
import { absoluteURL } from "@/lib/utils";
import { getUserSubscription } from "@/db/queries";

const returnURL = absoluteURL("/shop");

export const createStripeURL = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("User not found");
  }

  const userSubscription = await getUserSubscription();
  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: returnURL,
    });

    return { data: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: "Lexico Subscription",
            description: "Unlimited Hearts",
          },
          unit_amount: 2000, // 20 INR
          recurring: {
            interval: "month",
          },
        },
      },
    ],
    customer_email: user.emailAddresses[0].emailAddress,
    success_url: returnURL,
    cancel_url: returnURL,
    metadata: {
      userId,
    },
  });

  return { data: stripeSession.url };
};
