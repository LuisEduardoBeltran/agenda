
$(document).ready(function() {


   var $calendar = $('#calendar');
   var id = 10;

   $calendar.weekCalendar({
      timeslotsPerHour : 4,
      allowCalEventOverlap : true,
      overlapEventsSeparate: true,
      firstDayOfWeek : 1,
      businessHours :{start: 8, end: 21, limitDisplay: true },
      daysToShow : 7,
      height : function($calendar) {
         return $(window).height() - $("h1").outerHeight() - 1;
      },
      eventRender : function(calEvent, $event) {
         if (calEvent.end.getTime() < new Date().getTime()) {
            $event.css("backgroundColor", "#");
            $event.find(".wc-time").css({
               "backgroundColor" : "#eeb6f5",
               "border" : "1px solid #888"
            });
         }
      },
      draggable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      resizable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      eventNew : function(calEvent, $event) {
         var $dialogContent = $("#event_edit_container");
         resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var titleField = $dialogContent.find("input[name='title']");
         var bodyField = $dialogContent.find("textarea[name='body']");


         $dialogContent.dialog({
            modal: true,
            title: "Nuevo Evento",
            close: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               $('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               save : function() {
                  calEvent.id = id;
                  id++;
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  calEvent.body = bodyField.val();

                  $calendar.weekCalendar("removeUnsavedEvents");
                  $calendar.weekCalendar("updateEvent", calEvent);
                  $dialogContent.dialog("close");
               },
               cancel : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).show();

         $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
         setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));

      },
      eventDrop : function(calEvent, $event) {
        
      },
      eventResize : function(calEvent, $event) {
      },
      eventClick : function(calEvent, $event) {

         if (calEvent.readOnly) {
            return;
         }

         var $dialogContent = $("#event_edit_container");
         resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var titleField = $dialogContent.find("input[name='title']").val(calEvent.title);
         var bodyField = $dialogContent.find("textarea[name='body']");
         bodyField.val(calEvent.body);

         $dialogContent.dialog({
            modal: true,
            title: "Editar - " + calEvent.title,
            close: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               $('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               save : function guardarEvento() {
           
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  calEvent.body = bodyField.val();

                  $calendar.weekCalendar("updateEvent", calEvent);
                  $dialogContent.dialog("close");
                  var URL= 'php/guardar_evento.php?start='+ calEvent.start  +'&end='+calEvent.end+'&title='+calEvent.title+'&body='+calEvent.body;
                alert(URL);

                  $.post(URL,function (Respuesta){
                     var arreglo = Respuesta.split('|');
                     $('#mensaje').html(arreglo[0]);
                     //alert(arreglo[2]);
                     //alert(responseText);
                     //$('#hiddenid').val(arreglo[1]);
                     
                  });
               },
               "delete" : function() {
                  $calendar.weekCalendar("removeEvent", calEvent.id);
                  $dialogContent.dialog("close");
               },
               cancel : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).show();

         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
         setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));
         $(window).resize().resize(); //fixes a bug in modal overlay size ??

      },
      eventMouseover : function(calEvent, $event) {
      },
      eventMouseout : function(calEvent, $event) {
      },
      noEvents : function() {

      },
      data : function(start, end, callback) {

        // console.log( getEventData() );
         //callback(getEventData());
         var variable;
         var URL= 'php/traer_eventos.php?start='+ variable;
            $.post(URL,function (Respuesta){
            var arreglo = Respuesta.split('|');
            //var chingui = JSON.stringify(Respuesta);
            // console.log(chingui);
            console.log("chingui");
            console.log(Respuesta);
            console.log(JSON.stringify(Respuesta));
            // console.log(Respuesta[0]);

            //var arreglo = Respuesta.split('|');
            // $('#mensaje').html(arreglo[0]);

           // $('#mensaje').html(JSON.stringify(Respuesta[0]));
            // var events = [Respuesta];
            // console.log(events);
            var year = new Date().getFullYear();
            var month = new Date().getMonth();
            var day = new Date().getDate();
            var eventData1 = {
               events : [
                  {'id':1, 'start': new Date(year, month, day, 12), 'end': new Date(year, month, day, 13, 35),'title':'Lunch with Mike'},
                  {'id':2, 'start': new Date(year, month, day, 14), 'end': new Date(year, month, day, 14, 45),'title':'Dev Meeting'},
                  {'id':3, 'start': new Date(year, month, day + 1, 18), 'end': new Date(year, month, day + 1, 18, 45),'title':'Hair cut'},
                  {'id':4, 'start': new Date(year, month, day - 1, 8), 'end': new Date(year, month, day - 1, 9, 30),'title':'Team breakfast'},
                  {'id':5, 'start': new Date(year, month, day + 1, 14), 'end': new Date(year, month, day + 1, 16),'title':'Product showcase'},
                  {'id':5, 'start': new Date(year, month, day + 1, 15), 'end': new Date(year, month, day + 1, 17),'title':'Overlay event'}
               ]
             };
             console.log('eventdata1',eventData1);
            //  Respuesta.forEach(function(part, index, theArray) {
            //    theArray[index]['start'] = Date(year, month, day, 12);
            //  });
            //  console.log('Respuesta modificado',Respuesta);
            // var eventData = {
            //    events:Respuesta
            // };
            callback(eventData1);
         });

      } //fin data
   });

   function resetForm($dialogContent) {
      $dialogContent.find("input").val("");
      $dialogContent.find("textarea").val("");
   }

   function getEventData() {
   
     //alert(URL);
      var variable;
      var year = new Date().getFullYear();
      var month = new Date().getMonth();
      var day = new Date().getDate();
      var URL= 'php/traer_eventos.php?start='+ variable;
      //alert(URL);

      
      // $.post(URL,function (Respuesta){
      //    //var arreglo = Respuesta.split('|');
      //    var chingui = JSON.stringify(Respuesta);
      //    // console.log(chingui);
      //     console.log(Respuesta);
      //    // console.log(Respuesta[0]);

      //    // $('#mensaje').html(arreglo[0]);


      // });
      


         
         return {
            events : datoschingui() //Respuesta
            /*
             [
               {
                  "id":1,
                  "start": new Date(year, month, day, 14),
                  "end": new Date(year, month, day, 13, 30),
                  "title":"Lunch with Mike"
               },
               {
                  "id":2,
                  "start": new Date(year, month, day, 14),
                  "end": new Date(year, month, day, 14, 45),
                  "title":"Dev Meeting"
               },
               {
                  "id":3,
                  "start": new Date(year, month, day + 1, 17),
                  "end": new Date(year, month, day + 1, 17, 45),
                  "title":"Hair cut"
               },
               {
                  "id":4,
                  "start": new Date(year, month, day - 1, 8),
                  "end": new Date(year, month, day - 1, 9, 30),
                  "title":"Team breakfast"
               },
               {
                  "id":5,
                  "start": new Date(year, month, day + 1, 14),
                  "end": new Date(year, month, day + 1, 15),
                  "title":"Product showcase"
               },
               {
                  "id":6,
                  "start": new Date(year, month, day, 10),
                  "end": new Date(year, month, day, 11),
                  "title":"I'm read-only",
                  readOnly : true
               }
   
            ]
            */
         };
         
       
         //alert(arreglo[2]);
         //alert(responseText);
         //$('#hiddenid').val(arreglo[1]);
         
     


  


      

  
   }

   function datoschingui(){

      $.post(URL,function (Respuesta){
         //var arreglo = Respuesta.split('|');
         var chingui = JSON.stringify(Respuesta);
         // console.log(chingui);
          console.log(Respuesta);
         // console.log(Respuesta[0]);

         // $('#mensaje').html(arreglo[0]);
         return Respuesta;

      });


   }


   /*
    * Sets up the start and end time fields in the calendar event
    * form for editing based on the calendar event being edited
    */
   function setupStartAndEndTimeFields($startTimeField, $endTimeField, calEvent, timeslotTimes) {

      for (var i = 0; i < timeslotTimes.length; i++) {
         var startTime = timeslotTimes[i].start;
         var endTime = timeslotTimes[i].end;
         var startSelected = "";
         if (startTime.getTime() === calEvent.start.getTime()) {
            startSelected = "selected=\"selected\"";
         }
         var endSelected = "";
         if (endTime.getTime() === calEvent.end.getTime()) {
            endSelected = "selected=\"selected\"";
         }
         $startTimeField.append("<option value=\"" + startTime + "\" " + startSelected + ">" + timeslotTimes[i].startFormatted + "</option>");
         $endTimeField.append("<option value=\"" + endTime + "\" " + endSelected + ">" + timeslotTimes[i].endFormatted + "</option>");

      }
      $endTimeOptions = $endTimeField.find("option");
      $startTimeField.trigger("change");
   }

   var $endTimeField = $("select[name='end']");
   var $endTimeOptions = $endTimeField.find("option");

   //reduces the end time options to be only after the start time options.
   $("select[name='start']").change(function() {
      var startTime = $(this).find(":selected").val();
      var currentEndTime = $endTimeField.find("option:selected").val();
      $endTimeField.html(
            $endTimeOptions.filter(function() {
               return startTime < $(this).val();
            })
            );

      var endTimeSelected = false;
      $endTimeField.find("option").each(function() {
         if ($(this).val() === currentEndTime) {
            $(this).attr("selected", "selected");
            endTimeSelected = true;
            return false;
         }
      });

      if (!endTimeSelected) {
         //automatically select an end date 2 slots away.
         $endTimeField.find("option:eq(1)").attr("selected", "selected");
      }

   });


   var $about = $("#about");

   $("#about_button").click(function() {
      $about.dialog({
         title: "About this calendar demo",
         width: 600,
         close: function() {
            $about.dialog("destroy");
            $about.hide();
         },
         buttons: {
            
            close : function() {
               $about.dialog("close");
            }
         }
      }).show();
   });


});

