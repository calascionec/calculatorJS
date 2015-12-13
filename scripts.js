$(document).ready(function(){
  var placeholder = "0";
  var value = "0";
  var action = "";
  var numbers = $(".number").map(function(index) {return this.id;});
  var operators = $(".operator").map(function(index){return this.id;});


  var numberClickHandler = function() {
    placeholder +=$(this).text().trim();
    $("#display input").val(placeholder);
  };

  var operatorClickHandler = function() {
    action = $(this).text().trim();
    evaluate(placeholder, value, action);

    placeholder = "0";
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
    value = "0";
    placeholder = "0";
    action = "";
    $("#display input").val("0");
  })

  $("#decimal").on("click", function() {
    if($("#display input").val().indexOf(".") === -1) {
      placeholder += ".";
    }
  })



});

var evaluate = function(placeholder, value, action) {
  if (action === "+") {
    value = parseInt(placeholder) + parseInt(value);
    $("#display input").val(value);
    console.log(parseInt(placeholder));
    console.log(parseInt(value));
  }
}

var clearActionPlaceholder = function() {
  action = "";
  placeholder = "0";
};

var add = function(x,y) {
  return x + y;
};

var subtract = function(x,y) {
  return x - y;
};

var multiply = function(x,y) {
  return x * y;
};

var divide = function(x,y) {
  return x / y;
};

var inverse = function(x) {
  return x * -1;
};

var percent = function(x) {
  return x * .01;
};
