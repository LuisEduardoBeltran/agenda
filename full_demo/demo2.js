Jquery141(document).ready(function() {


   var $calendar = Jquery141('#calendar');
   var id = 10;

   $calendar.weekCalendar({
      timeslotsPerHour : 4,
      allowCalEventOverlap : true,
      overlapEventsSeparate: true,
      firstDayOfWeek : 1,
      businessHours :{start: 8, end: 21, limitDisplay: true },
      daysToShow : 7,
      height : function($calendar) {
         return Jquery141(window).height() - Jquery141("h1").outerHeight() - 1;
      },
      //posible llamada
      eventRender : function(calEvent, $event) {
         //  console.log("calEvent",calEvent);
         //  console.log("event",$event);
          //console.log("fecha sistema",new Date().getTime());
         if (calEvent.end.getTime() < new Date().getTime()) {
            $event.css("backgroundColor", "#");
            $event.find(".wc-time").css({
               "backgroundColor" : "#eeb6f5",
               "border" : "1px solid #888"
            });
         }

         setInterval(function()
         {
            //console.log("entro setinterval cada minuto");
            var FIVE_MIN=5*60*1000;
            // document.getElementById('video').autoplay = true;
            // document.getElementById('video').muted = true; 
            // document.getElementById('video').muted = false; 
            // document.getElementById('video').play();

            // const media = this.videoplayer.nativeElement;
            // media.muted = true; // without this line it's not working although I have "muted" in HTML
            // media.play();

            // var audio = document.createElement("AUDIO")
            // document.body.appendChild(audio);
            // audio.src = "../sonido2.mp3"
            
            // document.body.addEventListener("mousemove", function () {
            //     audio.play()
            // })

            // var myMusic = document.getElementById("music");
            // function play(){
            //    myMusic.muted = true;
            //    myMusic.play() ;
            //    myMusic.muted = false;
            //    myMusic.play() ;
            // }
            // play();

            // var myMusic = document.getElementById("video");
            // myMusic.muted = true;
            // myMusic.play() ;
            // myMusic.muted = false;
            //myMusic.play() ;           
           

            if
            (
               (new Date().getTime() - calEvent.start.getTime() ) < 0
               && ( Math.abs( (new Date().getTime() - calEvent.start.getTime() ) ) < FIVE_MIN )
            ) {
               
               //console.log('Delayed by more than 5 mins');
               // alert('faltan 5 minutos..');
               // var obj = document.createElement("audio");
               // obj.src = "../sonido2.mp3"; 
               // obj.play();	
               document.getElementById("chingui").click();
               
               
            }


         },60000);
         

      },
      draggable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      resizable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      eventNew : function(calEvent, $event) {
         var $dialogContent = Jquery141("#event_edit_container");
         resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var titleField = $dialogContent.find("input[name='title']");
         var bodyField = $dialogContent.find("textarea[name='body']");
         //var btn_cerrar = $dialogContent.find("<img src='images/icono_hoy.png' width='50px' style='padding:0px;'>");

         $dialogContent.dialog({
            modal: true,
            title: "Nuevo Evento",
            Cerrar: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               Jquery141('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               Guardar: function guardarEvento() {
                   
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  calEvent.body = bodyField.val();

                  $calendar.weekCalendar("updateEvent", calEvent);
                  $dialogContent.dialog("close");
             


                  var URL= 'php/guardar_evento.php?start='+ calEvent.start  +'&end='+calEvent.end+'&title='+calEvent.title+'&body='+calEvent.body;
                 
              //  alert(URL);

              Jquery141.post(URL,function (data){
               //  var arreglo = Respuesta.split('|');
               var dataJson = JSON.parse(data);
               //  Jquery141('#mensaje').html(arreglo[0]);

                  if(dataJson.respuesta == "1"){
                     toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                  }
               toastr["success"]("&nbsp;&nbsp;&nbsp;Evento guardado con exito...");
               }
               if(dataJson.respuesta == "0"){
                  toastr["error"]("&nbsp;&nbsp;&nbsp;No se pudo guardar...");
               }
                     
                  });
                  
               },
               X: function() {
                  
                  
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

         var $dialogContent = Jquery141("#event_edit_container");
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
               Jquery141('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               Modificar: function ModificarEvento() {
           
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  calEvent.body = bodyField.val();

                  $calendar.weekCalendar("updateEvent", calEvent);
                  $dialogContent.dialog("close");
                  var URL= 'php/modificar_evento.php?start='+ calEvent.start  +'&end='+calEvent.end+'&title='+calEvent.title+'&body='+calEvent.body+'&id_evento='+calEvent.id;
                //alert(URL);

                Jquery141.post(URL,function (data){
                  //  var arreglo = Respuesta.split('|');
                  var dataJson = JSON.parse(data);
                  //  Jquery141('#mensaje').html(arreglo[0]);

                     if(dataJson.respuesta == "1"){
                        toastr.options = {
                           "closeButton": true,
                           "debug": false,
                           "newestOnTop": true,
                           "progressBar": true,
                           "positionClass": "toast-top-right",
                           "preventDuplicates": false,
                           "onclick": null,
                           "showDuration": "300",
                           "hideDuration": "1000",
                           "timeOut": "5000",
                           "extendedTimeOut": "1000",
                           "showEasing": "swing",
                           "hideEasing": "linear",
                           "showMethod": "fadeIn",
                           "hideMethod": "fadeOut"
                     }
                  toastr["success"]("&nbsp;&nbsp;&nbsp;Evento modificado con exito...");
                  }
                  if(dataJson.respuesta == "0"){
                     toastr["error"]("&nbsp;&nbsp;&nbsp;No se pudo modificar...");
                  }
                        
                     });
                     
                
              
               },
               Borrar : function() {
                  $calendar.weekCalendar("removeEvent", calEvent.id);
                  $dialogContent.dialog("close");
                  var URL= 'php/eliminar_evento.php?id_evento='+ calEvent.id;

                  Jquery141.post(URL,function (data){
                     //  var arreglo = Respuesta.split('|');
                     var dataJson = JSON.parse(data);
                     //  Jquery141('#mensaje').html(arreglo[0]);

                        if(dataJson.respuesta == "1"){
                           toastr.options = {
                              "closeButton": true,
                              "debug": false,
                              "newestOnTop": true,
                              "progressBar": true,
                              "positionClass": "toast-top-right",
                              "preventDuplicates": false,
                              "onclick": null,
                              "showDuration": "300",
                              "hideDuration": "1000",
                              "timeOut": "5000",
                              "extendedTimeOut": "1000",
                              "showEasing": "swing",
                              "hideEasing": "linear",
                              "showMethod": "fadeIn",
                              "hideMethod": "fadeOut"
                        }
                     toastr["success"]("&nbsp;&nbsp;&nbsp;Evento eliminado con exito...");
                     }
                     if(dataJson.respuesta == "0"){
                        toastr["error"]("&nbsp;&nbsp;&nbsp;No se pudo eliminar...");
                     }
               

                  });

                  
                 
               },
               X : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).show();

         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
         setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));
         Jquery141(window).resize().resize(); //fixes a bug in modal overlay size ??

      },
      eventMouseover : function(calEvent, $event) {
      },
      eventMouseout : function(calEvent, $event) {
      },
      noEvents : function() {

      },
      data : function(start, end, callback) {    

         //callback(getEventData());
         var variable;
         var URL2= 'php/traer_eventos.php?start='+ variable;
         //setInterval(function(){
         Jquery141.post(URL2,function (Respuesta){
            
            //console.log("entro traer eventos");
            // console.log(Respuesta);
            // console.log(JSON.stringify(Respuesta));
            
            // $('#mensaje').html(arreglo[0]);

            // $('#mensaje').html(JSON.stringify(Respuesta[0]));
            // var events = [Respuesta];
            // console.log(events);
            var year = new Date().getFullYear();
            var month = new Date().getMonth();
            var day = new Date().getDate();
          //  console.log('fecha ', new Date(year, month, day, 12))
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
            //  console.log('eventdata1',eventData1);
             Respuesta.forEach(function(part, index, theArray) {
               theArray[index]['start'] = new Date(theArray[index]['start']);
               theArray[index]['end'] = new Date(theArray[index]['end'] );
               //break;
             });
            var eventData = {
               events: Respuesta
            };
            var events =   [Respuesta];
            // console.log('eventData: ',eventData)            
            // console.log('events: ',JSON.stringify(events))
            //callback(JSON.stringify(eventData));
            callback(eventData);
         })
        //} //funcion setinterval
         //,60000)

         //10000 10 segundos
         //300000 5 min
         ; //fin post


      }//fin data


   });

   function resetForm($dialogContent) {
      $dialogContent.find("input").val("");
      $dialogContent.find("textarea").val("");
   }

   function getEventData() {

      //console.log('entro getEventData');
      var variable;
      var hora;
      var hora_1;
      var year = new Date().getFullYear();
      var month = new Date().getMonth();
      var day = new Date().getDate();
      var URL= 'php/traer_eventos.php?start='+ variable;
      Jquery141.post(URL,function (Respuesta){

        // console.log('entro');
         //console.log('Respuesta: ', Respuesta);
         // var arreglo = Respuesta.split('|');   
         // $('#mensaje').html(arreglo[0]);
         //hora_1 = arreglo[0];
         //alert (hora_1);
         // var eventData = {
         //    events:Respuesta
         // };
         return{
            events : [Respuesta]
         };
      });
          
      /*return {

         events : [
            {
               
               "id":1,
               "start": new Date(year, month, day, 14, 30),
               "end": new Date(year, month, day, 15, 30),
               "title": "chingui"
            },   
            {
               "id":2,
               "start": new Date(year, month, day, 14,00),
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
      };
      */
      
  
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

   var $endTimeField = Jquery141("select[name='end']");
   var $endTimeOptions = $endTimeField.find("option");

   //reduces the end time options to be only after the start time options.
   Jquery141("select[name='start']").change(function() {
      var startTime = Jquery141(this).find(":selected").val();
      var currentEndTime = $endTimeField.find("option:selected").val();
      $endTimeField.html(
            $endTimeOptions.filter(function() {
               return startTime < Jquery141(this).val();
            })
            );

      var endTimeSelected = false;
      $endTimeField.find("option").each(function() {
         if (Jquery141(this).val() === currentEndTime) {
            Jquery141(this).attr("selected", "selected");
            endTimeSelected = true;
            return false;
         }
      });

      if (!endTimeSelected) {
         //automatically select an end date 2 slots away.
         $endTimeField.find("option:eq(1)").attr("selected", "selected");
      }

   });


   var $about = Jquery141("#about");

   Jquery141("#about_button").click(function() {
      $about.dialog({
         title: "Lista Mandado",
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

