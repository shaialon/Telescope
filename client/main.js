// Session variables
Session.set('initialLoad', true);
Session.set('today', new Date());
Session.set('view', 'top');
Session.set('postsLimit', getSetting('postsPerPage', 10));
Session.set('sessionId', Meteor.default_connection._lastSessionId);

STATUS_PENDING=1;
STATUS_APPROVED=2;
STATUS_REJECTED=3;

adminNav = adminNav.concat([
  {
    route: 'posts_pending',
    label: 'Pending'
  },
  {
    route: 'all-users',
    label: 'Users'
  },
  {
    route: 'settings',
    label: 'Settings'
  },
  {
    route: 'toolbox',
    label: 'Toolbox'
  }
]);

// Sort postModules array position using modulePositions as index
postModules = _.sortBy(postModules, function(module){return _.indexOf(modulePositions, module.position)});

postHeading = _.sortBy(postHeading, 'order');

postMeta = _.sortBy(postMeta, 'order');

Meteor.startup(function () {
  $('#rss-link').attr('title', i18n.t('New Posts'));

  AccountsEntry.config({
    homeRoute: '/',
    dashboardRoute: '/',
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    profileRoute: 'profile'
  });



  Meteor.call('getProducts', 2, function(error,other) {
    console.log('YYUM');
    if (error) {
      throwError(error.reason);
    }
  });

  // $.ajax({
  //     url: 'https://www.popshops.com/v3/products.json?account=bbhntrjt16yvunll9iyayufn4&catalog=2p3tubvtj2b3t7dmvo5k0vdn5&results_per_page=100&category=jewleryadsfsdfsdf/',
  //     //https://www.popshops.com/v3/products.json?account=bbhntrjt16yvunll9iyayufn4&catalog=db46yl7pq0tgy9iumgj88bfj7&results_per_page=100

  //     // data: formData,
  //     // dataType: "jsonp",
  //     // jsonpCallback: "localJsonpCallback",
  //     // type: "POST",

  //     type: "POST",
  //       crossDomain: true,
  //       // data: data,
  //       dataType: "json",
  //       success:function(result){
  //           alert(JSON.stringify(result));
  //       },
  //       error:function(xhr,status,error){
  //           alert(status);
  //       }

  // });

  // $.post('https://www.popshops.com/v3/products.json?account=bbhntrjt16yvunll9iyayufn4&catalog=2p3tubvtj2b3t7dmvo5k0vdn5&results_per_page=100&category=jewleryadsfsdfsdf',
  //     function(data){
  //       console.log(data);
  //     },"jsonp");

  // function createCORSRequest(method, url){
  //     var xhr = new XMLHttpRequest();
  //     if ("withCredentials" in xhr){
  //         // XHR has 'withCredentials' property only if it supports CORS
  //         xhr.open(method, url, true);
  //     } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
  //         xhr = new XDomainRequest();
  //         xhr.open(method, url);
  //     } else {
  //         xhr = null;
  //     }
  //     return xhr;
  // }

  // var request = createCORSRequest( "post", "https://www.popshops.com/v3/products.json?account=bbhntrjt16yvunll9iyayufn4&catalog=2p3tubvtj2b3t7dmvo5k0vdn5&results_per_page=100&category=jewlery" );
  // if ( request ){
  //     // Define a callback function
  //     request.onload = function(data){console.log(data);};
  //     // Send request
  //     request.send();
  // }


});


// localJsonpCallback = function(json) {
//     // if (!json.Error) {
//     //     $('#resultForm').submit();
//     // }
//     // else {
//     //     $('#loading').hide();
//     //     $('#userForm').show();
//     //     alert(json.Message);
//     // }
//     console.log(json.results.products);

// };