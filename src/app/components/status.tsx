import { Box, Flex, keyframes, Tooltip } from '@chakra-ui/react';
import React from 'react';

const Status = ({ status }) => {
  const activeColor = 'green';
  const inactiveColor = 'grey';
  const busyColor = 'orange';
  const ringScaleMin = 0.33;
  const ringScaleMax = 0.66;

  const getStatusColor = (status) => {
    if (status === 'active') {
      return activeColor;
    } else if (status === 'inactive') {
      return inactiveColor;
    } else if (status === 'busy') {
      return busyColor;
    }
    return inactiveColor;
  };

  const pulseRing = keyframes`
    0% {
      transform: scale(${ringScaleMin});
      background-color: ${getStatusColor(status)};
    }
    30% {
      transform: scale(${ringScaleMax});
    }
    40%,
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  `;

  const pulseDot = keyframes`
    0% {
      transform: scale(0.9);
    }
    25% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(0.9);
    }
  `;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="45px"
      w="50px"
      flexDir="column"
      overflow="hidden"
    >
      <Tooltip label={`Status: ${status}`} textTransform="capitalize">
        <Box
          as="div"
          h="24px"
          w="24px"
          position="relative"
          borderRadius="50%"
          _before={{
            content: "''",
            position: 'absolute',
            display: 'block',
            width: '300%',
            height: '300%',
            boxSizing: 'border-box',
            marginLeft: '-100%',
            marginTop: '-100%',
            borderRadius: '50%',
            backgroundColor: getStatusColor(status),
            animation: `${pulseRing} 2.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
          }}
          _after={{
            content: "''",
            position: 'absolute',
            display: 'block',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: getStatusColor(status),
            animation: `${pulseDot} 2.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
          }}
        />
      </Tooltip>
    </Flex>
  );
};

export default Status;
