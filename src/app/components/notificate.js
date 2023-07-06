'use client'
import { Flex,
Heading,
Avatar,
 AvatarGroup,
Text,
Icon,
IconButton,
Table,
Thead,
Tbody,
Tr,
Th,
Td,
Divider,
Link,
Box,
Button,
Input,
InputGroup,
Fade,
InputLeftElement,
Grid} from "@chakra-ui/react";
import react, { useState } from "react";
import { FiHome,FiSearch,FiPieChart,FiDollarSign,FiBox,FiCalendar,FiChevronDown,
FiChevronUp,FiPlus,FiCreditCard,FiBell } from "react-icons/fi";
import LineChart from '../Mychart'
import { MdNotifications } from "react-icons/md";
import { Container } from "postcss";
import {AiOutlineControl} from "react-icons/ai"
import { ChakraProvider } from "@chakra-ui/react";
import IObutton from "../components/IOButton";
import { IoMdNotifications } from "react-icons/io";
import React from 'react';
import { useDisclosure,Drawer,DrawerOverlay,DrawerContent,DrawerCloseButton,DrawerHeader,DrawerBody,DrawerFooter } from "@chakra-ui/react";
import Status2 from "./status2";
import StatusIndicator from "./status";
import Status3 from "./status3";
import Status4 from "./status4";
export default function DrawerExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    return (
      <Flex rounded="15" 
            bg={"purple"}
            >
        
        <Icon as={IoMdNotifications} ref={btnRef} onClick={onOpen} fontSize="5xl" className="active-icon"/>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg={"purple"} color="white">

            <DrawerCloseButton />
            <DrawerHeader>ALL NOTIFICATION</DrawerHeader>
            <Table variant="unstyled" mt={4}>
                <Tbody>

                   
                    <Tr>
                        <Td>
                            <Flex align="center">
                 
                                <Grid mr={3}>
                                            <Status4/>
                                </Grid>

                                <Flex flexDir="column">
                                    <Heading fontSize='sm' size="sm" letterSpacing="tight">LOAD CHARGER 90%</Heading>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td fontSize='xs'>June 8,2023 at 16:00</Td>                                      
                    </Tr>

                    <Tr>
                        <Td>
                            <Flex align="center">
                                <Grid mr={3}>
                                            <Status2/>
                                </Grid>
                                <Flex flexDir="column">
                                    <Heading size="sm" letterSpacing="tight">BUSY</Heading>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td fontSize='xs'>June 9,2023 at 19:00</Td>
                                        
                    </Tr>  

                    <Tr>
                        <Td>
                            <Flex align="center">
                                <Grid mr={3}>
                                            <StatusIndicator/>
                                </Grid>
                                <Flex flexDir="column">
                                    <Heading size="sm" letterSpacing="tight">AVAILABLE</Heading>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td fontSize='xs'>June 11,2023 at 8:00</Td>                                       
                    </Tr>  

                    <Tr>
                        <Td>
                            <Flex align="center">
                                <Grid mr={2}>
                                            <Status3/>
                                </Grid>
                                <Flex flexDir="column">
                                    <Heading size="sm" letterSpacing="tight">CLOSE</Heading>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td fontSize='xs'>June 12,2023 at 0:00</Td>                                       
                    </Tr>                                                                                               
                    
                                                                                                                                                    
                </Tbody>
            </Table>
            <DrawerFooter>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    )
  }