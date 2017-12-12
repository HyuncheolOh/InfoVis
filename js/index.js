user_id = 'PKEzKWv_FktMm2mGPjwd0Q';
c_user_id = '4ZfcCa4m5RWvO4EFzfYm1A';

var data = d3.json("./data/reviews.json", function(error, data) {

    user_data = data[user_id];
    c_user_data = data[c_user_id];

    var user_reviews = user_data['reviews'];
    var c_user_reviews = c_user_data['reviews'];

    var user_name = user_data['user_name'];
    var c_user_name = c_user_data['user_name'];

    n_user_reviews = [];
    for (var i =0; i < user_reviews.length; i++) {
        for (var j = 0; j < c_user_reviews.length; j++) {
            if (user_reviews[i]['business_id'] === c_user_reviews[j]['business_id']) {
                b = {};
                b["business"] = user_reviews[i]['name'];
                b[user_name] = user_reviews[i]['review_star'];
                b[c_user_name] = c_user_reviews[j]['review_star'];
                n_user_reviews.push(b);
                break;
            }
        }
    }

    var bar_svg = d3.select("#bar");
    var groupBar = GroupBar()
        .user_name(user_name)
        .c_user_name(c_user_name)
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
        .datum(c_user_data)
        .call(category);
});


