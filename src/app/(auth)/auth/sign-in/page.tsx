import { SignInCard } from "@/features/auth/sign-in-card";
import { Suspense } from "react";

export default function AuthenticationPage() {
  return (
    <main className="min-h-screen md:min-h-[calc(100vh-14rem)] grid place-items-center">
      <div className="bg-card border rounded-md">
        <Suspense>
          <SignInCard />
        </Suspense>
      </div>
    </main>
  );
}
