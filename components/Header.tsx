import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import Search from "../assets/Search.svg";
import Image from "next/image";
import { useAccount, useConnections } from "wagmi";

import CCabi from "../assets/contractData/CarbonCoins.json"
import Nftabi from "../assets/contractData/NFT.json"

import CCaddress from "../assets/contractData/CC.json"
import NFTaddress from "../assets/contractData/NFTAdd.json"
import { useEthersSigner } from "../utils/Signer";
import { ethers } from "ethers";

function Header({
  sidebar,
  toggleSidebar,
}: {
  sidebar: boolean;
  toggleSidebar: () => void;
}) {
  const router = useRouter();
  const { address } = useAccount();
  const signer = useEthersSigner()

  // localStorage.setItem("signer", JSON.stringify(signer));

  const instances = new ethers.Contract(
    CCaddress.contract_address,
    CCabi.abi,
    signer
  )

  const nftInstances = new ethers.Contract(
    NFTaddress.contract_address,
    Nftabi.abi,
    signer
  )

  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address));
    localStorage.setItem("CCInstance", JSON.stringify(instances));
    localStorage.setItem("NFTInstance", JSON.stringify(nftInstances));
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
