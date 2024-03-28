import { FC } from "react";
import { AudioPlayer } from "./AudioPlayer";

interface NavbarProps {
  timer: number;
  formatTime: (time: number) => string;
}

export const Navbar: FC<NavbarProps> = ({ timer, formatTime }) => {
  return (
<div className="flex flex-col space-y-4 items-center justify-center py-5 px-2 sm:px-8 navbar-top">

      <div className="font-bold text-5xl flex items-center site-branding">
The Good Trouble Cocktail Lounge

      </div>

      <AudioPlayer />
    </div>
  );
};