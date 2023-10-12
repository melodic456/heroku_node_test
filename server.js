const api = require('@marcius-capital/binance-api')

async function save_by_pair(item) {
   await fetch('http://20.83.146.14/api/save', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({name: item.symbol, value: item.price}),
                    })
                        .then(response => {
                            if (response.ok) {
                                console.log('Data saved successfully!');
                            } else {
                                console.error('Error saving data:', response.statusText);
                            }
                        });
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

// const symbolsWithUSDT = symbols.map(symbol => symbol + 'usdt');

symbols.forEach((symbol) => {
  api.stream.aggTrade(symbol + 'usdt', (cb) => save_by_pair(cb));
});

setTimeout(() => {
    api.stream.close.all()
}, 5000)



async function updateData(item) {
    await fetch('http://20.83.146.14/api/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: item.symbol, value: item.price}),
    }).then(response2 => {
        if (response2.ok) {
            console.log('Value updated successfully!');
        } else {
            console.error('Error updating value:', response2.statusText);
        }
            });
}

setInterval(() => {
    try {
        symbols.forEach((symbol) => {
  api.stream.aggTrade(symbol + 'usdt', (cb) => updateData(cb));
});
    } catch (e) {
        console.log(e)
    }

setTimeout(() => {
    api.stream.close.all()
}, 2000)
}, 10000)

// api.stream.close.all()