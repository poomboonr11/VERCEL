"use client"
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
  import React, { useEffect, useState,useRef } from 'react';
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
  import Loading from '../../../app/loading';
  
  
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
        if (status === 'inactive') { // เพิ่มเงื่อนไขตรวจสอบสถานะเป็น "inactive"
          console.log('Cannot switch OFF when status is inactive');
          return; // ออกจากฟังก์ชันเพื่อไม่ให้ทำงานต่อ
        }
    
        console.log('Switch is OFF');
        setIsOpen(true); // เปิด AlertDialog เมื่อกดปิดสวิตซ์
      }
    
      setSwitchOn(isChecked);
    };
    
  
    const [isSwitchOn, setSwitchOn] = useState(true);
    const [isCAEntered, setIsCAEntered] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
  
    const { data: session } = useSession();
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

    const [isOpen, setIsOpen] = useState(false); // สถานะเปิด/ปิด AlertDialog
    const cancelRef = useRef();
    // เปิด AlertDialog
    const handleSwitchClose = () => {
        setIsOpen(true);
    };
    
    // ปิด AlertDialog และปิดการใช้งานสวิตซ์
    const handleSwitchConfirm = async () => {
        setIsOpen(false); // ปิด AlertDialog
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
      };
    
    // ปิด AlertDialog และยกเลิกการปิดการใช้งานสวิตซ์
    const handleSwitchCancel = () => {
        setIsOpen(false); // ปิด AlertDialog
        setSwitchOn(true); // เปิดสวิตซ์อีกครั้ง
      };


  
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

///----------------------------------WORK LOAD---------------------------------------/////////
const [workloadData, setWorkloadData] = useState("");

useEffect(() => {
    async function fetchWorkloadData() {
      try {
        const response = await axios.post("/api/Search/[CA]", { CA: result?.CA });
        const { HB_rate } = response.data; // Assuming the response data contains the HB_rate value
        setWorkloadData(HB_rate);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchWorkloadData();
  }, [result?.CA]);


  //-------------------------------LOCK SWITCH WHEN INACTIVE----------------------------------////
  const [isSwitchLocked, setSwitchLocked] = useState(false);
  const fetchData = async () => {
    try {
      // เรียกใช้ API เพื่อดึงสถานะ
      const response = await axios.get('/api/Search/[CA]');
      const { status } = response.data;
      setStatus(status);
  
      // ตรวจสอบสถานะเพื่อกำหนดการล็อคสวิตซ์
      if (status === 'inactive') {
        setSwitchLocked(true); // ล็อคสวิตซ์เมื่อสถานะเป็น inactive
      } else {
        setSwitchLocked(false); // ปลดล็อคสวิตซ์เมื่อสถานะเป็น active
      }
    } catch (error) {
      console.error(error);
    }
  };
//----------------------------LOADING------------------------------------------------------//
const [isLoading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    try {
      // เรียกใช้ API หรือโค้ดที่ใช้ในการโหลดข้อมูล
      // ...

      setLoading(false); // เมื่อโหลดเสร็จสิ้นกำหนด isLoading เป็น false
    } catch (error) {
      console.error(error);
      setLoading(false); // หากเกิดข้อผิดพลาดก็กำหนด isLoading เป็น false
    }
  }

  fetchData();
}, []);


    return (
      <Box maxWidth="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} padding={20}>
        {isLoading && <Loading />} {/* แสดง Loading component หาก isLoading เป็น true */}
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
            {isLoading && <Loading />} {/* แสดง Loading component หาก isLoading เป็น true */}
              <Box pos={'relative'} width={'1200px'} height={'full'} rounded={'lg'} boxShadow={'lg'}>
                <MapContainer  center={[latitude, longitude]} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
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
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 6 }} mt={5}>
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
                      STATUS
                      <Status status={result?.status} />
                    </StatLabel>
                  </Box>
                  <Switch
                  ml={4}
                  alignSelf="center"
                  id="toggleSwitch"
                  colorScheme="green"
                  size="lg"
                  onChange={handleSwitchChange}
                  isChecked={isSwitchOn}
                  isDisabled={!isSwitchOn || status === 'inactive'} // เพิ่มเงื่อนไขในการตรวจสอบสถานะเป็น "inactive"
                />

  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={handleSwitchCancel}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirm Switch Off
              </AlertDialogHeader>
              <AlertDialogBody color="red" fontWeight="bold">!IF SWITCH OFF YOU CAN TURN IT ON ANYMORE!</AlertDialogBody>
              <AlertDialogFooter>
                <Button colorScheme="red"  onClick={handleSwitchConfirm}>
                  Confirm
                </Button>
                <Button ref={cancelRef} ml={3} onClick={handleSwitchCancel}>
                  Cancel
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
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
                    Work load
                </StatLabel>
                <StatNumber fontSize={"3xl"} fontWeight={"medium"}>
                    <Text color="red">{workloadData}  kW</Text>
                </StatNumber>
                  </Box>
                  <Box my={'auto'} color={useColorModeValue('gray.800', 'gray.200')} alignContent={'center'}>
                    <FiServer size={'3em'} />
                  </Box>
                </Flex>
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
  