import { Text,Toast,Button,useToast } from "@chakra-ui/react";

export default function SuccessComponent() {
    const toast = useToast()
    return (
      <Button
        className="success"
        mt={10}
        onClick={() =>
          toast({
            title: 'REGISTER SUCCESS.',
            description: "We already add information for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      >
        SUBMIT
      </Button>
    )
  }