$(document).ready(function() {
  $("#surveyresults").hide();
});

$("#submit").on("click", function(event) {
  event.preventDefault();
  function validateForm() {
    var isValid = true;
    $(".form-control").each(function() {
      if ($(this).val() === "") {
        isValid = false;
      }
    });
    return isValid;
  }

  if (validateForm()) {
    var userData = {
      name: $("#name").val(),
      linkedIn: $("#linkedIn").val(),
      gitHub: $("#gitHub").val(),
      q1: $("#q1").val(),
      q2: $("#q2").val(),
      q3: $("#q3").val(),
      q4: $("#q4").val(),
      q5: $("#q5").val(),
      q6: $("#q6").val(),
      misc: $("#extrainfo").val()
    };

    $.post("/api/devadd", userData, function(data) {
      $("#surveycontainer").hide();
      $("#surveyresults").show();
      $("#surveyresults").append(
        "<tr><th>Name</th><th>LinkedIn</th><th>GitHub</th><th>Project</th><th>Stack</th><th>Language</th><th>Database</th><th>MVC</th><th>Motivation</th><th>Extra Info</th></tr>"
      );

      for (i = 0; i < data.length; i++) {
        $("#surveyresults").append(
          "<tr class='devResults'><td>" +
            data[i].Name +
            "</td><td>" +
            "<a href='" +
            data[i].LinkedIn +
            "'>" +
            data[i].LinkedIn +
            "</a>" +
            "</td><td>" +
            "<a href='" +
            data[i].GitHub +
            "'>" +
            data[i].GitHub +
            "</a>" +
            "</td><td>" +
            data[i].Project +
            "</td><td>" +
            data[i].Stack +
            "</td><td>" +
            data[i].Language +
            "</td><td>" +
            data[i].Database +
            "</td><td>" +
            data[i].MVC +
            "</td><td>" +
            data[i].Motivation +
            "</td><td>" +
            data[i].Misc +
            "</td></tr>"
        );
      }
    });
  } else {
    alert("Please fill out all fields before submitting!");
  }
});
