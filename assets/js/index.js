$(function() {




    $("#tuichu").on("click", function() {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem("token");
            location.href = "/login.html"
            layer.close(index);
        });
    })





})
getUserInfo()

function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token")
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            rendAvatar(res.data)
        },


    })

};

function rendAvatar(user) {

    let uname = user.nickname || user.username
    $("#welcome").html("欢迎 " + uname);
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("scr", user_pic).show();
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide();
        $(".text-avatar").show().html(uname[0].toUpperCase())
    }
}