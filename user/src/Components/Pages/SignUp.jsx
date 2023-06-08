import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Radio, RadioGroup, FormHelperText, FormErrorMessage, useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from "axios"
import Navbar from './Navbar';

export default function Signup() {
  const toast = useToast()
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mail, setMail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [load, setLoad] = useState(false)

  const countries = ["India", "Japan", "Russia"];

  const states = {
    "India": ["Delhi", "Jharkhand", "West Bengal"],
    "Japan": ["Chugoku", "Kanto", "Hokkaido"],
    "Russia": ["Amur Region", "Arkhangelsk Region", "Altai Territory"],
  };

  const cities = {
    "Delhi": ["Mandoli", "Hastsal", "New Delhi"],
    "Jharkhand": ["Dhanbad", "Nirsa", "Ranchi"],
    "West Bengal": ["Kolkata", "Asansol", "Howrah"],
    "Chugoku": ["Kurashiki", "Fukuyama", "Shimonoseki"],
    "Kanto": ["Tokyo", "Yokohama", "Maebashi"],
    "Hokkaido": ["Sapporo", "Hakodate", "Asahikawa"],
    "Amur Region": ["Zeya", "Belogorsk", "Tynda"],
    "Arkhangelsk Region": ["Arkhangelsk", "Murmansk", "Severodvinsk"],
    "Altai Territory": ["Astrakhan", "Vologda", "Veliky Novgorod"]
  };

  const handleCountry = (e) => {
    setCountry(e.target.value)
    setCity("")
    setState("")
  }
  const handleState = (e) => {
    setState(e.target.value)
    setCity("")
  }
  const handleCity = (e) => {
    setCity(e.target.value)
  }

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  const handleDate = (e) => {
    setDob(e.target.value)
    setAge(calculateAge(e.target.value))
  }

  const handleReset = () =>{
    setLname('')
    setFname('')
    setMail('')
    setGender('')
    setAge('')
    setCity('')
    setCountry('')
    setState('')
    setDob('')
    setLoad(false)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(!load)

    if (!fname || !lname || !mail || !country || !state || !city || !gender || !dob) {
      alert("Please fill in all the required fields.");
      return;
    } else {
      const payload = {
        fname, lname, mail, country, city, state, gender, dob, age
      }
      axios.post('https://giddy-erin-pocketbook.cyclic.app/user/add', payload)
        .then((res) => {
          toast({
            title: 'User Register Successful.',
            description: "User Data Successfully Saved in the Database.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          handleReset()
        })
        .catch((error) => toast({
          title: 'User Register Unsuccessful.',
          description: "User Data couldn't Successfully Saved in the Database due to Some Error.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        }))
    }
  }
  return (
    <>
    <Navbar />
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
           Registration Form
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Pls Enter Your Details To Register ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" name='fname' value={fname} onChange={(e) => { setFname(e.target.value) }} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" name='lname' value={lname} onChange={(e) => { setLname(e.target.value) }} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='mail' value={mail} onChange={(e) => { setMail(e.target.value) }} />
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="country" isRequired>
                  <FormLabel>Country</FormLabel>
                  <select name="country" id="country" onChange={handleCountry} required>
                    <option value="">Select Country</option>
                    {countries.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="state">
                  <FormLabel>State</FormLabel>
                  <select name="state" id="state" onChange={handleState} required>
                    <option value="">Select State</option>
                    {states[country] &&
                      states[country].map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                  </select>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="city" isRequired>
                  <FormLabel>City</FormLabel>
                  <select name="city" id="city" onChange={handleCity} required>
                    <option value="">Select City</option>
                    {cities[state] &&
                      cities[state].map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                  </select>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="gender" onChange={(e) => { setGender(e.target.value) }}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup >
                    <Stack spacing={5} direction='row'>
                      <Radio colorScheme='red' value='Male'>
                        Male
                      </Radio>
                      <Radio colorScheme='green' value='Female'>
                        Female
                      </Radio>
                      <Radio colorScheme='yellow' value='Other'>
                        Other
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type='date' name='dob' value={dob} onChange={handleDate} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Age</FormLabel>
                  <Input type="text" name='age' value={age} isDisabled />
                </FormControl>
              </Box>
            </HStack>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                isLoading={load}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a Registered? <Link color={'blue.400'}>Check User List</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </>
  );
}
