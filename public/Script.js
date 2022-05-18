const inputFile = document.getElementById("inputFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const emailRegex = new RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
const linkedInRegex = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
const phoneRegex = new RegExp(/\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m);
const IDRegex = new RegExp(/^\d{9}$/);
var pdfText = "";

var resume = {
    id: null,
    email: null,
    linkenInURL: null,
    phone: null,
    text: null
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
        try {
            resume.id = pdfText.match(IDRegex)[0];
        } catch {
            resume.id = null
        }
        try {
            resume.email = pdfText.match(emailRegex)[0];
        } catch {
            resume.email = null
        }
        try {
            resume.phone = pdfText.match(phoneRegex)[0];
        } catch {
            resume.id = null
        }
        try {
            resume.linkenInURL = pdfText.match(linkedInRegex)[0];
        } catch {
            resume.linkenInURL = null
        }
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
