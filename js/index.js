var my_id = 'PKEzKWv_FktMm2mGPjwd0Q';
var my_data;

function add_div(key, obj) {
    var div = document.createElement('div');
    div.innerHTML = obj['user_name'];
    div.id =key;
    div.onclick = function() {
        onUserSelect(key, obj);
    };
    document.getElementById('user_list').appendChild(div);

}

function onUserSelect(key, data) {
    //update UI
    console.log("onUserSelect");
    user_id = key;
    var bar_element = document.getElementById("svg_bar");
    bar_element.parentNode.removeChild(bar_element);
    var category_element = document.getElementById("svg_category");
    category_element.parentNode.removeChild(category_element);
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
        .width(400)
        .height(400);
    svg
        .datum(user_data)
        .call(category);
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
    //list users based on sim
    var sim_result = [];
    for(var key in data) {
        if (key != my_id) {
            sim_result.push(similarity(key, data[my_id]['reviews'], data[key]['reviews']));
        }
    }
    sortedUser = sortProperties(sim_result);
    console.log(sortedUser);
    for(var key in sortedUser) {
        add_div(sortedUser[key][1].userId, data[sortedUser[key][1].userId]);
    }

    user_id = sortedUser[0][1].userId;
    my_data = data[my_id];
    user_data = data[user_id];
    updateUI(my_data, user_data);
});


