$(document).ready(function(){

$( ".box" ).draggable({
  axis: "y",
  containment: "parent",
  grid: [0, 15],
  opacity: 0.5
});
  console.log("In resizable");

$( ".box").resizable({
  grid: [0, 25],
  maxHeight: 400,
  maxWidth: 350,
  minHeight: 25,
  minWidth: 350,
  // handles: {
  //   's': '#sgrip'
  // }

});
// {
//   // addClasses: false
// }
});