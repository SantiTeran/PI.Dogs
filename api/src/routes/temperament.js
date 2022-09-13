const axios = require("axios");
const { Router } = require("express");
const { Temperament } = require("../db");
const { API_KEY } = process.env;

const router = Router();

router.get("/", async (req, res, next) => {
  // Obtener todos los temperamentos posibles
  // En una primera instancia deberán obtenerlos desde la API externa
  // y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
  try {
    let finalTemperamentsDB = [];
    let temperamentsDB = await Temperament.findAll({
      raw: true,
    });
    if (temperamentsDB.length > 0) {
      for (let i = 0; i < temperamentsDB.length; i++) {
        finalTemperamentsDB.push(temperamentsDB[i].name);
      }
      res.send(finalTemperamentsDB);
    } else {
      let api = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      let filteredTemperamentsApi = api.data.map((data) => {
        return {
          name: data.temperament,
        };
      });
      let stringTemperaments;
      let arrayTemperament,
        finalArrayTemperaments = [];
      for (let i = 0; i < filteredTemperamentsApi.length; i++) {
        // for (let j = 0; j < filteredTemperamentsApi[i].length; j++) {
        //   const [temp, created] = await Temperament.findOrCreate({
        //     where: {
        //       name: filteredTemperamentsApi[i][j],
        //     },
        //   });
        // }
        stringTemperaments = filteredTemperamentsApi[i].name;
        if (stringTemperaments) {
          arrayTemperament = stringTemperaments.split(", ");
          arrayTemperament.forEach((temperament) => {
            if (!finalArrayTemperaments.includes(temperament)) {
              finalArrayTemperaments.push(temperament);
            }
          });
          //   finalArrayTemperaments.push(...stringTemperaments.split(", "));
        }
      }
      finalArrayTemperaments.forEach((temperament) => {
        Temperament.create({
          name: temperament,
        });
      });

      // temperaments = await Temperament.findAll();

      res.send(finalArrayTemperaments);
    }
  } catch (error) {
    next(error);
  }
});
router.post("/", (req, res, next) => {
  res.send("Soy un post de temperament");
});
router.put("/", (req, res, next) => {
  res.send("Soy un put de temperament");
});
router.delete("/", (req, res, next) => {
  res.send("Soy un delete de temperament");
});

module.exports = router;
