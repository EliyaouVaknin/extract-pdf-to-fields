const inputFile = document.getElementById("inputFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const emailRegex = new RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
const linkedInRegex = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
const phoneRegex = new RegExp(/\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m);
const IDRegex = new RegExp(/^\d{9}$/);
var pdfText = "";

const regexList = {
    id: new RegExp(/^\d{9}$/),
    email: new RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/),
    linkenInURL: new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm),
    phone: new RegExp(/\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m)
}

var resume = {
    id: null,
    email: null,
    linkenInURL: null,
    phone: null,
    text: null
}

const checkFields = (text, regex) => {
    for(let i = 0; i < Object.keys(regex).length; i++){
        try {
            Object.values(resume)[i] = text.match(Object.values(regex)[i])[0];
        } catch {
            resume[i] = null;
        }
        console.log(Object.values(resume)[i])
    }
}

inputFile.addEventListener("change", () => {
    const formData = new FormData();

    try {
        formData.append("pdfFile", inputFile.files[0]);
    } catch {
        alert("oops...Error while uploading the file")
    }


    fetch('/extract-text', {
        method: "POST",
        body: formData
    }).then(response => {
        return response.text();
    }).then(extractedText => {
        pdfText = extractedText
    });
});

btnUpload.addEventListener("click", () => {
    if (inputFile.files.length > 0) {
        checkFields(pdfText, regexList);
        resume.text = pdfText;
        resultText.value = `id:${resume.id}\nemail: ${resume.email}\nphone: ${resume.phone}\nlinkedIn: ${resume.linkenInURL}`;

        fetch('/savedata', {
            method: 'POST',
            body: JSON.stringify(resume),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(alert("File saved successfully"))
    } else {
        alert("Please upload file")
    }
});
