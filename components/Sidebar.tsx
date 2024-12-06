import React from "react";
import { useRouter } from "next/router";
import { useGlobalContext } from "../context/GlobalContext";
import Home from "../assets/Home";
import Leaderboard from "../assets/Leaderboard";
import Link from "next/link";
import Twitter from "../assets/Twitter";
import Telegram from "../assets/Telegram";
import { MdOutlineLanguage } from "react-icons/md";
import Trophy from "../assets/Trophy";

const topIconCss =
  "group cursor-pointer mb-2.5 transition-all flex items-center justify-center rounded-md w-12 h-9 bg-transparent hover:bg-[#1E2024] focus:bg-[#1E2024] text-[#ababac] hover:text-[#5F4DFF] focus:text-[#5F4DFF]";
const bottomIconCss =
  "cursor-pointer mb-2.5 transition-all flex items-center justify-center rounded-md w-12 h-9 bg-[#181A1D] hover:bg-[#1E2024] focus:bg-[#1E2024] text-[#ababac] hover:text-[#5F4DFF] focus:text-[#5F4DFF]";

const closedIconCss =
  "w-5 h-5 text-white group-hover:text-[#5F4DFF] group-focus:text-[#5F4DFF] transition-all opacity-50";
const activeIconCss = "w-5 h-5 text-[#5F4DFF] transition-all";

function Sidebar({ sidebar, setSidebar }: {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();


  return (
    <div className={`${sidebar ? "min-w-[15rem] justify-between" : "w-[4.15rem]"
      } z-50 relative transition-width hidden bg-[#0C0D12] text-white md:flex flex-col items-center pb-3.5 no-scrollbar overflow-y-auto h-[calc(100dvh-4.7rem)]`}>
      {sidebar ? (
        <SidebarOpen sidebar={sidebar} />
      ) : (
        <div
          className={`${sidebar ? "fadeOutDown" : "fadeIn"
            } flex flex-col items-center justify-between w-full h-full pt-4`}
        >
          <div className="w-full flex flex-col items-center">
            <div
              onClick={() => {
                if (router.pathname === "/") {
                  setSidebar(true);
                } else {
                  router.push("/");
                  setSidebar(false);
                }
              }}
              className={`${topIconCss}`}
            >
              <Home
                className={
                  router.pathname === "/" ? activeIconCss : closedIconCss
                }
              />
            </div>

            <div
              onClick={() => {
                router.push("/leaderboard");
                setSidebar(true);
              }}
              className={`${topIconCss}`}
            >
              <Trophy
                className={
                  router.pathname === "/leaderboard"
                    ? activeIconCss
                    : closedIconCss
                }
              />
            </div>
            <div
              onClick={() => {
                setSidebar(true);
              }}
              className={`${topIconCss}`}
            >
              <MdOutlineLanguage className={closedIconCss} />
            </div>
          </div>

          <div className="w-full flex flex-col items-center mb-2">
            <Link
              href={"https://x.com/superbetgames"}
              target="_blank"
              className={`${bottomIconCss}`}
            >
              <Twitter className={`${closedIconCss}`} />
            </Link>

            <Link
              href={"https://t.me/superbetgames "}
              target="_blank"
              className={`${bottomIconCss}`}
            >
              <Telegram className={`${closedIconCss}`} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export const SidebarElement = ({ text, link, Icon, className }: {
  text: string;
  Icon: any;
  link?: string;
  className?: string;
}) => {
  const router = useRouter();

  return (<div
    onClick={() => {
      link && router.push(link);
    }}
    className="w-full transition-all cursor-pointer rounded-md flex items-end gap-3 pl-4 py-2 bg-transparent hover:bg-[#1f2024] focus:bg-[#1f2024] group"
  >
    <Icon className={className} />
    <span className="transition-all text-sm leading-[1rem] font-changa font-medium tracking-wider text-white text-opacity-90 group-hover:text-opacity-100 group-focus:text-opacity-100">
      {text}
    </span>
  </div>);
};

export const SidebarOpen = ({ sidebar }: { sidebar: boolean }) => {
  const router = useRouter();
  const { setSidebar } = useGlobalContext()

  return <div className="w-full">
    <div
      className={`${sidebar ? "fadeInUp" : "fadeOutDown"
        } w-full flex flex-col p-4 gap-1.5`}
    >
      <div
        onClick={() => {
          if (router.pathname === "/") {
            setSidebar(false);
          }
        }}
      >
        <SidebarElement
          text={"Home"}
          Icon={"/assets/Home.svg"}
          link="/"
          className={
            router.pathname === "/" ? activeIconCss : closedIconCss
          }
        />
      </div>
    </div>
  </div>;
};

export default Sidebar;
