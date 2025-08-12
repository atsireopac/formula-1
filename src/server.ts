import fastify from 'fastify';
import cors from "@fastify/cors"

const server = fastify({ logger: true});

server.register(cors, {
    origin: "*",
    methods: ["GET", "POST"]
})

const teams = [
    { id: 1, name: "McLaren", base: "Woking, United Kingdom'" },
    { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
    { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
    { id: 4, name: "Ferrari", base: "Maranello, Italy" },
    { id: 5, name: "Williams", base: "Grove, United Kingdom" },
    { id: 6, name: "Alfa Romeo", base: "Hinwil, Switzerland" },
    { id: 7, name: "AlphaTauri", base: "Faenza, Italy" },
    { id: 8, name: "Alpine", base: "Enstone, United Kingdom" },
    { id: 9, name: "Haas", base: "Kannapolis, United States" },
    { id: 10, name: "Aston Martin", base: "Silverstone, United Kingdom" }
];

const drivers = [
    {id:1, name:"Max Verstappen", team:"Red Bull Racing"},
    {id:2, name:"Lewis Hamilton", team:"Mercedes"},
    {id:3, name:"Charles Leclerc", team:"Ferrari"},
    {id:4, name:"Lando Norris", team:"McLaren"},
    {id:5, name:"Sergio Pérez", team:"Red Bull Racing"},
    {id:6, name:"Daniel Ricciardo", team:"McLaren"},
    {id:7, name:"Carlos Sainz", team:"Ferrari"},
    {id:8, name:"Romain Grosjean", team:"Haas"},
    {id:9, name:"Pierre Gasly", team:"AlphaTauri"},
    {id:10, name:"Kevin Magnussen", team:"Haas"},
    {id:11, name:"George Russell", team:"Mercedes"},
    {id:12, name:"Fernando Alonso", team:"Alpine"},
    {id:13, name:"Esteban Ocon", team:"Alpine"},
    {id:14, name:"Lance Stroll", team:"Aston Martin"},
    {id:15, name:"Mick Schumacher", team:"Haas"},
    {id:16, name:"Sebastian Vettel", team:"Ferrari"},
    {id:17, name:"Valtteri Bottas", team:"Mercedes"},
    {id:18, name:"Nicholas Latifi", team:"Williams"},
]

server.get("/teams", async(request, response) => {
    response.type("application/json").code(200);

    return [teams];
});

server.get("/drivers", async(request, response) => {
    response.type("application/json").code(200);
    return [drivers]
})

interface DriverParams {
    id: string;
}

server.get<{Params: DriverParams}>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if(!driver){
        response.type("application/json").code(404);
        return { message: "Driver Not Found"}
    } else {
        response.type("application/json").code(200);
        return {driver};
    }
})

server.listen({port: 3333}, () => {
    console.log("Server init");
})