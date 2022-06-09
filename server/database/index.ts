import mongoose from 'mongoose';

const connection = {
    isConnected: 0,
};

const DBConnect = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log('Database Already Connected');
        return;
    }
    const db = await mongoose.connect(
        'mongodb://127.0.0.1:27017/car-dekho-clone'
    );

    connection.isConnected = db.connections[0].readyState;
    console.log('Database Connected', connection.isConnected);
};

export default DBConnect;
