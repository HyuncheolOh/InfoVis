function similarity(myReviews, userReviews) {

    var myMean = 0;
    var userMean = 0;
    var mySum = 0;
    var userSum = 0;

    //get mean value
    for (var i =0; i < myReviews.length; i++) {
        mySum += myReviews[i]['review_star'];
    }
    myMean = mySum / myReviews.length;

    for (var i =0; i < userReviews.length; i++) {
        userSum += userReviews[i]['review_star'];
    }
    userMean = userSum / userReviews.length;

    console.log("myMean : " + myMean);
    console.log("userMean : " + userMean);

    var tempMyReviews = JSON.parse(JSON.stringify(myReviews));
    var tempUserReviews = JSON.parse(JSON.stringify(userReviews));


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
    console.log(mySqrt);
    console.log(userSqrt);

    var multiSum = 0;
    for (var i =0; i < tempMyReviews.length; i++) {
        for (var j = 0; j < tempUserReviews.length; j++) {
            if (tempMyReviews[i]['business_id'] === tempUserReviews[j]['business_id']) {
                multiSum += tempMyReviews[i]['review_star'] * tempUserReviews[j]['review_star'];
            }
        }
    }

    var sim = multiSum / (mySqrt * userSqrt);
    console.log("sim is : " + sim);
}