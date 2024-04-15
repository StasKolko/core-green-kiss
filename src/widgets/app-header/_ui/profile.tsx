"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { LogOut, User } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Separator } from "@/shared/ui/separator";

export function Profile() {
  // const session = useAppSession();
  // const { signOut, isPending: isLoadingSignOut } = useSignOut();

  // if (session.status === "loading") {
  //   return <Skeleton className="w-8 h-8 rounded-full" />;
  // }

  // if (session.status === "unauthenticated") {
  //   return <SignInButton />;
  // }

  // const user = session?.data?.user;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="p-px rounded-full self-center h-8 w-8 bg-primary"
        >
          {/* <ProfileAvatar profile={user} className="w-8 h-8" /> */}
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
        <Button asChild>
          <Link href={`/profile/`}>
            <User className="mr-2 h-4 w-4" />
            <span>Профиль</span>
          </Link>
        </Button>
        <Button>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выход</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
}
