const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Race, conn } = require('../../src/db.js');

const agent = session(app);

const race = {
name: 'Pug',
height: 30,
weight: 10,
life_span: 10,
image_url: 'algo'
};

 describe('Dogs routes', () => {
   before(() => conn.authenticate()
   .catch((err) => {
     console.error('Unable to connect to the database:', err);
   }));

   beforeEach(() => Race.sync({ force: true })
     .then(() => Race.create(race)));

   describe('GET /dogs sin params', () => {
     it('deberia obtener un status 200', async () =>
       await agent.get('/dogs').expect(200)
     );
   });

   describe('GET /dogs/:idRaza O /dogs?name=name con paramas y querys',()=>{
       it('deberia obtener un status 200 si encuentra el id',async ()=>{
           await agent.get('/dogs/1').expect(200)
       })
       it('deberia obtener un status 200 si encuentra por nombre', async ()=>{
           await agent.get('/dogs?name=Akita').expect(200)
       })
       it('deberia obtener un status 400 si no encuentra por paramas', async()=>{
           await agent.get('/dogs/gg').expect(400)
       })
   })

   describe('Get /temperament',()=>{
       it('deberia obtener un status 200 ', async()=>{
           await agent.get('/temperament').expect(200)
       })
   })
   

   describe('GET /dog', ()=>{
       it('deberia guardar un nuevo dog y responder con un json', ()=>{
           agent.post('/dog').send({Nombre: 'NuevoDog', AlturaMin: 32, AlturaMin: 42,
            PesoMin: 10, PesoMax:15, Vida: 10, Temperamento : ['Active']}).then(
              () => {expect("Content-Type",/json/)})
       })
   })
});
