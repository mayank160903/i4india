"use client";

import { usePathname } from "next/navigation";
import ParentComponent from "./ParentComponent";
import PopularParent from "./PopularParent";

const DynamicHero = () => {
  const pathname = usePathname();

  // Render Hero only on the homepage
  if (pathname === "/") {
    return <>
    <ParentComponent />
    <PopularParent />
    </>;
  }

  return null;
};

export default DynamicHero;
