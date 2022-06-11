import { NextApiRequest, NextApiResponse } from 'next';
import Car from 'server/model/Car';

const getVariant = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;
    const { id } = query;

    if (method === 'GET') {
        try {
            const variants = await Car.find({ 'model._id': id });
            res.status(200).json({
                success: true,
                data: variants,
                message: 'ok',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'variants  could not be retrieved',
            });
        }
    } else {
        res.status(405).json({
            success: false,
            data: null,
            message: 'Method not allowed',
        });
    }
};
export default getVariant;
