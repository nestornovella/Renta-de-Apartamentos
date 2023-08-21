const { User, Apartment, Rent } = require("../../db");

const checkAvailability = (apartment) => {
  return apartment.availability ? "Available" : "Not Available";
};

module.exports = {
  getAllApartments: async (req, res) => {
    try {
      const apartments = await Apartment.findAll({
        include: { model: User },
      });
      res.status(200).json(apartments);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  getApartmentById: async (req, res) => {
    const { id } = req.params;
    try {
      const apartment = await Apartment.findOne({
        where: { id },
        include: { model: User },
      });
      if (!apartment) {
        return res.status(404).json({ error: "Apartment not found" });
      }
      const availability = checkAvailability(apartment);
      res.status(200).json({ ...apartment.toJSON(), availability });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createApartment: async (req, res) => {
    try {
      const newApartment = await Apartment.create(req.body);
      res.status(201).json(newApartment);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  updateApartment: async (req, res) => {
    const { id } = req.params;
    try {
      const apartment = await Apartment.findByPk(id);
      if (!apartment) {
        return res.status(404).send({ error: "Apartment not found" });
      }
      const updatedApartment = await apartment.update(req.body);
      res
        .status(200)
        .json({ message: "Apartment updated successfully", updatedApartment });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  deleteApartment: async (req, res) => {
    const { id } = req.params;
    try {
      const apartment = await Apartment.findByPk(id);
      if (!apartment) {
        return res.status(404).send({ error: "Apartment not found" });
      }
      await apartment.destroy();
      res.status(200).send({ message: "Apartment deleted successfully" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  rentApartment: async (req, res) => {
    const { id } = req.params;
    try {
      if (!req.body.userId) {
        return res.status(400).send({ error: "User ID is missing in the request body" });
      }
      const apartment = await Apartment.findByPk(id);
      if (!apartment) {
        return res.status(404).send({ error: "Apartment not found" });
      }
      if (!apartment.availability) {
        return res.status(400).send({ error: "Apartment is not available for rent" });
      }
  console.log("este es el user id por body", req.body.userId)
      try {
        apartment.availability = false;
        await apartment.save();
        const rent = await Rent.create({
          apartmentId: apartment.id,
          userId: req.body.userId,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          totalPrice: req.body.totalPrice,
          status: req.body.status,
        });
        res.status(200).json({ message: "Apartment rented successfully", rent });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};
