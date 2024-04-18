"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";
import { LogOut, User } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Separator } from "@/shared/ui/separator";
import { useAppSession } from "@/entities/user/session";
import { SignInButton } from "@/features/auth/sign-in-button";
import { useSignOut } from "@/features/auth/use-sign-out";
import { Skeleton } from "@/shared/ui/skeleton";
import { ProfileAvatar } from "@/entities/user/profile";
import { cn } from "@/shared/lib/utils";

export function Profile({
  iconSize,
  className,
  skeletonStyle,
}: {
  iconSize: string;
  className: string;
  skeletonStyle: string;
}) {
  const session = useAppSession();
  const { signOut, isPending: isLoadingSignOut } = useSignOut();

  if (session.status === "loading") {
    return <Skeleton className={cn(skeletonStyle)} />;
  }

  if (session.status === "unauthenticated") {
    return <SignInButton iconSize={iconSize} className={className} />;
  }

  const user = session?.data?.user;

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(className, "hidden md:inline-flex")}
            variant="ghost"
          >
            <ProfileAvatar profile={user} iconSize={iconSize} />
            <span>Профиль</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 mr-2 flex flex-col gap-3">
          <h3>
            <p>Мой аккаунт</p>
            <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
              {/* {user ? getProfileDisplayName(user) : undefined} */}
              123
            </p>
          </h3>
          <Separator className="my-1" />
          <Button variant="secondary" className="gap-2" asChild>
            <Link href={`/profile/`}>
              <User className={iconSize} />
              <span>Профиль</span>
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="gap-2"
            disabled={isLoadingSignOut}
            onClick={() => signOut()}
          >
            <LogOut className={iconSize} />
            <span>Выход</span>
          </Button>
        </PopoverContent>
      </Popover>

      <Drawer>
        <DrawerTrigger asChild>
          <Button className={cn(className, "md:hidden")} variant="ghost">
            <ProfileAvatar profile={user} iconSize={iconSize} />
            <span>Профиль</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <article className="flex flex-col p-2 gap-3">
            <h3>
              <p>Мой аккаунт</p>
              <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
                {/* {user ? getProfileDisplayName(user) : undefined} */}
                123
              </p>
            </h3>
            <Separator className="my-1" />
            <Button variant="secondary" className="gap-2" asChild>
              <Link href={`/profile/`}>
                <User className={iconSize} />
                <span>Профиль</span>
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="gap-2"
              disabled={isLoadingSignOut}
              onClick={() => signOut()}
            >
              <LogOut className={iconSize} />
              <span>Выход</span>
            </Button>
          </article>
        </DrawerContent>
      </Drawer>
    </>
  );
}
