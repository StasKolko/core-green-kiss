import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { SignInForm } from "./sign-in-form";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { Button } from "@/shared/ui/button";
import { SignInError } from "./_ui/sign-in-error";

export function SignInCard({ onClick }: { onClick?: MouseEventHandler }) {
  return (
    <Card className={cn("max-w-96 border-none bg-transparent")}>
      <CardHeader>
        <CardTitle className="text-center">Войдите в систему</CardTitle>
        <CardDescription className="px-10 text-center">
          С помощью любимого провайдера: быстро, удобно и безопасно
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
        <div className="pt-6">
          <SignInError />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-center text-center text-sm text-muted-foreground">
        <p>Нажимая продолжить, вы соглашаетесь с</p>

        <Button
          variant="link"
          onClick={onClick}
          className={cn("text-muted-foreground hover:text-primary")}
          asChild
        >
          <Link href="/terms">Пользовательским соглашением</Link>
        </Button>

        <div className="flex justify-center items-center gap-5">
          <Separator className="w-16" />и<Separator className="w-16" />
        </div>

        <Button
          variant="link"
          onClick={onClick}
          className={cn("text-muted-foreground hover:text-primary")}
          asChild
        >
          <Link href="/privacy">Политикой конфиденциальности</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
