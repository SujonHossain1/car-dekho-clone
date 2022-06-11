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
            ref: 'Model',
        },
    },
    { timestamps: true }
);

const Variant = models.Variant || model<IVariant>('Variant', variantSchema);

export default Variant;
