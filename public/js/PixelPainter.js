$(function(){

 var pixelpainter = new PixelPainter(20,20);
   $("#artboard").append(pixelpainter.artboard);
   $("#controls").append(pixelpainter.controls);
   $("#controls").append(pixelpainter.erasebutton);
   $("#controls").append(pixelpainter.clearbutton);
   $("#controls").append(pixelpainter.savebutton);
   $("#controls").append(pixelpainter.allpictures);

  $(".controlcell").each(function () {
    // random number between 0x000000 and 0xFFFFFF
    var random_bg_r = Math.floor(Math.random()* 256);
    var random_bg_g = Math.floor(Math.random()* 256);
    var random_bg_b = Math.floor(Math.random()* 256);

    $(this).css({
      "background" : "rgb("+random_bg_r+","+random_bg_g+","+random_bg_b+")"
    });
  });

  $(".controlcell, .erase").click(function(){
    pixelpainter.colors  = $(this).css("background-color");
  });

  $(".cell").click(function(){
    $(this).css("background-color", pixelpainter.colors);
  });

  $(".clear").click(function(){
    $(".cell").each(function(){
      $(this).css("background-color", "white");
    });
  });

  $(".erase").click(function(){
    $(this).css("background-color", "white");
  });

  $(".save").click(function(){
    var title = $("input[name='title']").val();
    var backgroundArray = [];
    $(".cell").each(function () {
      backgroundArray.push($(this).css("background-color"));
    });
    // console.log(backgroundArray);
    $.ajax({
      type: "POST",
      url: "/save",
      data: { 
        capturedGrid : backgroundArray,
        title : title
      }
    })
    .done (function () {
      alert('success!');
    })
  });

  $(".show").click(function () {
    window.location.href='/pictures';
  });
}); // end document.ready


// -----------------FUNCTIONS!!!-----------------

function PixelPainter (width, height){
  this.artboard = createGrid(width,height);
  this.controls = createControlGrid();
  this.colors;
  this.clearbutton = createClearButton();
  this.erasebutton = createEraseButton();
  this.erasecolor;
  this.savebutton = createSaveButton();
  this.allpictures = showAllPictures();
}

function createGrid (width, height) {
  if(height > 20) {
    alert('height cannot exceed 20');
    return;
  }
  if(width > 20) {
    alert('width cannot exceed 20');
    return;
  }
  var grid = $("<div>", { "class" : "grid" }); //create div class for grid
  var title = $("<input>", { type : "text", name : "title", placeholder : "title"});
  grid.append(title);
  for(var i = 0; i < width; i++){ //iterate width size
    var row = $("<div>", { "class" : "row" }); //create div class
    for (var j= 0; j < height; j++){ //iterate height size  
      var cell = $("<div>", { "class" : "cell" }); //create div class for cell
      row.append(cell); //append cell to row
    } 
   grid.append(row); // append row to grid
  }
  return grid;
}

function createControlGrid(){
  var grid = $("<div>", { "class" : "controlgrid" });
  for(var i = 0; i < 8; i++){ //iterate width size
    var row = $("<div>", { "class" : "controlrow" }); // create row div  
    for (var j= 0; j < 8; j++){ //iterate height size 
      var cell = $("<div>", { "class" : "controlcell" }); // create cell div
      row.append(cell); // append cell to row
    } 
   grid.append(row); // append row to grid
  }
  return grid;
}

function createClearButton (){
  var clear = $("<div>", { "class" : "clear"});
  clear.html("clear");
  return clear;
}

function createEraseButton () {
  var erase = $("<div>", { "class" : "erase"});
  erase.html("erase");
  return erase;
}

function createSaveButton () {
  var save = $("<div>", { "class" : "save"});
  save.html("save");
  return save;
}

function showAllPictures () {
  var showAll = $("<div>", { "class" : "show"});
  showAll.html("all pictures");
  return showAll;
}