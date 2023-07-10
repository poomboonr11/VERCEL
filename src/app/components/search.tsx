"use client"
import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  Button,
  Text,
  Box,
  Stack,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import data from "../../../data/raw.githubusercontent.com_kongvut_thai-province-data_master_api_province_with_amphure_tambon.json";

const Page = () => {
  const [province_isSelect, province_setSelect] = useState(true);
  const [amphur_isSelect, amphur_setSelect] = useState(true);
  const [tambon_isSelect, tambon_setSelect] = useState(true);
  const [selected_province, setSelected_province] = useState('');
  const [selected_amphur, setSelected_amphur] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [result, setResult] = useState({
    Location_province: '',
    Location_amphure: '',
    Location_tambon: ''
  });
  const [isMapOpen, setIsMapOpen] = useState(false);


  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setMarkerPosition([latitude, longitude]);
    } else {
      setMarkerPosition(null);
    }
  }, [latitude, longitude]);
  
  

  const handleSearch = async () => {
    const formData = new FormData();
    const inputElement = document.getElementById('CA') as HTMLInputElement;
    
    if (inputElement !== null) {
      formData.append('CA', inputElement.value);
  
      try {
        const response = await fetch('/api/Search/[CA]', {
          method: 'POST',
          body: JSON.stringify({ CA: formData.get('CA') }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setResult({
            Location_province: data.Location_province,
            Location_amphure: data.Location_amphure,
            Location_tambon: data.Location_tambon
          });
          setLatitude(data.Location_detail_lat);
          setLongitude(data.Location_detail_long);
        } else {
          setResult({
            Location_province: '',
            Location_amphure: '',
            Location_tambon: ''
          });
          setLatitude(null);
          setLongitude(null);
          setMarkerPosition(null);
        }
      } catch (error) {
        console.error(error);
        setResult({
          Location_province: '',
          Location_amphure: '',
          Location_tambon: ''
        });
        setLatitude(null);
        setLongitude(null);
        setMarkerPosition(null);
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Box
          ml={2}
          mt={10}
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
            as={FiSearch}
            color="white"
          />
          <span style={{ position: 'absolute', left: '-9999px' }}>Search</span>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text align="center" fontSize="lg" fontWeight="bold">
            SEARCH EV-CHARGER
          </Text>
        </PopoverHeader>
        <PopoverBody>
          <Stack spacing='24px'>
            <FormControl>
              <FormLabel>จังหวัด</FormLabel>
              <Select
                placeholder='จังหวัด'
                id='Location_province'
                name='Location_province'
                onChange={(event) => {
                  setSelected_province(event.target.value);
                  province_setSelect(false);
                }}
              >
                {data.data.map((data) => (
                  <option key={data.name_th}>{data.name_th}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>อำเภอ</FormLabel>
              <Select
                placeholder='อำเภอ'
                id='Location_amphure'
                name='Location_amphure'
                isDisabled={province_isSelect}
                onChange={(event) => {
                  setSelected_amphur(event.target.value);
                  amphur_setSelect(false);
                }}
              >
                {data.data.map((province) => {
                  if (province.name_th === selected_province) {
                    return province.amphure.map((amphure) => (
                      <option key={amphure.name_th}>{amphure.name_th}</option>
                    ));
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>ตำบล</FormLabel>
              <Select
                placeholder='ตำบล'
                id='Location_tambon'
                name='Location_tambon'
                isDisabled={amphur_isSelect}
                onChange={() => tambon_setSelect(false)}
              >
                {data.data.map((province) => {
                  if (province.name_th === selected_province) {
                    return province.amphure.map((amphure) => {
                      if (amphure.name_th === selected_amphur) {
                        return amphure.tambon.map((tambon) => (
                          <option key={tambon.name_th}>{tambon.name_th}</option>
                        ));
                      }
                      return null;
                    });
                  }
                  return null;
                })}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>CA number (รหัสเครื่อง)</FormLabel>
              <Input type='text' id="CA" name="CA" required />
            </FormControl>
            <Button
  colorScheme="purple"
  onClick={() => setIsMapOpen(!isMapOpen)}
  mt={5}
>
<Button colorScheme='purple' onClick={handleSearch}>
              Search
            </Button>
  {isMapOpen ? 'Close Map' : 'Open Map'}
</Button>

            {result !== null ? (
              <Box mt={5}>
                <Text>จังหวัด: {result.Location_province}</Text>
                <Text>อำเภอ: {result.Location_amphure}</Text>
                <Text>ตำบล: {result.Location_tambon}</Text>
              </Box>
            ) : (
              <Text mt={5}>NOT FOUND</Text>
            )}
            {markerPosition && (
              <Box mt={5}>
                <Text>CA Marker:</Text>
                <MapContainer center={markerPosition} zoom={13} style={{ height: '400px' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={markerPosition} />
                </MapContainer>
              </Box>
            )}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Page;
