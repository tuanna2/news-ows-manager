(function($) {
    $.get("http://125.212.227.42:18080/api/category", obj=>{
        obj.data.forEach(element => {
            $("#category").append(new Option(element.name, element.id));
        });
    });
      loadData(1,0);
})(jQuery);
$(document).ready(()=>{
    if(getCookie('username')=="admin"){
        $('.sidebar-menu').append('<li><a href="/category"><i class="fa fa-folder-open-o"></i> <span>Category</span></a></li><li><a href="/comments"><i class="fa fa-comments-o"></i> <span>Comments</span></a></li><li><a href="/members"><i class="fa fa-users"></i> <span>Members</span></a></li>');
        $('#role').html('Adminstrator');
    }
    $('.username').html(getCookie('username'))
    $('#pagination').on('click','a',id=>{
        let page = $(id.currentTarget).attr('name');
        if(page === undefined)
            return false; 
        else{
            $('#data-news').html('');
            $('#pagination').html('');
            loadData(parseInt(page),$('#category').val());
        }
    });
        $('#confirmDelete').click(()=>{
            var Authorization = "Bearer "+$('#getToken').val();
            $.ajax({
                type: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":Authorization
                },
                url: 'http://125.212.227.42:18080/api/news/'+$('#deleteID').val(),
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

        $('#data-news').on('click','.btn-danger',id=>{
            $('#deleteID').val($(id.currentTarget).attr('name'));
        });
        
        $('#category').change(()=>{
            $('#data-news').html('');
            $('#pagination').html('');
            loadData(1,$('#category').val());
        });
});

function loadData(page,category){
    let url ='';
    category == 0? url = 'http://125.212.227.42:18080/api/news?limit=10&page='
    : url = 'http://125.212.227.42:18080/api/category/'+category+'/news?limit=10&page=';
    $.get(url+page, obj=>{
        obj.data.forEach(element => {
           $('#data-news').append('<tr id="row'+element.id+'"><td class="hi">'+element.id+'</td><td class="title">'+element.title+'</td><td class="hi"><a class="btn btn-info btn-sm" href="/news/detail?id='+element.id+'">DETAIL</a>'+(getCookie("username")=="admin"?'<button name="'+element.id+'" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#confirm-delete">DELETE</button>':'')+'</td></tr>')
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