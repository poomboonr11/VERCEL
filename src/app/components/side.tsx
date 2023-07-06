import React from 'react'
import '../../../styles/bar.css'
import { Box,CloseButton,Flex,Icon,useColorModeValue } from '@chakra-ui/react';
import { FiHome,FiSettings } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function Sidebar(){
    return(
        <Box
        bg={useColorModeValue('purple', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 20 }}
        pos="fixed"
        flexDir="column"
        alignItems="center"
        backgroundColor="purple"
        color="#fff"
        rounded="15"
        mt="150px"
        mb={1}
        ml={-3}
        >
            <Flex ml={2}>
            <div>
        <ul>
            <li>
                <a href='/login'>
                    <i className="ai-image"/>
                    <Icon as={FiHome}/>
                    <span>Home</span>
                </a>
            </li>
            <li>
                <a href='/login'>
                    <i className="ai-image"/>
                    <Icon as={FiSettings}/>
                    <span>Register</span>
                </a>
            </li>
            <li>
                <a href='/login'>
                    <i className="ai-image"/>
                    <Icon as={RiDeleteBin6Line}/>
                    <span>Edit</span>
                </a>
            </li>
        </ul>
        </div>
        </Flex>
        </Box>        
    );
};