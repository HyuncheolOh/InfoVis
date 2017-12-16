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
        var children = document.getElementById('u_list').children;
        for (var i = 0; i < children.length; i++){
            if ( children[i].classList.contains('active') )
                children[i].classList.remove('active');
        }
        a.classList.add('active');
        onUserSelect(key, obj);
    };

    document.getElementById('u_list').appendChild(a);
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

    var bar_svg = d3.select("#bar");
    var groupBar = GroupBar()
        .my_name(my_name)
        .user_name(user_name)
        .width(800)
        .height(400);

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
        .datum(user_data)
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
    sortedUser = sortProperties(data);
    var flag = true;
    for(var key in sortedUser) {
        if (key == 0) //my data
            continue;
        add_div(sortedUser[key][0], data[sortedUser[key][0]], flag);
        flag = false;
    }

    user_id = sortedUser[1][0];
    my_data = data[my_id];
    user_data = data[user_id];
    updateUI(my_data, user_data);
});


