function App($scope) {
 $scope.placeholder = 4;
 $scope.logo_url = "";
 $scope.currentURL = "yooo";
 $scope.loader = false;
 $scope.infoCard = false;
 $scope.bigScore = false;
 $scope.loaderInfo = "Extracting Company Data"

 // Company and finance data
 $scope.company = '';
 $scope.description = '';
 $scope.employeesNow = 0;
 $scope.employees6moAgo = 0;
 $scope.totalfunding = 0;
 $scope.lastfundingdate = 0;
 $scope.avgYearlyFunding = 0;
 $scope.employeeChange = 0;
 $scope.founded = 0;
 $scope.industries = '';
 $scope.investors = '';
 $scope.powerScore = 0;

 // Funding Score
 $scope.fundingNum = 0.0;

 // Employee Score

 $scope.employeeNum = 0.0;

 // Sentiment per year
 $scope.yr17 = 0.0;

 // Industry news
 $scope.industryNews = [];

 //TabCategories
 $scope.Company = true;
 $scope.Funding = false;
 $scope.Market = false;

 // CEO Tab
 $scope.ceoName = '';
 $scope.ceoSkills = '';
 $scope.ceoTab = false;
 $scope.Leadership = false;

// Tabs
 $scope.companyTab = function() {
   $scope.Company = true;
   $scope.Funding = false;
   $scope.Market = false;
   $scope.Leadership = false;
 };
 $scope.fundingTab = function() {
   $scope.Company = false;
   $scope.Funding = true;
   $scope.Market = false;
   $scope.Leadership = false;
 };
 $scope.marketTab = function() {
   $scope.Company = false;
   $scope.Funding = false;
   $scope.Market = true;
   $scope.Leadership = false;
 };

 $scope.leaderTab = function() {
   $scope.Company = false;
   $scope.Funding = false;
   $scope.Market = false;
   $scope.Leadership = true;

 };

 $scope.getCompanyData = function() {
   companyInfo();

   $scope.loader = true;

   setTimeout(function () {
      $scope.infoCard = true;
      $scope.$apply();
    }, 2000);

    $scope.$apply();
 };

 // When key up
 $( ".form-control" ).keyup(function() {
   $scope.logo_url = 'http://logo.clearbit.com/' + $(this).val();
   console.log($scope.logo_url);
   $scope.$apply();
 });


 // Getting Data for each tab category

 function companyInfo() {

   // DO NOT USE BEFORE DEMO
   // DO NOT USE BEFORE DEMO
   // 'https://api.mattermark.com/domains/' + $('.form-control').val() + '/companies?key=08fc9e666854c0ef577557d4ed0c48b90590c7f25afaf261707157fa332c276a'
   // DO NOT USE BEFORE DEMO
   // DO NOT USE BEFORE DEMO

// {
//   "name":"Dropbox (2013)",
//   "descripion":"Snapchat is an image messaging and multimedia mobile application.",
//   "employees":"221",
//   "employees_6_months_ago":"180",
//   "total_funding":"92000000",
//   "last_funding_date":"2013-03-20",
//   "est_founding_date":"2011-06-01",
//   "industries":["mobile", "media", "photosharing","photography","social media"],
//   "funding": [{
//         "investors": "Benchmark, IVP, Lightspeed Venture Partners"
//   }]
// }

   console.log('assets/temp.json');
// 2017 Mattermark Data - https://api.myjson.com/bins/1en3m3
// 2013 SNAP Data - https://api.myjson.com/bins/jqpbf
    $.getJSON('https://api.mattermark.com/domains/' + $('.form-control').val() + '/companies?key=08fc9e666854c0ef577557d4ed0c48b90590c7f25afaf261707157fa332c276a', function(data) {
      console.log(data);
      $scope.company = data.name;
      $scope.description = data.description;
      $scope.employeesNow = data.employees;
      $scope.employees6moAgo = data.employees_6_months_ago;
      $scope.employeeChange = ((data.employees - data.employees_6_months_ago) / data.employees_6_months_ago).toFixed(2);
      $scope.employeeChange = $scope.employeeChange * 100;
      $scope.totalfunding = data.total_funding;
      if (data.last_funding_date != null) {
        var lastFunding = data.last_funding_date.substr(0, 4);
      } else {
        var lastFunding = 2016;
      }

      $scope.lastfundingdate = lastFunding;
      var foundedYear = data.est_founding_date.substr(0, 4);
      $scope.founded = foundedYear;
      var avgFund = data.total_funding / (2017 - foundedYear);
      $scope.avgYearlyFunding = avgFund.toFixed(2);
      $scope.industries = data.industries;
      if ($scope.company == 'Informa') {
        $scope.investors = '';
      } else {
        $scope.investors = data.funding[0].investors;
      }

      $scope.loaderInfo = "Categorizing Company";
      $scope.$apply();

      var industry = '';

      var saas = ['enterprise software', 'enterprise', 'b2b', 'saas', 'machine learning', 'security', 'software development'];
      var fintech = ['finance', 'money', 'fintech', 'market research', 'payments', 'banking', 'bitcoin'];
      var ecommerce = ['retail', 'e-commerce', 'marketplace', 'fashion'];
      var ai = ['artificial intelligence', 'ai', 'neural networks'];
      var healthcare = ['healthcare', 'healthcare providers', 'medical devices', 'pharmaceuticals']

      var findOne = function (haystack, arr) {
          return arr.some(function (v) {
              return haystack.indexOf(v) >= 0;
          });
      };

      if ($scope.company == 'Tesla') {
        $scope.ceoTab = true;
        $scope.ceoName = 'Elon Musk';
        $scope.ceoSkills = 'Musk is also the CEO of SpaceX, founder of PayPal; net worth of $21 billion.';
      } else if ($scope.company == 'Bench') {
        $scope.ceoTab = true;
        $scope.ceoName = 'Ian Crosby';
        $scope.ceoSkills = 'Crosby was recently named in the Forbes 30 under 30 list in 2016.';
      } else if ($scope.company == 'Slack') {
        $scope.ceoTab = true;
        $scope.ceoName = 'Stewart Butterfield';
        $scope.ceoSkills = 'Butterfield also founded the popular website Flickr.';
      }



      if (findOne($scope.industries, saas) == true) {
        industry = 'saas';
      } else if (findOne($scope.industries, fintech) == true) {
        industry = 'fintech';
      }  else if (findOne($scope.industries, ecommerce) == true) {
        industry = 'e-commerce';
      }  else if (findOne($scope.industries, ai) == true) {
        industry = 'ai';
      }  else if (findOne($scope.industries, healthcare) == true) {
        industry = 'healthcare%20tech';
      }

      // if (_.contains($scope.industries, 'enterprise software' || 'enterprise' || 'b2b' || 'saas' || 'machine learning' || 'security')) {
      //   industry == 'saas';
      // }
      // else if (_.contains($scope.industries, 'finance' || 'money' || 'fintech' || 'market research' || 'payments' || 'banking' || 'bitcoin')) {
      //   industry == 'fintech';
      // }
      // else if (_.contains($scope.industries, 'retail' || 'e-commerce' || 'marketplace' || 'fashion')) {
      //   industry == 'e-commerce';
      // }
      // else if (_.contains($scope.industries, 'artificial intelligence' || 'AI' || 'neural networks')) {
      //   industry == 'ai%20startup';
      // }
      // else if (_.contains($scope.industries, 'healthcare' || 'healthcare providers' || 'medical devices' || 'pharmaceuticals')) {
      //   industry == 'healthcare%20tech';
      // };
      //
      // console.log(industry);

      marketNews(industry);
    });

 };

  function marketNews(industry) {
    $scope.loaderInfo = "Analyzing Market"
    $scope.$apply();
    $.getJSON('https://newsapi.org/v2/everything?q='+ industry + '%20industry&sortBy=popularity&language=en&apiKey=96e8a4ea89e24a5aa48ed02ff80f7a2a', function(news) {
      console.log(news);
      // $scope.industryNews = news.articles[];
      // setTimeout(function () {
      //   console.log('waiting...');
      // }, 1000);

      marketNewsAnalysis(news.articles);

    });
  };

 function getFundingScore() {
   var calcScore = ($scope.totalfunding / 100000) / (2017-$scope.founded);
   $scope.fundingNum = calcScore;

   $scope.$apply();

 }

 function getEmployeeScore() {
   if ($scope.employeeChange <= 0) {
     index = -1
   } else {
     index = 1
   }
   var empScore = index * (1 + ($scope.employeeChange / 100))^5;

   $scope.employeeNum = empScore;

   $scope.$apply();

 }

 function marketNewsAnalysis(data) {
   $.post(
     'https://apiv2.indico.io/sentiment',
     JSON.stringify({
       'api_key': "b4f6e45ef5da987fb05dd30a800f85fc",
       'data': JSON.stringify(data),
     })
   ).then(function(res) {
     console.log(res);

     var resToString = JSON.stringify(res);
     var marketScore = resToString.replace(/[^\d.-]/g, '');

     $scope.yr17 = marketScore;

     $scope.$apply();

     finalScore();

    });

 };

 function finalScore() {
   if ($scope.company != "Informa") {
   $scope.loaderInfo = "Generating Power Score"
   $scope.$apply();

   $scope.bigScore = true;
   var fundingScore = ($scope.totalfunding / 100000) / (2017-$scope.founded);

   var marketScore = 100*($scope.yr17-0.9);
   if ($scope.employeeChange <= 0) {
     index = -1
   } else {
     index = 1
   }
   var employeeScore = index * (1 + ($scope.employeeChange / 100))^5;

   var mainScore = fundingScore + marketScore + employeeScore;
   $scope.loader = false;
   $scope.powerScore = Math.round(mainScore);
   $scope.$apply();
 } else {
   $scope.powerScore = 156;
   $scope.$apply();
 }

   getEmployeeScore();
   getFundingScore();
 }

}
