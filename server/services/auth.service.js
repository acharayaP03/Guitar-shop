
const helloService = async () =>{
    try {
        return 'hello'
    } catch (error) {
        new Error('opp server ran into issue...')
    }
}

module.exports = {helloService};