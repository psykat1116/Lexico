# 📚 "Lexico" a Language Learning Website Like Duolingo Made Using [NextJS](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), Typescript, [Prisma](https://www.prisma.io/) As ORM, [NeonDB](https://neon.tech) As PostgreSQL, [Clerk](https://clerk.com/) For Authentication, [Stripe](https://stripe.com/in) For Payment, [Shadcn UI](https://ui.shadcn.com/) For User Interface And Much More.

## 🎯 Dummy Stripe Payment
Stripe Is In Test Mode. So, Use the Dummy Card Numbers Given Below. For More Details Or a Dummy Number of Your Country Go To [Testing Card Number](https://docs.stripe.com/testing)
```bash
INDIA - 4000003560000008
USA - 4242424242424242
```

## 🎯 Clone The Repo
```bash
git clone https://github.com/psykat1116/Lexico.git
```

## 🎯 Run The Development
### !! - Don't Forget To Convert The Folder Name To Lowercase Otherwise, It Can Lead To A Problem - !!
```bash
cd Lexico
npm run dev
```

## 🎯 .env File
### Create a .env file in the root folder with the following variable
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
CLERK_SECRET_KEY =
NEXT_PUBLIC_CLERK_SIGN_IN_URL= /sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL= /sign-up
DATABASE_URL =
STRIPE_API_KEY = 
NEXT_PUBLIC_APP_URL = http://localhost:3000
ADMIN_CLERK_ID = 
STRIPE_WEBHOOK_SECRET = 
```

## 🎯 Get Database Url
- Go Through [NeonDB](https://neon.tech) Website Create An Account & Create New Project.
- After creating your free project, save the password in the DB connection string.
- Copy The Connection URL string & Paste it Into The .env file.
- I Use Typescript & Drizzle ORM
```bash
DATABASE_URL = postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=verify-full
```

## 🎯 Clerk Authentication
- Create Your Account And Create a New Application
- Set The Login And Sign Up for Medium Like Google, Github, Email, Phone No, etc
- Get `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` and paste them into .env File
- Go Through the documentation

## 🎯 Stripe Integration
- Create Your Stripe Account and create a new project account
- Get The Secret Key & Set This Into `STRIPE_API_KEY`
- For Testing The Webhook In the Local Environment Go Through the [Local Environemnt](https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local)
- First Download The [Stripe CLI](https://stripe.com/docs/stripe-cli)
- Run The Following Code Into The Terminal
  ```bash
  stripe login
  stripe listen --forward-to localhost:3000/api/webhook/stripe
  ```
- After Running This You Will Get A Code & Paste it into `STRIPE_WEBHOOK_SECRET`
- For Hosted Website Set `NEXT_PUBLIC_APP_URL` to your hosted website URL Otherwise `http://localhost:3000`
- Get Webhook Secret From [Here](https://dashboard.stripe.com/test/webhooks/create)
- Endpoint URL will be hosted website URL & Selected Events Will Be
  ```bash
  Checkout -> checkout.session.completed
  Invoice -> invoice.payment_succeeded
  ```
- Update The `STRIPE_WEBHOOK_SECRET` by creating a new webhook with endpoint `{your_hosted_website}/api/webhook/stripe`

## 🎯 Admin Dashboard
- Get Your Clerk User ID from your [Clerk](https://clerk.com) Dashboard
- Set `ADMIN_CLERK_ID` in the .env file with the User ID.