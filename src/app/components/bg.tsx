import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    useColorModeValue,
    Link,
    useDisclosure,
    Img,
} from '@chakra-ui/react';

export default function Bg() {
    return(
    <Flex  
       px={100} py={150}  bgImage='/mapth.png' backgroundColor='#E7E7E7'
      bgRepeat={'no-repeat'}
      bgPosition={'right'}
      bgAttachment={'fixed'}
      bgSize={'contain'}
      >


    </Flex>

    )
}
