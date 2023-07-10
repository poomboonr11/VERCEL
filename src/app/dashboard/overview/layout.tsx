'use client'
import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Tooltip,
} from '@chakra-ui/react';
import {
  FiEdit,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {BiSolidAddToQueue} from 'react-icons/bi'
export default function SimpleSidebar({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      </Box>
    );
  }
  
  interface SidebarProps extends BoxProps {
    onClose: () => void;
  }
  
  const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
      <Flex mt={'170px'} ml={-1} bgColor="purple" flexDirection="column" position="fixed" borderRadius={10} w="60px" h="200px">
        <Tooltip ml={3} rounded={10} label='ADD HERE!' fontSize='md'>
        <Link href="/addcharger">
          <Box
            ml={2}
            mt={5}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="40px"
            height="40px"
            p="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: '#30305a',
              color: 'purple',
            }}
          >
            <Icon
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={BiSolidAddToQueue}
              color="white"
            />
          </Box>
        </Link>
        </Tooltip>
        <Tooltip ml={3} rounded={10} label='EDIT/DELETE HERE!' fontSize='md'>
        <Link href="/del">
          <Box
            ml={2}
            mt={5}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="40px"
            height="40px"
            p="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: '#30305a',
              color: 'purple',
            }}
          >
            <Icon
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={FiEdit}
              color="white"
            />
          </Box>
        </Link>
        </Tooltip>
        <Link href="/dashboard/overview">
          <Box
            ml={2}
            mt={5}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="40px"
            height="40px"
            p="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: '#30305a',
              color: 'purple',
            }}
          >
            <Icon
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={AiOutlineArrowLeft}
              color="white"
            />
          </Box>
        </Link>
      </Flex>
    );
  };
  
  interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    href?: string;
  }
  