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
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session, status } = useSession();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box fontWeight="bold">NEXT AUTH APP</Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

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
                <MenuItem>Account Settings</MenuItem>
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
