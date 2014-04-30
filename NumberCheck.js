module.exports = function NumberCheck(currentCardNumber)
{
	if(currentCardNumber >= 17)
		console.log("stay");
	else if (currentCardNumber <= 16)
		console.log("hit");
}
