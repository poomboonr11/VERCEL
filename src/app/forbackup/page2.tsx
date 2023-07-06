'use client'
import {
    Box,
    chakra,
    Flex,
    Icon,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Heading,
    ChakraProvider,
    IconButton,
    Input,
    Text,
    Stack,
    FormLabel,
    FormControl
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SlEnergy } from "react-icons/sl";
import { FiServer } from 'react-icons/fi';
import { useSearchParams } from 'next/navigation'
import StatusIndicator from '../../components/status'
import LineChart from '../../Mychart'
import {MdOutlineNotificationsActive} from 'react-icons/md'
import Notification from '../../components/status2';
import Test from '../../components/noti'
import DrawerExample from '../../components/notificate'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const axios = require('axios');

export default function BasicStatistics() {
    const [result, setResult] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const CA = formData.get('CA');
      
        try {
          const response = await fetch('/api/Search/[CA]', {
            method: 'POST',
            body: JSON.stringify({ CA }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json();
      
          if (response.ok) {
            setResult(data);
          } else {
            setResult(null);
          }
        } catch (error) {
          console.error(error);
          setResult(null);
        }
      };


    const { data: session } = useSession()


    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const searchParams = useSearchParams()
    console.log(searchParams?.toString())
    const url = `http://localhost:3014/home/api/station?${searchParams?.toString()}`
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get(url);
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    console
    return (
        <Box maxWidth="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} padding={20} >
            <Flex
            mt={-20}
            px={20}
                minW="55%"
                maxH="20%"
                flexDir="column"
                overflow="auto"
            >
                <Flex alignSelf="end">

                    <DrawerExample/>
                </Flex>
                    
                    <LineChart/>
                    
            </Flex>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }} >
                <Stat
                    px={{ base: 2, md: 4 }}
                    py={'5'}
                    shadow={'xl'}
                    border={'1px solid'}
                    borderColor={useColorModeValue('gray.800', 'gray.500')}
                    rounded={'lg'}
                    position={'sticky'}>
                    <Flex justifyContent={'space-between'}>
                        <Box pl={{ base: 2, md: 4 }}>
                            <StatLabel fontWeight={'medium'} isTruncated>
                                Status<StatusIndicator />
                            </StatLabel>
                            <FormControl>
                                <FormLabel>CA NUMBER</FormLabel>
                            <form onSubmit={handleSubmit}>
                                <Input borderColor="black" color="green" type="text" id="CA" name="CA"  placeholder='CA-XXXX' />
                            </form>
                            </FormControl>
                        </Box>
                        <Box
                            my={'auto'}
                            color={useColorModeValue('gray.800', 'gray.200')}
                            alignContent={'center'}>
                            <SlEnergy size={'3em'} />
                        </Box>
                    </Flex>
                </Stat>

                <Stat
                    px={{ base: 2, md: 4 }}
                    py={'5'}
                    shadow={'xl'}
                    border={'1px solid'}
                    borderColor={useColorModeValue('gray.800', 'gray.500')}
                    rounded={'lg'}>
                    <Flex justifyContent={'space-between'}>
                        <Box pl={{ base: 2, md: 4 }}>
                            <StatLabel fontWeight={'medium'} isTruncated>
                                HeartbeatInterval
                            </StatLabel>
                            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                {data.map(item => (<span>{item.heartbeatInterval}</span>))}
                            </StatNumber>
                        </Box>
                        <Slider aria-label='slider-ex-4' defaultValue={30}>
                            <SliderTrack bg='red.100'>
                                <SliderFilledTrack bg='tomato' />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                                <Box color='tomato' />
                            </SliderThumb>
                        </Slider>
                        <Box
                            my={'auto'}
                            color={useColorModeValue('gray.800', 'gray.200')}
                            alignContent={'center'}>
                            <FiServer size={'3em'} />
                        </Box>
                    </Flex>
                </Stat>

                <Stat
                    px={{ base: 2, md: 4 }}
                    py={'5'}
                    shadow={'xl'}
                    border={'1px solid'}
                    borderColor={useColorModeValue('gray.800', 'gray.500')}
                    rounded={'lg'}>
                    <Flex justifyContent={'space-between'}>
                        <Box pl={{ base: 2, md: 4 }}>
                            <StatLabel fontWeight={'medium'} isTruncated>
                                Location
                            </StatLabel>
                            <StatNumber fontSize={'xl'} fontWeight={'medium'} minW={100} maxW={250}>
                            {result !== null ? (
                            <Box>
                                <Text fontSize="lg" fontWeight="bold">
                                    {result.Location_province}
                                </Text>
                                <Text fontSize="md" fontWeight="normal">
                                    {result.Location_amphure},
                                    {result.Location_tambon}
                                </Text>

                            </Box>
                            ) : (
                                <Text mt={5}>NOT FOUND</Text>
                                )}
                            </StatNumber>
                        </Box>
                        <Box
                            my={'auto'}
                            color={useColorModeValue('gray.800', 'gray.200')}
                            alignContent={'center'}>
                            <FiServer size={'3em'} />
                        </Box>
                    </Flex>
                </Stat>
            </SimpleGrid>
        </Box>
    );
}