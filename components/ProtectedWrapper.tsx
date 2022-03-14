import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren } from "react";

const ProtectedWrapper = ({ children }: PropsWithChildren<{}>) => {
  const { status } = useSession();
  const { replace } = useRouter();

  //   console.log(status);
  if (status === "authenticated") return <Fragment>{children}</Fragment>;
  if (status === "unauthenticated") replace("/");

  return null;
};

export default ProtectedWrapper;
