import { ReactNode } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="px-[5%] py-5">
        <div className="max-w-[1200px] mx-auto">{children}</div>
      </div>
    </div>
  );
}
