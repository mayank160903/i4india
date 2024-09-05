"use client";

import { usePathname } from "next/navigation";
import ParentComponent from "./ParentComponent";

const DynamicHero = () => {
  const pathname = usePathname();

  // Render Hero only on the homepage
  if (pathname === "/") {
    return <>
    <ParentComponent />
    </>;
  }

  return null;
};

export default DynamicHero;
