<?php
	
	include_once("../libraries/test_functions.php");
	include_once("../libraries/math_calculators.php");	
	
	assert(arithmetic_subtraction(5,3) == 2);
	assert(arithmetic_subtraction(-3,1) == -4);
	assert(arithmetic_subtraction(0,0) == 0);
	assert(round(arithmetic_subtraction(4.5,3.2) - 1.3,5) == 0);
	assert(arithmetic_subtraction("a",2) == "type error in arithmetic_subtraction");
	assert(arithmetic_subtraction(null,2) == "type error in arithmetic_subtraction");
	
	assert(arithmetic_addition(5,3) == 8);
	assert(arithmetic_addition(-3,1) == -2);
	assert(arithmetic_addition(0,0) == 0);
	assert(round(arithmetic_addition(4.5,3.2) - 7.7,5) == 0);
	assert(arithmetic_addition("a",2) == "type error in arithmetic_addition");
	assert(arithmetic_addition(null,2) == "type error in arithmetic_addition");
	
	assert(arithmetic_multiplication(5,3) == 15);
	assert(arithmetic_multiplication(-3,1) == -3);
	assert(arithmetic_multiplication(0,0) == 0);
	assert(round(arithmetic_multiplication(4.5,3.2) - 14.4,5) == 0);
	assert(arithmetic_multiplication("a",2) == "type error in arithmetic_multiplication");
	assert(arithmetic_multiplication(null,2) == "type error in arithmetic_multiplication");
	
	assert(arithmetic_division_with_remainder(5,3) == "1r2");
	assert(arithmetic_division_with_remainder(13,2) == "6r1");
	assert(arithmetic_division_with_remainder(14,2) == "7");
	assert(arithmetic_division_with_remainder(-3,1) == -3);
	assert(arithmetic_division_with_remainder(0,0) == "cannot divide by zero (in arithmetic_division_with_remainder)");
	assert(arithmetic_division_with_remainder("a",2) == "type error in arithmetic_division_with_remainder");
	assert(arithmetic_division_with_remainder(null,2) == "type error in arithmetic_division_with_remainder");
	assert(arithmetic_division_with_remainder(4.5,3.2) == "type error in arithmetic_division_with_remainder");
	
	assert(arithmetic_division_decimal(6,3) == 2);
	assert(arithmetic_division_decimal(13,2) == 6.5);
	assert(arithmetic_division_decimal(14,2) == 7);
	assert(arithmetic_division_decimal(-3,1) == -3);
	assert(arithmetic_division_decimal(0,0) == "cannot divide by zero (in arithmetic_division_decimal)");
	assert(arithmetic_division_decimal("a",2) == "type error in arithmetic_division_decimal");
	assert(arithmetic_division_decimal(null,2) == "type error in arithmetic_division_decimal");
	assert(round(arithmetic_division_decimal(4.5,1.5),5) == 3);
	
	assert(implode(",",get_complete_factor_array(12,false)) == "1,2,3,4,6,12");
	assert(implode(",",get_complete_factor_array(12,true)) == "2,3,4,6");
	assert(implode(",",get_complete_factor_array(1,true)) == "1");
	assert(implode(",",get_complete_factor_array(0,true)) == "");
	assert(implode(",",get_complete_factor_array(-10,false,false)) == "-10,-5,-2,-1,1,2,5,10");
	
	assert(implode(",",multiply_polynomial_coefficients([1,1],[1,1])) == "1,2,1");
	assert(implode(",",multiply_polynomial_coefficients([1,1,1],[1,1,1])) == "1,2,3,2,1");
	assert(implode(",",multiply_polynomial_coefficients([1,2],[1,2])) == "1,4,4");
	assert(implode(",",multiply_polynomial_coefficients([0,2],[1,2])) == "2,4");
	assert(implode(",",multiply_polynomial_coefficients([1,2],[1,0])) == "1,2,0");
	assert(multiply_polynomial_coefficients(["a",1],[1,1]) == "type error in multiply_polynomial_coefficients");
	assert(multiply_polynomial_coefficients([1,1],[1,"a"]) == "type error in multiply_polynomial_coefficients");
	
	assert(implode(",",multiply_complex_numbers([1,1],[1,1])) == "0,2");
	assert(implode(",",multiply_complex_numbers([2,3],[4,5])) == "-7,22");
	assert(implode(",",multiply_complex_numbers([5,-2],[-2,5])) == "0,29");
	assert(implode(",",multiply_complex_numbers([0,0],[0,0])) == "0,0");
	assert(implode(",",multiply_complex_numbers([4.5,1.5],[2.5,9.75])) == "-3.375,47.625");
	assert(multiply_complex_numbers(["a",1.5],[2.5,9.75]) == "type error in multiply_complex_numbers");
	assert(multiply_complex_numbers([4.5,1.5],[2.5,""]) == "type error in multiply_complex_numbers");
	assert(multiply_complex_numbers([1.5],[2.5,""]) == "input length error in multiply_complex_numbers");
	assert(multiply_complex_numbers([4.5,1.5],[]) == "input length error in multiply_complex_numbers");
	assert(multiply_complex_numbers([4.5,1.5,3.5],[2.5,""]) == "input length error in multiply_complex_numbers");
	
	assert(implode(",",prime_factorization(5)) == "5");
	assert(implode(",",prime_factorization(12)) == "2,2,3");
	assert(implode(",",prime_factorization(120)) == "2,2,2,3,5");
	assert(implode(",",prime_factorization(256)) == "2,2,2,2,2,2,2,2");
	assert(is_null(prime_factorization(0)));
	assert(implode(",",prime_factorization(1234567890)) == "2,3,3,5,3607,3803");
	assert(prime_factorization("x") == "type error in prime_factorization");
		
	assert(implode(",",array_overlap([],[])) == "");
	assert(implode(",",array_overlap([],[0])) == "");
	assert(implode(",",array_overlap([0],[])) == "");
	assert(implode(",",array_overlap([1,2,3],[4,5,6])) == "");
	assert(implode(",",array_overlap([1,2,3],[3,4,5])) == "3");
	assert(implode(",",array_overlap([1,2,3,3],[3,4,5])) == "3");
	assert(implode(",",array_overlap([1,2,3],[3,3,4,5])) == "3");
	assert(implode(",",array_overlap([1,2,3,3],[3,3,4,5])) == "3,3");
	assert(implode(",",array_overlap([1,2,3,3],[1,2,3,3])) == "1,2,3,3");
	assert(implode(",",array_overlap([1,2,3,"a"],[1,2,3,"b"])) == "1,2,3");
	assert(implode(",",array_overlap([1,2,3,"a"],[1,2,3,"a"])) == "1,2,3,a");
	
	assert(simplify_fraction([]) == "input length error in simplify_fraction");
	assert(simplify_fraction([1]) == "input length error in simplify_fraction");
	assert(simplify_fraction([1,2,3]) == "input length error in simplify_fraction");
	assert(implode(",",simplify_fraction([1,2])) == "1,2");
	assert(implode(",",simplify_fraction([4,2])) == "2,1");
	assert(implode(",",simplify_fraction([2,12])) == "1,6");
	assert(implode(",",simplify_fraction([3803,1234567890])) == "1,324630");



	echo "unit tests complete";

?>









