$(function() {
    $("#link_reg").on("click", function() {

        $(".logbox").hide().siblings(".regbox").show()
    })
    $("#link_login").on("click", function() {

        $(".regbox").hide().siblings(".logbox").show()
    })


    let form = layui.form
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(vaule) {
            var repwd = $(".regbox [name = password]").val()

            if (repwd != vaule) {
                return "两次密码输出不一致"
            }

        }
    })

    $(".form_reg").on("submit", function(e) {
        e.preventDefault();
        var dataS = {
            username: $(".regbox [name=username]").val(),
            password: $(".regbox [name=password]").val()
        }
        console.log(dataS);
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: dataS,
            success: function(res) {

                if (res.status != 0) return layer.msg(res.message);
                layer.msg(res.message, function() {
                    $("#link_login").click()
                })


            }

        })
    })

    $(".form_login").submit(function(e) {
        e.preventDefault();
        console.log(123);
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {

                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("登录成功")
                location.href = "/index.html"
                localStorage.setItem("token", res.token)




            }
        })

    })








})