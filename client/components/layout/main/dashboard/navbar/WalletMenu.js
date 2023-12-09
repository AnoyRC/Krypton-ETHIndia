"use client";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Card,
} from "@material-tailwind/react";
import {
  ArrowPathRoundedSquareIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import { useState } from "react";
import { ChipsInId } from "@/components/ui/chainChips";
import { ChainConfig } from "@/lib/ChainConfig";

export default function WalletMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const isConnected = true;

  return (
    <Menu
      open={openMenu}
      handler={setOpenMenu}
      allowHover
      animate={{
        mount: { y: 4 },
        unmount: { y: -24 },
      }}
      placement="bottom-end"
    >
      <MenuHandler>
        <Button
          variant="text"
          className="flex  mt-2 items-center gap-3 text-base font-normal capitalize tracking-normal font-uni outline-none"
        >
          Wallet{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="hidden w-fit grid-cols-8 gap-4 overflow-visible lg:grid">
        <Card
          shadow={false}
          className="col-span-4 flex h-full w-full rounded-md p-4 outline-none max-w-xs space-y-10 bg-[rgb(255,248,248)]"
        >
          <div className=" space-y-2">
            <p className="font-uni text-lg font-bold">Wallet Actions</p>
            <p className="font-uni text-md">
              View all of your wallets and their balances.
            </p>
          </div>

          <Image
            src={"/images/main/dashboard/navbar/briefcase.png"}
            width={175}
            height={175}
            className="aspect-square mx-auto"
            alt="wallet"
          />
        </Card>

        <ul className="col-span-4 flex max-w-xs flex-col w-full items-end gap-1 outline-none">
          {isConnected &&
            !ChainConfig.find(
              (chain) => chain.chainId.toString() === "80001"
            ) && (
              <Button
                size="sm"
                className="w-full my-2 capitalize text-lg font-uni flex gap-1 items-center justify-center"
                variant="outlined"
              >
                <ArrowPathRoundedSquareIcon className="h-5 w-5" />
                Change Network
              </Button>
            )}

          {!isConnected && (
            <Button
              size="sm"
              className="w-full my-2 capitalize text-lg font-uni"
              onClick={() => router.push("/login")}
            >
              Connect
            </Button>
          )}

          {isConnected && (
            <Card
              className="w-full shadow-none items-end gap-1 border-[1px] p-2 px-4"
              style={{
                backgroundColor: ChainConfig.find(
                  (network) => network.chainId === 80001
                )
                  ? ChainConfig.find((network) => network.chainId === 80001)
                      ?.color + "1A"
                  : "#0000001A",
                borderColor: ChainConfig.find(
                  (network) => network.chainId === 80001
                )
                  ? ChainConfig.find((network) => network.chainId === 80001)
                      ?.color + "FF"
                  : "#000000FF",
              }}
            >
              <div className="flex w-full items-center justify-between text-center">
                <ChipsInId chain={"80001"} />
                <p className="font-uni text-2xl font-extrabold">28.3 ETH</p>
              </div>
              <p className="font-uni text-md flex gap-1 items-center hover:cursor-pointer">
                <DocumentDuplicateIcon className="h-4 w-4" />
                0x25...0dn1
              </p>
            </Card>
          )}

          {isConnected && (
            <Button
              size="sm"
              className="w-full mt-2 capitalize text-lg font-uni"
            >
              Disconnect
            </Button>
          )}

          <div className="flex w-full items-center mt-2 mb-2 justify-center text-center gap-3">
            <div className="w-[20%] bg-black h-[1px]" /> Krypton Wallet
            <div className="w-[20%] bg-black h-[1px]" />
          </div>

          <Card
            className="w-full shadow-none items-end gap-1 border-[1px] p-2 px-4"
            style={{
              backgroundColor: ChainConfig.find(
                (network) => network.chainId == "80001"
              )
                ? ChainConfig.find((network) => network.chainId == "80001")
                    ?.color + "1A"
                : "#0000001A",
              borderColor: ChainConfig.find(
                (network) => network.chainId == "80001"
              )
                ? ChainConfig.find((network) => network.chainId == "80001")
                    ?.color + "FF"
                : "#000000FF",
            }}
          >
            <div className="flex w-full items-center justify-between text-center">
              <ChipsInId chain={"80001"} />
              <p className="font-uni text-2xl font-extrabold">2.7 ETH</p>
            </div>
            <p className="font-uni text-md flex gap-1 items-center hover:cursor-pointer">
              <DocumentDuplicateIcon className="h-4 w-4" />
              0x82....9293
            </p>
          </Card>
          <Button size="sm" className="w-full mt-2 capitalize text-lg font-uni">
            Back to Menu
          </Button>
        </ul>
      </MenuList>
    </Menu>
  );
}
