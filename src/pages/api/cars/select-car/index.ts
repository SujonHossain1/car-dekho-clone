import { NextApiRequest, NextApiResponse } from 'next';
import DBConnect from 'server/database';
import Car from 'server/model/Car';

const selectedCars = async (req: NextApiRequest, res: NextApiResponse) => {
    await DBConnect();

    const { body, method } = req;
    const { variant } = body;

    if (method === 'POST') {
        try {
            const selectedCars = await Car.find({
                'variant.variantName': { $in: [...variant] },
            });

            res.status(200).json({
                success: true,
                data: selectedCars,
                message: 'ok',
            });
            // res.send({ message: 'ok' });
        } catch (error) {
            const { message } = error as Error;
            res.status(400).json({
                success: false,
                data: null,
                message,
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
export default selectedCars;
