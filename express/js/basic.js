/**
* function that sets up page with basic click actions
**/

function setupPage(){
     // declare a variable. 
     //var urlOpenBalto = "https://data.baltimorecity.gov/resource/wsfq-mvij.json";
     var urlOpenBalto = "https://github.com/nytimes/covid-19-data/blob/master/us-counties.csv";
     //var urlLocalData = 'http://localhost/data/crimedata1.json';
     var urlLocalData = 'data/test.json';
     
 

   
     // make something happen when we click button1	
 /*	$('#button1').click(function(){                
            $.ajax({
           type: 'GET', 
           dataType: "json",
           accepts: 'application/json', 
           contentType: 'application/json',
           url: urlLocalData,
           success: function(data){
                $('#button-result').html(JSON.stringify(data));
           },
             error: function(msg){
             $('#button-result').html(JSON.stringify(msg));
            }  
        });
      });
 */
 
      // make something happen when we click button two
      $('#button1').click(function (){
       $.get(urlLocalData).done( function(data){
                $('#button-result').html(JSON.stringify(data.students.name));
           });
      });

      $('#button2').click(function (){
          $.get(urlLocalData).done( function(data){
                   $('#button-result').html(JSON.stringify(data.students.age));
              });
         });

         $('#button3').click(function (){
          $.get(urlLocalData).done( function(data){
                   $('#button-result').html(JSON.stringify(data.students.major));
              });
         });
      
      
 }