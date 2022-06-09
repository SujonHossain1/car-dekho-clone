interface ICar {
    _id?: string;
    brand: {
        brandName: string;
        model: [
            {
                modelName: string;
                variant: [
                    {
                        variantName: string;
                        price: number;
                        year: number;
                        serviceCost: {
                            year: number;
                            price: number;
                        };
                        engineType: string;
                        displacement: number;
                        numberOfCylinder: number;
                        gearBox: string;
                        fuelType: string;
                        kilometers: number;
                        details: string;
                        photoUrl: string;
                        reviews: [
                            {
                                rating: number;
                                message: string;
                            }
                        ];
                    }
                ];
            }
        ];
    };
}
