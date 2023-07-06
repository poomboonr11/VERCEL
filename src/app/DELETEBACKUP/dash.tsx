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
    Button
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
  import StatusIndicator from '@/app/components/status';
  
  const axios = require('axios');
  export default function BasicStatistics() {
    const customIcon = L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61942.png',
          iconSize: [32, 32], // Adjust the size of the icon as needed
          iconAnchor: [16, 32], // Adjust the anchor position of the icon as needed
     });
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
  
    //-------------------------------------------------เช็คstatus CA-------------------------------------------------------//
  // เพิ่ม state ใหม่สำหรับเก็บค่าสถานะ
  const [caStatus, setCaStatus] = useState(null);
  
  // แก้ไข useEffect ในการเรียก API เพื่อเช็คสถานะ
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/checkstatus');
          const { status } = response.data;
          console.log(status); // ตรวจสอบค่า status ใน Console
          setStatus(status);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchData();
    }, []);
    
  
  
    return (
      <Box maxWidth="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} padding={20}> 
        {!isCAEntered && (
      <Flex justifyContent={'auto'}>
      <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          <SlEnergy size={'3em'} />
      </Box>
        <Box pl={{ base: 2, md: 4 }}>
            <Text fontWeight="bold" fontSize="md">
              CA NUMBER
            </Text>
            <form onSubmit={handleSubmit}>
            <Input
              width="1145px"
              borderColor="black"
              color="green"
              type="text"
              id="CA"
              name="CA"
              placeholder='XXXX'
           
              />
            </form>
        </Box>
      </Flex>
  )}
  
  
  
        {result && (
          <ChakraProvider>     
          <Box pl={{ base: 2, md: 4 }}>
          </Box>       
            <Box
              mt={75}
              p={5}
              w={'1245px'}
              h={'600px'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'lg'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}
              onClick={handleMarkerClick}
            >
              <Box  pos={'relative'} width={'1200px'} height={'full'} rounded={'lg'} boxShadow={'lg'}>
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[latitude, longitude]} icon={customIcon}>
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
              </Box>
            </Box>
  
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }} mt={10}>
  
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
    rounded={'lg'}
  >
    <Flex justifyContent={'space-between'}>
      <Box pl={{ base: 2, md: 4 }}>
        <StatLabel fontWeight="bold" fontSize="md" isTruncated>
          CONTROL
        </StatLabel>
      </Box>
      <Switch
        ml={4}
        alignSelf="center"
        id="toggleSwitch"
        colorScheme="green"
        size="lg"
        onChange={handleSwitchChange}
      />
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
  <StatusIndicator status={caStatus} />
  </Stat>
  
              </SimpleGrid>
          </ChakraProvider>
        )}
      {!result && (
          <ChakraProvider>
          <Heading mt={5} textAlign="center" fontSize="30px">All Location Home Charger</Heading>
          <MapPage/>
          </ChakraProvider>
      )}
      </Box>
    );
  }
      