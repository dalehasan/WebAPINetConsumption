//create angularjs controller
var app = angular.module('app', ['ui.bootstrap', 'ngAnimate']);//set and get the angular module


//*******************************orderController
app.controller('orderController', ['$scope', '$http', orderController]);
function orderController($scope, $http) {
    $http.get('http://hidayathasan.net/project1/api/order/').success(function (data) {
        $scope.Orders = data;
        $scope.filteredTodos = data;
    }).error(function () {
        $scope.error = "An Error has occured while loading posts order controller!";
    });
 
    //set default option to 5 records per page
    //$scope.quantity2 = 5;
    //toggle hide or show the order table
    $scope.myVarOrder = false;
    $scope.toggleOrder = function () {
        $scope.myVarOrder = !$scope.myVarOrder;
    };

    //pagination
  // $scope.filteredTodos = [];
   $scope.currentPage = 2;
   $scope.numPerPage = 10;
   $scope.maxSize = 5;
  
   $scope.$watch('currentPage + numPerPage', function () {
       var begin = (($scope.currentPage - 1) * $scope.numPerPage)
       , end = begin + $scope.numPerPage;

   $scope.filteredTodos = $scope.Orders.slice(begin, end);

   });
    //end of pagination

}


//*******************************customerController
app.controller('customerController', ['$scope', '$http', customerController]);
//angularjs controller method
function customerController($scope, $http) {

    //set default option to 5 records per page
    $scope.quantity = 5;
    //set default option to CompanyName per page
    $scope.myOrderBy = "CompanyName";

    //toggle hide or show the customer table
    $scope.myVarCustomer = false;
    $scope.toggleCustomer = function () {
        $scope.myVarCustomer = !$scope.myVarCustomer;
    };


    //filter by clicking on header
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = x;
    };

    //declare variable for mainain ajax load and entry or edit mode
    $scope.loading = true;
    $scope.addMode = false;

    //get all customer information
    $http.get('http://hidayathasan.net/project1/api/customer/').success(function (data) {
        $scope.customers = data;
        $scope.loading = false;
    })
    .error(function () {
        $scope.error = "An Error has occured while loading posts on customer controller!";
        $scope.loading = false;
    });
    

    //by pressing toggleEdit button ng-click in html, this method will be hit
    $scope.toggleEdit = function () {
        this.customer.editMode = !this.customer.editMode;
    };

    //by pressing toggleAdd button ng-click in html, this method will be hit
    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;
    };

    //Inser Customer
    $scope.add = function () {
        $scope.loading = true;
        $http.post('/api/Customer/', this.newcustomer).success(function (data) {
            alert("Added Successfully!!");
            $scope.addMode = false;
            $scope.customers.push(data);
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occured while Adding Customer! " + data;
            $scope.loading = false;
        });
    };

    //Edit Customer
    $scope.save = function () {
        alert("Edit");
        $scope.loading = true;
        var frien = this.customer;
        alert(frien);
        $http.put('/api/Customer/' + frien.CustomerID, frien).success(function (data) {
            alert("Saved Successfully!!");
            frien.editMode = false;
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving customer! " + data;
            $scope.loading = false;
        });
    };

    //Delete Customer
    $scope.deletecustomer = function () {
        $scope.loading = true;
        var Id = this.customer.CustomerID;
        $http.delete('/api/Customer/' + Id).success(function (data) {
            alert("Deleted Successfully!!");
            $.each($scope.customers, function (i) {
                if ($scope.customers[i].CustomerID === Id) {
                    $scope.customers.splice(i, 1);
                    return false;
                }
            });
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving Customer! " + data;
            $scope.loading = false;
        });
    };

}

