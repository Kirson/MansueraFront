    /**
     * INSPINIA - Responsive Admin Theme
     *
     * Main controller.js file
     * Define controllers with data used in Inspinia theme
     *
     *
     *
     *
     */

    /**
     * MainCtrl - controller
     * Contains severals global data used in diferent view
     *
     */
    function MainCtrl($scope,restServices,$modal, $timeout, $q, SweetAlert, $rootScope,$location) {


        $scope.logged = $rootScope.loggedin;
      
        if(!$scope.logged){
            $location.path('/auth/login');
        }

        $scope.order = "";
        $scope.orderId = "";

        $scope.roleId = $rootScope.role;
        console.log($rootScope.role);
        console.log($scope.roleId);

        if($scope.roleId==2){
            $scope.logistUser = true;
            $scope.comercialUser = false;
        }
        else{
            $scope.logistUser = false;
            $scope.comercialUser = true;
        }

        console.log($scope.logistUser);
        console.log($scope.comercialUser);

        /**
         * daterange - Used as initial model for data range picker in Advanced form view
         */
        this.daterange = {startDate: null, endDate: null}

        /**
         * slideInterval - Interval for bootstrap Carousel, in milliseconds:
         */
        this.slideInterval = 5000;


       



     
        $scope.exportAction = function(action){ 
            $scope.export_action=action;
            console.log("action");
            console.log( $scope.export_action);
            switch($scope.export_action){ 
                case 'pdf': $scope.$broadcast('export-pdf', {}); 
                      break; 
                case 'excel': $scope.$broadcast('export-excel', {fileName:'ordenes.xls'}); 
                      break; 
                case 'doc': $scope.$broadcast('export-doc', {});
                      break; 
                case 'csv': $scope.$broadcast('export-csv', {});
                      break; 
                default: console.log('no event caught'); 
            }
        };

        
       
    };

       


    function ModalInstanceCtrl ($scope, $modalInstance) {

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };



    };





    /**
     * CalendarCtrl - Controller for Calendar
     * Store data events for calendar
     */
    function CalendarCtrl($scope) {

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        // Events
        $scope.events = [
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];


        /* message on eventClick */
        $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
            $scope.alertMessage = (event.title + ': Clicked ');
        };
        /* message on Drop */
        $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = (event.title +': Droped to make dayDelta ' + dayDelta);
        };
        /* message on Resize */
        $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
            $scope.alertMessage = (event.title +': Resized to make dayDelta ' + minuteDelta);
        };

        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };

        /* Event sources array */
        $scope.eventSources = [$scope.events];
    };



    

    /**
     * translateCtrl - Controller for translate
     */
    function translateCtrl($translate, $scope) {
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };
    };



  function usersCtrl($scope,$rootScope,$http,restServices,$location,SweetAlert, $timeout, $modal){

    $scope.logged = $rootScope.loggedin;
      
    if(!$scope.logged){
        $location.path('/auth/login');
    }

    $scope.users = restServices('/api/user/getAll').query(function(data){  
           return data;
    });

    $scope.openUser = function (size,user) {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/user/views/user-edit.html',
                size: size,
                controller: userUpdateCtrl,
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            });
    };


  };


  function userCreateCtrl($scope,$rootScope,$http,restServices,$location,SweetAlert, $timeout){

    $scope.logged = $rootScope.loggedin;
      
    if(!$scope.logged){
        $location.path('/auth/login');
    }

    $scope.role = null;
    $scope.user = {};
    $scope.user.firstName   = "";
    $scope.user.lastName    = "";
    $scope.user.email       = "";
    $scope.user.login       = "";
    $scope.user.password    = "";
    $scope.user.role        = null;
    $scope.user.userRole        = null;

    $scope.roleList = restServices('/api/catalog/getSubCatalogsROLE').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data; 
    });

    $scope.onSelectedRole = function (selectedRole) {
        console.log("selectedRole");
        console.log(selectedRole);
        $scope.role = angular.copy(selectedRole);
        $scope.user.role = selectedRole;
        $scope.user.userRole = selectedRole;
    };
        
    var urlService = '/api/user/save';

    $scope.saveUser = function () {
        $scope.user =  restServices(urlService).save({user:$scope.user},function(data){  
            return data;
        });

        console.log("===**===");
        console.log($scope.user);
        SweetAlert.swal("Info", "El usuario ha sido guardado)", "info");
    };

  };

  function userUpdateCtrl($scope,$rootScope,$http,restServices,$location,SweetAlert, $timeout,$modalInstance,user){

    $scope.logged = $rootScope.loggedin;
      
    if(!$scope.logged){
        $location.path('/auth/login');
    }

    $scope.user = user;
    $scope.role = user.role;
    $scope.userRole = user.userRole;

    $scope.roleList = restServices('/api/catalog/getSubCatalogsROLE').query(function(data){  
        $scope.$broadcast('scroll2.refreshComplete');
        return data;
    });

    $scope.onSelectedRole = function (selectedRole) {
        console.log("selectedRole");
        console.log(selectedRole);
        $scope.role = angular.copy(selectedRole);
        $scope.user.role = selectedRole;
        $scope.user.userRole = selectedRole;
    };

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
   
    var urlService = '/api/user/save';

    $scope.updateUser = function () {
        $scope.user =  restServices(urlService).save({user:$scope.user},function(data){  
            return data;
        });

        console.log("===**===");
        console.log($scope.user);
        SweetAlert.swal("Info", "El usuario ha sido actualizado)", "info");
    };

  };

  function loginCtrl($scope,Base64,UserService,$rootScope,$http,restServices,$window,ngDialog,$location,SweetAlert, $timeout){
  
        $rootScope.loggedin = false;

        $scope.login = function () {

            var vurl = '/api/user/findByLoginPassword/'+ $scope.username + '/' + $scope.password + '/';
        
            console.log(vurl);

            var vId = null;
            var vRole = null;

            $scope.loginUser = restServices(vurl).get(function(data){  
                $scope.$broadcast('scroll.refreshComplete');
                console.log(">>>");
                console.log(data);
                vId = data.$promise.id;
                console.log("<<<<");
                console.log(vId);
                console.log(">>>");
                vId = data.id;
                console.log(vId);
                vRole = data.roleId;

                $timeout(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.$apply();
                    vId = data.id;
                    vRole = data.roleId;
                
                    $scope.$apply();
                }, 2000);

                if(vId!=null){
                    $rootScope.loggedin = true;
                    $rootScope.loggedUser = $scope.loginUser;
                    $rootScope.username = $scope.username;
                    $rootScope.password = $scope.password;
                    $rootScope.role = vRole;
                    
                        $location.path('/modules/brands');
                    
                }
                else{
                    console.log(">>>");
                    console.log(vId);
                    console.log("Error de autenticacion");
                    SweetAlert.swal("Error", "Usuario o clave incorrecta :)", "error");
                }

                return data;
            });

            console.log($scope.loginUser);
            console.log(vId);
        
      };

     
  };


  function partCtrl($scope,$rootScope,$http,restServices,$location,SweetAlert, $timeout, $modal){

    $scope.logged = $rootScope.loggedin;
      
      if(!$scope.logged){
        $location.path('/auth/login');
      }

    $scope.parts = restServices('/api/autopart/getAll').query(function(data){  
        return data;
    });

    

    $scope.openPart = function (size,part) {
        var modalInstance = $modal.open({
            templateUrl: 'app/modules/products/views/part-edit.html',
            size: size,
            controller: partUpdateCtrl,
            resolve: {
                part: function () {
                    return part;
                }
            }
        });
    };

    $scope.deletePart = function (size,part) {
            
        var urlService = '/api/autopart/delete';

        $scope.partDelete =  restServices(urlService).delete({partId:part.id},function(data){  

            console.log("data");
            console.log(data);

            if(data.response=="OK"){
                SweetAlert.swal("Info", "La parte ha sido eliminada)", "info");
            }else{
                SweetAlert.swal("Info", "La parte no puese ser eliminada)", "info");
            }
            return data;
        });

        console.log("===**===");
        console.log($scope.partDelete);

        $timeout(function() {
          
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        }, 1000);
            
        $scope.parts = restServices('/api/autopart/getAll/').query(function(data){  
            return data;
        });

       

        $timeout(function() {
          
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        }, 1000);
        
        $location.path('/modules/parts');
    };
  
  };

  function partCreateCtrl($scope,$rootScope,$http,restServices, SweetAlert,$location){

        $scope.logged = $rootScope.loggedin;
      
        if(!$scope.logged){
            $location.path('/auth/login');
        }

        

        $scope.part = {};
        $scope.part.code                = "";
        $scope.part.systemDescription   = "";
        $scope.part.fr                  = "";
        $scope.part.brand               = null;
        $scope.part.model               = null;
        $scope.part.observation         = null;
        $scope.part.partBrand           = null;
        $scope.part.startYear           = null;
        $scope.part.endYear             = null;
        $scope.part.category            = null;
        $scope.part.genericDescription  = null;
        

        
        $scope.brandSelected                = {};
        $scope.modelSelected                = {};
        $scope.observationSelected          = {};
        $scope.partBrandSelected            = {};
        $scope.startYearSelected            = {};
        $scope.endYearSelected              = {};
        $scope.categorySelected             = {};
        $scope.genericDescriptionSelected   = {};
        $scope.brand                = {};
        $scope.model                = {};
        $scope.observation          = {};
        $scope.partBrand            = {};
        $scope.startYear            = {};
        $scope.endYear              = {};
        $scope.category             = {};
        $scope.genericDescription   = {};
        
        $scope.brandList = restServices('/api/brand/getAll').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });  

        $scope.modelList = restServices('/api/model/getAll').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });  

        $scope.categoryList = restServices('/api/catalog/getSubCatalogsCATREP').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });   

        $scope.observationList = restServices('/api/catalog/getSubCatalogsOBSERVACION').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });   

        $scope.partBrandList = restServices('/api/catalog/getSubCatalogsMARPARTE').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });   

        $scope.yearList = restServices('/api/catalog/getSubCatalogsANIO').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });   

         $scope.genericDescriptionList = restServices('/api/catalog/getSubCatalogsDESCGEN').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });   

         $scope.onSelectedBrand = function (selectedBrand) {
            console.log("selectedBrand");
            console.log(selectedBrand);
            $scope.brand = angular.copy(selectedBrand);
            $scope.part.brand = selectedBrand;

            var url = '/api/brand/getModels'+selectedBrand.id

            $scope.modelList = restServices(url).query(function(data){  
                $scope.$broadcast('scroll2.refreshComplete');
                return data;
            });  

        };

         $scope.onSelectedModel = function (selectedModel) {
            console.log("selectedModel");
            console.log(selectedModel);
            $scope.model = angular.copy(selectedModel);
            $scope.part.model = selectedModel;
        };

         $scope.onSelectedCategory = function (selectedCategory) {
            console.log("selectedCategory");
            console.log(selectedCategory);
            $scope.category = angular.copy(selectedCategory);
            $scope.part.category = selectedCategory;
        };

        $scope.onSelectedObservation = function (selectedObservation) {
            console.log("selectedObservation");
            console.log(selectedObservation);
            $scope.observation = angular.copy(selectedObservation);
            $scope.part.observation = selectedObservation;
        };

        $scope.onSelectedPartBrand = function (selectedPartBrand) {
            console.log("selectedPartBrand");
            console.log(selectedPartBrand);
            $scope.partBrand = angular.copy(selectedPartBrand);
            $scope.part.partBrand = selectedPartBrand;
        };

        $scope.onSelectedStartYear = function (selectedStartYear) {
            console.log("selectedStartYear");
            console.log(selectedStartYear);
            $scope.startYear = angular.copy(selectedStartYear);
            $scope.part.startYear = selectedStartYear;
        };

        $scope.onSelectedEndYear = function (selectedEndYear) {
            console.log("selectedEndYear");
            console.log(selectedEndYear);
            $scope.endYear = angular.copy(selectedEndYear);
            $scope.part.endYear = selectedEndYear;
        };

        $scope.onSelectedGenericDescription = function (selectedGenericDescription) {
            console.log("selectedGenericDescription");
            console.log(selectedGenericDescription);
            $scope.genericDescription = angular.copy(selectedGenericDescription);
            $scope.part.genericDescription = selectedGenericDescription;
        };

        

         var urlService = '/api/autopart/save';

        $scope.savePart = function () {
           $scope.part =  restServices(urlService).save({autoPart:$scope.part},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.part);

            
            SweetAlert.swal("Info", "La parte ha sido guardada)", "info");

            $location.path('/modules/parts');
        };
  };


  function partUpdateCtrl($scope,$rootScope,$http,restServices, part,$modalInstance, SweetAlert,$timeout,$location){

        $scope.logged = $rootScope.loggedin;
      
        if(!$scope.logged){
            $location.path('/auth/login');
        }

        

        $scope.part = part;


        console.log($scope.part);
        
        $scope.brandSelected                = {};
        $scope.modelSelected                = {};
        $scope.observationSelected          = {};
        $scope.partBrandSelected            = {};
        $scope.startYearSelected            = {};
        $scope.endYearSelected              = {};
        $scope.categorySelected             = {};
        $scope.genericDescriptionSelected   = {};
        
        $scope.brand                = $scope.part.brand;
        $scope.model                = $scope.part.model;
        $scope.observation          = $scope.part.observation;
        $scope.partBrand            = $scope.part.partBrand;
        $scope.startYear            = $scope.part.startYear;
        $scope.endYear              = $scope.part.endYear;
        $scope.category             = $scope.part.category;
        $scope.genericDescription   = $scope.part.genericDescription;
        
        /*
        $scope.brand                = {};
        $scope.model                = {};
        $scope.observation          = {};
        $scope.partBrand            = {};
        $scope.startYear            = {};
        $scope.endYear              = {};
        $scope.category             = {};
        $scope.genericDescription   = {};
        */
        $scope.brandList = restServices('/api/brand/getAll').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });  

        $scope.modelList = restServices('/api/model/getAll').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });  

        $scope.categoryList = restServices('/api/catalog/getSubCatalogsCATREP').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });   

        $scope.observationList = restServices('/api/catalog/getSubCatalogsOBSERVACION').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });   

        $scope.partBrandList = restServices('/api/catalog/getSubCatalogsMARPARTE').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });   

        $scope.yearList = restServices('/api/catalog/getSubCatalogsANIO').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });   

        $scope.genericDescriptionList = restServices('/api/catalog/getSubCatalogsDESCGEN').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });   

         $scope.onSelectedBrand = function (selectedBrand) {
            console.log("selectedBrand");
            console.log(selectedBrand);
            $scope.brand = angular.copy(selectedBrand);
            $scope.part.brand = selectedBrand;

            var url = '/api/brand/getModels'+selectedBrand.id

            $scope.modelList = restServices(url).query(function(data){  
                $scope.$broadcast('scroll2.refreshComplete');
                return data;
            });  

        };

         $scope.onSelectedModel = function (selectedModel) {
            console.log("selectedModel");
            console.log(selectedModel);
            $scope.model = angular.copy(selectedModel);
            $scope.part.model = selectedModel;
        };

         $scope.onSelectedCategory = function (selectedCategory) {
            console.log("selectedCategory");
            console.log(selectedCategory);
            $scope.category = angular.copy(selectedCategory);
            $scope.part.category = selectedCategory;
        };

        $scope.onSelectedObservation = function (selectedObservation) {
            console.log("selectedObservation");
            console.log(selectedObservation);
            $scope.observation = angular.copy(selectedObservation);
            $scope.part.observation = selectedObservation;
        };

        $scope.onSelectedPartBrand = function (selectedPartBrand) {
            console.log("selectedPartBrand");
            console.log(selectedPartBrand);
            $scope.partBrand = angular.copy(selectedPartBrand);
            $scope.part.partBrand = selectedPartBrand;
        };

        $scope.onSelectedStartYear = function (selectedStartYear) {
            console.log("selectedStartYear");
            console.log(selectedStartYear);
            $scope.startYear = angular.copy(selectedStartYear);
            $scope.part.startYear = selectedStartYear;
        };

        $scope.onSelectedEndYear = function (selectedEndYear) {
            console.log("selectedEndYear");
            console.log(selectedEndYear);
            $scope.endYear = angular.copy(selectedEndYear);
            $scope.part.endYear = selectedEndYear;
        };

        $scope.onSelectedGenericDescription = function (selectedGenericDescription) {
            console.log("selectedGenericDescription");
            console.log(selectedGenericDescription);
            $scope.genericDescription = angular.copy(selectedGenericDescription);
            $scope.part.genericDescription = selectedGenericDescription;
        };

        

         var urlService = '/api/autopart/save';

        $scope.updatePart = function () {
           $scope.part =  restServices(urlService).save({autoPart:$scope.part},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.part);

            
            SweetAlert.swal("Info", "La parte ha sido guardada)", "info");

            $location.path('/modules/parts');
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
  };


  
  

  function brandCtrl($scope,$rootScope,$http,restServices,$location,SweetAlert, $timeout, $modal){

    $scope.logged = $rootScope.loggedin;
      
      if(!$scope.logged){
        $location.path('/auth/login');
      }

    $scope.brands = restServices('/api/brand/getAll').query(function(data){  
        return data;
    });

    

    $scope.openBrand = function (size,brand) {
        var modalInstance = $modal.open({
            templateUrl: 'app/modules/products/views/brand-edit.html',
            size: size,
            controller: brandUpdateCtrl,
            resolve: {
                brand: function () {
                    return brand;
                }
            }
        });
    };

    $scope.deleteBrand = function (size,brand) {
            
        var urlService = '/api/brand/delete';

        $scope.brandDelete =  restServices(urlService).delete({brandId:brand.id},function(data){  

            console.log("data");
            console.log(data);

            if(data.response=="OK"){
                SweetAlert.swal("Info", "La marca ha sido eliminada)", "info");
            }else{
                SweetAlert.swal("Info", "La marca no puese ser eliminada)", "info");
            }
            return data;
        });

        console.log("===**===");
        console.log($scope.brandDelete);

        $timeout(function() {
          
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        }, 1000);
            
        $scope.brands = restServices('/api/brand/getAll/').query(function(data){  
            return data;
        });

       

        

        $timeout(function() {
          
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        }, 1000);
        
        $location.path('/modules/brands');
    };
  
  };

  function brandCreateCtrl($scope,$rootScope,$http,restServices, SweetAlert,$location){

        $scope.logged = $rootScope.loggedin;
      
        if(!$scope.logged){
            $location.path('/auth/login');
        }

        

        $scope.brand = {};
        $scope.brand.name              = "";
        $scope.brand.description       = "";
        $scope.brand.nemonic            = "";
        

        

        $scope.modelSelected  = {};
        $scope.brandModels = [];
        
        $scope.newModel  = {
            id: -1,
            modelName: "",
            description: "",
            nemonic: ""
        };

        $scope.removeModelList = [];

        $scope.showAddModel = false;

        $scope.getTemplate = function (model) {
            if (model.id === $scope.modelSelected.id) return 'edit';
            else return 'display';
        };

        $scope.editModel = function (model) {
            $scope.modelSelected = angular.copy(model);
        };

        $scope.saveModel = function (idx) {
            console.log("Saving Model");
            $scope.brandModels[idx] = angular.copy($scope.modelSelected);
            $scope.reset();
        };

        $scope.reset = function () {
            $scope.cmodelSelected = {};
            $scope.newModel  = {
                id: -1,
                modelName: "",
                description: "",
                nemonic: ""
            };
        };

        $scope.addModel = function () {
            $scope.showAddModel = true;
        };

        $scope.addNewModel = function () {
            $scope.brandModels.push($scope.newModel);
            $scope.showAddModel = false;
            $scope.reset();
            $scope.getTemplate($scope.newModel);
        };


        $scope.cancelNewModel = function () {
            $scope.showAddModel = false;
            $scope.reset();
            $scope.getTemplate($scope.newModel);
        };

        $scope.removeModel = function (idx) {
            console.log("Ingresa a remover");
            console.log(idx);
            $scope.modelSelected = angular.copy($scope.brandModels[idx]);
            $scope.brandModels.splice(idx, 1);
            $scope.removeModelList.push($scope.modelSelected);
            $scope.showAddModel= false;
           
            $timeout(function() {
                $scope.reset();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$apply();
            }, 1000);

            
            $scope.getTemplate($scope.newModel);
        };

       

         var urlService = '/api/brand/create';

        $scope.saveBrand = function () {
           $scope.brand =  restServices(urlService).save({brand:$scope.brand,modelList:$scope.brandModels},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.brand);

            
            SweetAlert.swal("Info", "La marca ha sido guardada)", "info");

            $location.path('/modules/brands');
        };
  };


  function brandUpdateCtrl($scope,$rootScope,$http,restServices,brand,$modalInstance, SweetAlert,$timeout,$location){

        $scope.logged = $rootScope.loggedin;
      
        if(!$scope.logged){
            $location.path('/auth/login');
        }

        $scope.modelSelected  = {};
        $scope.brandModels = [];

        $scope.newModel  = {
            id: -1,
            name: "",
            phone: "",
            email: ""
        };

        $scope.removeModelList = [];

        $scope.showAddModel = false;

        console.log("brand");
        console.log(brand);

        $scope.brand  = brand;
        

        console.log("brand");
        console.log($scope.brand);


        

        var urlService = '/api/brand/getModels'+$scope.brand.id;

        $scope.brandModels = restServices(urlService).query(function(data){  
           return data;
        });

        console.log($scope.brandModels);

        // gets the template to ng-include for a table row / item
        $scope.getTemplate = function (model) {
            if (model.id === $scope.modelSelected.id) return 'edit';
            else return 'display';
        };

        $scope.editModel = function (model) {
            $scope.modelSelected = angular.copy(model);
        };

        $scope.saveModel = function (idx) {
            console.log("Saving model");
            $scope.brandModels[idx] = angular.copy($scope.modelSelected);
            $scope.reset();
        };

        $scope.reset = function () {
            $scope.modelSelected = {};
            $scope.newModel  = {
                id: -1,
                name: "",
                phone: "",
                email: ""
            };
        };

        $scope.addModel = function () {
            $scope.showAddModel = true;
        };

        $scope.addNewModel = function () {
            $scope.brandModels.push($scope.newModel);
            $scope.showAddModel = false;
            $scope.reset();
            $scope.getTemplate($scope.newModel);
        };


        $scope.cancelNewModel = function () {
            $scope.showAddModel = false;
            $scope.reset();
            $scope.getTemplate($scope.newModel);
        };

        $scope.removeModel = function (idx) {
            console.log("Ingresa a remover");
            console.log(idx);
            $scope.modelSelected = angular.copy($scope.brandModels[idx]);
            $scope.brandModels.splice(idx, 1);
            $scope.removeModelList.push($scope.modelSelected);
            $scope.showAddModel = false;

            $timeout(function() {
                 urlService = '/api/brand/removeModel';
                $scope.resp =  restServices(urlService).save({model:$scope.modelSelected},function(data){  
                    return data;
                });
                console.log($scope.resp);
                $scope.reset();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$apply();
            }, 1000);

            
            $scope.getTemplate($scope.newModel);
        };

        
        $scope.updateBrand = function (vbrand) {
           urlService = '/api/brand/update';
           $scope.brand =  restServices(urlService).save({brand:vbrand,modelList:$scope.brandModels,removeModelList:$scope.removeModelList},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.brand);

            
            SweetAlert.swal("Info", "La marca ha sido actualizada)", "info");
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
  };





  function catalogCtrl($scope,$rootScope,$http,restServices,$location,SweetAlert, $timeout, $modal){

    $scope.logged = $rootScope.loggedin;
      
      if(!$scope.logged){
        $location.path('/auth/login');
      }

    $scope.catalogs = restServices('/api/catalog/getMainCatalogs').query(function(data){  
           return data;
    });

    
    $scope.openCatalog = function (size,catalog) {
        var modalInstance = $modal.open({
            templateUrl: 'app/modules/catalog/views/catalog-edit.html',
            size: size,
            controller: catalogUpdateCtrl,
            resolve: {
                catalog: function () {
                    return catalog;
                }
            }
        });
    };

    
  
  };

function catalogCreateCtrl($scope,$rootScope,$http,restServices, SweetAlert,$location){

    $scope.logged = $rootScope.loggedin;
      
    if(!$scope.logged){
        $location.path('/auth/login');
    }


    $scope.cat = {};
    $scope.cat.name         = "";
    $scope.cat.nemonic      = "";
    $scope.cat.description  = "";
        
    $scope.catalogSelected  = {};
    $scope.catalogDetails = [];
        
    $scope.newCatalog  = {
        id: -1,
        name: "",
        nemonic: "",
        description: ""
    };

    $scope.removeDetailList = [];

    $scope.showAddDetail = false;

    $scope.getTemplate = function (catalog) {
        if (catalog.id === $scope.catalogSelected.id) return 'edit';
        else return 'display';
    };

    $scope.editDetail = function (catalog) {
        $scope.catalogSelected = angular.copy(catalog);
    };

    $scope.saveDetail = function (idx) {
        console.log("Saving detail");
        $scope.catalogDetails[idx] = angular.copy($scope.catalogSelected);
        $scope.reset();
    };

    $scope.reset = function () {
        $scope.catalogSelected = {};
        $scope.newCatalog  = {
            id: -1,
            name: "",
            nemonic: "",
            description: ""
        };
    };

    $scope.addDetail = function () {
        $scope.showAddDetail = true;
    };

    $scope.addNewDetail = function () {
        $scope.catalogDetails.push($scope.newCatalog);
        $scope.showAddDetail = false;
        $scope.reset();
        $scope.getTemplate($scope.newCatalog);
    };


    $scope.cancelNewDetail = function () {
        $scope.showAddDetail = false;
        $scope.reset();
        $scope.getTemplate($scope.newCatalog);
    };

    $scope.removeDetail = function (idx) {
        console.log("Ingresa a remover");
        console.log(idx);
        $scope.catalogSelected = angular.copy($scope.catalogDetails[idx]);
        $scope.catalogDetails.splice(idx, 1);
        $scope.removeDetailList.push($scope.catalogSelected);
        $scope.showAddDetail = false;
           
        $timeout(function() {
            $scope.reset();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        }, 1000);

            
        $scope.getTemplate($scope.newCatalog);
    };

    var urlService = '/api/catalog/save';

    $scope.saveCatalog = function () {
        $scope.catalog =  restServices(urlService).save({catalog:$scope.cat,detailList:$scope.catalogDetails},function(data){  
            return data;
        });

        console.log("===**===");
        console.log($scope.catalog);
 
        SweetAlert.swal("Info", "El catalogo ha sido guardado)", "info");

        $location.path('/modules/catalogs');
    };
  };

  function catalogUpdateCtrl($scope,$rootScope,$http,restServices,catalog,$modalInstance, SweetAlert,$timeout,$location){

        $scope.logged = $rootScope.loggedin;
      
        if(!$scope.logged){
            $location.path('/auth/login');
        }

        $scope.catalogSelected  = {};
        $scope.catalogDetails = [];


        $scope.newCatalog  = {
            id: -1,
            name: "",
            nemonic: "",
            description: ""
        };

        $scope.removeDetailList = [];

        $scope.showAddDetail = false;

        $scope.cat = catalog;

        var urlService = '/api/catalog/getSubCatalogs'+$scope.cat.nemonic;

        $scope.catalogDetails = restServices(urlService).query(function(data){  
           return data;
        });

        console.log($scope.catalogDetails);

        // gets the template to ng-include for a table row / item
        $scope.getTemplate = function (catalog) {
            if (catalog.id === $scope.catalogSelected.id) return 'edit';
            else return 'display';
        };

        $scope.editDetail = function (catalog) {
            $scope.catalogSelected = angular.copy(catalog);
        };

        $scope.saveDetail = function (idx) {
            console.log("Saving detail");
            $scope.catalogDetails[idx] = angular.copy($scope.catalogSelected);
            $scope.reset();
        };

        $scope.reset = function () {
            $scope.catalogSelected = {};
            $scope.newCatalog  = {
                id: -1,
                name: "",
                nemonic: "",
                description: ""
            };
        };

        $scope.addDetail = function () {
            $scope.showAddDetail = true;
        };

        $scope.addNewDetail = function () {
            $scope.catalogDetails.push($scope.newCatalog);
            $scope.showAddDetail = false;
            $scope.reset();
            $scope.getTemplate($scope.newCatalog);
        };


        $scope.cancelNewDetail = function () {
            $scope.showAddDetail = false;
            $scope.reset();
            $scope.getTemplate($scope.newCatalog);
        };

        $scope.removeDetail = function (idx) {
            console.log("Ingresa a remover");
            console.log(idx);
            $scope.catalogSelected = angular.copy($scope.catalogDetails[idx]);
            $scope.catalogDetails.splice(idx, 1);
            $scope.removeDetailList.push($scope.catalogSelected);
            $scope.showAddDetail = false;

            $timeout(function() {
                 urlService = '/api/catalog/removeDetail';
                $scope.resp =  restServices(urlService).save({detail:$scope.catalogSelected},function(data){  
                    return data;
                });
                console.log($scope.resp);
                $scope.reset();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$apply();
            }, 1000);

            
            $scope.getTemplate($scope.newCatalog);
        };

        

        $scope.updateCatalog = function (vcatalog) {
           urlService = '/api/catalog/save';
           $scope.catalog =  restServices(urlService).save({catalog:vcatalog,detailList:$scope.catalogDetails,removeList:$scope.removeDetailList},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.catalog);

            
            SweetAlert.swal("Info", "El catalogo ha sido actualizado)", "info");
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
  };


       


    /**
     *
     * Pass all functions into module
     */
    angular
        .module('inspinia')
        .controller('MainCtrl', MainCtrl)
        .controller('brandCtrl',brandCtrl)
        .controller('brandCreateCtrl', brandCreateCtrl)
        .controller('brandUpdateCtrl', brandUpdateCtrl)
        .controller('CalendarCtrl', CalendarCtrl)
    	.controller('translateCtrl', translateCtrl)
        .controller('loginCtrl', loginCtrl)
        .controller('usersCtrl',usersCtrl)
        .controller('userCreateCtrl',userCreateCtrl)
        .controller('userUpdateCtrl',userUpdateCtrl)
        .controller('catalogCtrl',catalogCtrl)
        .controller('catalogCreateCtrl',catalogCreateCtrl)
        .controller('catalogUpdateCtrl',catalogUpdateCtrl)
        .controller('partCtrl',partCtrl)
        .controller('partCreateCtrl',partCreateCtrl)
        .controller('partUpdateCtrl',partUpdateCtrl);

