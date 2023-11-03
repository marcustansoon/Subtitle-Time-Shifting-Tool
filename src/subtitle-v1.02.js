const bothPatterns = /^[0-9]{2}\:[0-9]{2}\:[0-9]{2}\,[0-9]{3}\s\-\-\>\s[0-9]{2}\:[0-9]{2}\:[0-9]{2}\,[0-9]{3}/i
const singlePattern = /[0-9]{2}\:[0-9]{2}\:[0-9]{2}\,[0-9]{3}/g
const srtFilePattern = /(\.srt)$/
let fileSubtitle = ''

function deconstructValues(string) {
    let totalSeconds = 0,
        totalMilliseconds = 0
	
    // Hours (+3600)
    totalSeconds += (parseInt(string[0]) * 10 + parseInt(string[1])) * 3600

    // Minutes (+60)
    totalSeconds += (parseInt(string[3]) * 10 + parseInt(string[4])) * 60

    // Seconds (+)
    totalSeconds += (parseInt(string[6]) * 10 + parseInt(string[7])) * 1

    // MilliSeconds (+)
    totalMilliseconds += parseInt(string[9]) * 100 + parseInt(string[10]) * 10 + parseInt(string[11]) * 1

    return {
        's': totalSeconds,
        'ms': totalMilliseconds
    }
}

function constructValues(seconds, milliseconds) {
    let string = '',
        temp = 0
	
    // Hours
    temp = (seconds / 3600 / 10) << 0
    string += temp % 10
    seconds -= temp * 3600 * 10

    temp = (seconds / 3600 / 1) << 0
    string += temp % 10
    seconds -= temp * 3600 * 1

    // Minutes
    string += ':'
    temp = (seconds / 60 / 10) << 0
    string += temp % 10
    seconds -= temp * 60 * 10

    temp = (seconds / 60 / 1) << 0
    string += temp % 10
    seconds -= temp * 60 * 1

    // Seconds
    string += ':'
    temp = (seconds / 10) << 0
    string += temp % 10
    seconds -= temp * 10

    temp = (seconds) << 0
    string += temp % 10
    seconds -= temp

    // Milliseconds
    string += ','
    string += milliseconds.toString().padStart(3, '0')

    return string
}

function subtitleOnChange() {
	// Hide alert box
    document.getElementById('alertBox').classList.add('hidden')
	// Remove selected file if have
	cancelFileInput()
}

function downloadFile() {
  	saveFile("subtitle.srt", document.getElementById('hiddenSubtitle').value)
}

function saveFile(filename, data) {
  	const blob = new Blob([data], {
    	type: 'text/plain;charset=windows-1256'
  	});
  	if (window.navigator.msSaveOrOpenBlob) {
   		window.navigator.msSaveBlob(blob, filename);
  	} else {
    	const elem = window.document.createElement('a');
    	elem.href = window.URL.createObjectURL(blob);
    	elem.download = filename;
    	document.body.appendChild(elem);
    	elem.click();
    	document.body.removeChild(elem);
  	}
}

function cancelFileInput() {
	// Remove selected file
    document.getElementById("fileInput").value = ""
    fileSubtitle = ''
	// Hide remove-file button
    document.getElementById('cancelFileInputButton').classList.add('hidden')
}

function copy() {
	// Show textarea
    document.getElementById('hiddenSubtitle').classList.remove('hidden')
    document.getElementById('hiddenSubtitle').focus()
    document.getElementById('hiddenSubtitle').select()
    document.execCommand('copy')
	// Hide textarea
    document.getElementById('hiddenSubtitle').classList.add('hidden')
}

function fileOnChange() {
    var file = document.getElementById("fileInput").files[0]
    if (file) {
		// Hide alert box
    	document.getElementById('alertBox').classList.add('hidden')
		// Show remote-file button
        document.getElementById('cancelFileInputButton').classList.remove('hidden')
		// Reset subtitle textarea
		document.getElementById('subtitle').value = '';
        if (!file.name.match(srtFilePattern)) {
            alert("File must be in .srt format!")
            fileSubtitle = ''
            return
        }
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(evt) {
            fileSubtitle = evt.target.result
        }
        reader.onerror = function(evt) {
            alert("Error reading file!")
            fileSubtitle = ''
        }
    }
}

function run() {
    let userInput = document.getElementById('time').value;
    userInput = parseInt(userInput) >> 0

    let rawSubtitle = fileSubtitle || document.getElementById('subtitle').value
    let array = rawSubtitle.split("\n")

    for (let loop = 0; loop < array.length; loop++) {
        // Contains 'from' and 'to' timeframe
        let results = array[loop].match(singlePattern)
        if (array[loop].match(bothPatterns) && results.length === 2) {

            // Extract 'from' timeframe
            let from = deconstructValues(results[0])
            let secondsToBeAdded = userInput
			let result = from.ms + from.s * 1000
			
            result += secondsToBeAdded
			
			from.s = result / 1000 >> 0
			from.ms = result - (result / 1000 >> 0) * 1000

            // Modify 'from' timeframe
            results[0] = constructValues(from.s, from.ms)

            // Extract 'to' timeframe
            let to = deconstructValues(results[1])
            secondsToBeAdded = userInput
			result = to.ms + to.s * 1000
			
            result += secondsToBeAdded
			
			to.s = result / 1000 >> 0
			to.ms = result - (result / 1000 >> 0) * 1000

            // Modify 'to' timeframe
            results[1] = constructValues(to.s, to.ms)

            // Set result
            array[loop] = results[0] + ' --> ' + results[1]
        }

		// Show success alert box
        document.getElementById('alertBox').classList.remove('hidden')
    }
	// Store conversion result
    document.getElementById('hiddenSubtitle').value = array.join("\n")
}
