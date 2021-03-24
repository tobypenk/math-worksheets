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
	
	
	
	
	
	
	

	assert((new Fraction(1,2))->simplify()->stringify() == "1/2");
	assert((new Fraction(3,6))->simplify()->stringify() == "1/2");
	assert((new Fraction(4,2))->simplify()->stringify() == "2/1");
	assert((new Fraction(2,12))->simplify()->stringify() == "1/6");
	assert((new Fraction(3803,1234567890))->simplify()->stringify() == "1/324630");
	assert((new Fraction(-3803,1234567890))->simplify()->stringify() == "-1/324630");
	
	assert((new Fraction(1,2))->add(new Fraction(1,2))->stringify() == "1/1");
	assert((new Fraction(2,3))->add(new Fraction(3,4))->stringify() == "17/12");
	assert((new Fraction(1,6))->add(new Fraction(1,3))->stringify() == "1/2");
	assert((new Fraction(1,6))->add(new Fraction(-1,3))->stringify() == "-1/6");
	assert((new Fraction(6,7))->add(new Fraction(10,11))->stringify() == "136/77");
	assert((new Fraction(123,456))->add(new Fraction(321,654))->stringify() == "12601/16568");
	
	assert((new Fraction(1,2))->subtract(new Fraction(1,2))->stringify() == "0/4");
	assert((new Fraction(1,2))->subtract(new Fraction(1,3))->stringify() == "1/6");
	assert((new Fraction(1,2))->subtract(new Fraction(-1,3))->stringify() == "5/6");
	assert((new Fraction(321,654))->subtract(new Fraction(123,456))->stringify() == "3663/16568");
	
	assert((new Fraction(1,2))->multiply(new Fraction(1,2))->stringify() == "1/4");
	assert((new Fraction(1,2))->multiply(new Fraction(1,3))->stringify() == "1/6");
	assert((new Fraction(321,654))->multiply(new Fraction(123,456))->stringify() == "4387/33136");
	assert((new Fraction(321,654))->multiply(new Fraction(-123,456))->stringify() == "-4387/33136");
	
	assert((new Fraction(1,2))->divide(new Fraction(1,2))->stringify() == "1/1");
	assert((new Fraction(1,2))->divide(new Fraction(1,3))->stringify() == "3/2");
	assert((new Fraction(1,2))->divide(new Fraction(-1,3))->stringify() == "-3/2");
	assert((new Fraction(321,654))->divide(new Fraction(123,456))->stringify() == "8132/4469");

	
	
	
	/// TO DO: simplify_radical should accept non-integer arguments to the non-root coefficient
	assert((new Radical(10,2))->simplify()->stringify() == "10 root 2");
	assert((new Radical(2,50))->simplify()->stringify() == "10 root 2");
	assert((new Radical(1,1524155677489))->simplify()->stringify() == "1234567 root 1");
	assert((new Radical(2,3048311354978))->simplify()->stringify() == "2469134 root 2");
	
	assert((new Radical(1,1))->multiply(new Radical(1,1))->stringify() == "1 root 1");
	assert((new Radical(1,2))->multiply(new Radical(1,2))->stringify() == "2 root 1");
	assert((new Radical(1,15))->multiply(new Radical(1,21))->stringify() == "3 root 35");
	assert((new Radical(11,6))->multiply(new Radical(2,14))->stringify() == "44 root 21");
	assert(
		(new Radical(12,34))->multiply(new Radical(56,78))->stringify() 
		== 
		(new Radical(56,78))->multiply(new Radical(12,34))->stringify()
		
	);
	assert((new Radical(-1,1))->multiply(new Radical(1,1))->stringify() == "-1 root 1");
	
	assert((new Radical(1,1))->simplify()->add(new Radical(1,1))->stringify() == "2 root 1");
	assert((new Radical(1,1))->simplify()->add(new Radical(2,1))->stringify() == "3 root 1");
	assert((new Radical(1,5))->simplify()->add(new Radical(1,5))->stringify() == "2 root 5");
	assert((new Radical(2,50))->simplify()->add(new Radical(7,50))->stringify() == "45 root 2");
	assert((new Radical(-2,50))->simplify()->add(new Radical(7,50))->stringify() == "25 root 2");
	assert((new Radical(7,45))->simplify()->add(new Radical(3,125))->stringify() == "36 root 5");

	
	
	assert((new Radical(2,7))->simplify()->multiply_by_conjugate(new Radical(5,3)) == -47);
	assert((new Radical(1,1))->simplify()->multiply_by_conjugate(new Radical(1,1)) == 0);
	assert((new Radical(1,2))->simplify()->multiply_by_conjugate(new Radical(3,4)) == -34);
	assert((new Radical(3,5))->simplify()->multiply_by_conjugate(new Radical(7,11)) == -494);
	assert((new Radical(67,109))->simplify()->multiply_by_conjugate(new Radical(53,59)) == 323570);
	assert((new Radical(-5,121))->simplify()->multiply_by_conjugate(new Radical(3,12)) == 2917);







	
	
	
	
	

	assert(arrays_are_equal([],[]));
	assert(arrays_are_equal("a",[]) == "type error in arrays_are_equal");
	assert(arrays_are_equal([],0) == "type error in arrays_are_equal");
	assert(arrays_are_equal([1],[1]));
	assert(arrays_are_equal([1234567890,1,3,5,7,9],[1234567890,1,3,5,7,9]));
	assert(arrays_are_equal([1,"a",1.5],[1,"a",1.5]));
	assert(!arrays_are_equal([1,"a"],[1,"a",1.5]));
	assert(!arrays_are_equal([2],[3]));
	assert(!arrays_are_equal([2,3],[3,4]));
	
	assert(implode(",",apply_quadratic_formula(1,2,1)) == "-1");
	assert(implode(",",apply_quadratic_formula(1,0,-1)) == "1,-1");
	assert(implode(",",apply_quadratic_formula(5,1,10)) == "");
	assert(implode(",",apply_quadratic_formula(1/4,1,-1/3,4)) == "0.3094,-4.3094");
	assert(apply_quadratic_formula("a",1,10) == "type error in apply_quadratic_formula");
	
	assert(implode(",",sort_array([3,2,1])) == "1,2,3");
	assert(implode(",",sort_array([1])) == "1");
	assert(implode(",",sort_array([])) == "");
	assert(implode(",",sort_array([1000000,0.5,-1.3,-1000])) == "-1000,-1.3,0.5,1000000");
	assert(implode(",",sort_array(["b","a","z","y"])) == "a,b,y,z");
	assert(sort_array(0) == "type error in sort_array");
	assert(sort_array([0,"a"]) == "sort_array only accepts arrays that are either all numeric or all strings");
	
	assert(implode(",",extract_pairs([1,2,3])) == "");
	assert(implode(",",extract_pairs([1,1,2,3])) == "1");
	assert(implode(",",extract_pairs([1,1,1,2,3])) == "1");
	assert(implode(",",extract_pairs([1,1,1,1,2,3])) == "1,1");
	assert(implode(",",extract_pairs([1,1,2,2,3,3])) == "1,2,3");
	assert(extract_pairs(0) == "type error in extract_pairs");
	
	assert(is_prime(2));
	assert(is_prime(3));
	assert(is_prime(5));
	assert(is_prime(7));
	assert(is_prime(11));
	assert(is_prime(7877));
	assert(is_prime(140339));
	assert(!is_prime(0));
	assert(!is_prime(1));
	assert(!is_prime(4));
	assert(!is_prime(6));
	assert(!is_prime(10));
	assert(!is_prime(2048));
	assert(!is_prime(1000000000));
	assert(is_prime("a") == "type error in is_prime");
	
	assert(json_encode(collapse_duplicates([1,2,3])) == "{\"1\":1,\"2\":1,\"3\":1}");
	assert(json_encode(collapse_duplicates([1,1,1,2,2,3])) == "{\"1\":3,\"2\":2,\"3\":1}");
	assert(json_encode(collapse_duplicates([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])) == "{\"1\":16}");
	assert(json_encode(collapse_duplicates(["a","a",1,1,2.5])) == "{\"a\":2,\"1\":2,\"2.5\":1}");
	assert(json_encode(collapse_duplicates([])) == "[]");
	assert(collapse_duplicates(0) == "type error in collapse_duplicates");
	
	assert(implode(",",differentiate_polynomial([])) == "");
	assert(implode(",",differentiate_polynomial([1])) == "");
	assert(implode(",",differentiate_polynomial([1,2,2,1])) == "3,4,2");
	assert(implode(",",differentiate_polynomial([1,1,1,0,1,1])) == "5,4,3,0,1");
	assert(differentiate_polynomial([1,1,1,0,"a",1]) == "type error in parameters to differentiate_polynomial");
	assert(differentiate_polynomial(0) == "type error in differentiate_polynomial");
	
	assert(convert_to_base_10(1,2) == 1);
	assert(convert_to_base_10(10,2) == 2);
	assert(convert_to_base_10(11,2) == 3);
	assert(convert_to_base_10(100000000,2) == 256);
	assert(convert_to_base_10(10,6) == 6);
	assert(convert_to_base_10(100,6) == 36);
	assert(convert_to_base_10(1000,6) == 216);
	assert(convert_to_base_10("ff",16) == 255);
	assert(convert_to_base_10("c",13) == 12);
	assert(convert_to_base_10("cc",13) == 168);
	assert(convert_to_base_10(0,2) == 0);
	
	

	
	
	echo "unit tests complete";

?>









