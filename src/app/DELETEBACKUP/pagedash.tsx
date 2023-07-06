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
    FormControl,
    Link,
    Switch,
  } from '@chakra-ui/react';
  import { Toast, useToast } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import { SlEnergy } from 'react-icons/sl';
  import { FiServer } from 'react-icons/fi';
  import { useSearchParams } from 'next/navigation';
  import StatusIndicator from '../../components/status';
  import LineChart from '../../Mychart';
  import DrawerExample from '../../components/notificate';
  import { useSession } from 'next-auth/react';
  import { useRouter } from 'next/navigation';
  import { MapContainer, TileLayer, Marker } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import custom from '../../../../public/location.png';
  import { Popup } from 'react-leaflet';
  
  const axios = require('axios');
  export default function BasicStatistics() {
    const toast = useToast();
    const router = useRouter();
  
    const handleSwitchChange = (e) => {
      const isChecked = e.target.checked;
  
      if (isChecked) {
        console.log('Switch is ON');
        setIsCAEntered(true);
        toast({
          title: 'CHARGER IS ON',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.log('Switch is OFF');
        setIsCAEntered(false);
        toast({
          title: 'CHARGER IS OFF',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
  
      setSwitchOn(isChecked);
    };
  
    const [isSwitchOn, setSwitchOn] = useState(false);
    const [isCAEntered, setIsCAEntered] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
  
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [result, setResult] = useState(null);
 //--------------------------------------------------ค้นหาCA-------------------------------------------------------//
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
          setLatitude(data.Location_detail_lat);
          setLongitude(data.Location_detail_long);
        } else {
          setResult(null);
          setLatitude(null);
          setLongitude(null);
        }
      } catch (error) {
        console.error(error);
        setResult(null);
        setLatitude(null);
        setLongitude(null);
      }
    };

//--------------------------------------------------พาไปที่marker CAนั้นอยู่-------------------------------------------------------//
    const handleMarkerClick = () => {
        if (result !== null && result.Location_detail_lat && result.Location_detail_long) {
    const { Location_detail_lat, Location_detail_long } = result;
          {/* จะให้มันพาไปหาที่ควบคุมCA */}
        }
      };
      


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
        <Box maxWidth="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} padding={20}>
            <Flex
            mt={-20}
            px={20}
                minW="55%"
                maxH="20%"
                flexDir="column"
                overflow="auto"
            >
                <Flex alignSelf="start">

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
                            <StatLabel fontWeight="bold" fontSize="md" isTruncated>
                                STATUS<StatusIndicator />
                            </StatLabel>
                            <FormControl>
                                <FormLabel fontWeight="bold" fontSize="md">CA NUMBER</FormLabel>
                            <form onSubmit={handleSubmit}>
                                <Input borderColor="black" color="green" type="text" id="CA" name="CA"  placeholder='XXXX' />
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
                            <StatLabel fontWeight="bold" fontSize="md" isTruncated>
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
                    <Flex flexDir="column" align="flex-start" justifyContent="center">
                        <Box pl={{ base: 3, md: 4 }}>   
                            <StatLabel  mt="2" fontWeight="bold" fontSize="md" isTruncated>
                                LOCATION
                            </StatLabel>
                            <StatNumber fontSize={'xl'} fontWeight={'medium'} minW={100} maxW={250}>

                            <Flex
                                border="1px"
                                shadow={'xl'}      
                                bg="purple.100"          
                                borderColor={useColorModeValue('gray.800', 'gray.500')}
                                rounded={'lg'}
                                w="535px"
                                h="480px">
                                {latitude && longitude ? (
                                    <MapContainer center={[latitude, longitude]} zoom={12} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors" />
                                        {/* ถ้ากดmarker จะแสดงpopup */}
                                    <Marker position={[latitude, longitude]} eventHandlers={{ click: handleMarkerClick }}>
                                        <Popup>
                                        <Box>
                                            <Heading size="md" mb={2}>CA-{result?.CA}</Heading>
                                            {/* แสดงข้อมูลอื่น ๆ ที่คุณต้องการ */}
                                            <Text fontWeight="bold">{result?.Location_province}</Text>
                                            <Text>{result?.Location_tambon},{result?.Location_amphure}</Text>
                                            {/* แสดงข้อมูลอื่น ๆ ที่คุณต้องการ */}
                                        </Box>
                                        </Popup>
                                    </Marker>
                                    </MapContainer>
                                ) : (
                                <Text textAlign="center" margin="auto">
                                    Map is not available for the selected CA.
                                </Text>
                                )}
                            </Flex>
                            </StatNumber>
                        </Box>            
                    </Flex>
                </Stat>
                <Flex 
                    py={'5'}
                    w="100%" 
                    h="35%"
                    borderColor={useColorModeValue('gray.800', 'gray.500')}
                    border="1px"
                    shadow={'xl'}
                    rounded={'lg'}>
                    <Text px={4} mt={2} fontWeight="bold" fontSize="md">CONTROL</Text>
                    <Switch
                    ml="-90px"
                    alignSelf="center"
                    id="toggleSwitch"
                    colorScheme="green"
                    size="lg"
                    onChange={handleSwitchChange}
                    />
                </Flex>
            </SimpleGrid>
        </Box>
    );
}