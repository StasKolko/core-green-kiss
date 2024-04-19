import { cn } from "@/shared/lib/utils";
import { ProviderButton } from "./_ui/provider-button";
import { Suspense } from "react";

export function SignInForm({ className }: { className?: string }) {
  const providers = {
    google: {
      id: "google",
      name: "Google",
    },
    yandex: {
      id: "yandex",
      name: "Яндекс",
    },
    github: {
      id: "github",
      name: "GitHub",
    },
  };
  const oauthProviders = Object.values(providers);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <Suspense>
        {oauthProviders.map((provider) => (
          <ProviderButton key={provider.id} provider={provider} />
        ))}
      </Suspense>
    </div>
  );
}
