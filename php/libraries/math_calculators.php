<?php
	
	//// IN PROGRESS, WILL NOT COMPILE
	
	$unary_expressions = ["abs"];
	$binary_expressions = ["+","-","*","/","^","log"];
	$expressions = [
	    ["unary","abs","|"],
	    ["binary","arithmetic_addition","+"],
	    ["binary","arithmetic_subtraction","-"],
	    ["binary","arithmetic_multiplication","$\\times$"],
	    ["binary","arithmetic_decimal_division","$\\div$"],
	    ["binary","Math.pow","^"]
	];
	
	function arithmetic_subtraction($a,$b) {
		
		/*
			wrapper for performing subtraction
			
			parameters:
				a: term to be subtracted from
				b: term to be subtracted
				
			returns:
				difference between a and b (float or int depending on input type)
		*/
		
		if (!is_numeric($a) | !is_numeric($b)) {
			return "type error in arithmetic_subtraction";
		}
		
	    return $a - $b;
	}
	
	function arithmetic_addition($a,$b) {
		
		/*
			wrapper for performing addition
			
			parameters:
				a: term to be added to
				b: term to be added
				
			returns:
				sum of a and b (float or int depending on input type)
		*/
		
		if (!is_numeric($a) | !is_numeric($b)) {
			return "type error in arithmetic_addition";
		}
		
	    return $a + $b;
	}
	
	function arithmetic_multiplication($a,$b) {
		
		/*
			wrapper for performing multiplication
			
			parameters:
				a: first factor
				b: second factor
				
			returns:
				product of a and b (float or int depending on input type)
		*/
		
		if (!is_numeric($a) | !is_numeric($b)) {
			return "type error in arithmetic_multiplication";
		}
		
	    return $a * $b;
	}
	
	function arithmetic_division_with_remainder($a,$b) {
		
		/*
			wrapper for performing division with remainders
			
			parameters:
				a: numerator
				b: denominator
				
			returns:
				a divided by b remainder r (string)
		*/
		
		if (!is_integer($a) | !is_integer($b)) {
			return "type error in arithmetic_division_with_remainder";
		}
		
		if ($b == 0) {
			return "cannot divide by zero (in arithmetic_division_with_remainder)";
		}
		
	    $r = $a % $b;
	    $d = ($a - $r) / $b;
	    
	    return $d . ($r == 0 ? "" : ("r" . $r));
	}
	
	function arithmetic_division_decimal($a,$b) {
		
		/*
			wrapper for performing decimal division (with no remainders)
			
			parameters:
				a: numerator
				b: denominator
				
			returns:
				a divided by b (float or int depending on input type)
		*/
		
		if (!is_numeric($a) | !is_numeric($b)) {
			return "type error in arithmetic_division_decimal";
		}
		
		if ($b == 0) {
			return "cannot divide by zero (in arithmetic_division_decimal)";
		}
		
	    return $a / $b;
	}
	
	function arr_a_contains_element_b($a,$b) {
		
		/*
			to be deprecated and replaced with in_array() builtin function
		*/
		
	    foreach ($a as $i) {
	        if ($i == $b) {
	            return true;
	        }
	    }
	    return false;
	}
	
	
	
	
	/*
	function unique_array(arr) {
	    
	    var total = [];
	    for (var i in arr) {
	        if (!arr_a_contains_element_b(total,arr[i])) {
	            total.push(arr[i]);
	        }
	    }
	    
	    return total;
	}
	
	function get_complete_factor_array(n,prefer_non_trivial) {
	    
	    var total = [1,n];
	    for (var i=2; i<Math.ceil(Math.sqrt(n)); i++) {
	        
	        if (n % i == 0) {
	            total.push(i,n/i);
	        }
	    }
	    
	    if (prefer_non_trivial && total.length > 2) {
	        return total.filter(function(x) { return (x != 1 && x != n); });
	    } else {
	        return total;
	    }
	}
	
	function multiply_polynomial_coefficients(p1,p2) {
	    
	    var total = [];
	    for (var i=0; i<(p1.length + p2.length - 1); i++) {
	        total.push(0);
	    }
	    
	    if (p1.length > p2.length) {
	        longer = p1;
	        shorter = p2;
	    } else {
	        longer = p2;
	        shorter = p1;
	    }
	    
	    for (i=0; i<longer.length; i++) {
	        for (var j=0; j<shorter.length; j++) {
	            total[i+j] += longer[i] * shorter[j];
	        }
	    }
	    
	    return total;
	}
	
	function multiply_complex_numbers(c1,c2) {
	    
	    var r_1, r_2, i_1, i_2;
	    
	    r_1 = c1[0] * c2[0];
	    r_2 = c1[1] * c2[1] * -1;
	    
	    i_1 = c1[0] * c2[1];
	    i_2 = c1[1] * c2[0];
	    
	    return [r_1 + r_2, i_1 + i_2];
	}
	
	function prime_factorization(n,start) {
	    
	    if (start == undefined) start = [];
	    if (n == 1) return start;
	    if (n < 0 ) return (prime_factorization(Math.abs(n),[-1]));
	    
	    var i = 2;
	    while (i <= n) {
	        if (n % i == 0) {
	            start.push(i);
	            return prime_factorization(n/i,start);
	        }
	        i += 1;
	    }
	}
	
	function array_overlap(a1,a2) {
	    
	    var total = [];
	    
	    for (var i in a1) {
	        for (var j in a2) {
	            if (a1[i] == a2[j]) {
	                total.push(a2.splice(j,1)[0]);
	                break;
	            }
	        }
	    }
	    
	    return total;
	}
	
	function simplify_fraction(n_d_array) {
	    
	    n_pf = prime_factorization(n_d_array[0]);
	    d_pf = prime_factorization(n_d_array[1]);
	    var common_factors = array_overlap(n_pf,d_pf);
	    
	    for (i in common_factors) {
	        n_d_array[0] /= common_factors[i];
	        n_d_array[1] /= common_factors[i];
	    }
	    
	    if (n_d_array[1] < 0 && n_d_array[0] > 0) {
	        n_d_array[0] *= -1;
	        n_d_array[1] *= -1;
	    }
	    
	    return n_d_array;
	}
	
	function arrays_are_equal(a1,a2) {
	    
	    if (a1.length != a2.length) return false;
	    for (i in a1) {
	        if (a1[i] != a2[i]) {
	            return false;
	        }
	    }
	    
	    return true;
	}
	
	function add_fractions(f1,f2) {
	    
	    return simplify_fraction(
	        [f1[0] * f2[1] + f2[0] * f1[1],
	        f1[1] * f2[1]]
	    );
	}
	
	function subtract_fractions(f1,f2) {
	    
	    return simplify_fraction(
	        [f1[0]  * f2[1] - f2[0] * f1[1],
	        f1[1] * f2[1]]   
	    );
	}
	
	function multiply_fractions(f1,f2) {
	    return simplify_fraction(
	        [f1[0] * f2[0],
	        f1[1] * f2[1]]
	    );
	}
	
	function divide_fractions(f1,f2) {
	    return simplify_fraction(
	        [f1[0] * f2[1],
	        f1[1] * f2[0]]
	    );
	}
	
	function apply_quadratic_formula(a,b,c,precision) {
	    
	    if (a == undefined) a == 0;
	    if (b == undefined) b == 0;
	    if (c == undefined) c == 0;
	    if (precision == undefined) precision = 2;
	    
	    var discriminant = Math.pow(b,2) - (4 * a * c),
	        s1, s2;
	    
	    if (discriminant > 0) {
	    
	        s1 = Math.round(((b * -1 + Math.sqrt(discriminant)) / (2*a)) * Math.pow(10,precision)) / Math.pow(10,precision);
	        s2 = Math.round(((b * -1 - Math.sqrt(discriminant)) / (2*a)) * Math.pow(10,precision)) / Math.pow(10,precision);
	        return [s1,s2];
	        
	    } else if (discriminant == 0) {
	    
	        s1 = Math.round(((b * -1) / (2*a)) * Math.pow(10,precision)) / Math.pow(10,precision);
	        return [s1];
	    } else {
	        return [];
	    }
	}
	
	function simplify_radical(c,r) {
	    
	    var squares = extract_pairs(prime_factorization(r));
	    
	    for (var i=0; i<squares.length; i++) {
	        c *= squares[i];
	        r /= (squares[i] * squares[i]);
	    }
	    
	    return [c,r];
	}
	
	function extract_pairs(arr) {
	    
	    arr = sort_array(arr);
	    var total = [];
	    for (var i=1; i<arr.length; i++) {
	        
	        if (arr[i] == arr[i-1]) {
	            total.push(arr[i]);
	            i += 1;
	        }
	    }
	    
	    return total;
	}
	
	function sort_array(a) {
	    
	    var total = [a[0]], is_inserted;
	    
	    for (var i=1; i<a.length; i++) {
	        is_inserted = false;
	        for (var j=0; j<total.length; j++) {
	            if (a[i] <= total[j]) {
	                total.splice(j,0,a[i]);
	                is_inserted = true;
	                break;
	            }
	        }
	        if (!is_inserted) {
	            total.push(a[i]);
	        }
	    }
	    
	    return total;
	}
	
	function get_column_from_json_object(obj,col) {
	    var total = [];
	    for (i in obj) {
	        total.push(obj[i][col]);
	    }
	    return total;
	}
	
	function is_prime(n) {
	    
	    if (n<=1) return false;
	    if (n == 2 || n == 3 || n == 5 || n == 7) return true;
	    if (n < 11) return false;
	    for (var i=2; i<Math.floor(Math.ceil(n)); i++) {
	        if (n % i == 0) return false;
	    }
	    
	    return true;
	}
	
	function collapse_duplicates(a) {
	    
	    var total = {};
	    
	    for (var i=0; i<a.length; i++) {
	        if (!total[a[i]]) total[a[i]] = 0;
	        total[a[i]] += 1;
	    }
	    
	    return total;
	}
	
	function differentiate_polynomial(coefficient_array) {
	    
	    var i,e,l=coefficient_array.length;
	    
	    for (var i=0; i<l; i++) {
	        coefficient_array[i] *= l-i-1;
	    }
	    
	    coefficient_array.pop();
	    return coefficient_array;
	}
	
	function multiply_radicals(r1,r2) {
	    
	    return simplify_radical(r1[0] * r2[0],r1[1] * r2[1]);
	}
	
	function add_radicals(r1,r2) {
	    
	    r1 = simplify_radical(r1[0],r1[1]);
	    r2 = simplify_radical(r2[0],r2[1]);
	    
	    if (r1[1] == r2[1]) {
	        return simplify_radical(r1[0] + r2[0],r1[1]);
	    } else {
	        return [r1,r2];
	    }
	}
	
	function multiply_radical_expression_by_conjugate(r1,r2) {
	
	    var t1 = multiply_radicals(r1,r1);
	    var t2 = multiply_radicals(r2,r2);
	    t2[0] *= -1;
	    
	    return t1[0] + t2[0];
	}
	
	function foil_radical_expressions(r_exp1,r_exp2) {
	
	    var t1 = r_exp1[0] * r_exp2[0];
	    var t2 = r_exp1[0] * r_exp2[1];
	    var t3 = r_exp1[1] * r_exp2[0];
	    var t4 = r_exp1[1] * r_exp2[1];
	    
	    var total = [t1,t2,t3,t4];
	    var removes = [];
	    
	    for (var i=0; i<total.length; i++) {
	        for (var j=i+1; j<total.length; j++) {
	            
	        }
	    }
	}
	
	function convert_to_base_10(n,current_base) {
	    
	    return parseInt(n,current_base);
	}
	
	function convert_from_base_10(n,intended_base) {
	    
	    return parseInt(n).toString(intended_base);
	}
	
	function convert_between_bases(n,current_base,intended_base) {
	    
	    n = convert_to_base_10(n,current_base);
	    n = convert_from_base_10(n,intended_base);
	    
	    return n;
	}
	
	function random_from_array(arr) {
	    
	    return arr[Math.floor(Math.random() * arr.length)];
	}
	
	function add_matrices(m1,m2) {
	
	    var total = [];
	
	    if (m1.length != m2.length || m1[0].length != m2[0].length) {
	        return false;
	    } else {
	        for (var i=0; i<m1.length; i++) {
	            total.push([]);
	            for (var j=0; j<m1[0].length; j++) {
	                total[i].push(m1[i][j] + m2[i][j]);
	            }
	        }
	    }
	    
	    return total;
	}
	
	function multiply_matrices(m1,m2) {
	    
	    var total = empty_matrix(m1.length,m2[0].length), this_col;
	    
	    if (m1[0].length != m2.length) {
	        return false;
	    } else {
	        for (var i=0; i<m1.length; i++) {
	            for (var j=0; j<m2[0].length; j++) {
	                this_col = [];
	                for (var k=0; k<m2.length; k++) {
	                    this_col.push(m2[k][j]);
	                }
	                total[i][j] = vector_product(m1[i],this_col);
	            }
	        }
	    }
	    
	    return total;
	}
	
	function empty_matrix(m,n) {
	    var total =[];
	    for (var i=0; i<m; i++) {
	        total.push([]);
	        for (var j=0; j<n; j++) {
	            total[i].push(0);
	        }
	    }
	    return total;
	}
	
	function vector_product(v1,v2) {
	    
	    if (v1.length != v2.length) return false;
	    
	    var t = 0;
	    for (var i=0; i<v1.length; i++) {
	        t += v1[i] * v2[i];
	    }
	    
	    return t;
	}
	
	function matrix_is_square(m) {
	    return m.length == m[0].length;
	}
	
	function matrix_determinant(m) {
	    
	    if (!matrix_is_square(m)) return false;
	    
	    var d = 0;
	    
	    for (var i=0; i<m.length; i++) {
	        d += matrix_diagonal_product(m,i,1);
	    }
	    
	    for (var i=0; i<m.length; i++) {
	        d -= matrix_diagonal_product(m,i,-1);
	    }
	    
	    return d;
	}
	
	function matrix_diagonal_product(m,s,d) {
	    // d = 1 for forward diagonal; d = -1 for backward diagonal
	    if (!matrix_is_square(m)) return false;
	    
	    var p = 1;
	    
	    if (d == 1) {
	        for (var i=0; i<m.length; i++) {
	            p *= m[i][i+s >= m.length ? i+s-m.length : i+s];
	        }
	    } else if (d == -1) {
	        for (var i=0; i<m.length; i++) {
	            p *= m[i][s-i < 0 ? s-i+m.length : s-i];
	        }
	    } else {
	        return false;
	    }
	    
	    return p;
	}
	
	function random_expression() {
	    
	    var e = random_from_array(expressions);
	    
	    var terms = [random_constant(-20,20)];
	    if (e[0] == "binary") terms.push(e[2] == "^" ?
	        random_constant(-3,3) :
	        e[2] == "+" || e[2] == "-" ? random_constant(0,20) :
	        random_constant(-20,20));
	    
	    var data_load = {terms:terms,expression:e};
	    console.log(data_load);
	    return {terms:terms,expression:e,solution:evaluate_expression(data_load),latex:texify_expression(data_load)};
	}
	
	function evaluate_expression(e) {
	    
	    return (e.expression[0] == "binary" ?
	        e.expression[1](e.terms[0],e.terms[1]) :
	        e.expression[1](e.terms[0]));
	    
	}
	
	function texify_expression(e) {
	    
	    switch (e.expression[2]) {
	        case "|":
	            return e.expression[2] + e.terms[0] + e.expression[2];
	            break;
	        case "+":
	        case "-":
	        case "$\\times$":
	            return e.terms[0] + " " + e.expression[2] + " " + e.terms[1];
	            break;
	        case "^":
	            return e.terms[0] + e.expression[2] + e.terms[1];
	            break;
	        case "$\\div$":
	            return latex_fraction(e.terms[0],e.terms[1]);
	            break;
	        default:
	            return false;
	            break;
	    }
	}
	
	function circle_center_coordinates(max_x,r,should_round) {
	    
	    var available_width = max_x - r,
	        rx = Math.round(Math.random()*4)/4 * 2 - 1,
	        ry = Math.round(Math.random()*4)/4 * 2 - 1,
	        cx = rx * available_width,
	        cy = ry * available_width;
	        
	    return [should_round ? Math.trunc(cx) : cx, should_round ? Math.trunc(cy) : cy];
	}
	
	function point_on_circle(cx,cy,r,t_degrees) {
	    
	    t_radians = (t_degrees / 360) * (Math.PI * 2);
	    return [Math.cos(t_radians) * r + cx, Math.sin(t_radians) * r + cy];
	}
	
	function circle_diameter_endpoints(cx,cy,r,t_degrees) {
	    
	    var e1 = point_on_circle(cx,cy,r,t_degrees);
	    var e2 = point_on_circle(cx,cy,r,t_degrees + 180);
	    
	    return [e1,e2];
	}
	
	*/

	
	
	
	
?>