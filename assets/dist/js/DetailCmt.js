$(document).ready(()=>{
    $('.username').html(getCookie('username'))
    $.get("http://125.212.227.42:18080/api/comments?id="+$('#getID').val(), obj=>{
        $('#member_id').val(obj.data[0].member_id);
        $('#new_id').val(obj.data[0].new_id);
        $('#content').val(obj.data[0].content);
        $('#created_at').val(new Date(obj.data[0].created_at).toLocaleString());
    });

    $('#btn-edit').click(()=>{
        $('#member_id').removeAttr("readonly");
        $('#new_id').removeAttr("readonly");
        $('#content').removeAttr("readonly");
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
        confirmCallback  : changeCmt,
        confirmDismiss   : true,
        confirmAutoOpen  : false
    });
    function changeCmt(){
        var Authorization = "Bearer "+$('#getToken').val();
        $.ajax({
            type: "PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization":Authorization
            },
            url: 'http://125.212.227.42:18080/api/comments',
            data: JSON.stringify({
                id:$('#getID').val(),
                member_id:$('#member_id').val(),
                new_id:$('#new_id').val(),
                content:$('#content').val(),
            }),
            success: function(response){
                if(response.message=="success"){
                    alert('Thành công');
                    $('#member_id').attr("readonly",true);
                    $('#new_id').attr("readonly",true);
                    $('#content').attr("readonly",true);
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
        confirmMessage   : 'Are you sure you want to delete this comment?',
        confirmOk        : 'Yes',
        confirmCancel    : 'Cancel',
        confirmDirection : 'rtl',
        confirmStyle     : 'danger',
        confirmCallback  : deleteCmt,
        confirmDismiss   : true,
        confirmAutoOpen  : false
    });
    function deleteCmt(){
        var Authorization = "Bearer "+$('#getToken').val();
            $.ajax({
                type: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":Authorization
                },
                url: 'http://125.212.227.42:18080/api/comments/'+$('#getID').val(),
                success: function(response){
                    if(response.message=="success"){
                        window.location.href='/comments';
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