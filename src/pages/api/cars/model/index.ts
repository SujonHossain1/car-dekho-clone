import { NextApiRequest, NextApiResponse } from 'next';
import DBConnect from 'server/database';
import Model from 'server/model/Model';

const carModalHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await DBConnect();

    const { body, method } = req;

    if (method === 'POST') {
        try {
            const model = await Model.create(body);
            res.status(201).json({
                success: true,
                data: model,
                message: 'Car model created successfully',
            });
        } catch (error) {
            const { message } = error as Error;
            res.status(201).json({
                success: false,
                data: null,
                message,
            });
        }
    } else if (method === 'GET') {
        try {
            const model = await Model.find({});
            res.status(200).json({
                success: true,
                data: model,
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
export default carModalHandler;
