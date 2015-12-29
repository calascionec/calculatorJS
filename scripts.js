$(document).ready(function(){
  var placeholder = 0;
  var value = null;
  var action = "";
  var numbers = $(".number").map(function(index) {return this.id;});
  var operators = $(".operator").map(function(index){return this.id;});


  var numberClickHandler = function() {
    placeholder += $(this).text().trim();
    placeholder = placeholder[0] === "0" ? placeholder.slice(1) : placeholder;
    $("#display input").val(placeholder);
  };

  var operatorClickHandler = function() {
    if (value === null) {
      action = $(this).text().trim();
      value = placeholder;
      placeholder = 0;
    } else {
      evaluate(placeholder, value, action);
      action = $(this).text().trim();
    }
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
      value = parseFloat(currentPlaceholder) + parseFloat(currentValue);
      placeholder = 0;
    } else if (currentAction === "-") {
      value = parseFloat(currentValue) - parseFloat(currentPlaceholder);
      placeholder = 0;
    } else if (currentAction === "x") {
      value = parseFloat(currentPlaceholder) * parseFloat(currentValue);
      placeholder = 0;
    } else if (currentAction === "/") {
      value = parseFloat(currentValue) / parseFloat(currentPlaceholder);
      placeholder = 0;
    } else if (currentAction === "+/-") {
      value = -1 * parseFloat(currentValue);
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

  $("#percent").on("click", function() {
    if (placeholder) {
      placeholder = parseFloat(placeholder) * .01;
      $("#display input").val(placeholder);
    } else {
      value = parseFloat(value) * .01;
      $("#display input").val(value);
    }
  })

  $("#inverse").on("click", function() {
    if (placeholder) {
      placeholder = parseFloat(placeholder) * -1;
      $("#display input").val(placeholder);
    } else {
      value = parseFloat(value) * -1;
      $("#display input").val(value);
    }
  })

  $("#equals").on("click", function() {
    if (value === null) {
      value = placeholder;
      $("#display input").val(placeholder);
      placeholder = 0;
    } else {
      evaluate(placeholder, value, action);
      $("#display input").val(value);
      placeholder = 0;
    }
  })


});
