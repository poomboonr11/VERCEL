'use client'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Flex,
    useColorModeValue,
    Stack,
    Button,
    Select,
  } from '@chakra-ui/react';
  import data from '../../../data/raw.githubusercontent.com_kongvut_thai-province-data_master_api_province_with_amphure_tambon.json';
  import { useState,useEffect } from 'react';
  import axios from 'axios';
  import Loading from '../loading';
  
  export default function AddPost() {
    const [province_isSelect, province_setSelect] = useState(true);
    const [amphur_isSelect, amphur_setSelect] = useState(true);
    const [tambon_isSelect, tambon_setSelect] = useState(true);
    const [selected_province, setSelected_province] = useState('');
    const [selected_amphur, setSelected_amphur] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
  
      try {
        const formData = new FormData(event.target);
        await axios.post('/api/addCharger', Object.fromEntries(formData));
        setSubmitSuccess(true);
        setIsSubmitting(false);
      } catch (error) {
        console.error(error);
        setIsSubmitting(false);
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
      <form action="/api/addCharger" method='post' onSubmit={handleSubmit}>
        {isLoading && <Loading />} {/* แสดง Loading component หาก isLoading เป็น true */}
        <Flex
          bgGradient='linear(to-l, purple, black)'
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          position={'sticky'}
        >
          <Box bgColor={'white'} padding={10} rounded={'xl'}>
            {submitSuccess && (
              <Box color='green' fontWeight='bold' mb={4}>
                Success! Form submitted successfully.
              </Box>
            )}
   <Stack direction={['column', 'row']} spacing='24px'>
                        <FormControl isRequired>
                        <FormLabel>ชื่อ</FormLabel>
                                    <Input type="text" id="Fname" name="Fname" onChange={(e)=> setFname(e.target.value)}  required placeholder='First name' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>นามสกุล</FormLabel>
                                    <Input type="text" id="Lname" name="Lname" onChange={(e)=> setLname(e.target.value)}  required placeholder='Last name' />
                        </FormControl>
                    </Stack>
                        <FormControl>
                        <FormLabel>รายละเอียดที่อยู่ละติจูด</FormLabel>
                                    <Input placeholder='address' id='Location_detail_lat' name='Location_detail_lat' />
                        </FormControl>
                        <FormControl>
                        <FormLabel>รายละเอียดที่อยู่ลองติจูด</FormLabel>
                                    <Input placeholder='address' id='Location_detail_long' name='Location_detail_long' />
                        </FormControl>
                    <Stack direction={['column', 'row']} spacing='24px'>
                        <FormControl>
                        <FormLabel>จังหวัด</FormLabel>
                            <Select placeholder='จังหวัด' id='Location_province' name='Location_province'
                                onChange={(event) => {
                                    setSelected_province(event.target.value);
                                    province_setSelect(false);
                                }}>
                                {data.data.map(data => (
                                    <option>{data.name_th}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>อำเภอ</FormLabel>
                                    <Select placeholder='อำเภอ' id='Location_amphure' name='Location_amphure' isDisabled={province_isSelect}
                                            onChange={(event) => {
                                            setSelected_amphur(event.target.value);
                                            amphur_setSelect(false)
                                            }}>
                                {data.data.map((province) => {
                                    if (province.name_th == selected_province) {
                                        return province.amphure.map((amphure) => (
                                            <option>
                                                {amphure.name_th}
                                            </option>
                                        ));
                                    } else {
                                        return null;
                                        ;
                                    }
                                })}
                            </Select>
                        </FormControl>
                        </Stack>
                        <Stack direction={['column', 'row']} spacing='24px'>
                        <FormControl>
                        <FormLabel>ตำบล</FormLabel>
                            <Select placeholder='ตำบล' id='Location_tambon' name='Location_tambon' isDisabled={amphur_isSelect}
                                onChange={() => tambon_setSelect(false)}>
                                {
                                    data.data.map((province) => {
                                        if (province.name_th == selected_province) {
                                            return province.amphure.map((amphure) =>
                                                amphure.tambon.map((tambon) => {
                                                    if (amphure.name_th == selected_amphur) {
                                                        return <option>
                                                            {tambon.name_th}
                                                        </option>
                                                    }
                                                })
                                            );
                                        }
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                    <FormControl>
                        <FormLabel>CA number(รหัสเครื่อง)</FormLabel>
                        <Input type='text' id="CA" name="CA" required />
                    </FormControl>
            <Button mt={4} colorScheme='teal' type='submit' isLoading={isSubmitting}>
              Submit
            </Button>
          </Box>
        </Flex>
      </form>
    );
  }

