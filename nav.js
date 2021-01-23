const http = require("http")

const options = {
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
        let splitHtml = str.slice(str.indexOf('<tr>'))
        let data = {}

        while (splitHtml.length > 0) {
            const endOfRowIndex = splitHtml.indexOf('</td></tr>')
            const startOfRowIndex = splitHtml.indexOf('<tr><td>') + 10

            if (endOfRowIndex < 0) {
                splitHtml = ''
                continue
            }

            const row = splitHtml.slice(startOfRowIndex, endOfRowIndex)
            const rowDataList = row.split('</td><td>')
            const key = rowDataList[0]
            rowDataList.shift()
            data[key] = [...rowDataList]
            splitHtml = splitHtml.slice(endOfRowIndex + 10)
        }

        const result = (param) ? data[param][0] : 'N/A'

        console.log(`NAV of ${param || 'none'}:`, result)
    })
}

const req = http.request(options, callback)
req.write("Test Project");
req.end();