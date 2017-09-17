function empty_tabular_row(num_columns) {
    
    var line = [];
    for (var i=0; i<num_columns; i++) {
        line.push(" ");
    }
    line = line.join("&") + "\\\\\\\\";
    return line;
}

function tabular_column_formatting(num_columns) {
    
    var latex_string = " \\begin{tabular}{";
    for (var i=0; i<num_columns; i++) {
        latex_string += "c@{\\,}"
    }
    latex_string += "c} ";
    
    return latex_string;
}

function end_tabular() {
    return "\\end{tabular}";
}

function tabular_digit_string(num,digits) {
    
    num = num.toString().split("");
    var leadingSpaces = digits - num.length;
    
    for (var i=0; i<leadingSpaces; i++) {
        num.unshift(" ");
    }
    
    return num.join("&");
}

function begin_document() {
    
    var preamble = "\\documentclass[letterpaper,"+
        (control_flow.font_size == undefined ? "12pt" : control_flow.font_size)+
        "]{extarticle}"+
        "\\pagestyle{empty}"+
        "\\usepackage{extsizes}"+
        "\\usepackage{tabularx}"+
        "\\usepackage{multicol} \\setlength \\columnsep{30pt}"+
        "\\usepackage{amsmath}"+
        "\\usepackage{amssymb}"+
        "\\usepackage[margin=0.75in,footskip=0pt,bottom=0pt,bmargin=0pt]{geometry}"+
        "\\usepackage{tikz}"+
        "\\usepackage{clock}"+
        "\\usepackage{xcolor}"+
        //"\\usepackage[clock]{ifsym}"+
        "\\begin{document}";
        
    return preamble;
}

function right_justify(text) {
    
    return "\\begin{flushright}" +
        text +
        "\\end{flushright}";
}

function end_document() {
    return "\\end{document}";
}

function begin_multicols(cols) {
    
    var latex = " \\begin{multicols}{"+cols+"} ";
    return latex;
}

function latex_header() {

    var latex = "";
    
    if (control_flow.has_header == "true") {
        latex += "\\noindent "+
        "Name$\\rule{2in}{0.15mm}$ \\hspace{0.25in}" +
        "Teacher$\\rule{2in}{0.15mm}$ \\hspace{0.25in}" +
        "Date$\\rule{.75in}{0.15mm}$" +
        latex_line_break(2);
    }
    
    if (control_flow.memo != undefined) {
        latex += control_flow.memo + latex_line_break(1);
    }
    
    return latex;
}

function latex_colored_text(color,text) {
    
    return "\\textcolor{"+color+"}{"+text+"}";
}

function end_multicols() {
    return "\\end{multicols}";
}

function latex_line_break(n) {
    if (n == undefined) n = 1;
    var latex = "";
    
    for (var i=0; i<n; i++) {
        latex += "\\\\\\\\";
    }
    return latex;
}

function latex_hline() {
    return " \\hline ";
}

function generate_latex_preamble(cols) {
    
    var preamble = begin_document()+
        latex_header()+
        (control_flow.multicol == "true" ? (begin_multicols(cols) + " \\noindent ") : "");
        
    return preamble;
}

function latex_long_division(factor,multiple) {
    
    return factor + "& $|$ &" + "$\\mkern-6mu\\overline{\\kern.2ex" + multiple + "}$";
}

function latex_fraction(numerator,denominator) {

    return "\\frac{"+numerator+"}{"+denominator+"}";
}

function latex_radical(c,r) {

    if (c == 0) return "0";
    
    return (c < 0 ? "-" : "") +
        "\\$" +
        (c == 1 ? "" : Math.abs(c)) +
        (r == 1 ? "" : "\\sqrt{"+r+"}") +
        "\\$";
}

function latex_prime_factorization(f) {
    
    var s = [];
    
    for (i in f) {
        s.push("\\$" + i + (f[i] == 1 ? "" : "^" + f[i]) + "\\$");
    }
    
    return s.join(" \\$\\times\\$ ");
}

function latex_matrix_0(arr,opening_bracket,closing_bracket) {

    if (opening_bracket == undefined) opening_bracket = "[";
    if (closing_bracket == undefined) closing_bracket = "]";

    var cols = "";
    for (var i=0; i<arr[0].length; i++) {
        cols += "c";
    }
    var str = "\\[\\left."+opening_bracket+"\\begin{array}{" + cols + "}",
        this_line, contents = [];
    
    for (i=0; i<arr.length; i++) {
        this_line = [];
        for (var j=0; j<arr[i].length; j++) {
            this_line.push(arr[i][j]);
        }
        contents.push(this_line.join(" & "));
    }
    
    str += contents.join(latex_line_break()) + "\\end{array}\\right."+closing_bracket+"\\]";
    
    return str;
}

function latex_matrix(arr) {

    var str = "\\$ \\begin{bmatrix} ",
        this_line, contents = [];
    
    for (i=0; i<arr.length; i++) {
        this_line = [];
        for (var j=0; j<arr[i].length; j++) {
            this_line.push(" " + arr[i][j] + " ");
        }
        contents.push(this_line.join(" & "));
    }
    
    str += contents.join(latex_line_break(1)) + " \\end{bmatrix} \\$";
    
    return str;
}

function latex_grid(step_size,width) {
    
    "\\begin{tikzpicture}"+
    "\\draw[step=0.4cm,gray,very thin] (0,0) grid (3.2,3.2); "+
    "\\draw (1.6,3.2) -- (1.6,0);"+
    "\\draw (0,1.6) -- (3.2,1.6);"+
    //"\\fill[blue] (3,0) circle (2pt) node [black,below left] {$C$};"+
    //"%"+
    //"\\draw[thick] (3,0) circle(3);"+
    //"\\begin{scope}[>=latex]"+
    //"\\draw[->] (3,0) -- (6,0)  node [midway,fill=white] {3$a$};"+
    //"\\draw[->] (3,0) -- ++(45:3)  node [midway,sloped,fill=white] {3$a$};"+
    //"\\end{scope}"+
    "\\end{tikzpicture}";
}

function latex_number_line(min,max,p1,p1_is_inclusive,p2,p2_is_inclusive) {
    
    var nums = [];
    for (var i=min; i<=max; i++) {
        nums.push(i);
    }
    
    var latex =
        //"\\usetikzlibrary{arrows}"+
        " \\begin{tikzpicture} "+
        " \\draw[latex-latex] ("+(min-0.5)+",0) -- ("+(max+0.5)+",0) ; "+
        " \\foreach \\x in  {"+nums.join(",")+"} "+
        " \\draw[shift={(\\x,0)},color=black] (0pt,3pt) -- (0pt,-3pt); "+
        " \\foreach \\x in {"+nums.join(",")+"} "+
        " \\draw[shift={(\\x,0)},color=black] (0pt,0pt) -- (0pt,-3pt) node[below] "+
        " {$\\x$}; "+
        (p1 != undefined ? " \\draw[blue, very thick"+(p1_is_inclusive ? ", fill=blue": "")+"] ("+p1+",0) circle (0.1); " : "")+
        (p2 != undefined ? " \\draw[blue, very thick"+(p2_is_inclusive ? ", fill=blue": "")+"] ("+p2+",0) circle (0.1); " : "")+
        (p2 != undefined ? " \\draw[blue, very thick] ("+p1+",0) -- ("+p2+",0); " : "")+
        " \\end{tikzpicture} ";
    
    return latex;
}

function latex_rectangular_solid(w,h,d,has_grid,color) {

    d *= -1;
    if (color == undefined) color = "black";
    
    var latex = " \\begin{tikzpicture}[scale=0.5] "+
        " \\draw["+color+", very thick] (0,0,0) -- ("+w+",0,0) -- ("+w+","+h+",0) -- (0,"+h+",0) -- cycle; "+
        " \\draw["+color+", very thick] ("+w+",0,0) -- ("+w+",0,"+d+") -- ("+w+","+h+","+d+") -- ("+w+","+h+",0) -- cycle; "+
        " \\draw["+color+", very thick] ("+w+","+h+",0) -- ("+w+","+h+","+d+") -- (0,"+h+","+d+") -- (0,"+h+",0) -- cycle; ";
        
        if (has_grid) {
            latex += " \\foreach \\x in {0,...,"+w+"} "+
            " { "+
                " \\draw["+color+", very thick] (\\x ,0 , 0) -- (\\x ,"+h+" ,0 ); "+
                " \\draw["+color+", very thick] (\\x ,"+h+" , 0) -- (\\x ,"+h+" ,"+d+" ); "+
            " } "+
            " \\foreach \\y in {0,...,"+h+"} "+
            " { "+
                " \\draw["+color+", very thick] (0 ,\\y , 0) -- ("+w+" ,\\y ,0 ); "+
                " \\draw["+color+", very thick] ("+w+" ,\\y , 0) -- ("+w+" ,\\y ,"+d+" ); "+
            " } "+
            " \\foreach \\z in {0,...,"+d+"} "+
            " { "+
                " \\draw["+color+", very thick] (0 ,"+h+" , \\z ) -- ("+w+" ,"+h+" ,\\z ); "+
                " \\draw["+color+", very thick] ("+w+" ,"+h+" ,\\z ) -- ("+w+" ,0 ,\\z ); "+
            " } ";
        }
        
        latex += " \\end{tikzpicture} ";
        return latex;
}

function latex_equilateral_triangle(s,has_grid,scale,color) {
    
    var m = s/2, h = m * Math.sqrt(3), unit_m = 0.5, unit_h = unit_m * Math.sqrt(3);
    if (color == undefined) color = "black";
    
    var latex = " \\begin{tikzpicture}[scale="+scale+"] "+
        " \\draw["+color+", very thick]"+" (0,0) -- ("+s+",0) -- ("+m+","+h+") -- cycle; ";
        if (has_grid) {
            for (var i=0; i<s; i++) {
                latex += " \\draw["+color+", very thick] ("+i+",0) -- ("+(m+unit_m*i)+","+(h-unit_h*i)+"); " +
                    " \\draw["+color+", very thick] ("+(unit_m*i)+","+unit_h*i+") -- ("+(s-unit_m*i)+","+unit_h*i+"); " +
                    " \\draw["+color+", very thick] ("+i+",0) -- ("+(unit_m*i)+","+unit_h*i+"); "
            }
        }
    latex += " \\end{tikzpicture} ";
        return latex;
}


function latex_circle_partitioned(p,r) {
    
    r = r[0];
    
    var t = Math.floor(Math.random() * 180),
        d1 = circle_diameter_endpoints(0,0,r,t),
        d2 = circle_diameter_endpoints(0,0,r,t+90);
    
    var latex = " \\begin{tikzpicture} "+
        " \\draw (0,0) circle ("+r+"); ";
        if (p >= 1) {
                latex += " \\draw ("+d1[0][0]+","+d1[0][1]+") -- ("+d1[1][0]+","+d1[1][1]+"); ";
            if (p == 2) {
                latex += " \\draw ("+d2[0][0]+","+d2[0][1]+") -- ("+d2[1][0]+","+d2[1][1]+"); ";
            }
        }
        
        latex += " \\end{tikzpicture} ";
        return latex;
}

function latex_rectangle_partitioned(p,d) {
    
    var w = d[0], h = d[1];
    
    var latex = " \\begin{tikzpicture} " +
        " \\draw (0,0) -- ("+w+",0) -- ("+w+","+h+") -- (0,"+h+") -- cycle; " ;
    
        if (p >= 1) {
                latex += " \\draw (0,"+(h/2)+") -- ("+w+","+(h/2)+"); ";
            if (p == 2) {
                latex += " \\draw ("+(w/2)+",0) -- ("+(w/2)+","+h+"); ";
            }
        }
        
        latex += " \\end{tikzpicture} ";
        
    return latex;
}

function complex_string(coefficient_array) {
    //if you are reading this: i'm sorry
    
    var math_env = "\\$",
        string = (coefficient_array[0] < 0 ? "-" : "");
        string += coefficient_array[0] == 0 ? "" : math_env + Math.abs(coefficient_array[0]) + math_env;
        
        if (coefficient_array[1] != 0) string += (coefficient_array[1] < 0 ? " - " : (coefficient_array[0] == 0 ? "" : " + ")) +
            math_env + (Math.abs(coefficient_array[1]) == 1 ? "" : Math.abs(coefficient_array[1])) + "i" + math_env;
        
    return string;
}


function complex_tabular(coefficient_array) {
    
    var t_1 = "$" + (coefficient_array[0] < 0 ? "-" : "") + Math.abs(coefficient_array[0]) + "$";
    var middle_sign = coefficient_array[1] < 0 ? "-" : "+";
    var t_2 = "$" + Math.abs(coefficient_array[1]) + "i$";
    
    return [t_1,middle_sign,t_2].join(" & ");
}


