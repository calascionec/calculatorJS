$(document).ready(function(){
  var placeholder = 0;
  var value = null;
  var action = "";
  var numbers = $(".number").map(function(index) {return this.id;});
  var operators = $(".operator").map(function(index){return this.id;});


  var numberClickHandler = function() {
    if (placeholder === 0) {
      placeholder = $(this).text().trim();
    } else {
      placeholder +=$(this).text().trim();
    }
    $("#display input").val(placeholder);
    evaluate(placeholder, value, action);
  };

  var operatorClickHandler = function() {
    action = $(this).text().trim();
    $("#display input").val(value);
  }

  var evaluate = function(currentPlaceholder, currentValue, currentAction) {
    if (!action) {
      return;
    }
    if (value === null) {
      value = currentPlaceholder;
      placeholder = 0;
    }
    if (currentAction === "+") {
      value = parseInt(currentPlaceholder) + parseInt(currentValue);
      placeholder = 0;
    } else if (currentAction === "-") {
      value = parseInt(currentValue) - parseInt(currentPlaceholder);
      placeholder = 0;
    } else if (currentAction === "x") {
      value = parseInt(currentPlaceholder) * parseInt(currentValue);
      placeholder = 0;
    } else if (currentAction === "/") {
      value = parseInt(currentValue) / parseInt(currentPlaceholder);
      placeholder = 0;
    } else if (currentAction === "+/-") {
      value = -1 * parseInt(currentValue);
      placeholder = 0;
    } else if (currentAction === "%") {
      value = .01 * parseInt(currentValue);
      placeholder = 0;
    }

  }

//Add click handlers to numbers
  for(var i = 0; i < numbers.length; i++) {
    $("#" + numbers[i]).on("click", numberClickHandler);
  }

//Add click handlers to operators
  for(var i = 0; i < operators.length; i++) {
    $("#" + operators[i]).on("click", operatorClickHandler);
  }

  $("#ac").on("click", function() {
    value = null;
    placeholder = 0;
    action = "";
    $("#display input").val(value);
  })

  $("#decimal").on("click", function() {
    if($("#display input").val().indexOf(".") === -1) {
      placeholder +=$(this).text().trim();
      $("#display input").val(placeholder);
    }
  })

  $("#equals").on("click", function() {
    $("#display input").val(value);
    placeholder = 0;
    value = 0;
  })


});
