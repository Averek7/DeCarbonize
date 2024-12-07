import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import Search from "../assets/Search.svg";
import Image from "next/image";
import { useAccount, useConnections } from "wagmi";

function Header({
  sidebar,
  toggleSidebar,
}: {
  sidebar: boolean;
  toggleSidebar: () => void;
}) {
  const router = useRouter();
  const { address } = useAccount();

  useEffect(() => {

  }, [address])

  return (
    <div className="w-full flex flex-row justify-between items-center h-16 bg-gradient-to-r from-[#6E67F4] to-[#4D3EB3] px-3">
      <div className="">Logo</div>
      <div className="flex justify-around items-center gap-5">
        <div className="bg-[#00000033] flex p-2 rounded-md max-w-full">
          <p className="text-[#94A3B8] w-full">
            Search
          </p>
          <Image src={Search} width={20} height={20} alt="" color={"#94A3B8"} />
        </div>
        <div className="max-w-full">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
