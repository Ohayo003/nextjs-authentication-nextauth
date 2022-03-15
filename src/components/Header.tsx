import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  MenuDivider,
  Stack,
  Center,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession({ required: true });

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link passHref href="/home/">
          <Box fontWeight="bold" _hover={{ cursor: "pointer" }}>
            NEXT AUTH APP
          </Box>
        </Link>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            {/* <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button> */}

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    status === "authenticated"
                      ? session?.user?.image!
                      : "https://avatars.dicebear.com/api/male/username.svg"
                  }
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={
                      status === "authenticated"
                        ? session?.user?.image!
                        : "https://avatars.dicebear.com/api/male/username.svg"
                    }
                  />
                </Center>
                <br />
                <Center>
                  <p>
                    {status === "authenticated"
                      ? session.user?.name
                      : "username"}
                  </p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <Link passHref href="/home/profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuItem
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                >
                  Logout
                </MenuItem>
              </MenuList>
              {/* ) : null} */}
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
