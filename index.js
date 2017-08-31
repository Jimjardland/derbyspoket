const express = require('express')
const http = require('http')
const path = require('path')
const moment = require('moment')

const router = express.Router()
const app = express()

app.use('/api', router)
app.use('/client', express.static('client'))

const page = (res, page) => res.sendFile(path.resolve(`client/${page}.html`))

app.get('/', (req, res) => page(res, 'index'))

function difVictory() {
  return Math.abs(moment('2007-08-13').diff(moment(), 'days')) //hårdkoda, lär ju orka annat. 2007-08-13 knasigt länge sen
}

const cases = ['Marie Picasso vann Idol', 
                'Göran Persson avgick som Socialdemokraternas partiledare',
                'Den första versionen av iPhone presenterades',
                'The Ark vann melodifestivalen med The Worrying Kind',
                'Filmen Transformers har biopremiär',
                'George W. Bush var president',
                'Domaren Herbert Fandel blir attackerad av en supporter i EM-kvalmatchen mellan Danmark och Sverige',
                'Britney Spears rakade av sig håret',
                'Rihanna släppte låten Umbrella',
                'The Simpsons Movie hade premiär',
                'Operativsystemet Windows Vista släpptes']

const ranomizeCase = () => cases[Math.floor(Math.random()*cases.length)]
const retVal = () => {
    return { 'case': ranomizeCase(), 'daysSince': difVictory()}
}

router.get('/daysSince', (req, res) => res.json(retVal()))


const server = http.createServer(app)
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
	console.log(`listening on ${PORT}`)
})
