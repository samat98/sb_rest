$(document).on("submit", "#edit_form", function(event) {
    event.preventDefault();
    var url = $(this).attr("action");
    $.ajax({
        url: url,
        type: 'PUT',
        dataType: "JSON",
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function (user, status) {
            $(`table tbody #${user.id}`).html(`
                                <td><span> ${user.id} </span></td>
                                <td><span> ${user.firstname} </span></td>
                                <td><span> ${user.lastname} </span></td>
                                <td><span> ${user.age} </span></td>
                                <td><span> ${user.username} </span></td>
                                <td><span> ${user.rolesAsString} </span></td>
                                <td><button id="edit" value="${user.id}" type="button" class="btn btn-info">edit</button></td>
                                <td><button id="delete" value="${user.id}" type="button" class="btn btn-danger">delete</button></td>                  
                            `)
            $('#userEditModal').modal('hide');
        },
        error: function (xhr, desc, err) {
            console.log("error");

        }
    })
});

$(document).on("submit", "#create_form", function(event) {
    event.preventDefault();
    var url = $(this).attr("action");
    $.ajax({
        url: url,
        type: 'POST',
        dataType: "JSON",
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function (user, status) {
            $(`table tbody`).append(`
                              <tr id="${user.id}">
                                <td><span> ${user.id} </span></td>
                                <td><span> ${user.firstname} </span></td>
                                <td><span> ${user.lastname} </span></td>
                                <td><span> ${user.age} </span></td>
                                <td><span> ${user.username} </span></td>
                                <td><span> ${user.rolesAsString} </span></td>
                                <td><button id="edit" value="${user.id}" type="button" class="btn btn-info">edit</button></td>
                                <td><button id="delete" value="${user.id}" type="button" class="btn btn-danger">delete</button></td>
                              </tr>                     
                            `);
            $('.nav-tabs a[href="#home"]').tab('show');
            alert("User: " + user.username + " successfully added.");
        },
        error: function (xhr, desc, err) {
            console.log("error");

        }
    })
});
$(document).on('click', '#edit', function () {
    $.ajax("/admin/edit", {
        method: "GET",
        data:
            {
                id: $(this).attr("value"),
            },
        dataType: "json",
        success: function (user) {
            $("#sel2m option:selected").removeAttr("selected");
            $('#id').val(user.id);
            $('#firstname').val(user.firstname);
            $('#lastname').val(user.lastname);
            $('#email').val(user.email);
            $('#age').val(user.age);
            $('#password').val(user.password);
            for(let role of user.roles){
                console.log("role" , role.id);
                $('#sel2m option[value=' + role.id + ']').attr('selected', true);
            }
            $('#userEditModal').modal('show');
        },
        error: function (e) {
            alert("error" + e);
        }
    })
})

$(document).on('click', '#delete_button', function () {
    $.ajax("/admin/delete", {
        method: "DELETE",
        data:
            {
                id: $(this).attr("value"),
            },
        dataType: "json",
        success: function (userId) {

            $(`tbody #${userId}`).remove();
            $('#userDeleteModal').modal('hide');
            alert("successfully removed user with id" + userId);
        },
        error: function (e) {
            alert("error" + e);
        }
    })
})

$(document).on('click', '#delete', function () {
    $.ajax("/admin/edit", {
        method: "GET",
        data:
            {
                id: $(this).attr("value"),
            },
        dataType: "json",
        success: function (user) {
            $("#sel2m1").html("");
            $('#id1').val(user.id);
            $('#delete_button').val(user.id);
            $('#firstname1').val(user.firstname);
            $('#lastname1').val(user.lastname);
            $('#email1').val(user.email);
            $('#age1').val(user.age);
            $('#password1').val(user.password);
            for(let role of user.roles){
                console.log("role" , role.id);
                $('#sel2m1').append(
                    `<option>${role.name}</option>`
                );
            }
            $('#userDeleteModal').modal('show');
        },
        error: function (e) {
            alert("error" + e);
        }
    })
})

