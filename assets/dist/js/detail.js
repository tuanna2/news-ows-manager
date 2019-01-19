(function($) {
    CKEDITOR.replace('content_text');
    CKEDITOR.config.readOnly = true;
    $.get("http://125.212.227.42:18080/api/category", obj=>{
        obj.data.forEach(element => {
            $("#category_id").append(new Option(element.name, element.id));
        });
    });
})(jQuery);
$(document).ready(()=>{
    $('.username').html(getCookie('username'))
    if(getCookie('username')=="admin"){
        $('#role').html('Adminstrator');
        $('#hd').append('<button id="delete-data" class="btn btn-danger pull-right">DELETE</button>');
        $('.sidebar-menu').append('<li><a href="/category"><i class="fa fa-folder-open-o"></i> <span>Category</span></a></li><li><a href="/comments"><i class="fa fa-comments-o"></i> <span>Comments</span></a></li><li><a href="/members"><i class="fa fa-users"></i> <span>Members</span></a></li>');
    }
    $('#fileImage').change((e)=>{
        var fileImage = e.target.files[0];
        var formData = new FormData();
        formData.append('file', fileImage);       
        $.ajax({
            type: "POST",
            url: 'http://125.212.227.42:18080/api/ext/upload',
            data: formData,
            success: function(response){
                if(response.status=="success"){
                    $('#image').val('http://125.212.227.42:18080'+response.data[0].link);
                    $("#image").prop('disabled', true);
                    $('#show-image').attr('src','http://125.212.227.42:18080'+response.data[0].link);
                }
                else
                    alert('Please try again!');
            },
            error:()=>{
                alert('Please try again!');
            },
            contentType: false,
            processData: false
          });
    });
    $('#image').change(()=>{
        $('#show-image').attr('src',$('#image').val());
    });
    $.get("http://125.212.227.42:18080/api/news/"+$('#getID').val()+"/likes?ref=[%22members%22]&map=[%22username%22,%22name%22]", obj=>{
        $('#count-like').html(obj.count);
        obj.data.forEach(element=>{
            $('#all-like').append('<div class="item"><img src="/dist/img/user3-128x128.jpg" alt="user image"><p class="message"><a style="padding-top:5px" class="name">'+element.members_username+'</a></p></div>')
        });
    });
    $.get("http://125.212.227.42:18080/api/news/"+$('#getID').val()+"/comments?ref=[%22members%22]&map=[%22username%22,%22name%22]", obj=>{
        $('#count-cmt').html(obj.count);
        obj.data.forEach(element=>{
            $('#all-cmt').append('<div class="item"><img src="/dist/img/user3-128x128.jpg" alt="user image"><p class="message"><a class="name"><small class="text-muted pull-right"><i class="fa fa-clock-o"></i> '+new Date(element.created_at).toLocaleString()+'</small>'+element.members_username+'</a>'+element.content+'</p></div>');
        });
    });
    $.get("http://125.212.227.42:18080/api/news?id="+$('#getID').val(), obj=>{
        $('#category_id').val(obj.data[0].category_id);
        $('#title').val(obj.data[0].title);
        $('#image').val(obj.data[0].image);
        $('#show-image').css('display','block');
        $('#show-image').attr('src',obj.data[0].image);
        $('#author_id').val(obj.data[0].author_id);
        $('#summary').val(obj.data[0].summary);
        setTimeout(()=>{
            CKEDITOR.instances['content_text'].setData(obj.data[0].content);
        },2000)
        $('#created_at').val(new Date(obj.data[0].created_at).toLocaleString());
    });
    $('#btn-edit').click(()=>{
        CKEDITOR.instances['content_text'].setReadOnly(false);
        $('#category_id').removeAttr("disabled");
        $('#title').removeAttr("readonly");
        $('#fileImage').css('display','block');
        $('#image').removeAttr("readonly");
        $('#author_id').removeAttr("readonly");
        $('#summary').removeAttr("readonly");
        $('#fileImage').css('display','block');
        $('#edit').css('display','block');
        $('#btn-edit').css('display','none');
    });
    $('#edit').confirmModal({
        confirmTitle     : 'CONFIRM SUBMIT!',
        confirmMessage   : 'Are you sure you want to change ?',
        confirmOk        : 'Yes',
        confirmCancel    : 'Cancel',
        confirmDirection : 'rtl',
        confirmStyle     : 'primary',
        confirmCallback  : changePost,
        confirmDismiss   : true,
        confirmAutoOpen  : false
    });
    function changePost(){
        var Authorization = "Bearer "+$('#getToken').val();
        $.ajax({
            type: "PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization":Authorization
            },
            url: 'http://125.212.227.42:18080/api/news',
            data: JSON.stringify({
                id:$('#getID').val(),
                title:$('#title').val(),
                category_id:$('#category_id').val(),
                image:$('#image').val(),
                author_id:$('#author_id').val(),
                summary:$('#summary').val(),
                content:CKEDITOR.instances['content_text'].getData(),
            }),
            success: function(response){
                if(response.message=="success"){
                    alert('Thành công');
                    CKEDITOR.instances['content_text'].setReadOnly(true);
                    $('#category_id').attr("disabled",true);
                    $('#title').attr("readonly",true);
                    $('#fileImage').css('display','none');
                    $('#image').attr("readonly",true);
                    $('#author_id').attr("readonly",true);
                    $('#summary').attr("readonly",true);
                    $('#fileImage').css('display','none');
                    $('#edit').css('display','none');
                    $('#btn-edit').css('display','inline');
                }
                else{
                    alert('Thất bại');
                }
            }
          });
    }
    $('#delete-data').confirmModal({
        confirmTitle     : 'CONFIRM DELETE!',
        confirmMessage   : 'Are you sure you want to delete this post?',
        confirmOk        : 'Yes',
        confirmCancel    : 'Cancel',
        confirmDirection : 'rtl',
        confirmStyle     : 'danger',
        confirmCallback  : deletePost,
        confirmDismiss   : true,
        confirmAutoOpen  : false
    });
    function deletePost(){
        var Authorization = "Bearer "+$('#getToken').val();
            $.ajax({
                type: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":Authorization
                },
                url: 'http://125.212.227.42:18080/api/news/'+$('#getID').val(),
                success: function(response){
                    if(response.message=="success"){
                        window.location.href='/news';
                    }
                    else{
                        alert('Xoá thất bại');
                    }
                },
                error:function(){
                    alert('Xoá thất bại');                    
                }
              });
    }
});