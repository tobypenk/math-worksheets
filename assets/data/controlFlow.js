var control_flow = {
    operation: "reverse_foil",
    range:{
        min:0,max:12,
        digits_before_decimal:2,digits_after_decimal:2,
        matrix_rows:3,matrix_cols:4
    },
    data_type:"integer",
    format:"special",
    allow_zero:"false",
    force_factors:"false",
    force_top_heavy:"true",
    has_header:"true",
    num_terms:3,
    leading_coefficient_is_one:"false",
    solution_color:"green",
    challenge_problem: "true"
}
    
function apply_worksheet_settings(constraints) {
    
    var constraint_names = Object.keys(constraints.control_data);
    
    for (var i in constraint_names) {
        control_flow[constraint_names[i]] = constraints.control_data[constraint_names[i]];
    }
    control_flow.topic = constraints.topic;
    control_flow.sub_topic = constraints.sub_topic;
    
    $("#worksheet-title").html(constraints.title);
}

function optimal_grid_size() {
    
    var cols_per_page;
    var rows_per_page;
    
    switch (control_flow.operation) {
        case "addition":
        case "subtraction":
        case "multiplication":
        case "division":
            switch (control_flow.format) {
                case "tall":
                    cols_per_page = 4;
                    rows_per_page = 4;
                    break;
                case "tall_three_addend":
                    cols_per_page = 3;
                    rows_per_page = 3;
                    break;
                case "tall_random":
                    cols_per_page = 3;
                    rows_per_page = 4;
                    break;
                case "wide":
                case "special":
                    cols_per_page = 3;
                    rows_per_page = 15 - Math.ceil(Math.log10(control_flow.range.max + 2)) * 2;
                    break;
                case "wide_three_addend":
                case "wide_three_addend_random_term":
                    cols_per_page = 2;
                    rows_per_page = 6;
                    break;
                case "two_digit_by_tens":
                    cols_per_page = 3;
                    rows_per_page = 4;
                    break;
                case "wide_random":
                    cols_per_page = 4;
                    rows_per_page = 9 - Math.ceil(Math.log10(control_flow.range.max + 2)) * 2;
                    break;
                case "word":
                case "three_addend_word":
                case "comparison_word":
                case "unknown_addend":
                    cols_per_page = 1;
                    rows_per_page = 6;
                    break;
                case "associative_word":
                    cols_per_page = 1;
                    rows_per_page = 5;
                    break;
                case "counting":
                    cols_per_page = 1;
                    rows_per_page = 5;
                    break;
                case "dummy":
                    cols_per_page = 1;
                    rows_per_page = 1;
                    break;
                default:
                    cols_per_page = 3;
                    rows_per_page = 6;
                    break;
            }
        break;
        case "system_of_equations":
            cols_per_page = Math.max(2,5 - control_flow.num_terms);
            rows_per_page = 6 - control_flow.num_terms;
            break;
        case "ratio_simple":
            cols_per_page = 5;
            rows_per_page = 9;
            break;
        case "polynomial_long_division":
            cols_per_page = 2;
            rows_per_page = 4;
            break;
        case "reverse_foil":
        case "foil":
        case "quadratic_formula":
            cols_per_page = 2;
            rows_per_page = 5;
            break;
        case "complex_arithmetic":
        case "complex_multiplication":
        case "complex_division":
            switch (control_flow.format) {
                case "wide":
                    cols_per_page = 2;
                    rows_per_page = 6;
                    break;
            }
            break;
        case "simplifying_fractions":
        case "multiplying_fractions":
        case "adding_fractions":
        case "subtracting_fractions":
        case "dividing_fractions":
            cols_per_page = 4;
            rows_per_page = 7;
            break;
        case "simplifying_radicals":
            cols_per_page = 4;
            rows_per_page = 5;
            break;
        case "radical_addition":
        case "radical_subtraction":
        case "radical_multiplication":
            cols_per_page = 3;
            rows_per_page = 5;
            break;
        case "radical_rationalization":
            cols_per_page = 3;
            rows_per_page = 4;
            break;
        case "prime_factorization":
            cols_per_page = 3;
            rows_per_page = 4;
            break;
        case "convert_to_base_10":
        case "convert_from_base_10":
            cols_per_page = 3;
            rows_per_page = 7;
            break;
        case "convert_between_bases":
            cols_per_page = 2;
            rows_per_page = 7;
            break;
        case "absolute_value_equation":
        case "absolute_value_inequality":
            cols_per_page = 3;
            rows_per_page = 4;
            break;
        case "matrix_addition":
        case "matrix_multiplication":
            cols_per_page = control_flow.range.matrix_cols >= 4 ? 1 : 2;
            rows_per_page = 4;
            break;
        case "matrix_determinant":
            cols_per_page = 2;
            rows_per_page = 4;
            break;
        case "circle_graphing":
            cols_per_page = 3;
            rows_per_page = 3;
            break;
        case "circle_graphing_equation":
            cols_per_page = 2;
            rows_per_page = 3;
            break;
        case "clock_reading":
            cols_per_page = 2;
            rows_per_page = 4;
        case "how_many_tens":
        case "complete_the_tens":
            cols_per_page = 1;
            rows_per_page = 6;
            break;
        case "take_away_tens":
            cols_per_page = 1;
            rows_per_page = 5;
            break;
        case "comparison":
            cols_per_page = 3;
            rows_per_page = 5;
            break;
        case "rectangular_solid":
            cols_per_page = 2;
            rows_per_page = 5;
            break;
        case "triangle":
            cols_per_page = 2;
            rows_per_page = 3;
            break;
        case "partitioning":
            cols_per_page = 2;
            rows_per_page = 3;
            break;
        case "evaluating_logarithms":
        case "adding_logarithms":
            cols_per_page = 2;
            rows_per_page = 6;
            break;
        case "differentiating_polynomials":
            cols_per_page = 2;
            rows_per_page = 5;
            break;
        default:
            cols_per_page = 2;
            rows_per_page = 5;
            break;
    }
    
    return {cols:cols_per_page,rows:rows_per_page};
}

function sync_DOM_inputs_to_control_flow() {
    
}

var operations = {
    subtraction:{
        text:"-",
        func:arithmetic_subtraction,
        title:"Subtraction"
    },
    addition:{
        text:"+",
        func:arithmetic_addition,
        title:"Addition"
    },
    multiplication:{
        text:"$\\times$",
        func:arithmetic_multiplication,
        title:"Multiplication"
    },
    division:{
        text:"$\\div$",
        func:arithmetic_division,
        title:"Division"
    }
}

var number_generator_function_map = {
    
}

var formatter_function_map = {
    addition:{
        tall:tall_arithmetic_problem,
        wide:wide_arithmetic_problem,
        wide_random:wide_random_term_arithmetic_problem,
        tall_random:tall_random_term_arithmetic_problem,
        word:addition_word_problem,
        three_addend_word:addition_three_addend_word_problem,
        comparison_word:addition_comparison_word_problem,
        associative_word:addition_associative_word_problem,
        tall_three_addend:addition_three_addend_tall_problem,
        wide_three_addend:addition_three_addend_wide_problem,
        wide_three_addend_random_term:addition_three_addend_random_term_wide_problem,
        counting:addition_by_counting_problem,
        two_digit_by_tens:two_digit_addition_by_tens_problem
    },
    subtraction:{
        tall:tall_arithmetic_problem,
        wide:wide_arithmetic_problem,
        word:subtraction_word_problem,
        wide_random:wide_random_term_arithmetic_problem,
        tall_random:tall_random_term_arithmetic_problem,
        counting:subtraction_by_counting_problem,
        unknown_addend:subtraction_unknown_addend_problem,
        two_digit_by_tens:two_digit_subtraction_by_tens_problem
    },
    multiplication:{
        tall:tall_arithmetic_problem,
        wide:wide_arithmetic_problem
    },
    division:{
        tall:tall_arithmetic_problem,
        wide:wide_arithmetic_problem,
        special:arithmetic_long_division_problem
    },
    system_of_equations:{
        special:system_of_equations_problem
    },
    ratio_simple:{
        wide:ratio_problem_simple
    },
    ratio_compound:{
        wide:ratio_problem_compound
    },
    polynomial_long_division:{
        special:polynomial_long_division_problem
    },
    reverse_foil:{
        special:reverse_foil_problem
    },
    foil:{
        special:foil_problem
    },
    complex_arithmetic:{
        wide:complex_arithmetic_problem_wide
    },
    complex_multiplication:{
        wide:complex_multiplication_problem
    },
    complex_division:{
        wide:complex_division_problem
    },
    simplifying_fractions:{
        tall:simplifying_fractions_problem
    },
    multiplying_fractions:{
        wide:fraction_multiplication_problem
    },
    dividing_fractions: {
        wide: fraction_division_problem
    },
    adding_fractions: {
        wide: fraction_addition_problem
    },
    subtracting_fractions: {
        wide: fraction_subtraction_problem
    },
    quadratic_formula: {
        special: quadratic_formula_problem
    },
    simplifying_radicals: {
        special: simplifying_radicals_problem
    },
    radical_addition: {
        wide: radical_addition_problem
    },
    radical_subtraction: {
        wide: radical_subtraction_problem
    },
    radical_multiplication: {
        wide: radical_multiplication_problem
    },
    radical_rationalization: {
        tall: radical_rationalization_problem
    },
    prime_factorization: {
        special: prime_factorization_problem
    },
    convert_to_base_10: {
        special: convert_to_base_10_problem
    },
    convert_from_base_10: {
        special: convert_from_base_10_problem
    },
    convert_between_bases: {
        special: convert_between_bases_problem
    },
    absolute_value_equation: {
        special: absolute_value_equation_problem
    },
    absolute_value_inequality: {
        special: absolute_value_inequality_problem
    },
    matrix_addition: {
        wide: matrix_addition_problem
    },
    matrix_multiplication: {
        wide: matrix_multiplication_problem
    },
    matrix_determinant: {
        special: matrix_determinant_problem
    },
    circle_graphing: {
        special: circle_graphing_problem
    },
    circle_graphing_equation: {
        special: circle_graphing_problem_equation
    },
    addition_word: {
        special: addition_word_problem
    },
    clock_reading: {
        special: analog_clock_reading_problem
    },
    how_many_tens: {
        word: how_many_tens_problem
    },
    complete_the_tens: {
        word: complete_the_tens_problem
    },
    take_away_tens: {
        word:take_away_tens_problem
    },
    comparison: {
        fill_in:fill_in_comparison_problem,
        true_or_false:true_or_false_comparison_problem
    },
    rectangular_solid: {
        composition:rectangular_solid_composition_problem
    },
    triangle: {
        composition:triangle_composition_problem
    },
    partitioning: {
        circles_and_rectangles:partitioning_circles_and_rectangles_problem
    },
    logarithms: {
        special:evaluating_logarithms_problem
    },
    adding_logarithms: {
        special:adding_logarithms_problem
    },
    subtracting_logarithms: {
        special:subtracting_logarithms_problem
    },
    differentiating_polynomials: {
        special:differentiating_polynomials_problem
    },
    annuity: {
        npv:annuity_npv_problem
    },
    dummy: {
        special: dummy_problem
    }
}










