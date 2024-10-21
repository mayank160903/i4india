"use client";

import { usePathname } from "next/navigation";
import ParentComponent from "./ParentComponent";

const DynamicHero = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>
    <ParentComponent />
    </>;
  }

  return null;
};

export default DynamicHero;
