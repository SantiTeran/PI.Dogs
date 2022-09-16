const { Router, response } = require("express");
const { Race, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const {URL_KEY} = require ('../utils/constants')

const router = Router();

router.get("/", async (req, res, next) => {
  //     Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
  //     Si no existe ninguna raza de perro mostrar un mensaje adecuado
  //    GET https://api.thedogapi.com/v1/breeds/search?q={raza_perro}
  let { name } = req.query;
  let breedsDB, breedsApi, helper1
  if (name) {
    breedsApi = { data: undefined };
    breedsDB = await Race.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: {
        model: Temperament,
      },
    });
    breedsApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}`
    );

    helper1 = await axios.get(URL_KEY);
    breedsApi.data = helper1.data.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
  } else {
    breedsDB = await Race.findAll({
      include: {
        model: Temperament,
      },
    });
    breedsApi = await axios.get(URL_KEY);
  }
  let filteredBreeds = breedsApi.data.map((breed) => {
    return {
      id: breed.id,
      name: breed.name,
      height: breed.height,
      weight: breed.weight,
      life_span: breed.life_span,
      image_url: breed.image.url,
      temperament: breed.temperament,
    };
  });
  let allBreeds = [...breedsDB, ...filteredBreeds];
  res.status(200).send(allBreeds);
});

router.get("/:id", async (req, res, next) => {
  // Obtener el detalle de una raza de perro en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
  // Incluir los temperamentos asociados
  let { id } = req.params;
  let breedsDB = await Race.findAll({
    include: Temperament,
  });
  let breedsApi = await axios.get(URL_KEY);
  let filteredBreeds = breedsApi.data.map((breed) => {
    return {
      id: breed.id,
      name: breed.name,
      height: breed.height,
      weight: breed.weight,
      life_span: breed.life_span,
      temperament: breed.temperament,
      image: breed.image.url,
    };
  });
  let allBreeds = [...breedsDB, ...filteredBreeds];
  let finalBreed = {};
  allBreeds.forEach((breed) => {
    if (breed.id == id) {
      finalBreed = breed;
    }
  });
  if (Object.keys(finalBreed).length === 0) {
    res.send("no existe en la db");
  } else {
    res.status(200).send(finalBreed);
  }
});

// router.post("/", (req, res, next) => {
//   res.send("Soy un post de dogs");
// });
router.put("/", (req, res, next) => {
  res.send("Soy un put de dogs");
});
router.delete("/", async (req, res, next) => {
  let { id } = req.query;
  // Race.destroy({ where: { id } });

  await Race.destroy({ where: { id } });

  breedsDB = await Race.findAll({
    include: {
      model: Temperament,
    },
  });
  breedsApi = await axios.get(URL_KEY);
  let filteredBreeds = breedsApi.data.map((breed) => {
    return {
      id: breed.id,
      name: breed.name,
      height: breed.height,
      weight: breed.weight,
      life_span: breed.life_span,
      image_url: breed.image.url,
      temperament: breed.temperament,
    };
  });
  let allBreeds = [...breedsDB, ...filteredBreeds];
  res.send(allBreeds);
});

module.exports = router;
