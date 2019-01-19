$(document).ready(()=>{
    $.ajax({
        type: "GET",
        headers: {
            "Authorization":"Bearer "+$('#getToken').val()
        },
        url: 'http://125.212.227.42:18080/api/members/'+$('#getID').val(),
        success: function(obj){
            $('#username').val(obj.data.username);
            $('#email').val(obj.data.email);
            $('#role_id').val(obj.data.role_id==1?'Administrator':'Member');
            obj.data.role_id==1? $('#delete-data').attr('disabled',true):'';
        }
    });
    $('#btn-reset').click(()=>{
        //reset password
    }); 
    $('#delete-data').confirmModal({
        confirmTitle     : 'CONFIRM DELETE!',
        confirmMessage   : 'Are you sure you want to delete this member?',
        confirmOk        : 'Yes',
        confirmCancel    : 'Cancel',
        confirmDirection : 'rtl',
        confirmStyle     : 'danger',
        confirmCallback  : function(){
            var Authorization = "Bearer "+$('#getToken').val();
            $.ajax({
                type: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":Authorization
                },
                url: 'http://125.212.227.42:18080/api/members/'+$('#getID').val(),
                success: function(response){
                    if(response.message=="success"){
                        window.location.href='/members';
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

})