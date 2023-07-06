'use client'
import { Box, Button, Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Loading from '../loading';

const ChargerPage = () => {
  const [chargers, setChargers] = useState([]);
  const [editableCharger, setEditableCharger] = useState(null);

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

  const handleEdit = (charger) => {
    setEditableCharger(charger);
  };

  const handleSave = async () => {
    if (editableCharger) {
      try {
        const response = await fetch(`/api/updateCharger?id=${editableCharger._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editableCharger),
        });

        if (response.ok) {
          // อัปเดตรายการชาร์จหลังจากบันทึกสำเร็จ
          getChargerList();
          setEditableCharger(null);
        } else {
          console.error('Failed to update charger:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while updating charger:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditableCharger(null);
  };

  const handleChange = (e, field) => {
    if (editableCharger) {
      setEditableCharger({
        ...editableCharger,
        [field]: e.target.value,
      });
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
    <Box p={4}>
      {isLoading && <Loading />} {/* แสดง Loading component หาก isLoading เป็น true */}
      <Heading as="h1" mb={4}>
        EV Charger List
      </Heading>
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
          {chargers.map((charger) => (
            <Tr key={charger.CA}>
              <Td>{charger.CA}</Td>
              <Td>
                {editableCharger?.CA === charger.CA ? (
                  <input
                    type="text"
                    value={editableCharger.Fname}
                    onChange={(e) => handleChange(e, 'Fname')}
                  />
                ) : (
                  charger.Fname
                )}
              </Td>
              <Td>
                {editableCharger?.CA === charger.CA ? (
                  <input
                    type="text"
                    value={editableCharger.Lname}
                    onChange={(e) => handleChange(e, 'Lname')}
                  />
                ) : (
                  charger.Lname
                )}
              </Td>
              <Td>
                {editableCharger?.CA === charger.CA ? (
                  <>
                    <input
                      type="text"
                      value={editableCharger.Location_detail_lat}
                      onChange={(e) => handleChange(e, 'Location_detail_lat')}
                    />
                    <input
                      type="text"
                      value={editableCharger.Location_detail_long}
                      onChange={(e) => handleChange(e, 'Location_detail_long')}
                    />
                    <input
                      type="text"
                      value={editableCharger.Location_province}
                      onChange={(e) => handleChange(e, 'Location_province')}
                    />
                    <input
                      type="text"
                      value={editableCharger.Location_amphure}
                      onChange={(e) => handleChange(e, 'Location_amphure')}
                    />
                    <input
                      type="text"
                      value={editableCharger.Location_tambon}
                      onChange={(e) => handleChange(e, 'Location_tambon')}
                    />
                  </>
                ) : (
                  `${charger.Location_detail_long}, ${charger.Location_detail_lat}, ${charger.Location_province}, ${charger.Location_amphure}, ${charger.Location_tambon}`
                )}
              </Td>
              <Td>
                {editableCharger?.CA === charger.CA ? (
                  <>
                    <Button colorScheme="blue" onClick={handleSave}>
                      Save
                    </Button>
                    <Button ml={10} colorScheme="red" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button colorScheme="blue" onClick={() => handleEdit(charger)}>
                    Edit
                  </Button>
                )}
                <Button ml={10} colorScheme="red" onClick={() => deleteCharger(charger._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ChargerPage;
