'use client'
import React, { ReactNode, useState } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Tooltip,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,

} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiSearch,
  FiEdit,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { Heading } from '@chakra-ui/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DrawerExample from '@/app/components/notificate';
import Sidebar from '@/app/components/side';
import { IoIosAddCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import data from "../../../../data/raw.githubusercontent.com_kongvut_thai-province-data_master_api_province_with_amphure_tambon.json";

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const [province_isSelect, province_setSelect] = useState(true);
  const [amphur_isSelect, amphur_setSelect] = useState(true);
  const [tambon_isSelect, tambon_setSelect] = useState(true);
  const [selected_province, setSelected_province] = useState('');
  const [selected_amphur, setSelected_amphur] = useState('');
  const [result, setResult] = useState(null);

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
      } else {
        setResult(null);
      }
    } catch (error) {
      console.error(error);
      setResult(null);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (

<Flex mt={'70px'} ml={-1} bgColor="purple" flexDirection="column" position="fixed" borderRadius={10} w="60px" h="220px">

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
                color={"white"}
            />
            <span style={{ position: 'absolute', left: '-9999px' }}>Search</span>
            </Box>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
            <Box>
                <Stack direction={['column', 'row']} spacing='24px'>
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
                            </Stack>
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
                                mt={10}
                                colorScheme='purple'
                                type='submit'
                                
                            >
                                Search
                            </Button>
                            {result !== null ? (
                                <Box mt={5} >
                                <Text>จังหวัด: {result.Location_province}</Text>
                                <Text>อำเภอ: {result.Location_amphure}</Text>
                                <Text>ตำบล: {result.Location_tambon}</Text>
                                </Box>
                            ) : (
                                <Text mt={5}>NOT FOUND</Text>
                            )}
                </Box>
            </PopoverBody>
        </PopoverContent>
        </Popover>
        <Link href="/addcharger">
        <Box
            ml={2}
            mt={5}
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
            as={IoMdAddCircleOutline}
            color={"white"}
        />
        </Box>
        </Link>
        <Link href="/del">
        <Box
            ml={2}
            mt={5}
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
            as={FiEdit}
            color={"white"}
        />
        </Box>
        </Link>
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href?: string;
}

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        mt={10}
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'purple.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
