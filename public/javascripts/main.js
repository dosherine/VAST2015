/**
 * Created by Dell on 2016/5/21.
 */
var svg_width = 500;
var svg_height =500;
var svg = d3.select("#map")
    .append("svg")
    .attr("width",svg_width)
    .attr("height",svg_height);

var rect_width = 5;
var rect_height = 5;
var circle_r = 3;
var offset_xy = rect_width/2;
var offset_r = circle_r/2;
var radio_num = 5;

//time set
var day = "Fri";
var hour = "20";
var minute = "12";
var rootpath = "data/";
var filename = day+"-"+hour+minute+".json";

var colorScale = d3.scale.category20();

function init(day,hour,minute){
    filename = day+"-"+hour+minute+".json";
    console.log("path:"+(rootpath+filename));
    d3.json(rootpath+filename,function(error,data){
        var part = data.parts;
        for(var i=0; i<part.length; i++){
            var subpart = part[i];
            var movement = new Array();//movement
            var m = 0;
            var checkin = new Array(); //checkin
            var n = 0;
            for(var j=0; j<subpart.length; j++){
                var pid = subpart[j].pid;
                var activity = subpart[j].activity;
                var x = subpart[j].x;
                var y = subpart[j].y;
                var time = subpart[j].time;
                var coordinate = new Array();
                coordinate[0] = x;
                coordinate[1] = y;
                coordinate[2] = pid;
                coordinate[3] = j%20;//color id
                coordinate[4] = activity;//color id
                coordinate[5] = time;//color id
                if(activity=="movement"){
                    movement[m] = coordinate;
                    m++;
                }
                else{
                    checkin[n] = coordinate;
                    n++;
                }
                //console.log( " x:"+ x + " " +"y:"  + y   + "\n" );
            }
            //console.log(svg);
            svg.selectAll("circle_"+i)
                .data(movement)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    return (d[0]+offset_r)*radio_num;
                })
                .attr("cy", function(d) {
                    return 500-(d[1]+offset_r)*radio_num;
                })
                .attr("r",circle_r )
                .style("fill",function(d) { return colorScale(i%20); })
                .style("fill-opacity", 0.7)

                .on("mouseover",function(d){
                    d3.select(this)
                        .style("fill-opacity", 0.5)
                        .attr("r",circle_r*5);

                    $("#pid").text(d[2]);
                    $("#x").text(d[0]);
                    $("#y").text(d[1]);
                    $("#activity").text(d[4]);
                    $("#time").text(d[5]);
                })
                .on("mouseleave",function(d){
                    d3.select(this)
                        .style("fill-opacity", 0.7)
                        .attr("r",circle_r);

                })
                .append("svg:title")
                .text(function(d){
                    return d[2];
                })
            ;

            svg.selectAll("rect"+i)
                .data(checkin)
                .enter()
                .append("rect")
                .attr("x", function(d) {
                    return (d[0]+offset_xy)*radio_num;
                })
                .attr("y", function(d) {
                    return 500-(d[1]+offset_xy)*radio_num;
                })
                .attr("width",rect_width )
                .attr("height",rect_height)
                .style("fill",function(d) { return colorScale(i%20); })
                .style("fill-opacity", 0.7)

                .on("mouseover",function(d){
                    d3.select(this)
                        .style("fill-opacity", 1)
                        .attr("width",rect_width*5)
                        .attr("height",rect_height*5);

                    $("#pid").text(d[2]);
                    $("#x").text(d[0]);
                    $("#y").text(d[1]);
                    $("#activity").text(d[4]);
                    $("#time").text(d[5]);
                })
                .on("mouseleave",function(d){
                    d3.select(this)
                        .style("fill-opacity", 0.7)
                        .attr("width",rect_width)
                        .attr("height",rect_height);

                })
                .append("svg:title")
                .text(function(d){
                    return d[2];
                })
            ;


        }
        $("#list-1").css("background",colorScale(1));
        $("#list-2").css("background",colorScale(2));
        $("#list-3").css("background",colorScale(3));
        $("#list-4").css("background",colorScale(4));
        $("#list-5").css("background",colorScale(5));
        $("#list-6").css("background",colorScale(6));
        $("#list-7").css("background",colorScale(7));
        $("#list-8").css("background",colorScale(8));
        $("#list-9").css("background",colorScale(9));
        $("#list-10").css("background",colorScale(10));
        $("#list-11").css("background",colorScale(11));
        $("#list-12").css("background",colorScale(12));

    });

}

init(day,hour,minute);

$("#movement").click(function(){
    $("rect").remove();
});

$("#checkin").click(function(){
    $("circle").remove();
});

$("#time_sub").click(function(){
    var sel_day = $("#day").val();
    var sel_hour = $("#hour").val();
    var sel_minute = $("#minute").val();
    $("circle").remove();
    $("rect").remove();
    init(sel_day,sel_hour,sel_minute);
});

$("#single_sub").click(function(pid){
    $("circle").remove();
    $("rect").remove();
    var sel_pid = $("#single_text").val();
    console.log("sel_pid:"+sel_pid);
    //read csv data

    singleLine("1001032",1);
    singleLine("1202957",6);
    singleLine("1406469",4);
});

function singleLine(name, color_index){
    d3.json("data/"+name+".json",function(error,csvdata){
        if(error){
            console.log(error);
        }

        var sel_csvdata = new Array();
        for (var i=0; i<csvdata.length; i++){
            var coordinate = new Array();
            //var time = csvdata[i].time;
            //var id = csvdata[i].id;
            //var type = csvdata[i].type;
            //var x = csvdata[i].x;
            //var y = csvdata[i].y;
            coordinate[0] = parseInt(csvdata[i].x);
            coordinate[1] = parseInt(csvdata[i].y);
            coordinate[2] = csvdata[i].id;
            coordinate[3] = csvdata[i].type;//color id
            coordinate[4] = csvdata[i].time;//color id
            sel_csvdata[i] = coordinate;
            //console.log(i+" time:"+ time + " " +
            //    "id:"  + id   +"x:"  +  coordinate[0]  +"y:"  + coordinate[1]   + "\n"
            //);
        }
        svg.selectAll("circle_single")
            .data(sel_csvdata)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return (d[0]+offset_r)*radio_num;
            })
            .attr("cy", function(d) {
                return 500-(d[1]+offset_r)*radio_num;
            })
            .attr("r",circle_r )
            .style("fill",colorScale(parseInt(color_index)))  //color settings
            .style("fill-opacity", 0.7)
            .on("mouseover",function(d){
                d3.select(this)
                    .style("fill-opacity", 1)
                    .attr("r",circle_r*5);

                $("#pid").text(d[2]);
                $("#x").text(d[0]);
                $("#y").text(d[1]);
                $("#activity").text(d[3]);
                $("#time").text(d[4]);
            })
            .on("mouseleave",function(d){
                d3.select(this)
                    .style("fill-opacity", 0.7)
                    .attr("r",circle_r);

            })
            .append("svg:title")
            .text(function(d){
                return d[3];
            })
        ;
    });
}
