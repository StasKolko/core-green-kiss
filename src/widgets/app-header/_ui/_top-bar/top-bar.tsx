import { ContactButton } from "./contact-button";
import { Location } from "./location";

export function TopBar() {
  return (
    <div className="hidden md:flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <Location />
      </div>
      <div className="flex items-center gap-4">
        <ContactButton />
      </div>
    </div>
  );
}
