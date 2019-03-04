
$(document).ready(function(){
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $('#datetime').html(time);
    console.log(time);
});

$(document).ready(function(){
    var table = $('#table-web tbody');
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
                        tr.append('<td><i class="fa fa-circle text-orange" data-toggle="tooltip" data-placement="top" title="In Progress"></i></td>');
                        tr.append('<td>'+item["category"]+'</td>');
                        tr.append('<td>'+item["website"]+'</td>');
                        tr.append('<td>'+item["domain"]+'</td>');
                        tr.append('<td>'+ping+' ms</td>');
                        tr.append('<td>'+xhr.status+'</td>');
                        table.append(tr);
                    },
                    error:function(data, textStatus, xhr){
                        var tr = $('<tr>');
                        tr.append('<td><i class="fa fa-circle text-orange" data-toggle="tooltip" data-placement="top" title="In Progress"></i></td>');
                        tr.append('<td>'+item["category"]+'</td>');
                        tr.append('<td>'+item["website"]+'</td>');
                        tr.append('<td>'+item["domain"]+'</td>');
                        tr.append('<td>-</td>');
                        tr.append('<td>'+xhr.status+'</td>');
                        table.append(tr);
                    }
                });

                
            });
        }
    });
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
