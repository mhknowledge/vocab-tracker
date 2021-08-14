//get all activity data from back-end (db)

fetch("api/activities/range")
.then(response => {
    return response.json();
})
.then(data => {
    populateChart(data);
});

API.getActivitiesInRange()

function generatePalette() {
    const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
    ]

    return arr;
}
function populateChart(data) {
    let durations = duration(data);
    let amount = calculateTotalAmount(data);
    let activities = activityNames(data);
    const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
    labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      datasets: [
          {
              label: "Activity Duration in Minutes",
              backgroundColor: "red",
              borderColor: "red",
              data: durations,
              fill: false
          }
      ]
},
options: {
    responsive: true,
    title: {
        display: true
    },
    scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
      type: "bar",
      data: {
          labels: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday", 
          ],
          datasets: [
            {
              label: "Amount",
              data: amount,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
            title: {
                display: true,
                text: "# of New Vocab"
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
      
  });

  let pieChart = new Chart(pie, {
      type: "pie",
      data: {
          labels: activities,
          datasets: [
              {
                  label: "Activities Performed",
                  backgroundColor: colors,
                  data: durations
              }
          ]
      },
      options: {
          title: {
              display: true,
              text: "Activities Performed"
          }
      }
  });

  let donutChart = new Chart(pie2, {
      type: "doughnut",
      data: {
          labels: activities,
          datasets: [
              {
                  label: "Activities Performed",
                  backgroundColor: colors,
                  data: duration
              }
          ]
      },
      options: {
          title: {
              display: true,
              text: "Activities Performed"
          }
      }
  });
}

function duration(data) {
    let durations = [];

    data.forEach(activity => {
        activity.exercises.forEach(exercise => {
            durations.push(exercise.duration);
        });
    });

    return durations;
}

function calculateTotalAmount(data) {
    let total = [];

    data.forEach(activity => {
        activity.exercises.forEach(exercise => {
            total.push(exercise.amount);
        });
    });

    return total;
}
  
function activityNames(data) {
    let activities = [];
    data.forEach(activity => {
        activity.exercises.forEach(exercise => {
            activities.push(exercise.name);
        });
    });

    return activities;
}
