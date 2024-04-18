"use server";

import { getProviders } from "next-auth/react";
import { cn } from "@/shared/lib/utils";
import { ProviderButton } from "./_ui/provider-button";
import { Suspense } from "react";

export async function SignInForm({ className }: { className?: string }) {
  const providers = await getProviders();
  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === "oauth",
  );

  return (
    <div className={cn("grid gap-6", className)}>
      <Suspense>
        {oauthProviders.map((provider) => (
          <ProviderButton key={provider.id} provider={provider} />
        ))}
      </Suspense>
    </div>
  );
}
