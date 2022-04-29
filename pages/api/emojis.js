import emojis_data from '../../data/emojis.json';

export default function getAll(req, res) {
    const data = emojis_data["data"];

    res.status(200).json({
        data
    });
}
