(function($) {
    CKEDITOR.replace('content_text');
    $.get("http://125.212.227.42:18080/api/category", obj=>{
        obj.data.forEach(element => {
            $("#category_id").append(new Option(element.name, element.id));
        });
    });
})(jQuery);
$(document).ready(()=>{
    if(getCookie('username')=="admin"){
        $('#role').html('Adminstrator');
        $('.sidebar-menu').append('<li><a href="/category"><i class="fa fa-folder-open-o"></i> <span>Category</span></a></li><li><a href="/comments"><i class="fa fa-comments-o"></i> <span>Comments</span></a></li><li><a href="/members"><i class="fa fa-users"></i> <span>Members</span></a></li>');
    }
    $('.username').html(getCookie('username'))
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
                    $('#show-image').css('display','block');
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
        $('#show-image').css('display','block');
    });
      $('#btn-create').click(()=>{
        var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var Authorization = "Bearer "+$('#getToken').val();
        $.ajax({
            type: "POST",
            headers: {
                "Content-Type" :"application/json",
                "Authorization":Authorization
            },
            url: 'http://125.212.227.42:18080/api/news',
            data: JSON.stringify({
                title:$('#title').val(),
                category_id:$('#category_id').val(),
                image:$('#image').val(),
                author_id:$('#author_id').val(),
                summary:$('#summary').val(),
                content:CKEDITOR.instances['content_text'].getData(),
                created_at:date
            }),
            success: function(res){
                if(res.message=="success"){
                    $('.modal-body').html('<p>Thêm thành công!</p>')
                    $('#btn-close').click(()=>{
                        window.location.href='/news';
                    });
                }
            }
        });
    });
});