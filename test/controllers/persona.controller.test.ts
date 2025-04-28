import axios from "axios";
import { URLConstants } from "../../src/controllers/constants/url";
import { getPeople } from "../../src/controllers/functions/swapi";
import { Person } from "../../src/controllers/models/person.class";
import { Persona } from "../../src/controllers/models/persona.class";

const getPersonURL = "https://wmgckc0qtl.execute-api.sa-east-1.amazonaws.com/personas";
const postPersonURL = "https://wmgckc0qtl.execute-api.sa-east-1.amazonaws.com/personas";

describe("Persona Controller", () => {
  interface SwapiResponse {
    name: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
  }

  const objectTest: Persona = {
    id: "123",
    nombre: "Luke Skywalker",
    genero: "masculino",
    origen: "Tatooine",
    peliculas: [
      "A New Hope",
      "The Empire Strikes Back",
      "Return of the Jedi",
      "Revenge of the Sith",
      "The Force Awakens",
    ],
    especies: ["Human"],
    vehiculos: ["Snowspeeder", "Imperial Speeder Bike"],
    navesEspaciales: ["X-wing", "Imperial shuttle"],
  };

  const respSwapi: SwapiResponse  = {
    name: "Luke Skywalker",
    gender: "male",
    homeworld: "https://swapi.py4e.com/api/planets/1/",
    films: [
      "https://swapi.py4e.com/api/films/1/",
      "https://swapi.py4e.com/api/films/2/",
      "https://swapi.py4e.com/api/films/3/",
      "https://swapi.py4e.com/api/films/6/",
      "https://swapi.py4e.com/api/films/7/",
    ],
    species: ["https://swapi.py4e.com/api/species/1/"],
    vehicles: [
      "https://swapi.py4e.com/api/vehicles/14/",
      "https://swapi.py4e.com/api/vehicles/30/",
    ],
    starships: [
      "https://swapi.py4e.com/api/starships/12/",
      "https://swapi.py4e.com/api/starships/22/",
    ],
  };

  test("getPerson return status 200", async () => {
    const resp = await axios.get(getPersonURL);
    expect(resp.status).toBe(200);
  });

  test("postPerson return status 200", async () => {
    const resp = await axios.post(postPersonURL, objectTest);
    expect(resp.status).toBe(200);
  });

  test("swapi-url return status 200", async () => {
    const resp = await axios.get(URLConstants.URL);
    expect(resp.status).toBe(200);
  });

  test("getPeople return default values", async () => {
    const people = await getPeople();
    const [item] = people.filter((p: any) => p.name.includes("Luke"));

    expect(item).toEqual(expect.objectContaining(respSwapi));
  });

  test("should create Person instance", async () => {
    const { name, gender, homeworld, films, species, vehicles, starships } =
      respSwapi;

    const person = new Person(
      name,
      gender,
      homeworld,
      films,
      species,
      vehicles,
      starships
    );

    expect(person).toBeInstanceOf(Person);
  });

  test("convertirPersona should translate the data", async () => {
    const { name, gender, homeworld, films, species, vehicles, starships } =
      respSwapi;

    const person = new Person(
      name,
      gender,
      homeworld,
      films,
      species,
      vehicles,
      starships
    );

    const persona = await person.convertirPersona();
    objectTest.id = persona.id;
    expect(persona).toEqual(expect.objectContaining(objectTest));
  });

  test("getPerson should return data translated", async () => {
    const resp = await axios.get(getPersonURL);
    const lukeSkywalker = resp.data.find((p: Persona) => p.nombre === "Luke Skywalker");
    
    objectTest.id = lukeSkywalker.id;

    expect(lukeSkywalker).toEqual(expect.objectContaining(objectTest));
  });

  test("should create Persona instance", () => {
    const {
      id,
      nombre,
      genero,
      origen,
      peliculas,
      especies,
      vehiculos,
      navesEspaciales,
    } = objectTest;

    const persona = new Persona(
      id,
      nombre,
      genero,
      origen,
      peliculas,
      especies,
      vehiculos,
      navesEspaciales
    );

    expect(persona).toBeInstanceOf(Persona);
  });
});
