import { model, models, Schema } from 'mongoose';

const carSchema = new Schema<ICar>({
    brand: {
        brandName: {
            type: String,
            required: true,
        },
        model: [
            {
                modelName: {
                    type: String,
                    // required: true,
                },
                variant: [
                    {
                        variantName: {
                            type: String,
                            // required: true,
                        },
                        price: {
                            type: Number,
                            // required: true,
                        },
                        year: Number,
                        serviceCost: {
                            year: Number,
                            price: Number,
                        },
                        engineType: String,
                        displacement: Number,
                        numberOfCylinder: Number,
                        gearBox: String,
                        kilometers: Number,
                        details: String,
                        photoUrl: String,
                        reviews: [
                            {
                                rating: Number,
                                message: String,
                            },
                        ],
                    },
                ],
            },
        ],
    },
});

// let Car: Model<ICar>;
// try {
//     Car = model<ICar>('car');
// } catch (error) {
//     Car = model<ICar>('car', carSchema);
// }
const Car = models.Car || model<ICar>('car', carSchema);
export default Car;
