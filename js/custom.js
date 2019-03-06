
$(document).ready(function(){
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $('#datetime').html(time);
    console.log(time);
});



$('#form-ping').on('submit', function(e){
    e.preventDefault();
    var url = $('input[name="url"]').val();
    var pr = $('#ping-result');

    console.log('Pinging ' + url);
    var time = new Date;

    $.ajax({
        url: url,
        success:function(data){
            pr.empty();
            ping = new Date - time;
            pr.append('<p><small>Result: <span class="text-success">'+ping+' ms</span></small></p>');
        }
    });
});

monitorNow();
refreshTimer();

function refreshTimer(){
    $(document).ready(function(){
        var timeleft = 60;
        var downloadTimer = 
        setInterval(function(){
            timeleft--;
            document.getElementById("countdowntimer").textContent = timeleft;
            if(timeleft <= 0){
                clearInterval(downloadTimer);
                refreshTimer();
                monitorNow();
            }
        },1000);
    });
}

function monitorNow(){
    $(document).ready(function(){
        var table = $('#table-web tbody');
        table.empty();
        var ping = new Date;
        $.ajax({
            url: 'websites.json',
            success:function(data){
                $.each(data,function(i, item){
                    console.log('Pinging ' + item['domain']);
                    var time = new Date;
                    $.ajax({
                        url: item['domain'],
                        cache:false,
                        success:function(data, textStatus, xhr){
                            ping = new Date - time;

                            var tr = $('<tr>');
                            tr.append('<td><i class="fa fa-circle text-success" data-toggle="tooltip" data-placement="top" title="OK"></i></td>');
                            tr.append('<td>'+item["category"]+'</td>');
                            tr.append('<td>'+item["website"]+'</td>');
                            tr.append('<td>'+item["domain"]+'</td>');
                            tr.append('<td>'+ping+' ms</td>');
                            tr.append('<td>'+xhr.status+'</td>');
                            table.append(tr);
                        },
                        error:function(data, textStatus, xhr){
                            var tr = $('<tr>');
                            tr.append('<td><i class="fa fa-circle text-danger" data-toggle="tooltip" data-placement="top" title="ERROR"></i></td>');
                            tr.append('<td>'+item["category"]+'</td>');
                            tr.append('<td>'+item["website"]+'</td>');
                            tr.append('<td>'+item["domain"]+'</td>');
                            tr.append('<td>-</td>');
                            tr.append('<td>'+xhr.status+'</td>');
                            table.append(tr);
                            notifyMe(item["website"], item["domain"]);
                        }
                    });

                    
                });
            }
        });
    });
}

// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe(site, url) {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Server Alert', {
      icon: '../img/logo-light.png',
      body: site + ' is down!',
    });

    notification.onclick = function () {
      window.open(url);      
    };

  }

}