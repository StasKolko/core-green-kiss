import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Profile } from "../_domain/types";
import { cn } from "@/shared/lib/utils";
import { getProfileLetters } from "../_vm/get-profile-letters";

export const ProfileAvatar = ({
  profile,
  iconSize,
}: {
  profile?: Profile;
  iconSize?: string;
}) => {
  if (!profile) {
    return null;
  }

  return (
    <Avatar className={cn(iconSize)}>
      <AvatarImage src={profile.image ?? ""} className="object-cover" />
      <AvatarFallback>{getProfileLetters(profile)}</AvatarFallback>
    </Avatar>
  );
};
