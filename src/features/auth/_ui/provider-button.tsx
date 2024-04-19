"use client";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { useOAuthSignIn } from "../_vm/use-oauth-sign-in";
import { GoogleIcon } from "@/shared/icons/google-icon";
import { GithubIcon } from "@/shared/icons/github-icon";
import { YandexIcon } from "@/shared/icons/yandex-icon";
import { cn } from "@/shared/lib/utils";

export function ProviderButton({
  provider,
}: {
  provider: Record<string, string>;
}) {
  const oauthSignIn = useOAuthSignIn(provider);

  const getIcon = (provider: Record<string, string>) => {
    switch (provider.id) {
      case "github":
        return <GithubIcon className="h-5 w-5 text-foreground" />;
      case "google":
        return <GoogleIcon className="h-5 w-5" />;
      case "yandex":
        return <YandexIcon className="h-5" />;
      default:
        return null;
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={oauthSignIn.isPending}
      onClick={() => oauthSignIn.signIn()}
      size="lg"
      className={cn("w-60 gap-3")}
    >
      {oauthSignIn.isPending ? (
        <Spinner className="mr-2 h-4 w-4 animate-spin" aria-label="Вход" />
      ) : (
        getIcon(provider)
      )}
      {provider.name}
    </Button>
  );
}
