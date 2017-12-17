var my_id = 'PKEzKWv_FktMm2mGPjwd0Q';
var my_data;

function add_div(key, obj, flag) {
    var a = document.createElement('a');
    a.innerHTML = obj['user_name'];
    a.id = key;
    a.classList.add('list-group-item');
    if(flag)
        a.classList.add('active');

    a.onclick = function() {
        onUserSelect(key, obj);
    };

    document.getElementById('u_list').appendChild(a);
}

function userFilter() {
    var x = document.getElementById("slidebar").value;
    console.log("filter : " + x);
    var myNode = document.getElementById("u_list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    var sim_user_index = -1;
    for(var key in sortedUser) {
        if (sortedUser[key][0] == my_id) //my data
            continue;
        var com_biz_num = sortedUser[key][1][['common_biz_num']];
        if (x > com_biz_num) {
            //add in the list
            add_div(sortedUser[key][0], sortedUser[key][1]);
            if (sim_user_index == -1) {
                sim_user_index = key;
            }
        }
    }
    onUserSelect(sortedUser[sim_user_index][0], sortedUser[sim_user_index][1]);
}

function addRangeBar() {
    var range_element = document.getElementById("slide_container");

    var x = document.createElement("INPUT");
    x.id = "slidebar";
    x.setAttribute("class", "slider");
    x.setAttribute("type", "range");
    x.setAttribute("min", "5");
    x.setAttribute("max", "30");
    x.setAttribute("value", "30");
    range_element.appendChild(x);

    var y = document.createElement("BUTTON");
    y.setAttribute("class", "button");
    var span = document.createElement('span')
    span.innerHTML = "Apply";
    y.appendChild(span);
    y.onclick = function () {
        userFilter();
    };
    range_element.appendChild(y);
}

function onUserSelect(key, data) {
    //update UI
    console.log("onUserSelect");
    user_id = key;
    var bar_element = document.getElementById("svg_bar");
    bar_element.parentNode.removeChild(bar_element);
    var category_element = document.getElementById("svg_category");
    category_element.parentNode.removeChild(category_element);
    var time_series_element = document.getElementById("svg_time_series");
    time_series_element.parentNode.removeChild(time_series_element);
    updateUI(my_data, data);

    var children = document.getElementById('u_list').children;
    for (var i = 0; i < children.length; i++){
        if ( children[i].classList.contains('active') )
            children[i].classList.remove('active');
    }
    document.getElementById(key).classList.add('active');
}

function updateUI(my_data, user_data) {
    console.log("updateUI");
    var my_reviews = my_data['reviews'];
    var my_name = my_data['user_name'];
    var user_reviews = user_data['reviews'];
    var user_name = user_data['user_name'];

    n_user_reviews = [];
    for (var i =0; i < my_reviews.length; i++) {
        for (var j = 0; j < user_reviews.length; j++) {
            if (my_reviews[i]['business_id'] === user_reviews[j]['business_id']) {
                b = {};
                b["business"] = my_reviews[i]['name'];
                b[my_name] = my_reviews[i]['review_star'];
                b[user_name] = user_reviews[j]['review_star'];
                b["id"] = my_reviews[i]['business_id'];
                b["latitude"] = my_reviews[i]['latitude'];
                b["longitude"] = my_reviews[i]['longitude'];
                b["star"] = my_reviews[i]['star'];
                if (n_user_reviews.length > 30) {
                    break;
                }
                n_user_reviews.push(b);
                break;
            }
        }
    }

    var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

    var user_reviews = user_data['reviews'];

    var reviews = [];

    for (var i = 0; i < user_reviews.length; i++) {
        reviews.push({date: parseDate(user_reviews[i].date), star: +(user_reviews[i].review_star) });
    }

    reviews.sort(function(a, b) {
        return a.date.getTime() - b.date.getTime();
    });

    var bar_svg = d3.select("#bar");
    var groupBar = GroupBar()
        .my_name(my_name)
        .user_name(user_name)
        .width(800)
        .height(350);

    bar_svg
        .datum(n_user_reviews)
        .call(groupBar);

    var svg = d3.select("#category");
    var category = Category()
        .width(250)
        .height(250);
    svg
        .datum(user_data)
        .call(category);

    var time_series_svg = d3.select("#time_series");
    var timeSeries = TimeSeries()
        .my_name(my_name)
        .user_name(user_name)
        .width(550)
        .height(250);

    time_series_svg
        .datum(reviews)
        .call(timeSeries);
}

function sortProperties(obj)
{
    // convert object into array
    var sortable=[];
    for(var key in obj)
        if(obj.hasOwnProperty(key))
            sortable.push([key, obj[key]]); // each item is an array in format [key, value]

    // sort items by value
    sortable.sort(function(a, b)
    {
        return b[1]['sim']-a[1]['sim']; // compare numbers
    });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

var data = d3.json("./data/reviews.json", function(error, data) {
    console.log(data);
    sortedUser = sortProperties(data);
    var flag = true;
    for(var key in sortedUser) {
        if (sortedUser[key][0] == my_id) //my data
            continue;
        add_div(sortedUser[key][0], data[sortedUser[key][0]], flag);
        flag = false;
    }
    addRangeBar();

    user_id = sortedUser[1][0];
    my_data = data[my_id];
    user_data = data[user_id];
    updateUI(my_data, user_data);
});


