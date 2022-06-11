import { model, models, Schema } from 'mongoose';
import { ICarBrand } from 'server/interface';

const brandSchema = new Schema<ICarBrand>(
    {
        brandName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Brand = models.Brand || model<ICarBrand>('Brand', brandSchema);
export default Brand;
