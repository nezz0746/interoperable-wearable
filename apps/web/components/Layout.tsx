import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";
import ConnectButton from "./ConnectButton";
import Card from "./Card";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex flex-col h-screen bg-black p-2 gap-4">
      <Card className="flex flex-row w-full justify-between p-2">
        <div className="relative h-full w-52">
          <Image
            src={"/logo.png"}
            layout="fill"
            objectFit="cover"
            alt="gaian logo"
          />
        </div>
        <div className="flex flex-row gap-2">
          <ConnectButton />
        </div>
      </Card>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
