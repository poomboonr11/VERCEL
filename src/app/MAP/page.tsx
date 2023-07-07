'use client'
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { icon as LeafletIcon } from 'leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import('react-leaflet').then((module) => module.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then((module) => module.Popup), {
  ssr: false,
});

const MapPage = () => {
  const [results, setResults] = useState<any[]>([]); // กำหนดชนิดข้อมูลเป็น any[]
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedAmphur, setSelectedAmphur] = useState('');
  const [selectedTambon, setSelectedTambon] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/Search/map', {
          method: 'POST',
          body: JSON.stringify({ province: selectedProvince, amphur: selectedAmphur, tambon: selectedTambon }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setResults(data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error(error);
        setResults([]);
      }
    };

    fetchData();
  }, [selectedProvince, selectedAmphur, selectedTambon]);

  const customIcon = LeafletIcon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61942.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <Box pl={{ base: 2, md: 4 }}>
      <Box
        ml={-4}
        mt={25}
        p={5}
        w={'1230px'}
        h={'600px'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'lg'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box pos={'relative'} height="560px" width="1180px" rounded={'lg'} boxShadow={'lg'}>
          <MapContainer center={[13.7563, 100.5018]} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' />
            {results.map((result) => (
              <Marker key={result.CA} position={[result.Location_detail_lat, result.Location_detail_long]} icon={customIcon}>
                <Popup>
                  <Heading size="sm">CA: {result.CA}</Heading>
                  <Text fontSize="md" fontWeight="bold">{result.Location_province}</Text>
                  <Text>{result.Location_amphur}, {result.Location_tambon}</Text>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default MapPage;
