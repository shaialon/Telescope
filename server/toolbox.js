Meteor.methods({
  updateCategories: function () {
    // TODO: see if this method is still necessary
    if(isAdmin(Meteor.user())){
      Posts.find().forEach(function(post){
        if(post.categories){
          console.log('Found categories for post "'+post.title+'"');
          Posts.update(post._id,{$set:{userId:post.user_id}}, function(error){
            console.log(error);
          });
        }
      });
    }
  },
  giveInvites: function () {
    if(isAdmin(Meteor.user()))
      Meteor.users.update({}, {$inc:{inviteCount: 1}}, {multi:true});
  },
  updateCategoryInPosts: function (categoryId) {
    check(categoryId, String);

    if (!isAdmin(Meteor.user()))
      throw new Meteor.Error(403, "Not an admin");

    var category = Categories.findOne(categoryId);
    if (!category) {
      Posts.update(
        {}
      , {$pull: {categories: {_id: categoryId}}}
      , {multi: true}
      );
    } else {
      // Such update is server-only, because Minimongo does not support $ yet
      Posts.update(
        {'categories._id': categoryId}
      , {$set: {'categories.$': category}}
      , {multi: true}
      );
    }
  },
  getProducts:function(aa){
    return HTTP.call("POST", "https://www.popshops.com/v3/products.json",
           {params: {
                      account: 'bbhntrjt16yvunll9iyayufn4',
                      catalog: '2p3tubvtj2b3t7dmvo5k0vdn5',
                      results_per_page: 100,
                      category:'jewlery',
                    }}
                    );
    // return $.ajax({
    //     url: 'https://www.popshops.com/v3/products.json?account=bbhntrjt16yvunll9iyayufn4&catalog=2p3tubvtj2b3t7dmvo5k0vdn5&results_per_page=100&category=jewlery',
    //     //https://www.popshops.com/v3/products.json?account=bbhntrjt16yvunll9iyayufn4&catalog=db46yl7pq0tgy9iumgj88bfj7&results_per_page=100

    //     // data: formData,
    //     // dataType: "jsonp",
    //     // jsonpCallback: "localJsonpCallback",
    //     // type: "POST",

    //     type: "POST",
    //       // crossDomain: true,
    //       // data: data,
    //       dataType: "json",
    //       success:function(result){
    //           return (JSON.stringify(result));
    //       },
    //       error:function(xhr,status,error){
    //           return (status);
    //       }

    // });
  }
});