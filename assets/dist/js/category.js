$(document).ready(()=>{
    $('.username').html(getCookie('username'))
            $.ajax({
                type: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+$('#getToken').val()
                },
                url: 'http://125.212.227.42:18080/api/category/'+$('#getID').val(),
                success: function(obj){
                    $('#name').val(obj.data.name);
                    $('#parent_id').val(obj.data.parent_id);
                }
    });
    $('#btn-edit').click(()=>{
        $('#name').removeAttr("readonly");
        $('#parent_id').removeAttr("readonly");
        $('#edit').css('display','block');
        $('#btn-edit').css('display','none');
    });

    $('#delete-data').confirmModal({
        confirmTitle     : 'CONFIRM DELETE!',
        confirmMessage   : 'Are you sure you want to delete this category?',
        confirmOk        : 'Yes',
        confirmCancel    : 'Cancel',
        confirmDirection : 'rtl',
        confirmStyle     : 'danger',
        confirmCallback  : function(){
            let Authorization = "Bearer "+$('#getToken').val();
            $.ajax({
                type: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":Authorization
                },
                url: 'http://125.212.227.42:18080/api/category/'+$('#getID').val(),
                success: function(response){
                    if(response.message=="success"){
                        window.location.href='/category';
                    }
                    else{
                        alert('Xoá thất bại');
                    }
                },
                error:function(){
                    alert('Xoá thất bại');                    
                }
            });
        },
        confirmDismiss   : true,
        confirmAutoOpen  : false
    });

    $('#edit').confirmModal({
        confirmTitle     : 'CONFIRM SUBMIT!',
        confirmMessage   : 'Are you sure you want to change ?',
        confirmOk        : 'Yes',
        confirmCancel    : 'Cancel',
        confirmDirection : 'rtl',
        confirmStyle     : 'primary',
        confirmCallback  : function(){
            let Authorization = "Bearer "+$('#getToken').val();
            $.ajax({
                type: "PUT",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":Authorization
                },
                url: 'http://125.212.227.42:18080/api/category',
                data: JSON.stringify({
                    id:$('#getID').val(),
                    name:$('#name').val(),
                    parent_id:$('#parent_id').val()
                }),
                success: function(response){
                    if(response.message=="success"){
                        alert('Thành công');
                        $('#name').attr("readonly",true);
                        $('#parent_id').attr("readonly",true);
                        $('#edit').css('display','none');
                        $('#btn-edit').css('display','inline');
                    }
                    else{
                        alert('Thất bại');
                    }
                },
                error: function(){alert('Thất bại');}
            });
        },
        confirmDismiss   : true,
        confirmAutoOpen  : false
    });
    
});