$(document).ready(()=>{
    viewData(0,$('#getOption').val(),1);
    $('.username').html(getCookie('username'))
    $('#getToken').val(getCookie('token'));
    $('#view-data').click(()=>{
        let id = $('#id-member').val();
        if(id === null || id=== ''){
            alert('Missing ID Member');
            return false;
        }
        $('#getOption').val($('#option').val());
        $('#data-members').html('');
        $('#data-td').html('');
        $('#pagination').html('');
        let option =$('#getOption').val();
        viewData(id,option,1); 
    });
    $('#pagination').on('click','a',id=>{
        let page = $(id.currentTarget).attr('name');
        if(page === undefined)
            return false; 
        else{
            $('#data-members').html('');
            $('#data-td').html('');
            $('#pagination').html('');
            viewData($('#id-member').val(),$('#getOption').val(),parseInt(page));
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
            url: 'http://125.212.227.42:18080/api/members/'+$('#deleteID').val(),
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
    $('#data-members').on('click','.btn-danger',id=>{
        $('#deleteID').val($(id.currentTarget).attr('name'));
    });

    $('#btn-show-members').click(()=>{
        $('#getOption').val('members');
        $('#id-member').val('');
        $('#btn-show-members').css('display','none');
        $('#data-members').html('');
        $('#data-td').html('');
        $('#pagination').html('');
        viewData(0,$('#getOption').val(),1);
    });
});

function viewData(id,option,page){
    if(option=='members'){
        $.ajax({
            type: "GET",
            headers: {
                "Authorization":"Bearer "+$('#getToken').val()
            },
            url: 'http://125.212.227.42:18080/api/members?limit=10&page='+page,
            success: function(obj){
                $('#data-td').append('<th class="col-sm-2">ID</th><th class="code-sm-4">Username</th><th class="code-sm-4">Role</th><th class="code-sm-2">ACTION</th>');
            obj.data.forEach(element => {
                $('#data-members').append('<tr id="row'+element.id+'"><td class="hi col-sm-2">'+element.id+'</td><td class="hi col-sm-4">'+element.username+'</td><td class="hi col-sm-4">'+(element.role_id==1?'Administrator':'Member')+'</td><td class="hi col-sm-2"><a class="btn btn-info btn-sm" href="/members/detail?id='+element.id+'">DETAIL</a>'+(element.role_id==1?'':'<button name="'+element.id+'" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#confirm-delete">DELETE</button>')+'</td></tr>');
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
            }
        });
        return;
    }
    else{
        $('#btn-show-members').css('display','inline');
    $.get('http://125.212.227.42:18080/api/members/'+id+'/'+option+'?limit=10&page='+page, obj=>{
        switch(option){
            case 'news':
                $('#data-td').append('<th class="col-sm-1">ID</th><th class="code-sm-9">TITLE</th><th class="code-sm-2">ACTION</th>');
                obj.data.forEach(element => {
                    $('#data-members').append('<tr id="row'+element.id+'"><td class="hi">'+element.id+'</td><td class="hi">'+element.title+'</td><td class="hi"><a class="btn btn-info btn-sm" href="/news/detail?id='+element.id+'">DETAIL</a></td></tr>');
                });
                break;
            case 'likes':
                $('#data-td').append('<th class="col-sm-6">ID</th><th class="code-sm-6">ID New</th>');
                obj.data.forEach(element => {
                    $('#data-members').append('<tr id="row'+element.id+'"><td class="hi">'+element.id+'</td><td class="hi">'+element.new_id+'</td></tr>');
                });
            break;
            case 'comments':
                $('#data-td').append('<th class="col-sm-1">ID</th><th class="col-sm-1">ID New</th><th class="code-sm-9">CONTENT</th><th class="code-sm-1">ACTION</th>');
                obj.data.forEach(element => {
                    $('#data-members').append('<tr id="row'+element.id+'"><td class="hi">'+element.id+'</td><td class="hi">'+element.new_id+'</td><td class="hi">'+element.content+'</td><td class="hi"><a class="btn btn-info btn-sm" href="/comments/detail?id='+element.id+'">DETAIL</a></td></tr>');
                });
            break;
        }
        
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
}