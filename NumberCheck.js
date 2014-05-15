// please comment at the top of each function what the function does
// define the parameters too
module.exports = function NumberCheck(currentCardNumber)
{
  // comment here why you're checking against 17; why is that important?
	if(currentCardNumber >= 17)
		console.log("stay");
	else if (currentCardNumber <= 16)
		console.log("hit");
}
