var data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Louisiana"
    },
    {
        value: 200,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Maryland"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "North Dakota"
    },
    {
        value: 75,
        color: "#8AEA3D",
        highlight: "#BBFA89",
        label: "California"
    },
    {
        value: 100,
        color: "#AD2F6A",
        highlight: "#E00C6F",
        label: "Texas"
    },
    {
        value: 50,
        color: "#220DE5",
        highlight: "#7E70FD",
        label: "Other"
    }
]

Template.mostSurveilledStates.rendered = function () {
    var ctx = this.find("#most-surveilled-states").getContext("2d");
    var myDoughnutChart = new Chart(ctx).Doughnut(data);
    console.log(ctx);
};