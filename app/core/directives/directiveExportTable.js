(function(){
//export html table to pdf, excel and doc format directive
var exportTable = function(){
var link = function($scope, elm, attr){
$scope.$on('export-pdf', function(e, d){
      elm.tableExport({type:'pdf', escape:'false',fileName:'export.pdf'});
 });
$scope.$on('export-excel', function(e, d){
       elm.tableExport({type:'excel', escape:false,fileName:'export.xls'});
 });
$scope.$on('export-doc', function(e, d){
     elm.tableExport({type: 'doc', escape:false,fileName:'export.doc'});
 });
$scope.$on('export-csv', function(e, d){
     elm.tableExport({type: 'csv', escape:false,fileName:'export.csv'});
 });
}
return {
  restrict: 'C',
  link: link
   }
 }
angular
 .module('ExportTableDirectives', [])
 .directive('exportTable', exportTable);
})();