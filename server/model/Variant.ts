import { model, models, Schema } from 'mongoose';
import { IVariant } from 'server/interface';

const variantSchema = new Schema<IVariant>(
    {
        variantName: {
            type: String,
            required: true,
        },
        model: {
            type: Schema.Types.ObjectId,
            ref: 'model',
        },
    },
    { timestamps: true }
);

// let Variant: Model<IVariant>;
// try {
//     Variant = model<IVariant>('variant');
// } catch (error) {
//     Variant = model<IVariant>('variant', variantSchema);
// }

const Variant = models.Variant || model<IVariant>('Variant', variantSchema);

export default Variant;
