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

// let Brand: Model<ICarBrand>;
// try {
//     Brand = model<ICarBrand>('brand');
// } catch (error) {
//     Brand = model<ICarBrand>('brand', brandSchema);
// }
const Brand = models.Brand || model<ICarBrand>('Brand', brandSchema);
export default Brand;
