export function parseInput(input) {
  const newInput = {
    ...input,
    price: +input.price,
    bedrooms: +input.bedrooms,
    bathrooms: +input.bathrooms,
    size: +input.size,
    rentalType: input.status.includes('sale') ? 'monthly' : input.rentalType,
    rating: {
      valorations: [5],
      media: 5,
    },
    CityId: input.CityId,
  };
  return newInput;
}

// images: [],
//         price: 0,
//         description: "",
//         bedrooms: 1,
//         size: 0,
//         rating: 3,
//         bathrooms: 1,
//         urbanizacion: "",
//         lat: "",
//         lon: "",
//         status: "rent",
//         cityId: ''
