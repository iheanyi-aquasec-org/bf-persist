const http = require('http');
const port = 3000;
const uuid = require('uuid/v1')
const fs = require('fs')

const requestHandler = (request, response) => {
  if (request.method == 'POST') {
    let body = ''
    request.on('data', function(chunk){
      body += chunk
    })

    request.on('end', function(){
      const transaction = {
        uuid: uuid(),
        timestamp: Date.now(),
        body
      }
      console.log(transaction),
      fs.appendFile('./transaction.txt', JSON.stringify(transaction)+'\n', () => {
        response.end('Check command prompt')
      })
    })
  }

  if (request.method == 'GET') {
    fs.readFile('./transaction.txt', (err, data) => {
      response.end(data)
    })
  } 
} 

const server = http.createServer(requestHandler)
server.listen(port, (err) => {
  if (err) {
    console.log('something bad happened', err)
  } else {
    console.log(`server is listening on ${port}`)
  }
})
