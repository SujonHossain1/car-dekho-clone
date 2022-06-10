import { model, models, Schema } from 'mongoose';
import { ICarModel } from 'server/interface';

const modelSchema = new Schema<ICarModel>(
    {
        modelName: {
            type: String,
            required: [true, 'model name required'],
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'brand',
        },
    },
    { timestamps: true }
);

// let CModel: Model<ICarModel>;
// try {
//     CModel = model<ICarModel>('model');
// } catch (error) {
//     CModel = model<ICarModel>('model', modelSchema);
// }

const Model = models.Model || model<ICarModel>('Model', modelSchema);

export default Model;
