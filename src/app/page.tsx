'use client'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';

import { Children, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useSession, signIn, signOut } from 'next-auth/react';

function myFunction() {
  location.replace("/dashboard/overview")
}

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession()
  if (!session) {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bgImage='/map.png'
        bgPosition={'center'}
        bgRepeat={'no-repeat'}
        bgAttachment={'fixed'}
        bgSize='90%'
        
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
               ✌️WE WAITING FOR YOU GUYS✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('purple', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            color='white'>
            <form action="/api/auth/register" method="post">
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" id='Fname' name='Fname' />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" id='Lname' name='Lname' />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" id='Email' name='Email' />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} id='password' name='password' />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    type='submit'
                    loadingText="Submitting"
                    size="lg"
                    bg='white'
                    color={'black'}
                    _hover={{
                      bg: 'whiteAlpha.400',
                    }}>
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user? <Link color={'blue.400'} onClick={() => signIn()}>Login</Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  }
  return(
    myFunction()
  )
}