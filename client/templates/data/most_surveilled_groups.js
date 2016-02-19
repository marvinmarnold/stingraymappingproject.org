var data = {
    labels: ["BlackLivesMatter", "PETA", "Planned Parenthood", "NRA"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81]
        }
    ]
};

Template.mostSurveilledGroups.rendered = function () {
    var ctx = this.find("#most-surveilled-groups").getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data);
    console.log(ctx);
};