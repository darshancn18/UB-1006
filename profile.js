document.getElementById("profileForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    const income = parseInt(document.getElementById("income").value);
    const occupation = document.getElementById("occupation").value;
    const location = document.getElementById("location").value;

    let suggestions = [];

    if(age >= 18){
        suggestions.push("Voter ID Registration");
    }

    if(age <= 25){
        suggestions.push("Youth Scholarship Programs");
    }

    if(occupation === "farmer"){
        suggestions.push("PM Kisan Yojana");
        suggestions.push("Crop Insurance Scheme");
    }

    if(occupation === "unemployed"){
        suggestions.push("Unemployment Allowance");
        suggestions.push("Skill Development Scheme");
    }

    if(income < 250000){
        suggestions.push("Income Support Schemes");
    }

    if(location === "rural"){
        suggestions.push("Rural Housing Scheme");
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("aiSuggestions", JSON.stringify(suggestions));

    window.location.href = "v3.html";
});
