'use client'
import { Box, Button, Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ChargerPage = () => {
  const [chargers, setChargers] = useState([]);

  useEffect(() => {
    getChargerList();
  }, []);

  const getChargerList = async () => {
    try {
      const response = await fetch('/api/getCharger');
      const data = await response.json();
      setChargers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCharger = async (id) => {
    try {
      const response = await fetch(`/api/deleteCharger?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // อัปเดตรายการชาร์จหลังจากลบสำเร็จ
        getChargerList();
      } else {
        console.error('Failed to delete charger:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while deleting charger:', error);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>EV Charger List</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>CA</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Location</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {chargers.map(charger => (
            <Tr key={charger.CA}>
              <Td>{charger.CA}</Td>
              <Td>{charger.Fname}</Td>
              <Td>{charger.Lname}</Td>
              <Td>{`${charger.Location_detail_long}, ${charger.Location_detail_lat}, ${charger.Location_province}, ${charger.Location_amphure}, ${charger.Location_tambon}`}</Td>
              <Td>
                <Button colorScheme="red" onClick={() => deleteCharger(charger._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ChargerPage;
