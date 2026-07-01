document
.getElementById("analyzeBtn")
.addEventListener("click", async () => {

    const file =
    document.getElementById("resume")
    .files[0];

    const jd =
    document.getElementById("jobDescription")
    .value;

    const formData =
    new FormData();

    formData.append("resume", file);

    formData.append(
        "jobDescription",
        jd
    );

    const response =
    await fetch(
        "http://localhost:3000/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data =
    await response.json();

    document.getElementById("score")
    .innerText = data.score;

    document.getElementById("matched")
    .innerHTML =
    data.matched
    .map(skill => `<li>${skill}</li>`)
    .join("");

    document.getElementById("missing")
    .innerHTML =
    data.missing
    .map(skill => `<li>${skill}</li>`)
    .join("");

});