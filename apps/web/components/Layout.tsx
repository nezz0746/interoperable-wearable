import Link from "next/link";
import { ReactElement } from "react";
import ConnectButton from "./ConnectButton";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="border flex flex-col h-screen">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={"/"}>
            <div className="btn btn-outline rounded-none normal-case text-xl font-main">
              Home
            </div>
          </Link>
        </div>
        <div className="flex flex-row gap-2">
          <ConnectButton />
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
