//This sim is calculating with same restaurant's star result
function similarity(userId, myReviews, userReviews) {

    var tt = JSON.parse(JSON.stringify(myReviews));
    var aa = JSON.parse(JSON.stringify(userReviews))
    var tempMyReviews = [],
        tempUserReviews = [];
    var myMean = 0;
    var userMean = 0;
    var mySum = 0;
    var userSum = 0;

    for (var i =0; i < myReviews.length; i++) {
        for (var j = 0; j < userReviews.length; j++) {
            if (myReviews[i]['business_id'] === userReviews[j]['business_id']) {
                tempMyReviews.push(tt[i]);
                tempUserReviews.push(aa[j]);
            }
        }
    }
    // console.log(tempMyReviews);
    // console.log(tempUserReviews);

    //get mean value
    for (var i =0; i < tempMyReviews.length; i++) {
        mySum += tempMyReviews[i]['review_star'];
    }
    myMean = mySum / tempMyReviews.length;

    for (var i =0; i < tempUserReviews.length; i++) {
        userSum += tempUserReviews[i]['review_star'];
    }
    userMean = userSum / tempUserReviews.length;

    // console.log("myMean : " + myMean);
    // console.log("userMean : " + userMean);

    //normalization
    var mySquareSum = 0;
    var userSquareSum = 0;
    for (var i = 0; i < tempMyReviews.length; i++) {
        tempMyReviews[i]['review_star'] -= myMean;
        mySquareSum += Math.pow(tempMyReviews[i]['review_star'], 2);
    }

    for (var i = 0; i < tempUserReviews.length; i++) {
        tempUserReviews[i]['review_star'] -= userMean;
        userSquareSum += Math.pow(tempUserReviews[i]['review_star'], 2);
    }

    var mySqrt = Math.sqrt(mySquareSum);
    var userSqrt = Math.sqrt(userSquareSum);

    //calculation
    // console.log(mySqrt);
    // console.log(userSqrt);

    var multiSum = 0;
    for (var i =0; i < tempMyReviews.length; i++) {
        if (tempMyReviews[i]['business_id'] === tempUserReviews[i]['business_id']) {
            multiSum += tempMyReviews[i]['review_star'] * tempUserReviews[i]['review_star'];
        }
    }

    var sim = multiSum / (mySqrt * userSqrt);


    if (isNaN(sim)) {
        sim = 0;
    }
    // console.log("sim is : " + sim);

    var result = {userId : userId, sim : sim, businessNum: tempUserReviews.length};
    return result;

}