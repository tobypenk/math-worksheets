<?php
	
	include_once("../libraries/test_functions.php");
	include_once("../libraries/math_calculators.php");	
	
	assert(arithmetic_subtraction(5,3) == 2);
	assert(arithmetic_subtraction(0,0) == 0);
	assert(round(arithmetic_subtraction(4.5,3.2) - 1.3,5) == 0);
	assert(arithmetic_subtraction("a",2) == "type error in arithmetic_subtraction");
	assert(arithmetic_subtraction(null,2) == "type error in arithmetic_subtraction");
	
?>