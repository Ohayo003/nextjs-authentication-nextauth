import { IconButton } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import React from "react";
import { FaFacebookSquare, FaGithub, FaGoogle } from "react-icons/fa";
import { BuiltInProviderType } from "next-auth/providers";
import { LiteralUnion, signIn, ClientSafeProvider } from "next-auth/react";

interface IPlatformLogins {
  provider: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const PlatformLogins = ({ provider }: IPlatformLogins) => {
  return (
    <HStack justify="center">
      <IconButton
        background="transparent"
        icon={<FaFacebookSquare size={45} />}
        aria-label="facebook-btn"
        onClick={() =>
          signIn(provider?.facebook.id, {
            callbackUrl: "http://localhost:3000/home",
          })
        }
      />
      <IconButton
        background="transparent"
        icon={<FaGithub size={45} />}
        aria-label="github-btn"
        onClick={() =>
          signIn(provider?.github.id, {
            callbackUrl: "http://localhost:3000/home",
          })
        }
      />
      <IconButton
        background="transparent"
        icon={<FaGoogle size={45} />}
        aria-label="Google-btn"
        onClick={() =>
          signIn(provider?.google.id, {
            callbackUrl: "http://localhost:3000/home",
          })
        }
      />
    </HStack>
  );
};

export default PlatformLogins;
