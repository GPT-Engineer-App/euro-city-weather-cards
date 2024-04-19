import { Box, Flex, Text, VStack, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const cities = [
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", lat: 52.52, lon: 13.405 },
  { name: "Madrid", lat: 40.4168, lon: -3.7038 },
  { name: "Rome", lat: 41.9028, lon: 12.4964 },
];

const Index = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const responses = await Promise.all(cities.map((city) => fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&hourly=temperature_2m`)));
      const data = await Promise.all(responses.map((res) => res.json()));
      setWeatherData(
        data.map((d, index) => ({
          city: cities[index].name,
          temperature: d.hourly.temperature_2m[0], // Taking the current temperature
        })),
      );
    };

    fetchWeather();
  }, []);

  return (
    <VStack p={5} spacing={8}>
      <Heading as="h1" size="xl" color="teal.400">
        Weather Dashboard
      </Heading>
      <Flex wrap="wrap" justifyContent="center">
        {weatherData.map((weather, index) => (
          <WeatherCard key={index} city={weather.city} temperature={weather.temperature} />
        ))}
      </Flex>
    </VStack>
  );
};

const WeatherCard = ({ city, temperature }) => {
  return (
    <Box bg="blue.300" p={4} borderRadius="lg" m={2} boxShadow="md" width="200px">
      <VStack>
        <Text fontSize="xl" fontWeight="bold">
          {city}
        </Text>
        <Image src={getWeatherIcon(temperature)} boxSize="50px" />
        <Text fontSize="2xl">{temperature.toFixed(1)}°C</Text>
      </VStack>
    </Box>
  );
};

const getWeatherIcon = (temperature) => {
  if (temperature < 0) {
    return "https://images.unsplash.com/photo-1520361592051-80a51243f67f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjb2xkJTIwd2VhdGhlciUyMGljb258ZW58MHx8fHwxNzEzNTE0MTQzfDA&ixlib=rb-4.0.3&q=80&w=1080";
  } else if (temperature >= 0 && temperature < 15) {
    return "https://images.unsplash.com/photo-1687904635478-dea25c34af5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjb29sJTIwd2VhdGhlciUyMGljb258ZW58MHx8fHwxNzEzNTE0MTQzfDA&ixlib=rb-4.0.3&q=80&w=1080";
  } else {
    return "https://images.unsplash.com/photo-1579003593419-98f949b9398f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3YXJtJTIwd2VhdGhlciUyMGljb258ZW58MHx8fHwxNzEzNTE0MTQ0fDA&ixlib=rb-4.0.3&q=80&w=1080";
  }
};

export default Index;
