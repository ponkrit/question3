var http = require("http")

var options = {
    host: 'codequiz.azurewebsites.net',
    path: '/',
    method: 'GET',
    headers: {
        Cookie: 'hasCookie=true'
    }
}

callback = function(response) {
    const param = process.argv[2]

    var str = ''
    response.on('data', function (chunk) {
        str += chunk
    });

    response.on('end', function () {
        console.log(str)
    })
}

var req = http.request(options, callback)
//This is the data we are posting, it needs to be a string or a buffer
req.write("Test project!")
req.end()
