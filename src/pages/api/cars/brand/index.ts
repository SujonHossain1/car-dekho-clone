import { NextApiRequest, NextApiResponse } from 'next';
import DBConnect from 'server/database';
import Brand from 'server/model/Brand';

const carBrandHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await DBConnect();

    const { body, method } = req;

    if (method === 'POST') {
        try {
            const brand = await Brand.create(body);
            res.status(201).json({
                success: true,
                data: brand,
                message: 'Car brand created successfully',
            });
        } catch (error) {
            const { message } = error as Error;
            res.status(400).json({
                success: false,
                data: null,
                message,
            });
        }
    } else if (method === 'GET') {
        try {
            const brand = await Brand.find({});
            res.status(200).json({
                success: true,
                data: brand,
                message: '',
            });
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
export default carBrandHandler;
