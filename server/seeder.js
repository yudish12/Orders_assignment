import data from './DummyDataNew.json' assert { type: 'json' };;
import mongoose from 'mongoose';
import fs from 'fs';

// Convert id to _id and handle ObjectId
const convertedData = data.map(item => {
    // Destructure the id and other properties
    const { id, ...rest } = item;
    // Create a new object with _id and other properties
    const _id = new mongoose.Types.ObjectId(id); // Convert id to ObjectId
    return {
        _id: _id.toString(), // Convert ObjectId to string
        ...rest
    };
});

fs.writeFile('newData.json', JSON.stringify(convertedData, null, 2), (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Data has been written to');
    }
});
