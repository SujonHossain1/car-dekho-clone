import { NextApiRequest, NextApiResponse } from 'next';
import Variant from 'server/model/Variant';

const allModelHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === 'GET') {
        const models = await Variant.find({}).populate('model');
        console.log({ working: 'ok' });
        res.json({ message: 'ok', models });
    }
};

export default allModelHandler;
