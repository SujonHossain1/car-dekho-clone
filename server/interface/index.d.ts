import { Types } from 'mongoose';
interface ICarBrand {
    _id?: Types.ObjectId;
    brandName: string;
}
interface ICarModel {
    _id?: Types.ObjectId;
    modelName: string;
    brand: Types.ObjectId;
}

interface IVariant {
    _id?: Types.ObjectId;
    variantName: string;
    model: Types.ObjectId;
}

interface ICar {
    _id?: Types.ObjectId;
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

interface IBrandItem {
    brandName: string;
    _id?: Types.ObjectId;
    models: ICarModel[];
}
