import { SignInCard } from "@/features/auth/sign-in-card";

export default function AuthenticationPage() {
  return (
    <main className="grid place-items-center px-2 pt-10 md:pt-36 ">
      <div className="border rounded-md">
        <SignInCard />
      </div>
    </main>
  );
}
