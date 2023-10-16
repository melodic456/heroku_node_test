const api = require('@marcius-capital/binance-api');

async function save_by_pair(item) {
    try {
        await fetch('http://20.83.146.14/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: item.symbol, value: item.price }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Data saved successfully!');
            } else {
                console.error('Error saving data:', response.statusText);
            }
        });
    } catch (error) {
        console.error('An error occurred while saving data:', error);
    }
}

const symbols = [
    'ltc',
    'doge',
    'trx',
    'eth',
    'btc',
    'xrp',
    'matic',
    'link',
    'busd',
    'bnb'
];

symbols.forEach((symbol) => {
    try {
        api.stream.aggTrade(symbol + 'usdt', (cb) => save_by_pair(cb));
    } catch (error) {
        console.error('An error occurred while streaming aggregate trade:', error);
    }
});

setTimeout(() => {
    try {
        api.stream.close.all();
    } catch (error) {
        console.error('An error occurred while closing stream:', error);
    }
}, 5000);

async function updateData(item) {
    try {
        await fetch('http://20.83.146.14/api/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: item.symbol, value: item.price }),
        }).then(response2 => {
            if (response2.ok) {
                console.log('Value updated successfully!');
            } else {
                console.error('Error updating value:', response2.statusText);
            }
        });
    } catch (error) {
        console.error('An error occurred while updating value:', error);
    }
}

setInterval(() => {
    try {
        symbols.forEach((symbol) => {
            api.stream.aggTrade(symbol + 'usdt', (cb) => updateData(cb));
        });
    } catch (error) {
        console.error('An error occurred while streaming aggregate trade:', error);
    }

    setTimeout(() => {
        try {
            api.stream.close.all();
        } catch (error) {
            console.error('An error occurred while closing stream:', error);
        }
    }, 2000);
}, 10000);

// api.stream.close.all()
