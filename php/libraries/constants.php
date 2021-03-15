<?php
	//// IN PROGRESS, WILL NOT COMPILE
	
	$system_of_equations_available_variables = ["x","y","z","l","m","n","o","p"];
	$alpha_string = "abcdefghijklmnopqrstuvwxyz";
	$alphabet = split("", $alpha_string);
	$alphabet_caps = split("", strtoupper($alpha_string));
	
	
	//$alphabet = alpha_string.split("");
	//var alphabet_caps = alpha_string.toUpperCase().split("");
	//var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	//var alphabet_caps = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	
	$word_problem_people = [
	        ["name":"Toby",referential_pronoun:"him",verb_pronoun:"he",possessive_pronoun:"his"],
	        ["name":"Meghan",referential_pronoun:"her",verb_pronoun:"she",possessive_pronoun:"hers"],
	        
	        ["name":"Casey",referential_pronoun:"him",verb_pronoun:"he",possessive_pronoun:"his"],
	        [name:"Erin",referential_pronoun:"her",verb_pronoun:"she",possessive_pronoun:"hers"],
	        
	        [name:"Ray",referential_pronoun:"him",verb_pronoun:"he",possessive_pronoun:"his"],
	        [name:"Beth",referential_pronoun:"her",verb_pronoun:"she",possessive_pronoun:"hers"],
	        
	        [name:"Charlie",referential_pronoun:"him",verb_pronoun:"he",possessive_pronoun:"his"],
	        [name:"Leann",referential_pronoun:"her",verb_pronoun:"she",possessive_pronoun:"hers"],
	        
	        [name:"Brandon",referential_pronoun:"him",verb_pronoun:"he",possessive_pronoun:"his"],
	        [name:"Roslyn",referential_pronoun:"her",verb_pronoun:"she",possessive_pronoun:"hers"],
	        
	        [name:"Ash",referential_pronoun:"them",verb_pronoun:"they",possessive_pronoun:"their"],
	        [name:"Corey",referential_pronoun:"them",verb_pronoun:"they",possessive_pronoun:"their"],
	        
	        [name:"Devin",referential_pronoun:"them",verb_pronoun:"they",possessive_pronoun:"their"],
	        [name:"Emerson",referential_pronoun:"them",verb_pronoun:"they",possessive_pronoun:"their"],
	        
	        [name:"Harper",referential_pronoun:"them",verb_pronoun:"they",possessive_pronoun:"their"],
	        [name:"Pat",referential_pronoun:"them",verb_pronoun:"they",possessive_pronoun:"their"]
	];
	
	var shape_name_map = {
	    3:"triangle",
	    4:"square",
	    5:"pentagon",
	    6:"hexagon"
	}
	
	var latex_colors = [
	    "red","blue","green"
	];
	
	var word_problem_discrete_variables = [
	    {singular:"apple",plural:"apples"},
	    {singular:"orange",plural:"oranges"},
	    {singular:"puppy",plural:"puppies"},
	    {singular:"kitten",plural:"kittens"},
	    {singular:"zebra",plural:"zebras"},
	    {singular:"strawberry",plural:"strawberries"},
	    {singular:"hamburger",plural:"hamburgers"},
	    {singular:"french fry",plural:"french fries"},
	    {singular:"chicken nugget",plural:"chicken nuggets"},
	    {singular:"book",plural:"books"},
	    {singular:"hammer",plural:"hammers"},
	    {singular:"dollar",plural:"dollars"},
	    {singular:"cookie",plural:"cookies"},
	    {singular:"bunny",plural:"bunnies"}
	    ];
	    
	var word_problem_continuous_variables = [
	    {singular:"cup of water",plural:"cups of water"},
	    {singular:"gallon of gas",plural:"gallons of gas"}
	    ];
	    
	var word_problem_containers = {
	    discrete:[
	        {singular:"case",plural:"cases"},
	        {singular:"truck",plural:"trucks"},
	        {singular:"crate",plural:"crates"},
	        {singular:"box",plural:"boxes"}
	    ],
	    continuous:[
	        {singular:"glass",plural:"glasses"},
	        {singular:"cup",plural:"cups"}
	    ]
	}
	
	function random_constant(floor,ceiling) {
	    
	    var base_number = Math.random() * (ceiling - floor) + floor;
	    
	    if (control_flow.data_type == "integer") {
	        base_number = Math.round(base_number);
	        if (control_flow.allow_zero == "false") {
	            while (base_number == 0) {
	                base_number = Math.round(Math.random() * (ceiling - floor) + floor);
	            }
	        }
	        
	    } else if (control_flow.data_type == "decimal") {
	        var power = control_flow.range.digits_before_decimal + control_flow.range.digits_after_decimal;
	        var base_number = Math.random() * Math.pow(10, power);
	            base_number = Math.round(base_number);
	            base_number = base_number / Math.pow(10, control_flow.range.digits_after_decimal);
	    }
	    
	    return base_number;
	}
	
	function random_constant_custom_base(b) {
	    
	    return Math.round(Math.random() * Math.pow(b,4)).toString(b);
	}
	
	function division_problem_constants(min_multiple, max_multiple, min_factor, max_factor, allow_remainder) {
	    
	    var factor = Math.floor(Math.random() * (max_factor - min_factor)) + min_factor;
	    
	    min_multiple_n = Math.ceil(min_multiple / factor) * factor;
	    max_multiple_n = Math.floor(max_multiple / factor) * factor ;
	    
	    var multiple = Math.floor(Math.random() * (max_multiple_n - min_multiple_n)) + min_multiple_n;
	    
	    if (!allow_remainder) {
	        multiple = Math.floor(multiple / factor) * factor;
	        if (multiple < min_multiple) {
	            multiple += factor;
	        }
	    }
	    
	    return {multiple:multiple,factor:factor};
	}
	
	function arithmetic_problem_constants(challenge) {
	    
	    if (challenge == undefined) challenge = false;
	    var max = challenge ? control_flow.range.max * 5 : control_flow.range.max,
	        min = control_flow.range.min,
	        range = max - min;
	    
	    var max_digits = Math.ceil(Math.log10(max + 1));
	    var top_number = control_flow.allow_zero == "true" ?
	        Math.floor(Math.random() * (range + 1) + min) :
	        Math.ceil(Math.random() * range + min);
	    
	    if (control_flow.force_factors == "true") {
	        var options = get_complete_factor_array(top_number,true);
	        var bottom_number = options[Math.floor(Math.random() * options.length)];
	    } else {
	        var bottom_number = control_flow.allow_zero == "true" ?
	            Math.floor(Math.random() * (range + 1) + min) :
	            Math.ceil(Math.random() * range + min);
	    }
	    
	    if (control_flow.force_top_heavy == "true") {
	        if (top_number < bottom_number) {
	            var holder = bottom_number;
	            bottom_number = top_number;
	            top_number = holder;
	        }
	    }
	    
	    
	    return {max_digits:max_digits,top_number:top_number,bottom_number:bottom_number}
	}
	
	function system_of_equations_constants(is_unsolvable) {
	    
	    var max_actual_abs_value = 10;
	    var max_coef_abs_value = 10;
	    
	    var actual_values = {};
	      
	    for (var i=0; i<control_flow.num_terms; i++) {
	        
	        var this_value = (Math.random() - 0.5) * max_actual_abs_value * 2;
	        if (control_flow.data_type == "integer") this_value = Math.round(this_value);
	        actual_values[system_of_equations_available_variables[i]] = this_value;
	    }
	      
	    var coefficient_set = {};
	      
	    for (var i=0; i<(is_unsolvable ? control_flow.num_terms - 1 : control_flow.num_terms); i++) {
	        
	        coefficient_set["equation_"+i] = {terms:{},equals:0};
	        for (var j=0; j<control_flow.num_terms; j++) {
	            
	            var this_coefficient = Math.floor((Math.random() - 0.5) * max_coef_abs_value * 2);
	            
	            if (control_flow.allow_zero == "false" && this_coefficient == 0) this_coefficient = 1;
	            
	            coefficient_set["equation_"+i].terms[system_of_equations_available_variables[j]] = this_coefficient;
	            var this_total = this_coefficient * actual_values[system_of_equations_available_variables[j]];
	            coefficient_set["equation_"+i].equals += this_total;
	        }
	    }
	    
	    if (is_unsolvable) {
	        var equation_to_image = Math.floor(Math.random() * (control_flow.num_terms - 1));
	        equation_to_image = coefficient_set["equation_"+equation_to_image];
	        
	        coefficient_set["equation_"+(control_flow.num_terms-1)] = {terms:{},equals:0};
	        
	        var this_multiple = Math.floor((Math.random() - 0.5) * max_coef_abs_value);
	        if (this_multiple == 1 || this_multiple == 0) this_multiple = 2;
	        
	        for (var i=0; i<control_flow.num_terms; i++) {
	            var this_term = equation_to_image.terms[system_of_equations_available_variables[i]] * this_multiple;
	            coefficient_set["equation_"+(control_flow.num_terms - 1)].terms[system_of_equations_available_variables[i]] = this_term;
	            coefficient_set["equation_"+(control_flow.num_terms-1)].equals += this_term;
	        }
	    }
	    
	    return {actual_values:actual_values,coefficient_set:coefficient_set};
	}
	
	function function_composition_problem() {
	    
	}
	
	function ratios_problem_constants_simple() {
	    // zero is never allowed for these as it makes them either trivial or undefined
	    
	    var num_1, num_2,
	        den_1, den_2,
	        multiple,
	        max_value = Math.round(Math.sqrt(control_flow.range.max)),
	        ratio_1, ratio_2;
	    
	    num_1 = Math.round(Math.random() * max_value);
	    while (num_1 == 0) {
	        num_1 = Math.round(Math.random() * max_value);
	    }
	    
	    den_1 = Math.round(Math.random() * max_value);
	    while (den_1 == num_1 || den_1 == 0) {
	        den_1 = Math.round(Math.random() * max_value);
	    }
	    
	    multiple = Math.round(Math.random() * max_value);
	    while (multiple == 0 || multiple == 1) {
	        multiple = Math.round(Math.random() * max_value);
	    }
	    
	    num_2 = num_1 * multiple;
	    den_2 = den_1 * multiple;
	    
	    if (Math.random() < 0.5) {
	        ratio_1 = [num_1,den_1];
	        ratio_2 = [num_2,den_2];
	    } else {
	        ratio_2 = [num_1,den_1];
	        ratio_1 = [num_2,den_2];
	    }
	    
	    return {ratio_1:ratio_1,ratio_2:ratio_2};
	}
	
	function ratios_problem_constants_compound() {
	    
	    var r1 = random_constant(control_flow.range.min,control_flow.range.max),
	        r2 = random_constant(control_flow.range.min,control_flow.range.max);
	    while (r2 == r1) {
	        r2 = random_constant(control_flow.range.min,control_flow.range.max)
	    }
	    r3 = random_constant(control_flow.range.min,control_flow.range.max);
	    while (r3 == r2 || r3 == r1) {
	        r3 = random_constant(control_flow.range.min,control_flow.range.max)
	    }
	    
	    return [r1,r2,r3];
	}
	
	function polynomial_coefficients(degree) {
	    
	    var total = [];
	    for (var i=0; i<degree+1; i++) {
	        total.push(random_constant(-10,10));
	    }
	    
	    if (control_flow.leading_coefficient_is_one == "true") {
	        total[0] = 1;
	    }
	    
	    return total;
	}
	
	function complex_number(min,max) {
	    
	    var total = [];
	    
	    total.push(random_constant(min,max),random_constant(min,max));
	    
	    return total;
	}
	
	function base_and_exponent() {
	    
	    var base = random_constant(2,9);
	    var pow  = random_constant(1,10);
	    
	    return [base,pow];
	}
	
	function coefficient_and_radical() {
	    
	    var coefficient = random_constant(1,9),
	        radical = random_constant(0,300);
	    while (prime_factorization(radical).length <= 2) {
	        radical = random_constant(0,300);
	    }
	    
	    return [coefficient,radical];
	}
	
	function constant_matrix(m,n) {
	    
	    var total = [];
	    
	    for (i=0; i<m; i++) {
	        total.push([]);
	        for (j=0; j<n; j++) {
	            total[i].push(random_constant(-20,20));
	        }
	    }
	    
	    return total;
	}
	
	
	
	
	



	
	
?>