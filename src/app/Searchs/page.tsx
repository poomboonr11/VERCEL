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
  const [result, setResult] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

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

  return (
      <>
      </>
  );
};

export default Page;
