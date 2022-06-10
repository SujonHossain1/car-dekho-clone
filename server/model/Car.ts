import { model, models, Schema } from 'mongoose';
import { ICar } from 'server/interface';

const carSchema = new Schema<ICar>(
    {
        brand: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'model',
            },
            brandName: {
                type: String,
                required: true,
            },
        },
        model: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'model',
            },
            modelName: {
                type: String,
                required: true,
            },
        },
        variant: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'variant',
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

// let Car: Model<ICar>;

// try {
//     Car = model<ICar>('car');
//     console.log({ ok: 'schema if' });
// } catch (error) {
//     console.log({ ok: 'schema else' });
//     Car = model<ICar>('car', carSchema);
// }

const Car = models.Car || model<ICar>('Car', carSchema);

// const Car = models.Car ? models.Car : model<ICar>('car', carSchema);
export default Car;
