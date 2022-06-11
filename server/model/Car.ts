import { model, models, Schema } from 'mongoose';
import { ICar } from 'server/interface';

const carSchema = new Schema<ICar>(
    {
        brand: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'Brand',
            },
            brandName: {
                type: String,
                required: true,
            },
        },
        model: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'Model',
            },
            modelName: {
                type: String,
                required: true,
            },
        },
        variant: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'Variant',
            },
            variantName: {
                type: String,
                required: true,
            },
        },

        serviceCost: {
            year: Number,
            price: Number,
        },
        price: {
            type: Number,
            required: true,
        },
        year: Number,
        engineType: String,
        displacement: Number,
        numberOfCylinder: Number,
        gearBox: String,
        fuelType: String,
        kilometers: Number,
        details: String,
        photoUrl: String,
    },
    { timestamps: true }
);

const Car = models.Car || model<ICar>('Car', carSchema);
export default Car;
