import { Document, Types } from 'mongoose';
interface ICarBrand extends Document {
    brandName: string;
}
interface ICarModel extends Document {
    modelName: string;
    brand: Types.ObjectId;
}

interface IVariant extends Document {
    variantName: string;
    model: Types.ObjectId;
}

interface ICar extends Document {
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
    models: ICarModel[];
    _id: string;
}
