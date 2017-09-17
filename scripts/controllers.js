window.mobile_check = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

window.mobile_and_tablet_check = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

window.tablet_check = function() {
    var m = window.mobile_check();
    var m_t = window.mobile_and_tablet_check();
    return (m_t && !m);
}

function select_icon(e) {
    
    if (this.classList.contains("title-icon")) return 0;
    
    var parent = this.parentNode.classList;
    
    for (var i in icons) {
        if (icons.hasOwnProperty(i) && icons[i].parentNode.classList == parent) {
            icons[i].classList.remove("selected");
        }
    }
    control_flow[this.parentNode.parentNode.attributes["data-control-flow-attr"].value] = this.attributes["data-value"].value;
    this.parentNode.parentNode.classList.add("collapsed");
    
    var this_title = this.childNodes[0].innerHTML;
    this.parentNode.previousElementSibling.className = "title-icon " + this.className;
    this.parentNode.previousElementSibling.childNodes[0].innerHTML = this_title;
    
    this.classList.add("selected");
}

function expand_menu() {
    console.log(this);
    this.parentNode.classList.remove("collapsed");
}

function blur_range_input() {
    control_flow.range[this.attributes["data-control-flow-attr"].value] = this.value;
}

function select_button() {
    
    var selection = this.attributes["data-value"].value;
    var parent = this.parentNode.classList;
    
    for (var i in buttons) {
        if (buttons.hasOwnProperty(i) && buttons[i].parentNode.classList == parent) {
            buttons[i].classList.remove("selected");
        }
    }
    control_flow[this.parentNode.parentNode.attributes["data-control-flow-attr"].value] = selection;
    this.classList.add("selected");
}

function boolean_button_click() {
    
    var val = this.attributes["data-value"].value;
    this.attributes["data-value"].value = val == "false" ? "true" : "false";
    control_flow[this.attributes["data-control-flow-attr"].value] = this.attributes["data-value"].value;
}

function display_worksheet(e) {
    
    e.stopPropagation();
    document.getElementById("control-panel").classList.add("collapsed");
    generate_worksheet();
}

function pdf_is_loading(wrapper_id) {
                
                console.log(wrapper_id)
    document.getElementById(wrapper_id).classList.remove("loaded");
    document.getElementById(wrapper_id).classList.add("loading");
}

function pdf_is_loaded(wrapper_id) {
    
    document.getElementById(wrapper_id).classList.remove("loading");
    document.getElementById(wrapper_id).classList.add("loaded");
}

function display_pdf(preview_id,latex_string) {
    
    var pdftex = new PDFTeX('../texlive.js-master/pdftex-worker.js');
        pdftex.set_TOTAL_MEMORY(512*1024*1024);
    
    var previewEl = document.getElementById(preview_id);
    
    pdf_is_loading(preview_id+"-wrapper");
    pdftex.compile(latex_string)
        .then(function(pdf) {
            previewEl.setAttribute('src', pdf);
            pdf_is_loaded(preview_id+"-wrapper");
        });
}

function generate_worksheet() {
    
    var grid = optimal_grid_size();
    var latex_code = generate_latex_preamble(grid.cols);
    var closure = end_multicols() + end_document();
    
    var answer_page = latex_code;
    var tmp_latex;
    
    for (var i=0; i<grid.cols * grid.rows; i++) {
        tmp_latex = formatter_function_map[control_flow.operation][control_flow.format]();
        latex_code += tmp_latex.problem_string;
        answer_page += tmp_latex.answer_string;
    }
    
    latex_code += closure;
    answer_page += closure;
    
    console.log(latex_code);
    console.log(answer_page);
}



function compile_latex_on_server(problem_string,answer_string) {

    $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
        var user_ip = JSON.parse(JSON.stringify(data, null, 2));
        
        var date = new Date(),
            datetime = date.getTime(),
            formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            formatted_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    
        var grid = control_flow.grid_size == undefined ? optimal_grid_size() : control_flow.grid_size;
        problem_string = generate_latex_preamble(grid.cols);
        var closure = (control_flow.multicol == "true" ? end_multicols() : "") +
            end_document();
        
        answer_string = problem_string;
        var tmp_latex, n = control_flow.problems == undefined ? grid.cols * grid.rows : control_flow.problems;
        if (control_flow.num_problems_override != undefined) n = control_flow.num_problems_override;
        
        for (var i=0; i<n; i++) {
            tmp_latex = formatter_function_map[control_flow.operation][control_flow.format](i+1, i==n-1 && control_flow.challenge_problem == "true" ? true : false);
            problem_string += tmp_latex.problem_string + latex_line_break(2);
            answer_string += tmp_latex.answer_string + latex_line_break(2);
        }
        
        problem_string += closure;
        answer_string += closure;
        
        console.log(problem_string);
        console.log(answer_string);
        
        $.ajax({
            method: "POST",
            url: "../scripts/latex-compiler.php",
            data: {
                problem_string: problem_string,
                answer_string: answer_string,
                datetime: datetime,
                user_ip: user_ip.ip,
                page_url: window.location.href,
                date: formatted_date,
                time: formatted_time,
                topic: control_flow.topic,
                sub_topic: control_flow.sub_topic,
                operation: control_flow.operation
            },
            success: function(data) {
                console.log(data);
                document
                    .getElementById("problem-set-preview")
                    .setAttribute('src',"http://104.238.100.5:/latex-outputs/"+datetime+"-problem-set.pdf");
                document
                    .getElementById("answer-set-preview")
                    .setAttribute('src',"http://104.238.100.5:/latex-outputs/"+datetime+"-answer-set.pdf");
            }
        });
    });
    
    
}





function display_pdf_from_server_file(wrapper_id,file_location) {
    
}








