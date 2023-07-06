"use client"
import { Box, Center, Spinner,Text } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box height="100vh">
      <Center height="100%">
        <Spinner size="xl" color="purple" />
      </Center>
    </Box>
  );
};

export default Loading;
