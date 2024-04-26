"use client";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { useSearchParams } from "next/navigation";
import { cn } from "@/shared/lib/utils";

export function SignInError() {
  const authErrorInfo = {
    OAuthAccountNotLinked: {
      title: "Почта уже связана с другим провайдером",
      message:
        "Ой! Кажется, эта почта уже использовалась с другим методом входа. Пожалуйста, попробуйте войти с помощью первоначального провайдера: Google, Яндекс или GitHub.",
    },

    unknownError: {
      title: "Произошла неизвестная ошибка",
      message: "Пожалуйста, свяжитесь с нами по почте: greenkiss89@bk.ru",
    },
  };
  const searchParams = useSearchParams();
  const errorUrl = searchParams.get("error");

  if (!errorUrl) return null;

  console.log(errorUrl);

  let errorInfo;

  if (errorUrl in authErrorInfo) {
    errorInfo = authErrorInfo[errorUrl as keyof typeof authErrorInfo];
  } else {
    errorInfo = authErrorInfo["unknownError"];
  }

  return (
    <Alert
      className={cn(
        "group text-red-600 bg-red-600/10 border-red-600 hover:bg-red-600/20",
      )}
    >
      <AlertCircle className="h-4 w-4 stroke-red-600" />
      <AlertTitle>{errorInfo.title}</AlertTitle>
      <AlertDescription
        className={cn("text-foreground/60 group-hover:text-foreground")}
      >
        {errorInfo.message}
      </AlertDescription>
    </Alert>
  );
}
