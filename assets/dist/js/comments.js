(function($){
    loadCmt(1,0);
})(jQuery);

$(document).ready(()=>{
    $('.username').html(getCookie('username'))
    $('#pagination').on('click','a',id=>{
        let page = $(id.currentTarget).attr('name');
        if(page === undefined)
            return false; 
        else{
            $('#data-news').html('');
            $('#pagination').html('');
            loadCmt(parseInt(page),$('#id-new').val());
        }
    });
    $('#search-cmt').click(()=>{
        $('#data-news').html('');
        $('#pagination').html('');
        loadCmt(1,$('#id-new').val());
    });

    $('#data-news').on('click','.btn-danger',id=>{
        $('#deleteID').val($(id.currentTarget).attr('name'));
    });
    
    $('#confirmDelete').click(()=>{
        var Authorization = "Bearer "+$('#getToken').val();
        $.ajax({
            type: "DELETE",
            headers: {
                "Content-Type":"application/json",
                "Authorization":Authorization
            },
            url: 'http://125.212.227.42:18080/api/comments/'+$('#deleteID').val(),
            success: function(response){
                if(response.message=="success"){
                    $('#row'+$('#deleteID').val()).remove();
                }
                else{
                    alert('Xoá thất bại');
                }
            },
            error:function(){
                alert('Xoá thất bại');                    
            }
          });
    });
});

function loadCmt(page,idNew){
    let url= '';
    idNew == '' || idNew ==0 ? url= 'http://125.212.227.42:18080/api/comments?page='+page+'&limit=10&ref=[%22members%22]&map=[%22username%22,%22name%22]'
    : url = 'http://125.212.227.42:18080/api/news/'+idNew+'/comments?ref=[%22members%22]&map=[%22username%22,%22name%22]';
    $.get(url, obj=>{
        obj.data.forEach(element => {
           $('#data-news').append('<tr id="row'+element.id+'"><td class="item"><img src="/dist/img/user3-128x128.jpg" alt="user image"><p class="message"><a class="name"><small class="text-muted pull-right"><i class="fa fa-clock-o"></i>'+new Date(element.created_at).toLocaleString()+'</small>'+element.members_username+'</a>'+element.content+'</p></td><td class="hi">'+element.new_id+'</td><td class="hi"><a class="btn btn-info btn-sm" href="/comments/detail?id='+element.id+'">DETAIL</a><button name="'+element.id+'" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#confirm-delete">DELETE</button></tr>')
        });
        //pagination
        var countPage = Math.ceil((obj.count)/10);
        page==1?
            $('#pagination').append('<li class="paginate_button previous disabled"><a>Previous</a></li>')
        :
            $('#pagination').append('<li class="paginate_button previous"><a name="'+(page-1)+'">Previous</a></li>');          
        for(let lap=1,j=page>6?(page-6):1;j<=countPage;lap++,j++){
            j==page?
                $('#pagination').append('<li class="paginate_button active"><a>'+j+'</a></li>')
            :
                $('#pagination').append('<li class="paginate_button"><a name="'+j+'">'+j+'</a></li>');
            if(lap>=10) break;
        }
        page==countPage || obj.count==0?
            $('#pagination').append('<li class="paginate_button next disabled"><a>Next</a></li>')
        :
            $('#pagination').append('<li class="paginate_button next"><a name="'+(page+1)+'">Next</a></li>');            
        //end pagination
    });
}