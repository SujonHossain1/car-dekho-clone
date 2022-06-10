import { Types } from 'mongoose';
interface ICarBrand {
    _id?: string;
    brandName: string;
}
interface ICarModel {
    _id?: string;
    modelName: string;
    brand: Types.ObjectId;
}

interface IVariant {
    _id?: string;
    variantName: string;
    model: Types.ObjectId;
}

interface ICar {
    _id?: string;
    brand: {
        _id?: Types.ObjectId;
        brandName: string;
    };
    model: {
        _id?: Types.ObjectId;
        modelName: string;
    };
    variant: {
        _id?: Types.ObjectId;
        variantName: string;
    };

    serviceCost: {
        year: number;
        price: number;
    };
    price: number;
    year: number;
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
