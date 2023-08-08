$(document).ready(function () {
  var targetDate = new Date("2023-08-16T23:59:59").getTime();

  var countdownInterval = setInterval(function () {
    var now = new Date().getTime();
    var timeRemaining = targetDate - now;

    var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    $("#days").text(days.toString().padStart(2, "0"));
    $("#hours").text(hours.toString().padStart(2, "0"));
    $("#minutes").text(minutes.toString().padStart(2, "0"));
    $("#seconds").text(seconds.toString().padStart(2, "0"));

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      $("#timer").attr("hidden", true);
      $("#closeB").removeAttr("hidden");
      $("#slideShow").removeAttr("hidden");
    } else {
      $("#photos").attr("hidden", true);
      $("#slideShow").attr("hidden", true);
      $("#timer").removeAttr("hidden");
    }
  }, 1000);

  var clonedDiv = null;
  var i = 0;
  var flag = 1;
  $(".picColDiv").on("click", function () {
    console.log(i++);
    if (clonedDiv) {
      return;
    }
    flag = 0;

    var originalDiv = $(this);

    clonedDiv = originalDiv.clone();

    $(clonedDiv[0]["childNodes"][3]).css({
      "content-visibility": "visible",
      visibility: "visible",
      height: "150px",
    });
    $("#closeB").removeAttr("hidden");

    clonedDiv.css({
      position: "fixed",
      "background-color": "",
      "z-index": "9998",
      opacity: 0,
      width: "0px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    });

    $("body").append(clonedDiv);

    clonedDiv.animate(
      {
        width: "350px",
        opacity: 1,
      },
      500
    );

    $(".cont").css({ filter: "blur(10px)", opacity: 0.6 });

    $(clonedDiv).on("click", function (event) {
      flag = 0;
    });
  });

  $("#closeB").on("click", function () {
    flag = 1;
    $("#photos").removeAttr("hidden");
    $("#closeB").attr("hidden", true);
    $("#slideShow").attr("hidden", true);
  });

  $(document).on("click", function () {
    if (!flag) {
      flag = 1;
      return;
    }
    if (clonedDiv) {
      $("#closeB").attr("hidden", true);
      clonedDiv.animate(
        {
          opacity: 0,
        },
        500,
        function () {
          clonedDiv.remove();
          clonedDiv = null;
        }
      );

      $(".cont").css({ filter: "blur(0px)", opacity: 1 });
    }
  });
});
