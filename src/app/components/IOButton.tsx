"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

const IObutton = () => {
    const { data: session } = useSession()
    if (session && session.user) {
        return (
            <Flex align={'center'} >
                <Text className="text-sky-600" padding={5}>{session.user.Email}</Text>
                <Button colorScheme='purple' onClick={() => signOut()} className="text-red-600">
                    Sign Out
                </Button>
            </Flex>
        );
    } return (
        <Button bgColor="purple" 
         color='white' 
         _hover={{
            bg: 'purple.400',
          }}
         onClick={() => signIn()} 
         className="text-green-600 ml-auto">
            Sign In
        </Button>
    );
};
export default IObutton;