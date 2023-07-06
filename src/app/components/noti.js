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
import { MdNotificationsActive } from "react-icons/md";
import React from 'react';
import { useDisclosure } from "@chakra-ui/react";

export default function Test(){
    const[display,changeDisplay] = useState('show')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return(
        <Flex flexDir="column">
        <Flex overflow="auto">
            <Table variant="unstyled" mt={4}>
                <Tbody>

                    {display == 'show' &&
                        <>
                    <Tr>
                        <Td>
                            <Flex align="center">
                 
                                <Grid mr={3}>
                                            <Avatar
                                                src="EV.png"
                                                size="md"
                                            />
                                </Grid>

                                <Flex flexDir="column">
                                    <Heading size="sm" letterSpacing="tight">LOAD CHARGER 90%</Heading>
                                    <Text fontSize="sm" color="grey">June 8,2023 at 16:00</Text>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td>BANGKOK</Td>
                        <Td>PRACHAUTHIT</Td>
                        <Td>CA-1234</Td>                                          
                    </Tr>

                    <Tr>
                        <Td>
                            <Flex align="center">
                                <Grid mr={3}>
                                            <Avatar
                                                src="EV.png"
                                                size="md"
                                            />
                                </Grid>
                                <Flex flexDir="column">
                                    <Heading size="sm" letterSpacing="tight">BUSY</Heading>
                                    <Text fontSize="sm" color="grey">June 9,2023 at 19:00</Text>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td>BANGKOK</Td>
                        <Td>RANGSIT</Td>
                        <Td>CA-4213</Td>                                          
                    </Tr>  

                    <Tr>
                        <Td>
                            <Flex align="center">
                                <Grid mr={3}>
                                            <Avatar
                                                src="EV.png"
                                                size="md"
                                            />
                                </Grid>
                                <Flex flexDir="column">
                                    <Heading size="sm" letterSpacing="tight">AVAILABLE</Heading>
                                    <Text fontSize="sm" color="grey">June 11,2023 at 8:00</Text>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td>BANGKOK</Td>
                        <Td>RANGSIT</Td>
                        <Td>CA-3034</Td>                                          
                    </Tr>  

                    <Tr>
                        <Td>
                            <Flex align="center">
                                <Grid mr={2}>
                                            <Avatar
                                                src="EV.png"
                                                size="md"
                                            />
                                </Grid>
                                <Flex flexDir="column">
                                    <Heading size="sm" letterSpacing="tight">CLOSE</Heading>
                                    <Text fontSize="sm" color="grey">June 12,2023 at 0:00</Text>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td>BANGKOK</Td>
                        <Td>PRACHAUTHIT</Td>
                        <Td>CA-1034</Td>                                         
                    </Tr>                                                                                               
                        </>
                    
                    }                                                                                                                                   
                </Tbody>
            </Table>
        <Flex>
        <IconButton icon={display == 'hide' ? <MdNotificationsActive/> : <MdNotificationsActive/>}
        onClick={() => {
            if (display == 'show') {
                changeDisplay('none')
            }else{
                changeDisplay('show')
            }

        }}  
        />
    </Flex>
    </Flex>
    </Flex>
    );
}