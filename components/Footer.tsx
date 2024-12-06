import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
// import Telegram from "@/public/assets/Telegram";
// import Twitter from "@/public/assets/Twitter";
// import logo from "@/public/assets/logowhite.svg";

function Footer() {

    const router = useRouter();

    return (
        <>
            <div className="w-full h-full flex flex-col px-5 lg2:px-[4rem] md:px-[3rem] pt-10">
                {/* <Image
                    src={"/logo/superbets.svg"}
                    width={150}
                    height={30}
                    alt={"SUPERBETS"}
                    className="ml-2"
                /> */}
                <div className="w-full h-full flex lg2:flex-row flex-col lg2:items-center items-start lg2:pb-16 pb-5 gap-5">
                    <div className="lg2:w-[30%] md:w-[60%] w-[90%]">
                        <p className="flex flex-col text-[#94A3B8] font-medium font-chakra text-sm leading-6 text-opacity-80 md:mx-0 mt-6 mb-2">
                            <span className="mx-2">
                                Ethentives, a carbon negative incentivisation platform, get rewarded for offsetting your carbon footprint.
                                <br />
                                <br />
                                Contact: hi@ethentives.com
                            </span>
                        </p>
                    </div>
                    <div className="flex items-start justify-start gap-20 lg2:pl-16">
                        <div className="mx-2">
                            <h3 className="font-semibold font-changa text-white text-base leading-[18px] pb-4 text-opacity-90">
                                Services
                            </h3>
                            <div className="text-[#94A3B8] font-chakra flex flex-col items-start justify-start gap-5 text-sm leading-[14px] font-medium text-opacity-80">
                                <Link
                                    href="/api-doc"
                                    target="_blank"
                                    className="hover:cursor-pointer hover:underline decoration-1"
                                >
                                    Docs
                                </Link>
                                <span
                                    className="hover:cursor-pointer hover:underline decoration-1"
                                    
                                >
                                    Wallet
                                </span>
                            </div>
                        </div>
                        <div className="mx-2">
                            <h3 className="font-semibold font-changa text-white text-base leading-[18px] pb-4 text-opacity-90">
                                Platform
                            </h3>
                            <div className="text-[#94A3B8] font-chakra flex flex-col items-start justify-start gap-5 text-sm leading-[14px] font-medium text-opacity-80">
                                <span
                                    className="hover:cursor-pointer hover:underline decoration-1"
                                    onClick={() => router.push("/leaderboard")}
                                >
                                    Leaderboard
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="lg2:pl-12 lg2:mb-5">
                        <div className="mx-2">
                            <h3 className="font-semibold font-changa text-white text-base leading-[18px] text-opacity-90">
                                Community
                            </h3>
                            <div className="flex flex-row items-start justify-start gap-2 pt-4">
                                <Link href="https://x.com/superbetgames" target="_blank">
                                    <div className="p-2 border-2 border-[#FFFFFF] rounded-full border-opacity-5 hover:bg-[#121519] hover:cursor-pointer">
                                        {/* <Twitter className="w-3 h-3 text-white group-hover:text-[#5F4DFF] group-focus:text-[#5F4DFF] transition-all" /> */}
                                    </div>
                                </Link>{" "}
                                <Link href="https://t.me/superbetgames " target="_blank">
                                    <div className="p-2 border-2 border-[#FFFFFF] rounded-full border-opacity-5 hover:bg-[#121519] hover:cursor-pointer">
                                        {/* <Telegram className="w-3 h-3 text-white group-hover:text-[#5F4DFF] group-focus:text-[#5F4DFF] transition-all" /> */}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-[#94A3B8] bg-opacity-20 rounded-full mt-5 md:px-2 mx-2" />
                <div className="w-full font-inter flex lg2:flex-row flex-col lg2:items-center lg2:justify-between lg2:pb-10 pb-[150px] pt-5 md:px-2 mx-2">
                    <p className="flex text-sm font-normal text-[#FFFFFF] text-opacity-50 font-sans gap-2">
                        <span>&copy;2024 Ethermions.Ethentives</span>
                        <span>All rights reserved</span>
                    </p>

                </div>
            </div>
        </>
    );
}

export default Footer;