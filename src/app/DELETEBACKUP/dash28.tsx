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
  import LineChart from '../../Mychart';
  import DrawerExample from '../../components/notificate';
  import { useSession } from 'next-auth/react';
  import { useRouter } from 'next/navigation';
  import { MapContainer, TileLayer, Marker } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import custom from '../../../../public/location.png';
  import { Popup } from 'react-leaflet';
  import MapPage from '@/app/MAP/page';
  import Status from '@/app/components/status';
  import { Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
  
  
  const axios = require('axios');
  
  export default function BasicStatistics() {
    const customIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61942.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
    const toast = useToast();
    const router = useRouter();
  
    const handleSwitchChange = async (e) => {
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
      
          // Update the status in the database to "active"
          try {
            await axios.put('/api/UpdateStatus', {
              CA: result?.CA,
              status: 'active',
            });
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('Switch is OFF');
          setIsCAEntered(false);
          toast({
            title: 'CHARGER IS OFF',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      
          // Update the status in the database to "inactive"
          try {
            await axios.put('/api/UpdateStatus', {
              CA: result?.CA,
              status: 'inactive',
            });
          } catch (error) {
            console.error(error);
          }
        }
      
        setSwitchOn(isChecked);
      };
  
    const [isSwitchOn, setSwitchOn] = useState(true);
    const [isCAEntered, setIsCAEntered] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
  
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
      // ...
      const fetchData = async () => {
        try {
          // เรียกใช้ API เพื่อดึงสถานะ
          const response = await axios.get('/api/Search/[CA]');
          const { status } = response.data;
          setStatus(status);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);

  
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
  
    const handleMarkerClick = () => {
      };
  
    return (
      <Box maxWidth="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} padding={20}>
        {!isCAEntered && (
          <Flex justifyContent={'auto'}>
            <Box my={'auto'} color={useColorModeValue('gray.800', 'gray.200')} alignContent={'center'}>
              <SlEnergy size={'3em'} />
            </Box>
            <Box pl={{ base: 2, md: 4 }}>
              <Text fontWeight="bold" fontSize="md">
                CA NUMBER
              </Text>
              <form onSubmit={handleSubmit}>
                <Input width="1145px" borderColor="black" color="green" type="text" id="CA" name="CA" placeholder="XXXX" />
              </form>
            </Box>
          </Flex>
        )}
  
        {result && (
          <ChakraProvider>
            <Box pl={{ base: 2, md: 4 }} mt={75} p={5} w={'1245px'} h={'600px'} bg={useColorModeValue('white', 'gray.800')} boxShadow={'lg'} rounded={'lg'} pos={'relative'} zIndex={1} onClick={handleMarkerClick}>
              <Box pos={'relative'} width={'1200px'} height={'full'} rounded={'lg'} boxShadow={'lg'}>
                <MapContainer center={[latitude, longitude]} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors" />
                  <Marker position={[latitude, longitude]} icon={customIcon}>
                  <Popup>
                    <Heading size="sm" >CA:{result.CA}</Heading>
                    <Text fontSize="md" fontWeight="bold">{result.Location_province}</Text>
                    <Text>{result.Location_amphure},{result.Location_tambon}</Text>
                  </Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </Box>
  
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }} mt={10}>
              <Stat
                px={{ base: 2, md: 4 }}
                py={'5'}
                shadow={'xl'}
                border={'1px solid'}
                borderColor={useColorModeValue('gray.800', 'gray.500')}
                rounded={'lg'}
              >
                <Flex justifyContent={'space-between'}>
                  <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight="bold" fontSize="md" isTruncated>
                      HeartbeatInterval
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                      {data.map((item) => <span key={item}>{item.heartbeatInterval}</span>)}
                    </StatNumber>
                  </Box>
                  <Slider aria-label="slider-ex-4" defaultValue={30}>
                    <SliderTrack bg="red.100">
                      <SliderFilledTrack bg="tomato" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <Box color="tomato" />
                    </SliderThumb>
                  </Slider>
                  <Box my={'auto'} color={useColorModeValue('gray.800', 'gray.200')} alignContent={'center'}>
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
                rounded={'lg'}
              >
                <Flex justifyContent={'space-between'}>
                  <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight="bold" fontSize="md" isTruncated>
                      CONTROL
                    </StatLabel>
                  </Box>
                  <Switch ml={4} alignSelf="center" id="toggleSwitch" colorScheme="green" size="lg" onChange={handleSwitchChange} isChecked={isSwitchOn} />
                </Flex>
              </Stat>
              <Stat
                px={{ base: 2, md: 4 }}
                py={'5'}
                shadow={'xl'}
                border={'1px solid'}
                borderColor={useColorModeValue('gray.800', 'gray.500')}
                rounded={'lg'}
              >
                <Status status={result?.status} />
              </Stat>
            </SimpleGrid>
          </ChakraProvider>
        )}
        {!result && (
          <ChakraProvider>
            <Heading mt={5} textAlign="center" fontSize="30px">
              All Location Home Charger
            </Heading>
            <MapPage />
          </ChakraProvider>
        )}
      </Box>
    );
  }
  