"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const EditNews = dynamic(() => import("@components/EditNews"), {
  suspense: true,
});

const Page = () => {
  return (
    <Suspense>
      <EditNews />
    </Suspense>
  );
};

export default Page;