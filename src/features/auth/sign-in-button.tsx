"use client";

import { LogIn } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { Drawer, DrawerTrigger, DrawerContent } from "@/shared/ui/drawer";

import { SignInCard } from "./sign-in-card";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function SignInButton({
  typeButton,
  buttonStyle,
  iconSize,
}: {
  typeButton: "modal" | "authPage";
  buttonStyle: string;
  iconSize: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleSignOut = () => signIn();

  if (typeButton === "authPage") {
    return (
      <Button
        className={buttonStyle}
        variant={"outline"}
        onClick={handleSignOut}
      >
        <LogIn className={iconSize} />
        <span>Войти</span>
      </Button>
    );
  }

  function handleCloseDrawer() {
    setOpenDrawer(false);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  return (
    <>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerTrigger asChild>
          <Button variant={"ghost"} className={cn(buttonStyle, "md:hidden")}>
            <LogIn className={iconSize} />
            <span>Войти</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex items-center">
          <SignInCard onClick={handleCloseDrawer} />
        </DrawerContent>
      </Drawer>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(buttonStyle, "hidden md:inline-flex")}
          >
            <LogIn className={iconSize} />
            <span>Войти</span>
          </Button>
        </DialogTrigger>
        <DialogContent className={cn("p-0 max-w-96")}>
          <SignInCard onClick={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
