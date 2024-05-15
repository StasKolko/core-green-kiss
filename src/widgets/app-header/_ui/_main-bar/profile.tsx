"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";
import { Banana, LogOut, User } from "lucide-react";
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
  buttonStyle,
  isAdmin,
}: {
  iconSize: string;
  buttonStyle: string;
  isAdmin?: boolean;
}) {
  const session = useAppSession();
  const { signOut, isPending: isLoadingSignOut } = useSignOut();

  if (session.status === "loading") {
    return <Skeleton className="h-12 w-[4.375rem]" />;
  }

  if (session.status === "unauthenticated") {
    return (
      <SignInButton
        typeButton="modal"
        iconSize={iconSize}
        buttonStyle={buttonStyle}
      />
    );
  }

  const user = session?.data?.user;
  const role = user?.role;

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(buttonStyle, "hidden md:inline-flex")}
            variant="ghost"
          >
            <ProfileAvatar profile={user} className={iconSize} />
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
          {role !== "USER" &&
            (isAdmin ? (
              <Button className="gap-2" asChild>
                <Link href={`/`}>
                  <Banana className={iconSize} />
                  <span>Shop</span>
                </Link>
              </Button>
            ) : (
              <Button className="gap-2" asChild>
                <Link href={`/admin`}>
                  <Banana className={iconSize} />
                  <span>Admin</span>
                </Link>
              </Button>
            ))}
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
          <Button className={cn(buttonStyle, "md:hidden")} variant="ghost">
            <ProfileAvatar profile={user} className={iconSize} />
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
            {role !== "USER" &&
              (isAdmin ? (
                <Button className="gap-2" asChild>
                  <Link href={`/`}>
                    <Banana className={iconSize} />
                    <span>Shop</span>
                  </Link>
                </Button>
              ) : (
                <Button className="gap-2" asChild>
                  <Link href={`/admin`}>
                    <Banana className={iconSize} />
                    <span>Admin</span>
                  </Link>
                </Button>
              ))}
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
