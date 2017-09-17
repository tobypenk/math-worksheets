
            var control_flow = {
                operation:"addition",
                data_type:"integer",
                format:"tall",
                range:{min:0,max:99,before_decimal:2,after_decimal:2},
                number_of_problems:63,
                allow_zero:"true",
                force_factors:"false",
                force_top_heavy:"false",
                has_name_field:"true",
                has_date_field:"true",
                has_teacher_field:"true"
            }
            
            var operations = {
                subtraction:{text:"-",func:arithmetic_subtraction,title:"Subtraction"},
                addition:{text:"+",func:arithmetic_addition,title:"Addition"},
                multiplication:{text:"$\\times$",func:arithmetic_multiplication,title:"Multiplication"},
                division:{text:"$\\div$",func:arithmetic_division,title:"Division"},
                long_division:{formatter:"\\customlongdiv",func:arithmetic_division}
            }
            
            
            
            var operation_function_map = {
                addition:arithmetic_problem,
                subtraction:arithmetic_problem,
                multiplication:arithmetic_problem,
                division:arithmetic_problem,
                systems_of_equations:system_of_equations_problem
            }
            
            var formatter_function_map = {
                addition:{
                    tall:stacked_arithmetic_problem,
                    wide:wide_arithmetic_problem
                },
                subtraction:{
                    tall:stacked_arithmetic_problem,
                    wide:wide_arithmetic_problem
                },
                multiplication:{
                    tall:stacked_arithmetic_problem,
                    wide:wide_arithmetic_problem
                },
                division:{
                    tall:stacked_arithmetic_problem,
                    wide:wide_arithmetic_problem
                },
                long_division:{
                    special:long_division_problem
                },
                systems_of_equations:{
                    system_of_equations_problem
                }
            }
            
            var number_generator_function_map = {
                
            }
            
            
            function arithmetic_problem(formatting_function) {
                
                switch (control_flow.operation) {
                    case "addition":
                    case "subtraction":
                    case "multiplication":
                    case "division":
                        return wide_arithmetic_problem(formatting_function);
                        break;
                    case "long_division":
                        return long_division_problem(formatting_function);
                        break;
                }
            }
            
            function simple_arithmetic_problem(formatting_function) {
                
                var operator = operations[control_flow.operation];
                
                var constants = arithmetic_problem_constants();
                
                var latex_string = tabular_column_formatting(constants.max_digits + 1);
                latex_string += " &" + tabular_digit_string(constants.top_number,constants.max_digits);

                latex_string += "\\\\";
                latex_string += operator.text + "&" + tabular_digit_string(constants.bottom_number,constants.max_digits);

                latex_string += "\\\\";
                latex_string += "\\hline";
                var answer_string = latex_string +
                    tabular_digit_string(operator.func(constants.top_number,
                                                       constants.bottom_number),
                                         constants.max_digits+1);
                latex_string += "\\\\";
                answer_string += "\\\\";
                latex_string += empty_tabular_row(constants.max_digits + 1);
                answer_string += empty_tabular_row(constants.max_digits + 1);
                latex_string += empty_tabular_row(constants.max_digits + 1);
                answer_string += empty_tabular_row(constants.max_digits + 1);
                latex_string += empty_tabular_row(constants.max_digits + 1);
                answer_string += empty_tabular_row(constants.max_digits + 1);
                
                latex_string += "\\end{tabular}";
                answer_string += "\\end{tabular}";
                
                for (var i=0; i<constants.max_digits; i++) {
                    latex_string += "\\\\"
                }
                for (var i=0; i<Math.max(constants.max_digits-1,1); i++) {
                    answer_string += "\\\\"
                }
                
                return {problem_string:latex_string,answer_string:answer_string};
            }
            
            function optimal_grid_size() {
                
                var cols;
                var rows;
                
                if (control_flow.format == "tall") {
                    
                    cols = 12 - Math.ceil(Math.log10(control_flow.range.max + 2));
                } else if (control_flow.format == "wide") {
                    
                    cols = 6 - Math.ceil(Math.log10(control_flow.range.max + 1));
                }
                
                rows = Math.ceil(control_flow.number_of_problems / cols);
                
                
                return {cols:cols,rows:rows};
            }
            
            
            function worksheet(latex_generator,formatting_function) {
                
                var grid_data = optimal_grid_size();
                var num_cols = grid_data.cols;
                var num_rows = grid_data.rows;
                
                var latex_code = generate_latex_preamble(num_cols);
                
                var answer_page = latex_code;
                var tmp_latex;
                
                for (var i=0; i<control_flow.number_of_problems; i++) {
                    tmp_latex = latex_generator(formatting_function);
                    latex_code += tmp_latex.problem_string;
                    answer_page += tmp_latex.answer_string;
                }
                
                latex_code +=
                    end_multicols()+
                    end_document();
                
                answer_page +=
                    end_multicols() +
                    end_document();
                
                var pdftex = new PDFTeX('../texlive.js-master/pdftex-worker.js');
                var previewEl = document.getElementById('problem-set-preview');
                pdf_is_loading('problem-set-preview-wrapper');
                pdftex.compile(latex_code)
                    .then(function(pdf) {
                        previewEl.setAttribute('src', pdf);
                        pdf_is_loaded('problem-set-preview-wrapper');
                        });
                    
                pdftex_2 = new PDFTeX('../texlive.js-master/pdftex-worker.js');
                previewEl_2 = document.getElementById('answer-set-preview');
                pdf_is_loading('answer-set-preview-wrapper');
                pdftex_2.compile(answer_page)
                    .then(function(pdf_2) {
                        previewEl_2.setAttribute('src', pdf_2);
                        pdf_is_loaded('answer-set-preview-wrapper');
                        });
            }
            
            function pdf_is_loading(wrapper_id) {
                
                document.getElementById(wrapper_id).classList.remove("loaded");
                document.getElementById(wrapper_id).classList.add("loading");
            }
            
            function pdf_is_loaded(wrapper_id) {
                
                document.getElementById(wrapper_id).classList.remove("loading");
                document.getElementById(wrapper_id).classList.add("loaded");
            }
            
            
            
            function system_of_equations_problem() {
                
            }
            
            
            
            
            

            function formatted_arithmetic_problem(max_digits,problem_type,after_skip,allow_zero) {
                
                var latex_string = "";
                var answer_string = "";
                var first_number = Math.floor(Math.random() * (Math.pow(10,max_digitss)));
                var second_number = Math.floor(Math.random() * (Math.pow(10,max_digitss)));
                
                answer_string += problem_type.func(first_number,second_number);
                answer_string += "\\\\";
                latex_string += "\\\\\\\\";
                
                var formatted_latex = problem_type.formatter+"{"+first_number+"}{"+second_number+"}";
                answer_string += formatted_latex;
                latex_string += formatted_latex;
                
                for (var i=0; i<max_digits; i++) {
                    latex_string += "\\\\"
                }
                for (var i=0; i<max_digits-1; i++) {
                    answer_string += "\\\\"
                }
                
                return {problem_string:latex_string,answer_string:answer_string}; 
            }
            
            
            
            
            
            
            
            
            
            
            
            
            function stacked_arithmetic_problem(max_value,operator,allow_zero,force_top_heavy,force_factors) {
                
                var constants = arithmetic_problem_constants(max_value,allow_zero,force_top_heavy,force_factors);
                
                var latex_string = tabular_column_formatting(constants.max_digits + 1);
                latex_string += " &" + tabular_digit_string(constants.top_number,constants.max_digits);

                latex_string += "\\\\";
                latex_string += operator.text + "&" + tabular_digit_string(constants.bottom_number,constants.max_digits);

                latex_string += "\\\\";
                latex_string += "\\hline";
                var answer_string = latex_string +
                    tabular_digit_string(operator.func(constants.top_number,
                                                       constants.bottom_number),
                                         constants.max_digits+1);
                latex_string += "\\\\";
                answer_string += "\\\\";
                latex_string += empty_tabular_row(constants.max_digits + 1);
                answer_string += empty_tabular_row(constants.max_digits + 1);
                latex_string += empty_tabular_row(constants.max_digits + 1);
                answer_string += empty_tabular_row(constants.max_digits + 1);
                latex_string += empty_tabular_row(constants.max_digits + 1);
                answer_string += empty_tabular_row(constants.max_digits + 1);
                
                latex_string += "\\end{tabular}";
                answer_string += "\\end{tabular}";
                
                for (var i=0; i<constants.max_digits; i++) {
                    latex_string += "\\\\"
                }
                for (var i=0; i<constants.max_digits-1; i++) {
                    answer_string += "\\\\"
                }
                
                return {problem_string:latex_string,answer_string:answer_string};
            }
            
            
            
            
            function wide_arithmetic_problem() {
                
                var operator = operations[control_flow.operation];
                var constants = arithmetic_problem_constants();
                
                var latex_string = tabular_column_formatting(5);
                latex_string += constants.top_number + " & ";

                latex_string += operator.text + " & " + constants.bottom_number + " & = & ";

                var answer_string = latex_string + operator.func(constants.top_number,constants.bottom_number);
                
                latex_string += "\\\\";
                answer_string += "\\\\";
                latex_string += empty_tabular_row(5);
                answer_string += empty_tabular_row(5);
                latex_string += empty_tabular_row(5);
                answer_string += empty_tabular_row(5);
                latex_string += empty_tabular_row(5);
                answer_string += empty_tabular_row(5);
                
                latex_string += "\\end{tabular}";
                answer_string += "\\end{tabular}";
                
                for (var i=0; i<constants.max_digits; i++) {
                    latex_string += "\\\\"
                }
                for (var i=0; i<constants.max_digits-1; i++) {
                    answer_string += "\\\\"
                }
                
                return {problem_string:latex_string,answer_string:answer_string};
            }
            
            function long_division_problem(problem_type,after_skip,allow_zero) {
                
                var latex_string = "";
                var answer_string = "";
                var first_number = Math.floor(Math.random() * (Math.pow(10,max_digitss)));
                var second_number = Math.floor(Math.random() * (Math.pow(10,max_digitss)));
                
                answer_string += problem_type.func(first_number,second_number);
                answer_string += "\\\\";
                latex_string += "\\\\\\\\";
                
                var formatted_latex = problem_type.formatter+"{"+first_number+"}{"+second_number+"}";
                answer_string += formatted_latex;
                latex_string += formatted_latex;
                
                for (var i=0; i<max_digits; i++) {
                    latex_string += "\\\\"
                }
                for (var i=0; i<max_digits-1; i++) {
                    answer_string += "\\\\"
                }
                
                return {problem_string:latex_string,answer_string:answer_string}; 
            }
            
            
            
            /*
            function stacked_arithmetic_worksheet(max_value,
                                                  f,
                                                  allow_zero,
                                                  force_top_heavy,
                                                  force_factors) {
                
                var pdftex = new PDFTeX('../texlive.js-master/pdftex-worker.js');
                
                var num_cols;
                if (max_value <= 10 ** 2) {
                    num_cols = 10;
                } else if (max_value <= 10 ** 4) {
                    num_cols = 7;
                } else if (max_digits <= 10 ** 6) {
                    num_cols = 5;
                } else {
                    num_cols = 3;
                }
                
                num_rows = num_cols;
                
                var latex_code = generate_latex_preamble(num_cols);
                
                var answer_page = latex_code;
                var tmp_latex;
                
                for (var i=0; i<num_cols*num_rows; i++) {
                    tmp_latex = stacked_arithmetic_problem();
                    latex_code += tmp_latex.problem_string;
                    answer_page += tmp_latex.answer_string;
                }
                
                latex_code +=
                    end_multicols()+
                    end_document();
                
                var previewEl = document.getElementById('problem-set-preview');
                pdftex.compile(latex_code)
                    .then(function(pdf) { previewEl.setAttribute('src', pdf); });
                
                
                //"\\pagebreak[4]" +
                answer_page +=
                    end_multicols()+
                    end_document();
                
                var previewEl = document.getElementById('answer-set-preview');
                pdftex.compile(answer_page)
                    .then(function(pdf) { previewEl.setAttribute('src', pdf); });
            }
            
            
            
            
            */
            

            worksheet(simple_arithmetic_problem,stacked_arithmetic_problem);

    <script src="../scripts/controllers.js"></script>
