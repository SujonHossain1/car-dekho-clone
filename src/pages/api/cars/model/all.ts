import { Types } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { ICarBrand, ICarModel } from 'server/interface';
import Brand from 'server/model/Brand';
import Model from 'server/model/Model';

interface IBrandItem {
    brandName: string;
    _id?: Types.ObjectId;
    models: ICarModel[];
}

const allModelHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const brandsWithModels: IBrandItem[] = [];

    if (method === 'GET') {
        const brands = await Brand.find<ICarBrand>({});
        const models = await Model.find<ICarModel>({});

        brands.forEach((brand) => {
            const brandItem: IBrandItem = {
                brandName: brand.brandName,
                _id: brand._id,
                models: [],
            };

            models.forEach((model) => {
                const brandId = brand._id?.toHexString();
                const modelId = model.brand?.toHexString();

                if (brandId === modelId) {
                    brandItem.models.push(model);
                }
            });
            brandsWithModels.push(brandItem);
        });
        res.json({
            success: true,
            brandsWithModels,
            message: 'ok',
        });
    }
};

export default allModelHandler;

// const variants = await Variant.find({}).populate({
//     path: 'model',
//     model: Model,
// });
