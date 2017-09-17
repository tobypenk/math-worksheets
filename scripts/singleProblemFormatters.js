function system_of_equations_problem(n) {
    
    var num_tabular_cols = control_flow.num_terms * 2 + 1;
    var constants = system_of_equations_constants();
    var latex_string = tabular_column_formatting(num_tabular_cols) + n + ")" + latex_line_break(1);
    
    var this_line, this_term, this_coefficient;
    
    for (i in constants.coefficient_set) {
        this_line = [];
        
        for (j in constants.actual_values) {
            this_term = "";
            
            this_coefficient = constants.coefficient_set[i].terms[j];
            
            if (this_coefficient != 0) {
                if (j == "x") {
                    this_term = this_coefficient < 0 ? "-" : "";
                } else {
                    this_line.push(this_coefficient < 0 ? "-" : "+");
                }
                
                this_term += Math.abs(this_coefficient) == 1 ? "" : Math.abs(this_coefficient);
                
                this_line.push(this_term + j);
            } else {
                this_line.push(" ");
                if (j != "x") {
                    this_line.push(" ");
                }
            }
            
            
        }
        
        this_line.push("=",constants.coefficient_set[i].equals);
        
        latex_string += this_line.join(" & ") + latex_line_break();
    }
    
    var answer_string = latex_string + latex_hline() + latex_line_break();
    
    var answers = [];
    for (var i in constants.actual_values) {
        answers.push(i+"="+constants.actual_values[i]," ");
    }
    answer_string += answers.join(" & ");
    
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(Math.min(8,num_tabular_cols-1));
    answer_string += latex_line_break(Math.min(5,num_tabular_cols-3));
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function polynomial_long_division_problem(n) {

    var p1_degree = control_flow.range.p1_degree,
        p2_degree = control_flow.range.p2_degree;
    
    var p1 = polynomial_coefficients(p1_degree),
        p2 = polynomial_coefficients(p2_degree),
        product = multiply_polynomial_coefficients(p1,p2);
        
    var num_tabular_cols = p1_degree * 2 + product.length * 2 + 1;
    
    var latex_string = answer_string = tabular_column_formatting(num_tabular_cols) + n +") ~~& ";
    
    var leading_answer_space = [];
    for (var i=0; i<p1_degree * 2 + (p1_degree - 1) * 2 + 4; i++) {
        leading_answer_space.push(" ");
    }
    
    answer_string += leading_answer_space.join(" & ") + tabular_polynomial(p2) + latex_line_break();
    latex_string += empty_tabular_row(num_tabular_cols);
    
    answer_string += latex_hline();
    latex_string += latex_hline();
    
    var formatted_latex = tabular_polynomial(p1) +
        " & \\$|\\$ & " +
        tabular_polynomial(product) + 
        "";
        
    latex_string += formatted_latex;
    answer_string += formatted_latex;

    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(5);
    answer_string += latex_line_break(5);
           
    return {problem_string:latex_string,answer_string:answer_string};
}

function tabular_polynomial(coefficient_array) {
    
    var str = [], coefficient, sign, first_term_instantiated = false, math_env = "\\$";
    for (var i=0; i<coefficient_array.length; i++) {
    
        coefficient = Math.abs(coefficient_array[i]) == 1 ? "" : Math.abs(coefficient_array[i]);
        sign = coefficient_array[i] < 0 ? "-" : "+";
        
        
        if (coefficient_array[i] == 0) {
            str.push(" "," ");
        } else {
            if (!first_term_instantiated) {
                str.push(math_env + coefficient + "x" +
                    ((coefficient_array.length - i - 1) == 1 ? "" : "^" + (coefficient_array.length - i - 1)) + math_env);
                first_term_instantiated = true;
            } else if (i == coefficient_array.length - 1) {
                str.push(sign,math_env + Math.abs(Math.abs(coefficient_array[i])) + math_env);
            } else {
                str.push(sign,math_env + coefficient + "x" +
                    ((coefficient_array.length - i - 1) == 1 ? "" : "^" + (coefficient_array.length - i - 1)) + math_env);
            };
        }
    }
    
    return str.join(" & ");
}

function string_polynomial(coefficient_array,v,math_env) {
    
    if (v == undefined) v = "x";
    if (math_env == undefined) math_env = "\\$";
    
    var str = [], coefficient, sign, first_term_instantiated = false, l=coefficient_array.length;
    for (var i=0; i<l; i++) {
    
        coefficient = Math.abs(coefficient_array[i]) == 1 ? (l == 1 || i == l - 1 ? "1" : "") : Math.abs(coefficient_array[i]);
        sign = coefficient_array[i] < 0 ? "-" : "+";
        
        if (coefficient_array[i] == 0) {
            str.push(" "," ");
        } else if (l - i - 1 == 0) {
            if (!first_term_instantiated) {
                str.push(coefficient);
            } else {
                str.push(sign,coefficient);
            }
            
        } else {
            if (!first_term_instantiated) {
                str.push(math_env + coefficient + v +
                    ((l - i - 1) == 1 ? "" : ("^" + (l - i - 1))) + 
                    math_env);
                first_term_instantiated = true;
            } else if (i == l - 1) {
                str.push(sign, Math.abs(Math.abs(coefficient_array[i])));
            } else {
                str.push(sign, math_env + coefficient +
                    v + ((l - i - 1) == 1 ? " " : ("^" + (l - i - 1))) +
                    math_env);
            };
        }
    }
    
    return str.join(" ");
}

function reverse_foil_problem(n) {
    
    var p_degree = 2,
        t_1 = polynomial_coefficients(1),
        t_2 = polynomial_coefficients(1),
        product = multiply_polynomial_coefficients(t_1,t_2),
        problem_string = answer_string = tabular_column_formatting(1) + n + ") ~~";
        
    problem_string += string_polynomial(product) + latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    answer_string += "(" + string_polynomial(t_1) + ")(" + string_polynomial(t_2) + ")"
         + latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    
    problem_string += end_tabular() + latex_line_break(1);
    answer_string += end_tabular() + latex_line_break(1);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function foil_problem(n) {
    
    var p_degree = 2,
        t_1 = polynomial_coefficients(1),
        t_2 = polynomial_coefficients(1),
        product = multiply_polynomial_coefficients(t_1,t_2),
        problem_string = answer_string = tabular_column_formatting(1) + n + ") ~~";
        
    problem_string += string_polynomial(product) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(2);
    
    answer_string += "(" + string_polynomial(t_1) + ")(" + string_polynomial(t_2) + ")" +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(2);
    
    problem_string += end_tabular();
    answer_string += end_tabular();
    
    return {problem_string:answer_string,answer_string:problem_string};
}

function arithmetic_long_division_problem() {

    var operator = operations[control_flow.operation];
    var constants = arithmetic_problem_constants();
    
    var latex_string = tabular_column_formatting(3);
    
    var answer_string = latex_string + " & & " + operator.func(constants.top_number,constants.bottom_number);
    
    latex_string += " & & " + latex_line_break();
    answer_string += latex_line_break();
    
    var formatted_latex = constants.bottom_number + "& $|$ &" +
        "$\\mkern-6mu\\overline{\\kern.2ex"+constants.top_number+"}$";
        
    latex_string += formatted_latex;
    answer_string += formatted_latex;
    
    for (var i=0; i<constants.max_digits + 1; i++) {
        latex_string += empty_tabular_row(3);
        answer_string += empty_tabular_row(3);
    }

    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(constants.max_digits);
    answer_string += latex_line_break(constants.max_digits);
           
    return {problem_string:latex_string,answer_string:answer_string};
     
}

function wide_arithmetic_problem(n) {
    
    var operator = operations[control_flow.operation];
    var constants = arithmetic_problem_constants();
    
    var latex_string = tabular_column_formatting(6) + n + ") ~~& " + constants.top_number +
        " & " + operator.text + " & " +
        constants.bottom_number + " & = & " +
        latex_line_break(1) + empty_tabular_row(6) + latex_line_break(1);

    var answer_string = tabular_column_formatting(6) + n + ") ~~& " + constants.top_number +
        " & " + operator.text + " & " +
        constants.bottom_number + " & = & " +
        operator.func(constants.top_number,constants.bottom_number) +
        latex_line_break(1) + empty_tabular_row(6) + latex_line_break(1);
        
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(constants.max_digits);
    answer_string += latex_line_break(constants.max_digits);
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function wide_random_term_arithmetic_problem(n) {
    
    var operator = operations[control_flow.operation],
        constants = arithmetic_problem_constants(),
        r = Math.random(),
        solution = operator.func(constants.top_number,constants.bottom_number);
    
    var latex_string = tabular_column_formatting(6) +
        n + ") ~~&" +
        (r < 0.33 ? " ? " : constants.top_number) + " & " +
        operator.text + " & " +
        ((r < 0.66 && r >= 0.33) ? " ? " : constants.bottom_number) +
        " & = & " +
        (r >= 0.66 ? " ? " : solution);

    var answer_string = tabular_column_formatting(6) +
        n + ") ~~&" +
        (r < 0.33 ? latex_colored_text(control_flow.solution_color,constants.top_number) : constants.top_number) + " & " +
        operator.text + " & " +
        (r >= 0.33 && r < 0.66 ? latex_colored_text(control_flow.solution_color,constants.bottom_number) : constants.bottom_number) + " & = & " +
        (r >= 0.66 ? latex_colored_text(control_flow.solution_color,solution) : solution);
    
    latex_string += latex_line_break();
    answer_string += latex_line_break();
    for (var i=0; i<constants.max_digits + 1; i++) {
        latex_string += empty_tabular_row(6);
        answer_string += empty_tabular_row(6);
    }

    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(constants.max_digits+1);
    answer_string += latex_line_break(constants.max_digits+1);
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function tall_arithmetic_problem(n,challenge) {
    
    var operator = operations[control_flow.operation];
    var constants = arithmetic_problem_constants(challenge);
    
    var latex_string = tabular_column_formatting(constants.max_digits + 1) + n + ")& " + latex_line_break(1) +
        " &" + tabular_digit_string(constants.top_number,constants.max_digits) +
        latex_line_break() +
        operator.text + "&" +
        tabular_digit_string(constants.bottom_number,constants.max_digits) +
        latex_line_break() +
        latex_hline();
        
    var answer_string = latex_string +
        tabular_digit_string(operator.func(constants.top_number,
                                           constants.bottom_number),
                             constants.max_digits+1) +
        latex_line_break(1) + empty_tabular_row(constants.max_digits + 1);
        
    latex_string += tabular_digit_string(" ",constants.max_digits + 1) +
        latex_line_break(1) + empty_tabular_row(constants.max_digits + 1);
    
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(constants.max_digits);
    answer_string += latex_line_break(constants.max_digits)
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function tall_random_term_arithmetic_problem(n) {
    
    var operator = operations[control_flow.operation],
        constants = arithmetic_problem_constants(),
        r = Math.random(),
        solution = operator.func(constants.top_number,constants.bottom_number),
        t1 = tabular_digit_string(constants.top_number,constants.max_digits),
        t2 = tabular_digit_string(constants.bottom_number,constants.max_digits),
        t3 = tabular_digit_string(solution,constants.max_digits+1),
        latex_string = answer_string = tabular_column_formatting(constants.max_digits + 1);
    
    latex_string += n + ") &" + latex_line_break(1) +
        " & " + (r < 0.33 ? " ? " : t1) +
        latex_line_break() + operator.text + " & " +
        ((r >= 0.33 && r < 0.66) ? " ? " : t2) +
        latex_line_break() + latex_hline() +
        (r >= 0.66 ? " ? " : t3);
        
    answer_string += n + ") &" + latex_line_break(1) + " & " +
        t1 +
        latex_line_break() + operator.text + " & " +
        t2 +
        latex_line_break() + latex_hline() +
        t3;
        
    latex_string += latex_line_break(2);
    answer_string += latex_line_break(2);
    for (var i=0; i<constants.max_digits + 1; i++) {
        latex_string += empty_tabular_row(constants.max_digits + 2);
        answer_string += empty_tabular_row(constants.max_digits + 2);
    }
    
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(constants.max_digits);
    answer_string += latex_line_break(constants.max_digits)
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function addition_word_problem(n) {
    
    var constants = arithmetic_problem_constants(),
        problem_string = answer_string = "",//tabular_column_formatting(1),
        p1 = random_from_array(word_problem_people),
        p2 = random_from_array(word_problem_people),
        o = random_from_array(word_problem_discrete_variables);
        
    while (p2.referential_pronoun == p1.referential_pronoun) {
        p2 = random_from_array(word_problem_people);
    }
    
    problem_string += n + ") " + p1.name + " has " + constants.top_number + " " +
        (constants.top_number == 1 ? o.singular : o.plural) + ". If " + p1.verb_pronoun +
        " receives " + constants.bottom_number + " " + (constants.bottom_number == 1 ? o.singular : o.plural) +
        " from " + p2.name + ", then how many " + o.plural + " will " + p1.verb_pronoun + " have?" +
        latex_line_break(2);
    
    answer_string += n + ") " + p1.name + " will have " + (constants.top_number + constants.bottom_number) + " " + o.plural + "." + 
        latex_line_break(3);
    
    return {problem_string:problem_string,answer_string:answer_string}
}

function how_many_tens_problem(n) {
    
    var constant = random_constant(10,99),
        problem_string = answer_string = "",
        s = Math.floor(constant/10),
        container = random_from_array(word_problem_containers.discrete),
        p1 = random_from_array(word_problem_people),
        p2 = random_from_array(word_problem_people),
        o = random_from_array(word_problem_discrete_variables);
        
    while (p2.referential_pronoun == p1.referential_pronoun) {
        p2 = random_from_array(word_problem_people);
    }
    
    problem_string += n + ") " + p1.name + " has " + constant + " " + o.plural + ". If a " + container.singular +
        " holds 10 " + o.plural + ", then how many completely full " + container.plural + " can " + p1.verb_pronoun + " make?" +
        " How many will be left over?" +
        latex_line_break(1);
    
    answer_string += n + ") " + p1.name + " can make " + latex_colored_text(control_flow.solution_color,s) +
        " completely full " + container.plural + ", with " + (constant % 10) + " " +
        (constant % 10 == 1 ? container.singular : container.plural) + " left over." +
        latex_line_break(3);
    
    return {problem_string:problem_string,answer_string:answer_string}
}

function complete_the_tens_problem(n) {
    
    var constant = random_constant(10,89),
        problem_string = answer_string = "",
        container = random_from_array(word_problem_containers.discrete),
        container_goal = Math.ceil(constant/10),
        deficit = container_goal * 10 - constant,
        p1 = random_from_array(word_problem_people),
        p2 = random_from_array(word_problem_people),
        o = random_from_array(word_problem_discrete_variables);
        
    while (p2.referential_pronoun == p1.referential_pronoun) {
        p2 = random_from_array(word_problem_people);
    }
    
    problem_string += n + ") " + p1.name + " has " + constant + " " + o.plural + ". If a " + container.singular +
        " holds 10 " + o.plural + ", then how many more " + o.plural + " would " + p1.name +
        " need in order to make " + container_goal + " completely full " + container.plural + "?" +
        latex_line_break(1);
    
    answer_string += n + ") " + p1.name + " would need " + latex_colored_text(control_flow.solution_color,deficit) +
        " extra " + (deficit == 1 ? o.singular : o.plural) + "." +
        latex_line_break(3);
    
    return {problem_string:problem_string,answer_string:answer_string}
}

function take_away_tens_problem(n) {
    
    var constant = random_constant(10,99),
        problem_string = answer_string = "",
        s = constant % 10,
        container = random_from_array(word_problem_containers.discrete),
        p1 = random_from_array(word_problem_people),
        p2 = random_from_array(word_problem_people),
        o = random_from_array(word_problem_discrete_variables);
        
    while (p2.referential_pronoun == p1.referential_pronoun) {
        p2 = random_from_array(word_problem_people);
    }
    
    problem_string += n + ") " + p1.name + " has " + constant + " " + o.plural + ", and  a " + container.singular +
        " holds 10 " + o.plural + ". If " + p1.name + " fills " + container.plural + " until " + p1.verb_pronoun +
        " no longer has enough " + o.plural + " to make a completely full " + container.singular + ", then how many " +
        o.plural + " will " + p1.verb_pronoun + " have left over?" +
        latex_line_break(1);
    
    answer_string += n + ") " + p1.name + " will have " + latex_colored_text(control_flow.solution_color,s) + " " +
        (s == 1 ? o.singular : o.plural) + " left over." +
        latex_line_break(4);
    
    return {problem_string:problem_string,answer_string:answer_string}
}

function fill_in_comparison_problem(n) {
    
    var c1 = random_constant(10,99),
        c2 = random_constant(10,99);
    
    if (Math.random() <= 0.1) {
        c2 = c1;
    }
    
    var s = (c1 < c2 ? "$<$" : (c1 > c2 ? "$>$" : "="));
    
    var latex_string = tabular_column_formatting(4) + n + ") ~~&" + c1 + " &~ \\_\\_ ~~& " + c2 +
        latex_line_break(1) + empty_tabular_row(4) + latex_line_break(1);

    var answer_string = tabular_column_formatting(4) + n + ") ~~&" + c1 + " &~ " + latex_colored_text(control_flow.solution_color,s) + " ~~& " + c2 +
        latex_line_break(1) + empty_tabular_row(4) + latex_line_break(1);
        
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(2);
    answer_string += latex_line_break(2);
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function true_or_false_comparison_problem(n) {
    
    var c1 = random_constant(10,99),
        c2 = random_constant(10,99);
        
        if (Math.random() <= 0.1) {
            c2 = c1;
        }
        
    var s = (c1 < c2 ? "$<$" : (c1 > c2 ? "$>$" : "=")),
        proposal_is_true = Math.random() < 0.5,
        o = ["$<$","$>$","="],
        proposal = random_from_array(o);
        
        if (proposal_is_true) {
            proposal = s;
        } else {
            while (s == proposal) {
                proposal = random_from_array(o);
            }
        }
    
    var latex_string = tabular_column_formatting(4) + n + ") ~~&" + c1 + " & " + proposal + " & " + c2 +
        latex_line_break(1) + empty_tabular_row(4) + latex_line_break(1);

    var answer_string = " " + tabular_column_formatting(4) + n + ") ~~&" + " & " + (proposal_is_true ? " True " : " False ") + " & " +
        latex_line_break(1) + empty_tabular_row(4) + latex_line_break(1);
        
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(2);
    answer_string += latex_line_break(2);
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function addition_comparison_word_problem(n) {
    
    var constants = arithmetic_problem_constants(),
        c1 = Math.max(constants.top_number,constants.bottom_number),
        c2 = Math.min(constants.top_number,constants.bottom_number),
        diff = c1 - c2,
        problem_string = answer_string = "",
        p1 = random_from_array(word_problem_people),
        p2 = random_from_array(word_problem_people),
        o = random_from_array(word_problem_discrete_variables);
        
    while (p2.referential_pronoun == p1.referential_pronoun) {
        p2 = random_from_array(word_problem_people);
    }
    
    problem_string += n + ") " + p1.name + " has " + c1 + " " +
        (c1 == 1 ? o.singular : o.plural) + ". If " + p1.verb_pronoun +
        " has " + diff + " more " + (diff == 1 ? o.singular : o.plural) + " than " + p2.name +
        ", then how many " + o.plural + " does " + p2.name + " have?" +
        latex_line_break(2);
    
    answer_string += n + ") " + p2.name + " has " + c2 + " " + (c2 == 1 ? o.singular : o.plural) + "." + 
        latex_line_break(3);
    
    return {problem_string:problem_string,answer_string:answer_string}
}

function addition_associative_word_problem(n) {
    
    var c1 = random_constant(1,10),
        c2 = random_constant(1, 15 - c1),
        c3 = random_constant(1, 20 - c1 - c2),
        problem_string = answer_string = "",
        p1 = random_from_array(word_problem_people),
        p2 = random_from_array(word_problem_people),
        p3 = random_from_array(word_problem_people),
        o = random_from_array(word_problem_discrete_variables);
        
    while (p1.name == p2.name || p1.name == p3.name) {
        p1 = random_from_array(word_problem_people);
    }
    while (p2.name == p3.name || p2.name == p1.name) {
        p1 = random_from_array(word_problem_people);
    }
    while (p3.name == p1.name || p3.name == p1.name) {
        p1 = random_from_array(word_problem_people);
    }
    
    problem_string += n + ") If " + p1.name + " has " + c1 + " " + (c1 == 1 ? o.singular : o.plural) + ", " +
        p2.name + " has " + c2 + " " + (c2 == 1 ? o.singular : o.plural) + ", and " +
        p3.name + " has " + c3 + " " + (c3 == 1 ? o.singular : o.plural) + ", then how many " + o.plural +
        " do " + p2.name + " " + p3.name + " have together? How many " + o.plural + " do all three have together?" +
        latex_line_break(2);
    
    answer_string += n + ") " + p2.name + " and " + p3.name + " have " + latex_colored_text("green",c2+c3) + " " + o.plural +
        " together. All three have " + latex_colored_text("green",c1+c2+c3) + " " + o.plural + " together."+
        latex_line_break(3);
    
    return {problem_string:problem_string,answer_string:answer_string}
}

function addition_three_addend_wide_problem(n,challenge) {
    
    var min = 0,
        max = challenge ? 29 : 9,
        max_digits = 1,
        c1 = random_constant(min,max),
        c2 = random_constant(min,max),
        c3 = random_constant(min,Math.min(9,(challenge ? 60 : 20)-c1-c2)),
        problem_string = answer_string = "";
    
    var latex_string = tabular_column_formatting(8) + n + ") ~~&" + c1 + " & + & " + c2 + " & + & " + c3 + " & = & " +
        latex_line_break(1) + empty_tabular_row(8) + latex_line_break(1);

    var answer_string = tabular_column_formatting(8) + n + ") ~~&" + c1 + " & + & " + c2 + " & + & " + c3 + " & = & " +
        latex_colored_text("green",c1+c2+c3) +
        latex_line_break(1) + empty_tabular_row(8) + latex_line_break(1);
        
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(max_digits+1);
    answer_string += latex_line_break(max_digits+1);
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function addition_three_addend_random_term_wide_problem(n, challenge) {
    
    var min = 0,
        max = challenge ? 29 : 9,
        max_digits = challenge ? 2 : 1,
        c1 = random_constant(min,max),
        c2 = random_constant(min,max),
        c3 = random_constant(min,Math.min(9,(challenge ? 60 : 20)-c1-c2)),
        r = Math.random(),
        problem_string = answer_string = "";
    
    var latex_string = tabular_column_formatting(8) +
        n + ") ~~&" +
        (r < 0.25 ? " ? " : c1) + " & + & " +
        (r >= 0.25 && r < 0.5 ? " ? " : c2) + " & + & " +
        (r >= 0.5 && r < 0.75 ? " ? " : c3) + " & = & " +
        (r >= 0.75 ? " ? " : (c1+c2+c3)) +
        latex_line_break(1) + empty_tabular_row(8) + latex_line_break(1);

    var answer_string = tabular_column_formatting(8) + n + ") ~~&" +
        (r < 0.25 ? latex_colored_text("green",c1) : c1) + " & + & " +
        (r >= 0.25 && r < 0.5 ? latex_colored_text("green",c2) : c2) + " & + & " +
        (r >= 0.5 && r < 0.75 ? latex_colored_text("green",c3) : c3) + " & = & " +
        (r >= 0.75 ? latex_colored_text("green",c1+c2+c3) : (c1+c2+c3)) +
        latex_line_break(1) + empty_tabular_row(8) + latex_line_break(1);
        
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(max_digits+1);
    answer_string += latex_line_break(max_digits+1);
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function addition_three_addend_tall_problem(n,challenge) {

    var min = 0,
        max = challenge ? 29 : 9,
        max_digits = challenge ? 2 : 1,
        c1 = random_constant(min,max),
        c2 = random_constant(min,max),
        c3 = random_constant(min,Math.min(9,(challenge ? 60 : 20)-c1-c2)),
        problem_string = answer_string = "",
        tabular_cols = max_digits + 1;
    
    var latex_string = tabular_column_formatting(max_digits + tabular_cols) +
        n + ") & " + latex_line_break(1) +
        " &" + tabular_digit_string(c1,max_digits) + latex_line_break(1) +
        " &" + tabular_digit_string(c2,max_digits) + latex_line_break(1) +
        "+&" + tabular_digit_string(c3,max_digits) +
        latex_line_break()+
        latex_hline();
        
    var answer_string = latex_string +
        tabular_digit_string(c1+c2+c3,max_digits+1);
        
    latex_string += tabular_digit_string(" ",max_digits + 1);
    latex_string += latex_line_break(3);
    answer_string += latex_line_break(3);
    
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(max_digits);
    answer_string += latex_line_break(max_digits)
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function addition_three_addend_word_problem(n,challenge) {

    var c1 = random_constant(1,18),
        c2 = random_constant(1, 19 - c1),
        c3 = random_constant(1, (challenge ? 60 : 20) - c1 - c2),
        problem_string = answer_string = "",
        p1 = random_from_array(word_problem_people),
        p2 = random_from_array(word_problem_people),
        p3 = random_from_array(word_problem_people),
        o = random_from_array(word_problem_discrete_variables);
        
    while (p2.referential_pronoun == p1.referential_pronoun) {
        p2 = random_from_array(word_problem_people);
    }
    
    problem_string += n + ") If " + p1.name + " has " + c1 + " " +
        (c1 == 1 ? o.singular : o.plural) + ", and " + p1.verb_pronoun +
        " receives " + c2 + " " + (c2 == 1 ? o.singular : o.plural) +
        " from " + p2.name + " and " + c3 + " " + (c3 == 1 ? o.singular : o.plural) + " from " + p3.name +
        ", then how many " + o.plural + " will " + p1.verb_pronoun + " have?" +
        latex_line_break(2);
    
    answer_string += n + ") " + p1.name + " will have " + latex_colored_text("green",(c1 + c2 + c3)) + " " + o.plural + "." + 
        latex_line_break(3);
    
    return {problem_string:problem_string,answer_string:answer_string}
}

function subtraction_word_problem(n) {
    
    var constants = arithmetic_problem_constants(),
        c1 = Math.max(constants.top_number,constants.bottom_number),
        c2 = Math.min(constants.top_number,constants.bottom_number),
        diff = c1 - c2,
        problem_string = answer_string = "",
        p1 = random_from_array(word_problem_people),
        p2 = random_from_array(word_problem_people),
        o = random_from_array(word_problem_discrete_variables);
        
    while (p2.referential_pronoun == p1.referential_pronoun) {
        p2 = random_from_array(word_problem_people);
    }
    
    problem_string += n + ") " + p1.name + " has " + c1 + " " +
        (c1 == 1 ? o.singular : o.plural) + ". If " + p2.name +
        " has " + diff + " " + (diff == 1 ? o.singular : o.plural) +
        " fewer than " + p1.name + ", then how many " + o.plural + " does " + p2.name + " have?" +
        latex_line_break(2);
    
    answer_string += n + ") " + p2.name + " has " + c2 + " " + (c2 == 1 ? o.singular : o.plural) + "." + 
        latex_line_break(3);
    
    return {problem_string:problem_string,answer_string:answer_string}
}

function subtraction_unknown_addend_problem(n) {
    
     var constants = arithmetic_problem_constants(),
        c1 = Math.max(constants.top_number,constants.bottom_number),
        c2 = Math.min(constants.top_number,constants.bottom_number),
        sum = c1 + c2,
        problem_string = answer_string = "",
        p1 = random_from_array(word_problem_people),
        p2 = random_from_array(word_problem_people),
        o = random_from_array(word_problem_discrete_variables);
        
    while (p2.referential_pronoun == p1.referential_pronoun) {
        p2 = random_from_array(word_problem_people);
    }
    
    problem_string += n + ") " + p1.name + " has " + c1 + " " +
        (c1 == 1 ? o.singular : o.plural) + ". Together, " + p1.name + " and " + p2.name +
        " have " + sum + " " + o.plural + ". How many " + o.plural + " does " + p2.name + " have?" +
        latex_line_break(2);
    
    answer_string += n + ") " + p2.name + " has " + latex_colored_text("green",c2) + " " + (c2 == 1 ? o.singular : o.plural) + "." + 
        latex_line_break(3);
    
    return {problem_string:problem_string,answer_string:answer_string}
}

function addition_by_counting_problem(n) {
    
    var c1 = random_constant(0,15),
        c2 = random_constant(1,16-c1),
        s = c1 + c2,
        latex_string = answer_string = tabular_column_formatting(1);
        
    latex_string +=
        n + ") Add " + c2 + " to " + c1 + ": draw " + c1 + " on the number line and count up by " + c2 + "." +
        latex_line_break(1) + empty_tabular_row(1) +
        latex_number_line(0,16) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);

    answer_string +=
        n + ") Add " + c2 + " to " + c1 + ": draw " + c1 + " on the number line and count up by " + c2 + "." +
        latex_line_break(1) + empty_tabular_row(1) +
        latex_number_line(0,16,c1,true,s,false) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function subtraction_by_counting_problem(n) {
    
    var c1 = random_constant(1,16),
        c2 = random_constant(0,c1),
        s = c1 - c2,
        latex_string = answer_string = tabular_column_formatting(1);
        
    latex_string +=
        n + ") Subtract " + c2 + " from " + c1 + ": draw " + c1 + " on the number line and count down by " + c2 + "." +
        latex_line_break(1) + empty_tabular_row(1) +
        latex_number_line(0,16) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);

    answer_string +=
        n + ") Subtract " + c2 + " from " + c1 + ": draw " + c1 + " on the number line and count down by " + c2 + "." +
        latex_line_break(1) + empty_tabular_row(1) +
        latex_number_line(0,16,c1,true,s,false) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function two_digit_addition_by_tens_problem(n) {
    
    var c1 = random_constant(0,89),
        c2 = 10,
        s = c1 + c2,
        latex_string = answer_string = tabular_column_formatting(3) +
        n + ")&" + latex_line_break(1) +
        " &" + tabular_digit_string(c1,2) +
        latex_line_break() +
        "+&" + tabular_digit_string(c2,2) +
        latex_line_break() +
        latex_hline();
        
    var answer_string = latex_string +
        tabular_digit_string(c1+c2,3);
        
    latex_string += tabular_digit_string(" ",3) + latex_line_break();
    answer_string += latex_line_break();
    for (var i=0; i<3; i++) {
        latex_string += empty_tabular_row(3);
        answer_string += empty_tabular_row(3);
    }
    
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function two_digit_subtraction_by_tens_problem(n) {
    
    var c1 = random_constant(10,99),
        c2 = 10,
        s = c1 + c2,
        latex_string = answer_string = tabular_column_formatting(3) +
        n + ") &" + latex_line_break(1) +
        " &" + tabular_digit_string(c1,2) + latex_line_break() +
        "-&" + tabular_digit_string(c2,2) + latex_line_break() +
        latex_hline();
        
    var answer_string = latex_string + tabular_digit_string(c1-c2,3);
        
    latex_string += tabular_digit_string(" ",3) + latex_line_break();
    answer_string += latex_line_break();
    for (var i=0; i<3; i++) {
        latex_string += empty_tabular_row(3);
        answer_string += empty_tabular_row(3);
    }
    
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function analog_clock_reading_problem() {
    
    var h = random_constant(1,12),
        s = random_constant(0,60),
        latex_string = answer_string = tabular_column_formatting(1);
        
    latex_string += " \\begin{tikzpicture} "+
        " \\filldraw [fill=cyan] (0,0) circle (2cm); "+
        " \\foreach \angle [count=\\xi] in {60,30,...,-270} "+
        " {} "+
         //   " \\draw[line width=1pt] (\\angle:1.8cm) -- (\\angle:2cm); "+
          //  " \\node[font=\\large] at (\\angle:1.36cm) {\\textsf{\\xi}}; "+
        //" } "+
        //" \\foreach \\angle in {0,90,180,270} "+
        //" \\draw[line width=2pt] (\\angle:1.6cm) -- (\\angle:2cm); "+
        //" \\draw (0,0) -- (120:0.8cm); "+
        //" \\draw (0,0) -- (90:1cm); "+
        " \\end{tikzpicture} " +
    latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    
    latex_string += end_tabular();
    answer_string += end_tabular();
    
    latex_string += latex_line_break(1);
    answer_string += latex_line_break(1)
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function ratio_problem_simple(n) {
    
    var constants = ratios_problem_constants_simple(), tabular_cols = 4,
        latex_string = answer_string = tabular_column_formatting(tabular_cols) + n + ") & ",
        flag = Math.random(),
        math_env = " \\$ ";
    
    answer_string +=
        math_env +
            latex_fraction(flag < 0.25 ? latex_colored_text("green",constants.ratio_1[0]) :
                constants.ratio_1[0], flag >= 0.25 && flag < 0.5 ?
                    latex_colored_text("green",constants.ratio_1[1]) :
                constants.ratio_1[1]) +
        math_env +
        " & = & " +
        math_env +
            latex_fraction(flag >= 0.5 && flag < 0.75 ? latex_colored_text("green",constants.ratio_2[0]) :
                constants.ratio_2[0], flag >= 0.75 ?
                    latex_colored_text("green",constants.ratio_2[1]) :
                constants.ratio_2[1]) +
        math_env + " " +
        latex_line_break(1) + empty_tabular_row(tabular_cols) + latex_line_break(1);
        
    latex_string +=
        math_env +
            latex_fraction(flag < 0.25 ? " " : constants.ratio_1[0], flag >= 0.25 && flag < 0.5 ? " " : constants.ratio_1[1]) +
        math_env +
        " & = & " +
        math_env +
            latex_fraction(flag >= 0.5 && flag < 0.75 ? " " : constants.ratio_2[0], flag >= 0.75 ? " " : constants.ratio_2[1]) +
        math_env + " " +
        latex_line_break(1) + empty_tabular_row(tabular_cols) + latex_line_break(1);
        
    latex_string += " " + end_tabular()
    answer_string += " " + end_tabular()
    
    return {problem_string:latex_string,answer_string:answer_string};
}

function ratio_problem_compound(n) {
    
    var f1 = random_constant(1,6),
        f2 = random_constant(1,6);
    while (f2 == f1) {
        f2 = random_constant(1,6)
    }
        
    var constants = ratios_problem_constants_compound(), tabular_cols = 9,
        latex_string = answer_string = tabular_column_formatting(tabular_cols) + n + ") & ",
        flag = Math.random(),
        math_env = " \\$ ";
    
    latex_string +=
        math_env + latex_fraction("a","b") + math_env +
        " & = & " +
        math_env + latex_fraction(constants[0] * f1,constants[1] * f1) + math_env +
        "; " +
        math_env + latex_fraction("b","c") + math_env +
        " & = & " +
        math_env + latex_fraction(constants[1] * f2,constants[2] * f2) + math_env +
        "; " +
        math_env + latex_fraction("a","c") + math_env +
        " & = & ?" +
        latex_line_break(1) + empty_tabular_row(tabular_cols) + latex_line_break(3);
        
    answer_string +=
        math_env + latex_fraction("a","c") + math_env +
        " & = & " +
        math_env + latex_fraction(constants[0],constants[2]) + math_env +
        " " +
        latex_line_break(1) + empty_tabular_row(tabular_cols) + latex_line_break(3);
        
    latex_string += " " + end_tabular()
    answer_string += " " + end_tabular()
    
    return {problem_string:latex_string,answer_string:answer_string};
}


function complex_arithmetic_problem_wide(n) {
    
    var c_1 = complex_number(1,12),
        c_2 = complex_number(1,12),
        sign = Math.random() < 0.5 ? " + " : " - ",
        result,
        problem_string = answer_string = tabular_column_formatting(1) + n + ") ~~";
        
    if (sign == " + ") {
        result = [c_1[0] + c_2[0],c_1[1] + c_2[1]];
    } else {
        result = [c_1[0] - c_2[0],c_1[1] - c_2[1]];
    }
    
    problem_string += "(" + complex_string(c_1) + ")" + sign + "(" + complex_string(c_2) + ")" +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    answer_string += complex_string(result) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(2);
    answer_string += end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string}
    
}

function complex_multiplication_problem(n) {
    
    var c_1 = complex_number(-15,15),
        c_2 = complex_number(-15,15),
        result,
        problem_string = answer_string = tabular_column_formatting(1) + n + ") ~~";
        
    result = multiply_complex_numbers(c_1,c_2);
    
    problem_string += "(" + complex_string(c_1) + ") \\$\\times\\$ (" + complex_string(c_2) + ")" +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    answer_string += complex_string(result) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(2);
    answer_string += end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string}
    
}

function complex_division_problem() {
    
    var c_1 = complex_number(-9,9),
        c_2 = complex_number(-9,9),
        result,
        problem_string = answer_string = tabular_column_formatting(1);
        
    result = multiply_complex_numbers(c_1,c_2);
    
    problem_string += "(" + complex_string(result) + ") \\$\\div\\$  (" + complex_string(c_2) + ")" +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    answer_string += complex_string(c_1) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(2);
    answer_string += end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string}
}

function simplifying_fractions_problem(n) {
    
    var nums = [random_constant(1,15),random_constant(1,15)];
    nums = simplify_fraction(nums);
    
    var multiple = random_constant(2,25)
    
    var answer = nums;
    var problem = [nums[0] * multiple, nums[1] * multiple];
    
    var answer_string = problem_string = tabular_column_formatting(2) + n + ") ~~&";
    
    answer_string += "$" + latex_fraction(answer[0],answer[1]) + "$" +
        latex_line_break() + empty_tabular_row(2) + latex_line_break();
    problem_string += "$" + latex_fraction(problem[0],problem[1]) + "$" +
        latex_line_break() + empty_tabular_row(2) + latex_line_break();
    
    answer_string += end_tabular() + latex_line_break(1);
    problem_string += end_tabular() + latex_line_break(1);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function fraction_multiplication_problem(n) {
    
    var f1 = [random_constant(1,15),random_constant(1,15)],
        f2 = [random_constant(1,15),random_constant(1,15)],
        math_env = "\\$";
    
    var solution = multiply_fractions(f1,f2);
    
    var problem_string = tabular_column_formatting(4);
    var answer_string = tabular_column_formatting(2);
    
    problem_string += n + ") ~~&" + math_env + latex_fraction(f1[0],f1[1])+ math_env
        + " & " + math_env + "\\times" + math_env + " & " +
        math_env + latex_fraction(f2[0],f2[1]) + math_env +
        latex_line_break(1) + empty_tabular_row(3) + latex_line_break(1);
        
    answer_string += n + ") ~~&" + math_env + latex_fraction(solution[0],solution[1]) + math_env +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    
    problem_string += end_tabular() + latex_line_break(1);
    answer_string += end_tabular() + latex_line_break(1);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function fraction_division_problem(n) {
    
    var f1 = [random_constant(1,15),random_constant(1,15)],
        f2 = [random_constant(1,15),random_constant(1,15)],
        math_env = "\\$";
    
    var solution = divide_fractions(f1,f2);
    
    var problem_string = tabular_column_formatting(4);
    var answer_string = tabular_column_formatting(2);
    
    problem_string += n + ") ~~&" + math_env + latex_fraction(f1[0],f1[1]) + math_env +
        " & " + math_env + "\\div" + math_env + " & " +
        math_env + latex_fraction(f2[0],f2[1]) + math_env +
        latex_line_break(1) + empty_tabular_row(3) + latex_line_break(1);
        
    answer_string += n + ") ~~&" + math_env + latex_fraction(solution[0],solution[1]) + math_env + 
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break();
    
    problem_string += end_tabular() + latex_line_break(1);
    answer_string += end_tabular() + latex_line_break(1);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function fraction_addition_problem(n) {
    
    var f1 = [random_constant(1,15),random_constant(1,15)],
        f2 = [random_constant(1,15),random_constant(1,15)],
        math_env = "\\$",
        solution = add_fractions(f1,f2),
        problem_string = tabular_column_formatting(4),
        answer_string = tabular_column_formatting(2);
    
    problem_string += n + ") ~~& " +
        math_env + latex_fraction(f1[0],f1[1]) + math_env + 
        " & + & " +
        math_env + latex_fraction(f2[0],f2[1]) + math_env +
        latex_line_break(1) + empty_tabular_row(4) + latex_line_break(1);
        
    answer_string += n + ") ~~& " +
        math_env + latex_fraction(solution[0],solution[1]) + math_env +
        latex_line_break(1) + empty_tabular_row(2) + latex_line_break(1);
    
    problem_string += end_tabular() + latex_line_break(1);
    answer_string += end_tabular() + latex_line_break(1);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function fraction_subtraction_problem(n) {

    var f1 = [random_constant(1,15),random_constant(1,15)],
        f2 = [random_constant(1,15),random_constant(1,15)],
        solution = subtract_fractions(f1,f2),
        problem_string = tabular_column_formatting(4),
        answer_string = tabular_column_formatting(4),
        math_env = "\\$";
    
    problem_string += n + ") ~~& " +
        math_env + latex_fraction(f1[0],f1[1]) + math_env +
        " & - & " +
        math_env + latex_fraction(f2[0],f2[1]) + math_env +
        latex_line_break(1) + empty_tabular_row(4) + latex_line_break(1);
        
    answer_string += n + ") ~~& " +
        math_env + latex_fraction(solution[0],solution[1]) + math_env +
        latex_line_break(1) + empty_tabular_row(2) + latex_line_break(1);
    
    problem_string += end_tabular() + latex_line_break(1);
    answer_string += end_tabular() + latex_line_break(1);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function fraction_arithmetic_problem(is_addition_problem) {

    if (is_addition_problem == undefined) is_addition_problem = Math.random() < 0.5 ? true : false;
    
    var f1 = [random_constant(-15,15),random_constant(-15,15)];
    var f2 = [random_constant(-15,15),random_constant(-15,15)];
    
    var solution = is_addition_problem ? add_fractions(f1,f2) : subtract_fractions(f1,f2);
    
    var problem_string = tabular_column_formatting(3);
    var answer_string = tabular_column_formatting(1);
    
    problem_string += "$"+latex_fraction(f1[0],f1[1])+"$" + " & + & " + "$"+latex_fraction(f2[0],f2[1])+"$" +
        empty_tabular_row(3);
    answer_string += "$"+latex_fraction(solution[0],solution[1])+"$" + empty_tabular_row(1) + latex_line_break();
    
    problem_string += end_tabular() + latex_line_break(5);
    answer_string += end_tabular() + latex_line_break(5);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function quadratic_formula_problem(n) {
    
    var q = polynomial_coefficients(2),
        solution = apply_quadratic_formula(q[0],q[1],q[2]),
        problem_string = answer_string = tabular_column_formatting(1) + n + ") ~~";
        
    problem_string += string_polynomial(q) + latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    
    if (solution.length == 2) {
        answer_string += "[" + solution[0] + "," + solution[1] + "]";
    } else if (solution.length == 1) {
        answer_string += "[" + solution[0] + "]"
    } else {
        answer_string += "No real solutions";
    }
    
    answer_string += latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    
    problem_string += end_tabular() + latex_line_break(2);
    answer_string += end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function simplifying_radicals_problem(n) {
    
    var r = coefficient_and_radical();
    var s = simplify_radical(r[0],r[1]);
    
    var problem_string = answer_string = tabular_column_formatting(1) + n + ") ~~";
            
    problem_string += latex_radical(r[0],r[1]) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    answer_string += latex_radical(s[0],s[1]) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(2);
    answer_string += end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function radical_addition_problem(n) {
    
    var r1 = [random_constant(2,9),random_constant(2,7)],
        r2 = [1,Math.round(Math.pow(random_constant(2,9),2)) * r1[1]],
        simplified_r1 = simplify_radical(r1[0],r1[1]),
        simplified_r2 = simplify_radical(r2[0],r2[1]),
        solution = simplify_radical(simplified_r1[0] + simplified_r2[0], simplified_r1[1]);
    
    var problem_string = tabular_column_formatting(4) + n + ") ~~&" + 
        latex_radical(r1[0],r1[1]) + " & + & " + latex_radical(r2[0],r2[1]) +
        latex_line_break(1) + empty_tabular_row(4) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
        
    var answer_string = tabular_column_formatting(2) + n + ") ~~&" + 
        latex_radical(solution[0],solution[1]) +
        latex_line_break(1) + empty_tabular_row(2) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function radical_subtraction_problem(n) {
    
    var r1 = [random_constant(2,9),random_constant(2,7)],
        r2 = [1,Math.round(Math.pow(random_constant(2,9),2)) * r1[1]],
        simplified_r1 = simplify_radical(r1[0],r1[1]),
        simplified_r2 = simplify_radical(r2[0],r2[1]),
        solution = simplify_radical(simplified_r1[0] - simplified_r2[0], simplified_r1[1]);
    
    var problem_string = tabular_column_formatting(4) + n + ") ~~&" +
        latex_radical(r1[0],r1[1]) + " & - & " + latex_radical(r2[0],r2[1]) +
        latex_line_break(1) + empty_tabular_row(4) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
        
    var answer_string = tabular_column_formatting(2) + n + ") ~~&" +
        latex_radical(solution[0],solution[1]) +
        latex_line_break(1) + empty_tabular_row(2) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function radical_multiplication_problem(n) {
    
    var r1 = [random_constant(2,9),random_constant(2,15)],
        r2 = [random_constant(2,9),random_constant(2,15)];
    
    var solution = simplify_radical(r1[0] * r2[0],r1[1] * r2[1]);
    
    var problem_string = tabular_column_formatting(4) + n + ") ~~&" +
        latex_radical(r1[0],r1[1]) + " & \\$\\times\\$ & " + latex_radical(r2[0],r2[1]) +
        latex_line_break(1) + empty_tabular_row(4) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
        
    var answer_string = tabular_column_formatting(2) + n + ") ~~&" +
        latex_radical(solution[0],solution[1]) +
        latex_line_break(1) + empty_tabular_row(2) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function radical_rationalization_problem(n) {
    
    var r1 = random_constant(1,25),
        r2 = [random_constant(1,9),random_constant(2,12)],
        r3 = [random_constant(1,9),random_constant(2,12)],
        d_sign = Math.random(),
        problem_string = answer_string = tabular_column_formatting(3) + n + ")" + latex_line_break(1);
        
    while (r2[1] == r3[1]) {
        r3 = [random_constant(1,9),random_constant(2,12)]
    }
        
    var solution = multiply_radical_expression_by_conjugate(r2,d_sign < 0.5 ? r3 : [r3[0] * -1, r3[1]]);
    
    problem_string += " & " + r1 + " & " + 
        latex_line_break(1) + latex_hline() +
        latex_radical(r2[0],r2[1]) + " & " + (d_sign < 0.5 ? "+" : "-") + " & " + latex_radical(r3[0],r3[1]) +
        latex_line_break(1) + empty_tabular_row(3) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
        
    var a1 = simplify_radical(r2[0] * r1,r2[1]),
        a2 = simplify_radical(r3[0] * r1,r3[1]);
        
    answer_string += latex_radical(a1[0],a1[1]) + " & " + (d_sign < 0.5 ? "-" : "+") + " & " + latex_radical(a2[0],a2[1]) +
        latex_line_break(1) + latex_hline() +
        " & " + multiply_radical_expression_by_conjugate(r2,r3) + " & " +
        latex_line_break(1) + empty_tabular_row(3) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
        
    return {problem_string:problem_string,answer_string:answer_string};
}

function prime_factorization_problem(num) {
    
    var n = random_constant(4,1000);
    while (is_prime(n)) {
        n = random_constant(4,1000);
    }
    
    var factors = prime_factorization(n),
        solution = collapse_duplicates(factors),
        problem_string = answer_string = tabular_column_formatting(1) + num + ") ~~";
    
    problem_string += n + latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    answer_string += latex_prime_factorization(solution) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(4);
    answer_string += end_tabular() + latex_line_break(4);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function convert_to_base_10_problem(num) {
    
    var b = Math.ceil(Math.random() * 19) + 1;
    while (b == 10) {
        b = Math.ceil(Math.random() * 19) + 1;
    }
    var n = random_constant_custom_base(b),
        solution = convert_to_base_10(n,b);
        
    var problem_string = answer_string = tabular_column_formatting(1) + num + ") ~~";
    
    problem_string += n + " base " + b + latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    answer_string += solution + latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(1);
    answer_string += end_tabular() + latex_line_break(1);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function convert_from_base_10_problem(num) {
    
    var b = Math.ceil(Math.random() * 19) + 1;
    while (b == 10) {
        b = Math.ceil(Math.random() * 19) + 1;
    }
    var n = random_constant_custom_base(10),
        solution = convert_from_base_10(n,b);
        
    var problem_string = answer_string = tabular_column_formatting(1) + num + ") ~~";
    
    problem_string += n + " to base " + b +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    answer_string += solution +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(1);
    answer_string += end_tabular() + latex_line_break(1);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function convert_between_bases_problem(num) {
    
    var b1 = Math.ceil(Math.random() * 19) + 1,
        b2 = Math.ceil(Math.random() * 19) + 1;
        
    while (b1 == b2) {
        b2 = Math.ceil(Math.random() * 19) + 1;
    }
    
    var n = random_constant_custom_base(b1),
        solution = convert_between_bases(n,b1,b2);
        
    var problem_string = answer_string = tabular_column_formatting(1) + num + ") ~~";
    
    problem_string += n + " base " + b1 + " to base " + b2 +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
    answer_string += solution +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(1);
    answer_string += end_tabular() + latex_line_break(1);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function absolute_value_equation_problem(n) {
    
    var t1 = random_constant(-20,20),
        t2 = random_constant(-20,20),
        t3 = random_constant(0,30),
        math_env = "\\$";
        
    while (t1 == 0) {
        t1 = random_constant(-20,20);
    }
    
    var s1 = simplify_fraction([t3 - t2, t1]),
        s2 = simplify_fraction([(t3 * -1) - t2, t1]),
        s1_s = s1[0] == 0 || s1[1] == 1 ? s1[0] : latex_fraction(s1[0],s1[1]),
        s2_s = s2[0] == 0 || s2[1] == 1 ? s2[0] : latex_fraction(s2[0],s2[1]);
        
    var problem_string = answer_string = tabular_column_formatting(1) + n + ") ~~";
    
    problem_string += math_env + "|" + math_env + math_env + (t1 < 0 ? "-" : "") + (Math.abs(t1) == 1 ? "" : Math.abs(t1)) + "x" + math_env +
        (t2 < 0 ? " - " : (t2 > 0 ? " + " : "")) + (t2 == 0 ? "" : Math.abs(t2)) + "$|$ = " + t3 +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    answer_string += math_env + "x = " + s1_s + math_env + (arrays_are_equal(s1,s2) ? "" : ("; "+math_env+"x = " + s2_s + math_env)) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(3);
    answer_string += end_tabular() + latex_line_break(3);
        
    return {problem_string:problem_string,answer_string:answer_string};
}

function absolute_value_inequality_problem(n) {
    
    var t1 = random_constant(-20,20),
        t2 = random_constant(-20,20),
        t3 = random_constant(0,30),
        inclusive = Math.random() < 0.5 ? "" : "=",
        less_than = Math.random() < 0.5,
        sign1 = "<" + inclusive,
        sign2 = ">" + inclusive,
        math_env = "\\$";
        
    while (t1 == 0) {
        t1 = random_constant(-20,20);
    }
    
    var s1 = simplify_fraction([t3 - t2, t1]),
        s2 = simplify_fraction([(t3 * -1) - t2, t1]),
        s1_s = s1[0] == 0 || s1[1] == 1 ? s1[0] : latex_fraction(s1[0],s1[1]),
        s2_s = s2[0] == 0 || s2[1] == 1 ? s2[0] : latex_fraction(s2[0],s2[1]);
        
    var problem_string = answer_string = tabular_column_formatting(1);
    
    problem_string += math_env + "|" + math_env + math_env + (t1 < 0 ? "-" : "") + (Math.abs(t1) == 1 ? "" : Math.abs(t1)) + "x" + math_env +
        (t2 < 0 ? " - " : (t2 > 0 ? " + " : "")) + (t2 == 0 ? "" : Math.abs(t2)) + "$|$ " +
        math_env + (less_than ? sign1 : sign2) + math_env + " " + t3 +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    answer_string += math_env + "x " + sign1 + " " + s1_s + math_env + "; "+math_env+"x " + sign2 + " " + s2_s + math_env +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(3);
    answer_string += end_tabular() + latex_line_break(3);
        
    return {problem_string:problem_string,answer_string:answer_string};
}

function matrix_addition_problem(n) {

    var problem_string = answer_string = tabular_column_formatting(1) + n + ") ~~",
        m1 = control_flow.data_type == "integer" ?
            constant_matrix(control_flow.range.matrix_rows,control_flow.range.matrix_cols) :
            variable_matrix(control_flow.range.matrix_rows,control_flow.range.matrix_cols),
        m2 = control_flow.data_type == "integer" ?
            constant_matrix(control_flow.range.matrix_rows,control_flow.range.matrix_cols) :
            variable_matrix(control_flow.range.matrix_rows,control_flow.range.matrix_cols);
    
    problem_string += latex_matrix(m1) +
        " + " +
        latex_matrix(m2) + 
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    answer_string += latex_matrix(add_matrices(m1,m2)) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(4);
    answer_string += end_tabular() + latex_line_break(4);
        
    return {problem_string:problem_string,answer_string:answer_string};
}

function matrix_multiplication_problem(n) {
    
    var problem_string = answer_string = tabular_column_formatting(1) + n + ") ~~",
        m1 = control_flow.data_type == "integer" ?
            constant_matrix(random_constant(1,5),control_flow.range.matrix_cols) :
            variable_matrix(random_constant(1,5),control_flow.range.matrix_cols),
        m2 = control_flow.data_type == "integer" ?
            constant_matrix(control_flow.range.matrix_cols,random_constant(1,5)) :
            variable_matrix(control_flow.range.matrix_cols,random_constant(1,5));
    
    problem_string += latex_matrix(m1) +
        " \\$\\times\\$ " +
        latex_matrix(m2) + 
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    answer_string += latex_matrix(multiply_matrices(m1,m2)) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(2);
    answer_string += end_tabular() + latex_line_break(2);
        
    return {problem_string:problem_string,answer_string:answer_string};
}

function matrix_determinant_problem(n) {
    
    var problem_string = answer_string = tabular_column_formatting(1) + n + ") ~~",
        w = random_constant(2,5),
        m = control_flow.data_type == "integer" ?
            constant_matrix(w,w) :
            variable_matrix(w,w);
            
    problem_string += latex_matrix(m,"|","|") + 
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    answer_string += matrix_determinant(m) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1);
        
    problem_string += end_tabular() + latex_line_break(3);
    answer_string += end_tabular() + latex_line_break(3);
        
    return {problem_string:problem_string,answer_string:answer_string};
}

function circle_graphing_problem(n) {

    var r = Math.round(Math.random()*4)/4 + 0.5,
        c = circle_center_coordinates(4.0,r,true),
        problem_string = answer_string = tabular_column_formatting(1) + n + ")" + latex_line_break(1);
        //t = Math.round(Math.random()*72)*5,
        //l = circle_diameter_endpoints(c[0],c[1],r,t);
        
    problem_string += "\\begin{tikzpicture}[scale=0.5] "+
        "\\draw[step=1cm,gray,very thin] (-4,-4) grid (4,4); "+
        "\\draw (0,4) -- (0,-4);"+
        "\\draw (-4,0) -- (4,0);"+
        //"\\draw[blue,very thick] ("+c[0]+","+c[1]+") circle ("+r+"); "+
        //"\\draw[blue,very thick] ("+l[0][0]+","+l[0][1]+") -- ("+l[1][0]+","+l[1][1]+");"+
        "\\end{tikzpicture}" +
        " \\\\\\\\ "+
        "Radius: "+r+" \\\\\\\\ "+
        "Center: ("+c[0]+","+c[1]+") \\\\\\\\ ";
        //"Theta: "+t;
        
    answer_string += "\\begin{tikzpicture}[scale=0.5] "+
        "\\draw[step=1cm,gray,very thin] (-4,-4) grid (4,4); "+
        "\\draw (0,4) -- (0,-4);"+
        "\\draw (-4,0) -- (4,0);"+
        "\\draw[blue,very thick] ("+c[0]+","+c[1]+") circle ("+r+"); "+
        //"\\draw[blue,very thick] ("+l[0][0]+","+l[0][1]+") -- ("+l[1][0]+","+l[1][1]+");"+
        "\\end{tikzpicture}" +
        " \\\\\\\\ "+
        "Radius: "+r+" \\\\\\\\ "+
        "Center: ("+c[0]+","+c[1]+") \\\\\\\\ ";
        //"Theta: "+t;
        
    problem_string += end_tabular();
    answer_string += end_tabular();
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function circle_graphing_problem_equation(n) {

    var r = Math.round(Math.random()*4)/4 + 0.5,
        c = circle_center_coordinates(4.0,r,true),
        eq = "\\$("+
            string_polynomial([1,c[0]*-1],"x","")+
            ")^2\\$ + \\$("+
            string_polynomial([1,c[1]*-1],"y","")+
            ")^2\\$ = " +
            "\\$"+r+"^2\\$",
        problem_string = answer_string = tabular_column_formatting(1) + n + ")" + latex_line_break(1);
        
    problem_string += "\\begin{tikzpicture}[scale=0.5] "+
        "\\draw[step=1cm,gray,very thin] (-4,-4) grid (4,4); "+
        "\\draw (0,4) -- (0,-4);"+
        "\\draw (-4,0) -- (4,0);"+
        "\\end{tikzpicture}" +
        " \\\\\\\\ "+
        eq + latex_line_break(2);
        
    answer_string += "\\begin{tikzpicture}[scale=0.5] "+
        "\\draw[step=1cm,gray,very thin] (-4,-4) grid (4,4); "+
        "\\draw (0,4) -- (0,-4);"+
        "\\draw (-4,0) -- (4,0);"+
        "\\draw[blue,very thick] ("+c[0]+","+c[1]+") circle ("+r+"); "+
        "\\end{tikzpicture}" +
        " \\\\\\\\ "+
        "Radius: "+r+" \\\\\\\\ "+
        "Center: ("+c[0]+","+c[1]+") \\\\\\\\ ";
        
    problem_string += end_tabular();
    answer_string += end_tabular();
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function rectangular_solid_composition_problem(n) {
    
    var f2w = random_constant(1,4),
        f2h = random_constant(1,4),
        f2d = random_constant(1,4),
        f1w = random_from_array(get_complete_factor_array(f2w)),
        f1h = random_from_array(get_complete_factor_array(f2h)),
        f1d = random_from_array(get_complete_factor_array(f2d)),
        problem_string = answer_string = tabular_column_formatting(4) + n + ") ";
    
    problem_string += latex_rectangular_solid(f1w,f1h,f1d,true,"green") +
        " & & " +
        latex_rectangular_solid(f2w,f2h,f2d,true,"blue") +
        latex_line_break(1) + empty_tabular_row(3) + latex_line_break(3);
        
    answer_string += (f2w/f1w) * (f2h/f1h) * (f2d/f1d) +
        latex_line_break(1) + empty_tabular_row(3) + latex_line_break(4);
        
    problem_string += end_tabular();
    answer_string += end_tabular();
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function triangle_composition_problem(n) {
    
    var big_s = random_constant(2,12),
        small_s = random_from_array(get_complete_factor_array(big_s)),
        solution = Math.pow(big_s/small_s,2),
        scale = 0.5*6/big_s;
        
    while (solution == 1 || solution > 16) {
        big_s = random_constant(2,12);
        small_s = random_from_array(get_complete_factor_array(big_s));
        solution = Math.pow(big_s/small_s,2);
        scale = 0.5*6/big_s;
    }

    var problem_string = n + ") " +
        latex_equilateral_triangle(small_s,true,scale,"green") +
        " " +
        latex_equilateral_triangle(big_s,true,scale,"blue") +
        latex_line_break(2);
        
    var answer_string = tabular_column_formatting(2) + n + ") ~~&" +
            solution +
            latex_line_break(1) + empty_tabular_row(1) + latex_line_break(5) + end_tabular();
        
    return {problem_string:problem_string,answer_string:answer_string};
}

function partitioning_circles_and_rectangles_problem() {
    
    var shape = Math.random() < 0.5 ? "circle" : "rectangle",
        shape_function = shape == "circle" ? latex_circle_partitioned : latex_rectangle_partitioned,
        p = Math.random() < 0.5 ? 0 : 1,
        p_target = random_constant(p+1,2),
        d1 = Math.random() * 2 + 0.5,
        d2 = Math.random() * 2 + 0.5,
        instruction = p_target == 1 ?
            (Math.random() < 0.5 ? " into halves " : " in half ") :
            (Math.random() < 0.5 ? " into fourths " : " into quarters ");

    var problem_string = tabular_column_formatting(1) + " Divide the " + shape + instruction +
        "." + empty_tabular_row(1) + latex_line_break(1) +
        shape_function(p,[d1,d2]) + latex_line_break(3) + end_tabular();
        
    var answer_string = tabular_column_formatting(1) +
        shape_function(p_target,[d1,d2]) + end_tabular() + latex_line_break(4);
        
    return {problem_string:problem_string,answer_string:answer_string};
}

function dummy_problem() {
    
    var shape = Math.random() < 0.5 ? "circle" : "rectangle",
        shape_function = shape == "circle" ? latex_circle_partitioned : latex_rectangle_partitioned,
        p = Math.random() < 0.5 ? 0 : 1,
        p_target = random_constant(p,2);

    var problem_string = " Divide the " + shape + " into " +
        (p_target == 1 ? "halves" : "quarters") + "." + latex_line_break(1) +
        shape_function(p) + latex_line_break(2);
    var answer_string = shape_function(p_target) + latex_line_break(2);
        
    return {problem_string:problem_string,answer_string:answer_string};
}

function evaluating_logarithms_problem(n) {
    
    var c = random_constant(-25,25),
        base = random_constant(2,12),
        r = Math.random(),
        x = "x";
        
    while (c == 0 || c == 1 || c == -1) {
        c = random_constant(-25,25);
    }
    
    var s = random_constant(1,5);
    var num = Math.pow(base,s);
        
    var problem_string = tabular_column_formatting(1) +
        n + ") ~~ \\$" +
        (r < 0.25 ? x : c) + "\\log_{" +
        (r >= 0.25 && r < 0.5 ? x : base) + "} " +
        (r >= 0.5 && r < 0.75 ? x : num) + " = " +
        (r >= 0.75 ? x : (s*c)) + "\\$" +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
    
    var answer_string = tabular_column_formatting(1) +
        n + ") ~~ \\$" +
        (r < 0.25 ? latex_colored_text("green",c) : c) + "\\log_{" +
        (r >= 0.25 && r < 0.5 ? latex_colored_text("green",base) : base) + "} " +
        (r >= 0.5 && r < 0.75 ? latex_colored_text("green",num) : num) + " = " +
        (r >= 0.75 ? latex_colored_text("green",(s*c)) : (s*c)) + "\\$" +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function adding_logarithms_problem(n) {
    
    var b = random_constant(2,20),
        e = random_constant(1,7),
        f_a = get_complete_factor_array(Math.pow(b,e)),
        f = random_from_array(f_a);
        
    var problem_string = tabular_column_formatting(1) +
        n + ") ~~ \\$" +
        "\\log_{" + b + "} " + f +
        " + " +
        "\\log_{" + b + "} " + Math.pow(b,e)/f + "\\$" +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
    
    var answer_string = tabular_column_formatting(1) +
        n + ") ~~ \\$" +
        "\\log_{" + b + "} " + Math.pow(b,e) + " = " + e + "\\$" +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string};
}

function subtracting_logarithms_problem(n) {
    
    var b = random_constant(2,12),
        e1 = random_constant(2,6),
        e2 = random_constant(1,e1),
        n1 = Math.pow(b,e1),
        n2 = Math.pow(b,e2);
        
    var problem_string = tabular_column_formatting(1) +
        n + ") ~~ \\$" +
        "\\log_{" + b + "} " + n1 +
        " - " +
        "\\log_{" + b + "} " + n2 + "\\$" +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
    
    var answer_string = tabular_column_formatting(1) +
        n + ") ~~ \\$" +
        "\\log_{" + b + "} " + (n1/n2) + " = " + (e1 - e2) + "\\$" +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string};
}


function differentiating_polynomials_problem(n) {
    
    var d = random_constant(1,4),
        p = polynomial_coefficients(d),
        s = p.slice();
    s = differentiate_polynomial(s);
    
    var problem_string = tabular_column_formatting(1) +
        n + ") ~~ " +
        string_polynomial(p) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
    
    var answer_string = tabular_column_formatting(1) +
        n + ") ~~" +
        string_polynomial(s) +
        latex_line_break(1) + empty_tabular_row(1) + latex_line_break(1) +
        end_tabular() + latex_line_break(2);
    
    return {problem_string:problem_string,answer_string:answer_string};
}


function annuity_npv_problem(num) {
    
    var p = random_constant(100,100000),
        r = random_constant(1,100) / 10,
        n = random_constant(1,20),
        npv = p * ((1 - Math.pow(1 + r, n * -1)) / r),
        problem_string = answer_string = tabular_column_formatting(1) + num + ") ~~";
        
    latex_string += " Calculate the Net Present Value of an annuity having: " + latex_line_break(1) +
        "$" + p + "Periodic Payment;" + latex_line_break(1) +
        r + "% interest rate; and" + latex_line_break(1) +
        n + " total payments." +
        latex_line_break(1) + end_tabular() + latex_line_break(1);
        
    answer_string += npv +
        latex_line_break(1) + end_tabular() + latex_line_break(1);;
        
    problem_string += end_tabular()
    answer_string += end_tabular()
        
    return {problem_string:problem_string,answer_string:answer_string};
}









