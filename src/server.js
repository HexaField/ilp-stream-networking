const PluginMiniAccounts = require('ilp-plugin-mini-accounts')
const { createServer } = require('ilp-protocol-stream')

async function server (port) {
    const serverPlugin = new PluginMiniAccounts({
        port: port,
        allowedOrigins: ['.*'],
        debugHostIldcpInfo: {
        clientAddress: 'test.example',
        assetScale: 9,
        assetCode: '___'
        }
    })
    const server = await createServer({ plugin: serverPlugin })
    server.on('connection', (connection) => {
        console.log('new connection')
        connection.on('stream', (stream) => {
            console.log('new stream')
            stream.setReceiveMax(10000)
            stream.on('money', (amount) => { 
                // process.stdout.write(amount + ',') 
            })
        })
    })
    return server.generateAddressAndSecret()
}

module.exports = { server }