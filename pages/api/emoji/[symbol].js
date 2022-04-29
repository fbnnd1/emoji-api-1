import emojis_data from '../../../data/emojis.json';

export default function getEmoji(req, res) {
    const {symbol} = req.query;

    const { data } = emojis_data;
    let res_data = {};
    let isFoundEmoji = false;

    for (let item of data) {
        if (symbol == item["emoji"]) {
            res_data = item;
            isFoundEmoji = true;
            break;
        }
    }


    if (isFoundEmoji == true) {
        res.status(200).json({
            ...res_data
        });
    } else {
        res.status(404).json({
            err_msg: "Emoji not found!"
        });
    }
}
