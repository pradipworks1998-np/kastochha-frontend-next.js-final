"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../components/Header";

export default function HeaderWrapper() {
  const router = useRouter();

  const resetSearch = () => {
    router.push("/");
  };

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  return <Header resetSearch={resetSearch} isLoading={false} />;
}
